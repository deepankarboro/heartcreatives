export class MicBlowDetector {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  private consecutiveHits: number = 0;
  private onBlowCallback: (() => void) | null = null;
  private isListening: boolean = false;

  constructor(onBlow: () => void) {
    this.onBlowCallback = onBlow;
  }

  public async start(): Promise<boolean> {
    if (this.isListening) return true;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Microphone not supported on this browser');
        return false;
      }

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
      const source = this.audioCtx.createMediaStreamSource(this.micStream);

      // Lowpass filter to isolate breath rumble (50 - 300Hz)
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.2;

      source.connect(filter);
      filter.connect(this.analyser);

      this.isListening = true;
      this.consecutiveHits = 0;
      this.detectLoop();
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      this.stop();
      return false;
    }
  }

  private detectLoop = () => {
    if (!this.isListening || !this.analyser) return;

    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);

    // Calculate energy in low frequency bins (0 to ~300Hz)
    let lowEnergy = 0;
    const lowBins = Math.min(16, buffer.length);
    for (let i = 1; i < lowBins; i++) {
      lowEnergy += buffer[i];
    }
    const avg = lowEnergy / (lowBins - 1);

    // If strong puff detected
    if (avg > 70) {
      this.consecutiveHits++;
      if (this.consecutiveHits >= 3) {
        if (this.onBlowCallback) {
          this.onBlowCallback();
        }
        this.stop();
        return;
      }
    } else {
      this.consecutiveHits = Math.max(0, this.consecutiveHits - 1);
    }

    this.animationFrameId = requestAnimationFrame(this.detectLoop);
  };

  public stop() {
    this.isListening = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}
