import React, { useState } from 'react';
import { ArrowRight, Wind, Flame } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { firePetalShower, fireCelebrationConfetti } from '../../../utils/confetti';

interface CandleBlowoutProps {
  card: CardData;
  onNext: () => void;
}

export const CandleBlowout: React.FC<CandleBlowoutProps> = ({ card, onNext }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    setCandlesLit(false);
    sound.playCandleBlow();
    setTimeout(() => {
      sound.playFanfare();
      fireCelebrationConfetti();
      firePetalShower();
    }, 350);
  };

  const handleRelight = () => {
    sound.playMatchStrike();
    setCandlesLit(true);
    setIsBlownOut(false);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="space-y-1 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-300 text-rose-700 text-xs font-bold uppercase">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          <span>Wish Ceremony</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-neutral-900 leading-tight">
          {isBlownOut ? '🎉 Happy Birthday! 🎉' : `Make a Wish, ${card.recipientName}!`}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-md mx-auto">
          {isBlownOut
            ? 'May all your sweet dreams and wishes come true this year!'
            : 'Close your eyes, make a heartfelt wish, and blow out the candles.'}
        </p>
      </div>

      <div className="relative my-4 flex flex-col items-center justify-center select-none">
        {/* Three Candles */}
        <div className="flex gap-8 mb-[-6px] z-20">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              onClick={handleBlowOut}
              className="flex flex-col items-center cursor-pointer group"
            >
              {candlesLit ? (
                <div className="relative w-6 h-10 flex items-center justify-center animate-candle-flicker group-hover:scale-125 transition-transform">
                  <div className="absolute inset-0 bg-amber-400/70 rounded-full blur-sm" />
                  <div className="relative w-5 h-8 bg-gradient-to-t from-rose-500 via-amber-300 to-yellow-100 rounded-full shadow-md" />
                </div>
              ) : (
                <div className="h-10 flex items-end justify-center">
                  <div className="w-1 h-5 bg-neutral-400/50 rounded-full blur-[1px]" />
                </div>
              )}
              <div className="w-3 h-14 bg-gradient-to-b from-rose-200 to-rose-400 rounded-t-sm border-t border-white shadow" />
            </div>
          ))}
        </div>

        {/* Top Cake Tier (Decorated Frosting Drips) */}
        <div className="relative z-10 w-44 sm:w-52 h-18 rounded-t-3xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-t-4 border-white shadow-md flex items-center justify-around px-3">
          <span className="text-xl">🍓</span>
          <span className="text-base">✨</span>
          <span className="text-xl">🍓</span>
          <span className="text-base">✨</span>
          <span className="text-xl">🍓</span>
        </div>

        {/* Bottom Cake Tier (Rich Strawberry Sponge) */}
        <div className="relative z-0 w-60 sm:w-72 h-24 rounded-t-2xl bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border-t-4 border-rose-300 shadow-xl flex items-center justify-center">
          <div className="flex gap-3 text-lg opacity-80">
            <span>🧁</span>
            <span>🌸</span>
            <span>🍒</span>
            <span>🌸</span>
            <span>🧁</span>
          </div>
        </div>

        {/* Bottom Cake Stand */}
        <div className="w-72 sm:w-84 h-5 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-lg border border-amber-300/40" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {!isBlownOut ? (
          <button
            onClick={handleBlowOut}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-500/30 transition-all active:scale-95"
          >
            <Wind className="w-5 h-5" />
            <span>Blow Out All Candles!</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleRelight}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold text-xs transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Relight Candles</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                sound.playChime(6);
                onNext();
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition-all active:scale-95"
            >
              <span>View Memory Clothesline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
