import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, RefreshCw } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireStarlightSparkles } from '../../../utils/confetti';

interface ConstellationGameProps {
  card: CardData;
  onNext: () => void;
}

interface StarNode {
  id: number;
  label: string;
  x: number;
  y: number;
  note: number;
}

export const ConstellationGame: React.FC<ConstellationGameProps> = ({ card, onNext }) => {
  const stars: StarNode[] = [
    { id: 0, label: 'Warmth', x: 50, y: 20, note: 0 },
    { id: 1, label: 'Laughter', x: 78, y: 35, note: 4 },
    { id: 2, label: 'Memories', x: 70, y: 72, note: 7 },
    { id: 3, label: 'Dreams', x: 50, y: 90, note: 11 },
    { id: 4, label: 'Loyalty', x: 30, y: 72, note: 12 },
    { id: 5, label: 'Magic', x: 22, y: 35, note: 16 },
  ];

  const [connectedIds, setConnectedIds] = useState<number[]>([0]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStarClick = (starId: number) => {
    if (isCompleted) return;

    const currentLast = connectedIds[connectedIds.length - 1];
    const expectedNext = (currentLast + 1) % stars.length;

    if (starId === expectedNext) {
      const nextConnected = [...connectedIds, starId];
      setConnectedIds(nextConnected);

      const star = stars.find((s) => s.id === starId);
      sound.playChime(star ? star.note : 0);

      if (nextConnected.length === stars.length + 1) {
        setIsCompleted(true);
        sound.playFanfare();
        fireStarlightSparkles();
      }
    } else {
      sound.playPop();
    }
  };

  const handleReset = () => {
    setConnectedIds([0]);
    setIsCompleted(false);
    sound.playPop();
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="mb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-900/50 border border-purple-400/30 text-purple-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>Star Map Alignment</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white">
          Connect the <span className="text-amber-300 italic">{card.recipientName}</span> Constellation
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
          {isCompleted
            ? '✨ The constellation is in perfect alignment! The cosmic frequency is tuned.'
            : 'Tap the glowing stars in sequence to trace your constellation of traits.'}
        </p>
      </div>

      <div className="relative w-full aspect-square max-w-[380px] rounded-3xl bg-gradient-to-b from-neutral-900/90 to-purple-950/60 border border-purple-500/30 p-6 shadow-2xl overflow-hidden my-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {connectedIds.map((id, idx) => {
            if (idx === 0) return null;
            const prevId = connectedIds[idx - 1];
            const p1 = stars.find((s) => s.id === prevId);
            const p2 = stars.find((s) => s.id === id);
            if (!p1 || !p2) return null;

            return (
              <line
                key={idx}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke="url(#laserGrad)"
                strokeWidth="3.5"
                strokeDasharray={isCompleted ? 'none' : '4,4'}
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {stars.map((star) => {
          const isConnected = connectedIds.includes(star.id);
          const currentLast = connectedIds[connectedIds.length - 1];
          const isNext = !isCompleted && star.id === (currentLast + 1) % stars.length;

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group transition-all duration-300 ${
                isNext ? 'scale-125' : 'scale-100 hover:scale-110'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isConnected
                    ? 'bg-amber-400 text-neutral-950 shadow-[0_0_20px_#fbbf24]'
                    : isNext
                    ? 'bg-pink-500 text-white shadow-[0_0_25px_#ec4899] animate-bounce'
                    : 'bg-neutral-800 text-neutral-400 border border-white/20'
                }`}
              >
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span
                className={`text-[10px] font-semibold mt-1 px-1.5 py-0.5 rounded backdrop-blur-sm ${
                  isConnected
                    ? 'text-amber-200 bg-black/50'
                    : 'text-neutral-400 bg-black/30'
                }`}
              >
                {star.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          title="Reset constellation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            sound.playPop();
            sound.playChime(7);
            onNext();
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 ${
            isCompleted
              ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-neutral-950 shadow-[0_0_30px_rgba(251,191,36,0.5)]'
              : 'bg-purple-600/60 hover:bg-purple-600 text-white border border-purple-400/30'
          }`}
        >
          <span>{isCompleted ? 'Proceed to Cosmic Cake' : 'Skip Alignment'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
