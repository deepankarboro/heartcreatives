import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Star } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireCelebrationConfetti } from '../../../utils/confetti';
import { ScratchCard } from '../../common/ScratchCard';
import { ShareModal } from '../../common/ShareModal';

interface CelestialLetterProps {
  card: CardData;
  onRestart: () => void;
}

export const CelestialLetter: React.FC<CelestialLetterProps> = ({ card, onRestart }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 max-w-2xl mx-auto text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-pink-600/10 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full rounded-3xl p-6 sm:p-10 glass-card-celestial shadow-2xl border border-purple-400/30 text-white space-y-6">
        <div className="flex flex-col items-center justify-center -mt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 shadow-[0_0_25px_rgba(251,191,36,0.5)]">
            <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-amber-300">
              <Star className="w-6 h-6 fill-current animate-pulse" />
            </div>
          </div>
          <span className="text-[11px] font-bold tracking-widest text-amber-300/90 uppercase mt-2 font-mono">
            Official Celestial Keepsake
          </span>
        </div>

        <div className="border-b border-white/10 pb-4">
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Dearest <span className="text-amber-300 italic">{card.recipientName}</span>,
          </h2>
          <p className="text-xs text-purple-200/70 mt-1">
            Celebrated on {card.dateText} • Vibe: {card.vibe}
          </p>
        </div>

        <div className="text-left font-sans text-sm sm:text-base text-neutral-200 leading-relaxed whitespace-pre-line space-y-4 px-2 sm:px-4">
          {card.letter}
        </div>

        <div className="pt-2">
          <div className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider mb-2">
            Signature Cosmic Traits
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {card.bondTraits.map((trait, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-400/30 text-amber-200 font-medium shadow-sm"
              >
                ✨ {trait}
              </span>
            ))}
          </div>
        </div>

        {card.secretMessage && (
          <div className="pt-4 border-t border-white/10">
            <ScratchCard secretText={card.secretMessage} theme="celestial" />
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex flex-col items-center justify-center">
          <p className="text-xs text-purple-300/70 italic">With infinite affection and stardust,</p>
          <p className="font-display text-xl text-amber-300 mt-1">{card.senderName} 💖</p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              setIsShareOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/30 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Keepsake Link</span>
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              fireCelebrationConfetti();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-semibold text-xs sm:text-sm transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate Again!</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onRestart();
            }}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
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
