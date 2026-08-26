import React, { useState } from 'react';
import { Heart, ArrowRight, Gift } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface WaxSealEnvelopeProps {
  card: CardData;
  onOpen: () => void;
}

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({ card, onOpen }) => {
  const [isBroken, setIsBroken] = useState(false);

  const handleBreakSeal = () => {
    if (isBroken) return;
    setIsBroken(true);
    sound.playPop();
    sound.playChime(2);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="absolute w-72 h-72 rounded-full bg-rose-300/30 blur-[90px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-60 h-60 rounded-full bg-amber-200/40 blur-[80px] pointer-events-none -translate-x-20 translate-y-20" />

      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-700 text-xs font-bold tracking-wider uppercase">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Special Delivery • {card.dateText}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-neutral-900 leading-tight">
          A Sweet Surprise for <br />
          <span className="text-rose-600 italic">{card.recipientName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-medium">
          From {card.senderName} with lots of love and sweet treats! 🍓🍰
        </p>
      </div>

      <div
        onClick={handleBreakSeal}
        className={`relative w-72 sm:w-84 aspect-[4/3] rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-rose-200 shadow-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 transform-gpu hover:scale-105 select-none ${
          isBroken ? 'scale-110 rotate-1 shadow-rose-400/50' : 'hover:shadow-rose-300/40'
        }`}
      >
        <div className="absolute top-0 inset-x-0 h-1/2 border-b border-rose-200/80 pointer-events-none bg-gradient-to-b from-white/60 to-transparent rounded-t-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl mb-2 animate-bounce">
            {card.mascot === 'cat' ? '🐱' : card.mascot === 'bunny' ? '🐰' : card.mascot === 'bear' ? '🧸' : '🌸'}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-800 font-sans">
            Hand-Delivered Letter
          </span>
        </div>

        <div
          className={`absolute z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-red-400 border-2 border-rose-300 shadow-[0_8px_20px_rgba(225,29,72,0.45)] flex items-center justify-center text-white transition-all duration-500 ${
            isBroken ? 'scale-125 opacity-0 rotate-45' : 'hover:scale-110'
          }`}
        >
          <Heart className="w-8 h-8 fill-current text-white drop-shadow" />
        </div>

        <div className="absolute bottom-3 text-[11px] font-semibold text-rose-600/80 font-handwritten text-base">
          {isBroken ? 'Opening envelope...' : '✨ Tap wax seal to unbox ✨'}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleBreakSeal}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-rose-500/25 transition-all active:scale-95"
        >
          <span>Break Seal & Open</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
