import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wind, Flame } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { firePetalShower, fireCelebrationConfetti } from '../../../utils/confetti';

interface BlossomSparklerCakeProps {
  card: CardData;
  onNext: () => void;
}

export const BlossomSparklerCake: React.FC<BlossomSparklerCakeProps> = ({ card, onNext }) => {
  const [isExtinguished, setIsExtinguished] = useState(false);

  const handleBlowOut = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);
    sound.playCandleBlow();
    setTimeout(() => {
      sound.playFanfare();
      firePetalShower();
      fireCelebrationConfetti();
    }, 400);
  };

  const handleRelight = () => {
    sound.playMatchStrike();
    setIsExtinguished(false);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="space-y-1 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>Matcha & Blossom Ceremony</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-white">
          {isExtinguished ? '🌸 A Blessing in Bloom 🌸' : `Honor the Moment, ${card.recipientName}`}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md mx-auto">
          {isExtinguished
            ? 'May peace, warmth, and blossoming happiness follow your path.'
            : 'Extinguish the golden sparkler candle to seal the garden blessing.'}
        </p>
      </div>

      {/* 3D Botanical Cake */}
      <div className="relative my-4 flex flex-col items-center select-none">
        {/* Sparkler Flame */}
        <div
          onClick={handleBlowOut}
          className="flex flex-col items-center cursor-pointer group mb-[-6px] z-20"
        >
          {!isExtinguished ? (
            <div className="relative w-8 h-12 flex items-center justify-center animate-candle-flicker group-hover:scale-125 transition-transform">
              <div className="absolute inset-0 bg-amber-300/80 rounded-full blur-md animate-pulse" />
              <div className="relative w-6 h-10 bg-gradient-to-t from-emerald-500 via-amber-300 to-white rounded-full shadow-[0_0_20px_#fde047]" />
              <div className="absolute text-xs animate-ping">✨</div>
            </div>
          ) : (
            <div className="h-12 flex flex-col items-center justify-end">
              <div className="w-1.5 h-6 bg-emerald-200/40 rounded-full blur-[1px]" />
              <span className="text-[10px] text-amber-200/70 font-serif italic">Extinguished</span>
            </div>
          )}
          <div className="w-3 h-12 bg-gradient-to-b from-amber-300 via-emerald-600 to-emerald-900 rounded-t-sm shadow" />
        </div>

        {/* Top Cake Tier (Matcha & Sakura Cream) */}
        <div className="relative z-10 w-44 sm:w-52 h-18 rounded-t-3xl bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 border-t-2 border-amber-300/60 shadow-lg flex items-center justify-around px-4">
          <span className="text-xl">🌸</span>
          <span className="text-base">🍃</span>
          <span className="text-xl">🌸</span>
          <span className="text-base">🍃</span>
          <span className="text-xl">🌸</span>
        </div>

        {/* Bottom Cake Tier (Botanical Leaves & Gold Leaf) */}
        <div className="relative z-0 w-60 sm:w-72 h-24 rounded-t-2xl bg-gradient-to-r from-neutral-900 via-emerald-950 to-neutral-900 border-t-4 border-amber-300/40 shadow-2xl flex items-center justify-around px-6">
          <span className="text-lg">🌿</span>
          <span className="text-sm text-amber-300">✨</span>
          <span className="text-lg">🌸</span>
          <span className="text-sm text-amber-300">✨</span>
          <span className="text-lg">🌿</span>
        </div>

        {/* Golden Wooden Stand */}
        <div className="w-72 sm:w-84 h-5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 rounded-full shadow-2xl border border-amber-300/40" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {!isExtinguished ? (
          <button
            onClick={handleBlowOut}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all active:scale-95"
          >
            <Wind className="w-4 h-4" />
            <span>Extinguish Sparkler</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleRelight}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-semibold text-xs transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Relight Sparkler</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                sound.playChime(9);
                onNext();
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all active:scale-95"
            >
              <span>View Memory Wreath</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
