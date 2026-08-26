import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Gift } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { firePetalShower, fireCelebrationConfetti } from '../../../utils/confetti';
import { ScratchCard } from '../../common/ScratchCard';
import { ShareModal } from '../../common/ShareModal';

interface PopUpLetterProps {
  card: CardData;
  onRestart: () => void;
}

export const PopUpLetter: React.FC<PopUpLetterProps> = ({ card, onRestart }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 max-w-2xl mx-auto text-center">
      <div className="relative z-10 w-full rounded-3xl p-6 sm:p-10 glass-card-whimsical shadow-2xl border-2 border-rose-200/80 text-neutral-900 space-y-6">
        <div className="flex flex-col items-center justify-center -mt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-rose-500">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
          </div>
          <span className="text-[11px] font-bold tracking-widest text-rose-700 uppercase mt-2 font-mono">
            Sweet Birthday Gazette
          </span>
        </div>

        <div className="border-b border-rose-200 pb-4">
          <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">
            Dearest <span className="text-rose-600 italic">{card.recipientName}</span>,
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Celebrated on {card.dateText} • Mascot: {card.mascot}
          </p>
        </div>

        <div className="text-left font-sans text-sm sm:text-base text-neutral-800 leading-relaxed whitespace-pre-line space-y-4 px-2 sm:px-4">
          {card.letter}
        </div>

        <div className="pt-2">
          <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
            Signature Sweet Traits
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {card.bondTraits.map((trait, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 font-semibold shadow-sm"
              >
                🍓 {trait}
              </span>
            ))}
          </div>
        </div>

        {card.secretMessage && (
          <div className="pt-4 border-t border-rose-200">
            <ScratchCard secretText={card.secretMessage} theme="whimsical" />
          </div>
        )}

        <div className="pt-4 border-t border-rose-200 flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-500 italic">Baked with extra sugar and infinite hugs,</p>
          <p className="font-handwritten text-2xl font-bold text-rose-700 mt-1">{card.senderName} 🍰</p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              setIsShareOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share This Surprise</span>
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              fireCelebrationConfetti();
              firePetalShower();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Confetti Shower!</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onRestart();
            }}
            className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ShareModal card={card} isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
};
