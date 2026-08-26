import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import type { MusicMood } from '../../types/card';

interface AudioVisualizerProps {
  mood: MusicMood;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ mood }) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  const handleToggle = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playPop();
    }
  };

  const getMoodLabel = (m: MusicMood) => {
    switch (m) {
      case 'dreamy-celestial': return 'Celestial Chimes';
      case 'upbeat-lofi': return 'Lofi Groove';
      case 'synthwave-arcade': return 'Synthwave Beat';
      case 'zen-garden': return 'Zen Harp';
      default: return 'Music';
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 border border-white/20 text-white shadow-lg transition-all duration-300 active:scale-95 group"
    >
      <div className="flex items-center gap-0.5 h-4">
        {!isMuted ? (
          <>
            <span className="w-1 bg-pink-400 rounded-full h-3 animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1 bg-amber-400 rounded-full h-4 animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1 bg-cyan-400 rounded-full h-2 animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-1 bg-purple-400 rounded-full h-3.5 animate-pulse" style={{ animationDelay: '450ms' }} />
          </>
        ) : (
          <span className="w-4 h-0.5 bg-neutral-400 rounded-full" />
        )}
      </div>

      <span className="text-xs font-medium tracking-wide text-neutral-200 hidden sm:inline group-hover:text-white">
        {isMuted ? 'Muted' : getMoodLabel(mood)}
      </span>

      {isMuted ? (
        <VolumeX className="w-4 h-4 text-neutral-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
      )}
    </button>
  );
};
