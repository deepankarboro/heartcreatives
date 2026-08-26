import React, { useState } from 'react';
import { ArrowRight, Zap, Flame, RotateCcw } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireCelebrationConfetti } from '../../../utils/confetti';

interface PixelCakeOverdriveProps {
  card: CardData;
  onNext: () => void;
}

export const PixelCakeOverdrive: React.FC<PixelCakeOverdriveProps> = ({ card, onNext }) => {
  const [power, setPower] = useState(0);
  const [isOvercharged, setIsOvercharged] = useState(false);

  const handleCharge = () => {
    if (isOvercharged) return;
    const nextPower = Math.min(100, power + 25);
    setPower(nextPower);
    sound.playArcadeBeep(300 + nextPower * 6);

    if (nextPower >= 100) {
      setIsOvercharged(true);
      sound.playFanfare();
      fireCelebrationConfetti();
    }
  };

  const handleReset = () => {
    setPower(0);
    setIsOvercharged(false);
    sound.playArcadeBeep(440);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      <div className="space-y-1 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 border border-yellow-400 text-yellow-300 text-xs font-cyber uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-pink-500" />
          <span>Overclock Stage</span>
        </div>
        <h2 className="font-cyber text-2xl sm:text-4xl text-white tracking-wide">
          {isOvercharged ? '🔥 CELEBRATION OVERDRIVE! 🔥' : `Power Up ${card.recipientName}'s Cake`}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-cyan-300">
          Tap the charge reactor repeatedly to overload the celebratory energy!
        </p>
      </div>

      {/* 8-bit Pixel Cake Box */}
      <div className="relative my-4 flex flex-col items-center select-none">
        {/* Pixel Flame */}
        <div className="flex flex-col items-center mb-[-4px] z-20">
          <div
            className={`w-8 h-10 bg-gradient-to-t from-pink-500 via-yellow-300 to-white rounded-sm shadow-[0_0_25px_#ff007f] flex items-center justify-center transition-all ${
              isOvercharged ? 'scale-150 animate-pulse' : 'animate-bounce'
            }`}
          >
            <span className="font-arcade text-[8px] text-black">XP</span>
          </div>
          <div className="w-3 h-8 bg-cyan-400 border border-white" />
        </div>

        {/* Top Pixel Tier (Cyber Pattern) */}
        <div className="relative z-10 w-44 h-16 bg-neutral-900 border-2 border-pink-500 shadow-[0_0_20px_rgba(255,0,127,0.5)] flex items-center justify-around px-3">
          <span className="text-sm">👾</span>
          <span className="text-xs">⚡</span>
          <span className="text-sm">🍒</span>
          <span className="text-xs">⚡</span>
          <span className="text-sm">👾</span>
        </div>

        {/* Bottom Pixel Tier (Arcade Matrix) */}
        <div className="relative z-0 w-64 h-24 bg-neutral-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-around px-4">
          <div className="flex gap-3 text-sm text-cyan-300 drop-shadow">
            <span>🕹️</span>
            <span>💎</span>
            <span>⭐</span>
            <span>💎</span>
            <span>🕹️</span>
          </div>
        </div>

        {/* Base Platform */}
        <div className="w-72 h-4 bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)]" />
      </div>

      {/* Charge Progress Bar */}
      <div className="w-full max-w-sm my-3 p-1.5 rounded-xl bg-black border border-cyan-500/50">
        <div
          className="h-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.8)]"
          style={{ width: `${power}%` }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {!isOvercharged ? (
          <button
            onClick={handleCharge}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-yellow-400 hover:from-pink-500 hover:to-yellow-300 text-black font-cyber font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,127,0.6)] transition-all active:scale-90"
          >
            <Zap className="w-5 h-5 text-black" />
            <span>CHARGE REACTOR (+25%)</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleReset}
              className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-neutral-300"
              title="Reset Reactor"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playArcadeBeep(880);
                onNext();
              }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-cyber font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all active:scale-95"
            >
              <span>Access Hologram Deck</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
