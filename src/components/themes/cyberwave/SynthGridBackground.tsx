import React from 'react';
import { Gamepad2, ArrowRight, Zap } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface SynthGridBackgroundProps {
  card: CardData;
  onStart: () => void;
}

export const SynthGridBackground: React.FC<SynthGridBackgroundProps> = ({ card, onStart }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center overflow-hidden">
      <div className="absolute top-10 w-48 h-48 rounded-full bg-gradient-to-b from-yellow-300 via-pink-500 to-purple-800 blur-[2px] opacity-80 pointer-events-none -z-10 shadow-[0_0_80px_rgba(255,0,127,0.6)]">
        <div className="w-full h-full flex flex-col justify-evenly">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-1 bg-black/60" />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cyan-950/80 to-transparent pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to top, rgba(255, 0, 127, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(300px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-cyan-400 text-cyan-300 text-xs font-cyber tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <Gamepad2 className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>LVL UP DETECTED • {card.dateText}</span>
        </div>

        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wider leading-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
          PLAYER 1: <br />
          <span className="bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-300 bg-clip-text text-transparent">
            {card.recipientName}
          </span>
        </h1>

        <p className="text-xs sm:text-sm font-mono text-cyan-200/80 max-w-md mx-auto">
          &gt; SYSTEM MESSAGE: {card.senderName} has initialized an overclocked celebratory mainframe!
        </p>

        <div
          onClick={() => {
            sound.playArcadeBeep(587);
            onStart();
          }}
          className="relative inline-block cursor-pointer group my-4"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-neutral-900 border-2 border-pink-500 shadow-[0_0_30px_rgba(255,0,127,0.6)] flex flex-col items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
            <span className="text-4xl sm:text-5xl animate-bounce">🤖</span>
            <span className="font-arcade text-[8px] text-yellow-300 mt-2">
              READY?
            </span>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              sound.playArcadeBeep(659);
              onStart();
            }}
            className="group flex items-center gap-3 mx-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-cyber font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all active:scale-95"
          >
            <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span>Insert Coin & Start</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {card.bondTraits.map((trait, idx) => (
            <span
              key={idx}
              className="font-arcade text-[9px] px-3 py-1 rounded bg-black/60 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            >
              [+] {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
