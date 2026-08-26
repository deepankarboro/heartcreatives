import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Mic, Wind } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireCelebrationConfetti } from '../../../utils/confetti';
import { MicBlowDetector } from '../../../utils/micListener';

interface CosmicCakeProps {
  card: CardData;
  onNext: () => void;
}

export const CosmicCake: React.FC<CosmicCakeProps> = ({ card, onNext }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const micDetector = useRef<MicBlowDetector | null>(null);

  const handleBlowOut = () => {
    if (isBlown) return;
    setIsBlown(true);
    sound.playCandleBlow();
    setTimeout(() => {
      sound.playFanfare();
      fireCelebrationConfetti();
    }, 400);
  };

  const toggleMic = async () => {
    if (isMicActive) {
      if (micDetector.current) {
        micDetector.current.stop();
      }
      setIsMicActive(false);
    } else {
      micDetector.current = new MicBlowDetector(() => {
        handleBlowOut();
        setIsMicActive(false);
      });
      const ok = await micDetector.current.start();
      setIsMicActive(ok);
      if (ok) sound.playPop();
    }
  };

  useEffect(() => {
    return () => {
      if (micDetector.current) {
        micDetector.current.stop();
      }
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto text-center">
      {/* Header Info */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>Make a Cosmic Wish</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-white">
          {isBlown ? '✨ Wish Released to the Cosmos! ✨' : `Blow the Starlight Candle, ${card.recipientName}`}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
          {isBlown
            ? 'Your wish has traveled into the starlight expanse. May it shine true!'
            : 'Tap the flame or blow into your microphone to make your wish.'}
        </p>
      </div>

      {/* 3D Cosmic Cake Graphic */}
      <div className="relative my-4 flex flex-col items-center justify-center select-none">
        {/* Orbit Rings around Cake */}
        <div className="absolute -inset-10 border border-purple-500/20 rounded-full rotate-[60deg] pointer-events-none animate-spin-slow" />
        <div className="absolute -inset-6 border border-pink-500/20 rounded-full rotate-[-45deg] pointer-events-none animate-spin-slow" style={{ animationDirection: 'reverse' }} />

        {/* The Candle */}
        <div
          onClick={handleBlowOut}
          className="relative cursor-pointer z-30 flex flex-col items-center group mb-[-8px]"
        >
          {/* Flame */}
          {!isBlown ? (
            <div className="relative w-8 h-12 flex items-center justify-center animate-candle-flicker group-hover:scale-125 transition-transform duration-300">
              <div className="absolute inset-0 rounded-full bg-amber-400/80 blur-md animate-pulse" />
              <div className="relative w-6 h-10 rounded-full bg-gradient-to-t from-pink-500 via-amber-300 to-white shadow-[0_0_20px_#f59e0b]" />
              <div className="absolute bottom-1 w-2.5 h-4 rounded-full bg-cyan-200/90" />
            </div>
          ) : (
            <div className="h-12 flex flex-col items-center justify-end">
              <div className="w-1.5 h-8 bg-neutral-400/40 rounded-full blur-[1px]" />
              <div className="text-[10px] text-amber-200/60 font-mono italic">✨ Extinguished</div>
            </div>
          )}

          {/* Candle Stick */}
          <div className="w-3.5 h-14 bg-gradient-to-b from-amber-200 via-pink-400 to-purple-600 rounded-t-sm shadow-md border-t border-white/40" />
        </div>

        {/* Top Cake Tier (Pure Starlight Confectionery) */}
        <div className="relative z-20 w-44 sm:w-56 h-18 rounded-t-3xl bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 border-t-2 border-amber-300/40 shadow-lg flex items-center justify-around px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <span className="text-sm animate-pulse">⭐</span>
          <span className="text-xs text-amber-300 animate-spin-slow">✨</span>
          <span className="text-sm animate-pulse" style={{ animationDelay: '300ms' }}>🌟</span>
          <span className="text-xs text-amber-300 animate-spin-slow" style={{ animationDelay: '600ms' }}>✨</span>
          <span className="text-sm animate-pulse" style={{ animationDelay: '900ms' }}>⭐</span>
        </div>

        {/* Bottom Cake Tier (Nebula Frosting & Golden Swirls) */}
        <div className="relative z-10 w-60 sm:w-72 h-24 rounded-t-2xl bg-gradient-to-r from-neutral-950 via-purple-950 to-neutral-950 border-t-4 border-pink-400/40 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
          <div className="flex gap-3 text-sm text-pink-300/80 drop-shadow">
            <span>🪐</span>
            <span>✨</span>
            <span>🌌</span>
            <span>✨</span>
            <span>🪐</span>
          </div>
        </div>

        {/* Golden Base Plate */}
        <div className="w-72 sm:w-88 h-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-[0_15px_30px_rgba(0,0,0,0.8)] border border-amber-300/50" />
      </div>

      {/* Style Badge below cake */}
      <div className="mt-2 text-xs font-mono text-purple-300/80 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/20 shadow-inner">
        🌌 {card.cakeStyle.replace('-', ' ').toUpperCase()} • COSMIC EDITION
      </div>

      {/* Interactive Blowing Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {!isBlown ? (
          <>
            <button
              onClick={handleBlowOut}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-neutral-950 font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all active:scale-95"
            >
              <Wind className="w-4 h-4" />
              <span>Tap to Blow Flame</span>
            </button>

            <button
              onClick={toggleMic}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-full border text-xs font-semibold transition-all active:scale-95 ${
                isMicActive
                  ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                  : 'bg-white/10 hover:bg-white/15 border-white/20 text-neutral-200'
              }`}
              title="Use microphone to blow candle"
            >
              <Mic className="w-4 h-4" />
              <span>{isMicActive ? 'Blow into Mic now!' : 'Use Mic'}</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                sound.playFanfare();
                fireCelebrationConfetti();
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/40 text-pink-200 text-xs font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>More Fireworks!</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                sound.playChime(9);
                onNext();
              }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:via-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-500/30 transition-all active:scale-95"
            >
              <span>Explore Memory Orbit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
