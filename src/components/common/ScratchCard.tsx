import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { fireStarlightSparkles } from '../../utils/confetti';

interface ScratchCardProps {
  secretText: string;
  theme?: 'celestial' | 'whimsical' | 'cyberwave' | 'botanical';
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  secretText,
  theme = 'celestial',
  onRevealed
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const lastSoundTime = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Background gradient for scratch foil
    let gradient = ctx.createLinearGradient(0, 0, width, height);
    if (theme === 'celestial') {
      gradient.addColorStop(0, '#c084fc');
      gradient.addColorStop(0.5, '#fbbf24');
      gradient.addColorStop(1, '#38bdf8');
    } else if (theme === 'whimsical') {
      gradient.addColorStop(0, '#fb7185');
      gradient.addColorStop(0.5, '#fde047');
      gradient.addColorStop(1, '#f472b6');
    } else if (theme === 'cyberwave') {
      gradient.addColorStop(0, '#ff007f');
      gradient.addColorStop(0.5, '#00f0ff');
      gradient.addColorStop(1, '#ffe600');
    } else {
      gradient.addColorStop(0, '#34d399');
      gradient.addColorStop(0.5, '#fde047');
      gradient.addColorStop(1, '#6ee7b7');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text on foil
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.fillText('✨ Scratch here to reveal secret ✨', width / 2, height / 2);
  }, [theme]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;
    const totalPixels = data.length / 4;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentPixels += 4;
      }
    }

    const percent = Math.min(100, Math.round((transparentPixels / totalPixels) * 100));
    setScratchPercent(percent);

    if (percent > 45 && !isRevealed) {
      setIsRevealed(true);
      sound.playFanfare();
      fireStarlightSparkles();
      if (onRevealed) onRevealed();
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Sound effect with throttle
    const now = Date.now();
    if (now - lastSoundTime.current > 70) {
      sound.playScratch();
      lastSoundTime.current = now;
    }

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-4 select-none">
      <div className="text-xs font-semibold uppercase tracking-wider text-pink-300/80 mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-pink-400" />
          Hidden Keepsake Wish
        </span>
        <span>{scratchPercent > 0 && `${scratchPercent}% Scratched`}</span>
      </div>

      {/* Card container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-neutral-900/90 to-black p-6 min-h-[140px] flex items-center justify-center text-center">
        {/* Revealed Secret Message */}
        <div className="relative z-10 space-y-2 animate-fadeIn">
          <div className="inline-flex p-2 rounded-full bg-pink-500/20 text-pink-300 mb-1">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
          <p className="font-handwritten text-2xl sm:text-3xl text-amber-200 leading-snug drop-shadow-md">
            {secretText}
          </p>
        </div>

        {/* Scratchable Canvas Layer */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 w-full h-full cursor-crosshair z-20 touch-none transition-opacity duration-500"
            style={{ opacity: isRevealed ? 0 : 1 }}
          />
        )}
      </div>

      {!isRevealed && (
        <p className="text-center text-[11px] text-white/50 mt-1.5 font-medium">
          💡 Drag your finger or mouse across the foil to scratch!
        </p>
      )}
    </div>
  );
};
