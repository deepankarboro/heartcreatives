import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Terminal } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireCelebrationConfetti } from '../../../utils/confetti';
import { ScratchCard } from '../../common/ScratchCard';
import { ShareModal } from '../../common/ShareModal';

interface CipherLetterProps {
  card: CardData;
  onRestart: () => void;
}

export const CipherLetter: React.FC<CipherLetterProps> = ({ card, onRestart }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-10 max-w-2xl mx-auto text-center">
      <div className="relative z-10 w-full rounded-3xl p-6 sm:p-10 glass-card-cyber shadow-2xl border-2 border-cyan-400 text-white space-y-6">
        <div className="flex flex-col items-center justify-center -mt-2">
          <div className="w-14 h-14 rounded-2xl bg-neutral-950 border-2 border-pink-500 flex items-center justify-center text-yellow-300 shadow-[0_0_20px_rgba(255,0,127,0.5)]">
            <Terminal className="w-7 h-7 animate-pulse" />
          </div>
          <span className="font-arcade text-[9px] text-cyan-300 uppercase mt-2">
            SECURE TRANSMISSION // VERIFIED
          </span>
        </div>

        <div className="border-b border-cyan-500/30 pb-4 text-left">
          <div className="font-arcade text-[10px] text-pink-400">&gt; DECRYPTING RECIPIENT...</div>
          <h2 className="font-cyber text-2xl sm:text-4xl text-white font-black mt-1">
            TO: <span className="text-yellow-300">{card.recipientName.toUpperCase()}</span>
          </h2>
          <p className="font-mono text-xs text-neutral-400 mt-1">
            STAMP: {card.dateText} • CLASS: {card.vibe}
          </p>
        </div>

        <div className="text-left font-mono text-xs sm:text-sm text-cyan-100/90 leading-relaxed whitespace-pre-line space-y-4 px-2 sm:px-4 bg-black/50 p-4 rounded-xl border border-cyan-500/20">
          {card.letter}
        </div>

        <div className="pt-2">
          <div className="font-arcade text-[9px] text-pink-400 uppercase tracking-wider mb-2">
            EQUIPPED ATTRIBUTES
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {card.bondTraits.map((trait, idx) => (
              <span
                key={idx}
                className="font-arcade text-[9px] px-3 py-1.5 rounded-lg bg-neutral-950 border border-cyan-400 text-yellow-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              >
                [+] {trait}
              </span>
            ))}
          </div>
        </div>

        {card.secretMessage && (
          <div className="pt-4 border-t border-cyan-500/30">
            <ScratchCard secretText={card.secretMessage} theme="cyberwave" />
          </div>
        )}

        <div className="pt-4 border-t border-cyan-500/30 flex flex-col items-center justify-center">
          <p className="font-mono text-xs text-neutral-400">&gt; TRANSMITTED WITH MAXIMUM POWER BY:</p>
          <p className="font-cyber text-lg font-black text-pink-400 mt-1">
            {card.senderName.toUpperCase()} ⚡
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playArcadeBeep(659);
              setIsShareOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-cyan-500 text-white font-cyber font-bold text-xs sm:text-sm uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Transmit Link</span>
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              fireCelebrationConfetti();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400 text-yellow-300 font-cyber font-bold text-xs sm:text-sm uppercase transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Overload FX</span>
          </button>

          <button
            onClick={() => {
              sound.playArcadeBeep(440);
              onRestart();
            }}
            className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-neutral-300"
            title="Replay"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ShareModal card={card} isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
};
