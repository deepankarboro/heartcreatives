import React, { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireCelebrationConfetti } from '../../../utils/confetti';

interface RhythmBeatGameProps {
  card: CardData;
  onNext: () => void;
}

interface Pad {
  id: number;
  label: string;
  key: string;
  color: string;
  freq: number;
}

export const RhythmBeatGame: React.FC<RhythmBeatGameProps> = ({ card, onNext }) => {
  const pads: Pad[] = [
    { id: 0, label: 'BASS', key: 'A', color: 'from-pink-500 to-rose-600 border-pink-400', freq: 261.63 },
    { id: 1, label: 'SYNTH', key: 'S', color: 'from-cyan-400 to-blue-600 border-cyan-300', freq: 329.63 },
    { id: 2, label: 'BEAT', key: 'D', color: 'from-yellow-400 to-amber-600 border-yellow-300', freq: 392.00 },
    { id: 3, label: 'LEAD', key: 'F', color: 'from-purple-500 to-indigo-600 border-purple-400', freq: 523.25 },
  ];

  const [activePad, setActivePad] = useState<number | null>(null);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleTap = (pad: Pad) => {
    setActivePad(pad.id);
    sound.playArcadeBeep(pad.freq);

    const nextCombo = combo + 1;
    setCombo(nextCombo);
    setScore((prev) => prev + 100 * Math.min(nextCombo, 5));

    if (nextCombo >= 8 && !isUnlocked) {
      setIsUnlocked(true);
      sound.playFanfare();
      fireCelebrationConfetti();
    }

    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 border border-pink-500 text-pink-300 text-xs font-cyber tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Cyber Rhythm Synthesizer</span>
        </div>
        <h2 className="font-cyber text-2xl sm:text-4xl text-white tracking-wide">
          Tap the Neon Beat!
        </h2>
        <p className="text-xs sm:text-sm font-mono text-cyan-300">
          Build up {card.recipientName}'s celebration overdrive combo! (Target: 8 Hits)
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 my-3 p-3 rounded-2xl bg-black/70 border border-cyan-500/40 w-full max-w-sm">
        <div>
          <div className="text-[9px] font-arcade text-neutral-400 uppercase">SCORE</div>
          <div className="font-cyber text-xl font-bold text-yellow-300">{score}</div>
        </div>
        <div className="h-8 w-px bg-white/20" />
        <div>
          <div className="text-[9px] font-arcade text-neutral-400 uppercase">COMBO</div>
          <div className="font-cyber text-xl font-bold text-pink-400">
            {combo > 0 ? `x${combo} 🔥` : '0'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md my-4">
        {pads.map((pad) => {
          const isActive = activePad === pad.id;
          return (
            <button
              key={pad.id}
              onClick={() => handleTap(pad)}
              className={`relative aspect-square rounded-2xl bg-gradient-to-br ${pad.color} border-2 p-3 flex flex-col items-center justify-between transition-all duration-150 transform-gpu active:scale-90 ${
                isActive
                  ? 'scale-110 shadow-[0_0_35px_rgba(255,255,255,0.8)] brightness-150'
                  : 'hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.6)]'
              }`}
            >
              <span className="font-arcade text-[10px] text-white/80">{pad.key}</span>
              <span className="text-3xl sm:text-4xl">⚡</span>
              <span className="font-cyber text-xs font-black text-white tracking-widest">
                {pad.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-2 h-6">
        {isUnlocked ? (
          <span className="font-cyber text-xs text-yellow-300 font-bold animate-pulse">
            ⚡ MAXIMUM OVERDRIVE UNLOCKED! ⚡
          </span>
        ) : (
          <span className="font-mono text-xs text-neutral-400">
            {8 - combo > 0 ? `${8 - combo} beats remaining...` : 'Combo Ready!'}
          </span>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => {
            sound.playArcadeBeep(784);
            onNext();
          }}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-cyber font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 ${
            isUnlocked
              ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 text-black shadow-[0_0_30px_rgba(255,230,0,0.8)]'
              : 'bg-neutral-900 hover:bg-neutral-800 text-cyan-300 border border-cyan-500/50'
          }`}
        >
          <span>{isUnlocked ? 'Deploy Pixel Cake' : 'Skip Rhythm Mini-Game'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
