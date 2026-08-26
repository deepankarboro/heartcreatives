import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Flower2 } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { firePetalShower, fireCelebrationConfetti } from '../../../utils/confetti';
import { ScratchCard } from '../../common/ScratchCard';
import { ShareModal } from '../../common/ShareModal';

interface CalligraphyScrollProps {
  card: CardData;
  onRestart: () => void;
}

export const CalligraphyScroll: React.FC<CalligraphyScrollProps> = ({ card, onRestart }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 max-w-2xl mx-auto text-center">
      <div className="relative z-10 w-full rounded-3xl p-6 sm:p-10 glass-card-botanical shadow-2xl border border-emerald-500/30 text-white space-y-6">
        <div className="flex flex-col items-center justify-center -mt-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-emerald-300">
              <Flower2 className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <span className="text-[11px] font-bold tracking-widest text-emerald-300 uppercase mt-2 font-mono">
            Sanctuary Letter of Blessing
          </span>
        </div>

        <div className="border-b border-emerald-500/20 pb-4">
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Dearest <span className="text-amber-300 italic">{card.recipientName}</span>,
          </h2>
          <p className="text-xs text-emerald-200/70 mt-1">
            Celebrated on {card.dateText} • Mood: {card.vibe}
          </p>
        </div>

        <div className="text-left font-editorial text-sm sm:text-base text-neutral-100 leading-relaxed whitespace-pre-line space-y-4 px-2 sm:px-4">
          {card.letter}
        </div>

        <div className="pt-2">
          <div className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wider mb-2">
            Sanctuary Attributes
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {card.bondTraits.map((trait, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-amber-200 font-medium shadow-sm"
              >
                🌿 {trait}
              </span>
            ))}
          </div>
        </div>

        {card.secretMessage && (
          <div className="pt-4 border-t border-emerald-500/20">
            <ScratchCard secretText={card.secretMessage} theme="botanical" />
          </div>
        )}

        <div className="pt-4 border-t border-emerald-500/20 flex flex-col items-center justify-center">
          <p className="text-xs text-emerald-300/70 italic">Held in loving grace,</p>
          <p className="font-display text-xl text-amber-300 mt-1">{card.senderName} 🌸</p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              setIsShareOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Scroll Link</span>
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              firePetalShower();
              fireCelebrationConfetti();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-semibold text-xs sm:text-sm transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Blossom Shower</span>
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
