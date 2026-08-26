import React from 'react';
import { ArrowRight, Flower2 } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface GardenGateProps {
  card: CardData;
  onEnter: () => void;
}

export const GardenGate: React.FC<GardenGateProps> = ({ card, onEnter }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center overflow-hidden">
      <div className="absolute w-80 h-80 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-64 h-64 rounded-full bg-amber-300/15 blur-[90px] pointer-events-none translate-x-24 -translate-y-16" />

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
          <Flower2 className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>Twilight Sanctuary • {card.dateText}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-tight drop-shadow-lg">
          In Full Bloom for <br />
          <span className="bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-200 bg-clip-text text-transparent italic">
            {card.recipientName}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-emerald-100/80 font-sans max-w-md mx-auto leading-relaxed">
          {card.senderName} has planted a serene enchanted garden of memories and blessings in your honor.
        </p>

        <div
          onClick={() => {
            sound.playChime(4);
            onEnter();
          }}
          className="relative inline-block cursor-pointer group my-4"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-amber-300 p-1 shadow-[0_0_40px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-500">
            <div className="w-full h-full rounded-full bg-neutral-950/90 flex flex-col items-center justify-center p-2 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl animate-bounce">🧚</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-200 mt-1">
                Enter Sanctuary
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              sound.playPop();
              sound.playChime(6);
              onEnter();
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-950/50 transition-all duration-300 active:scale-95"
          >
            <span>Part the Blooming Vines</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {card.bondTraits.map((trait, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 backdrop-blur-sm"
            >
              🌿 {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
