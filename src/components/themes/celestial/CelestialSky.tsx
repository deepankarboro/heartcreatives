import React, { useEffect, useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface CelestialSkyProps {
  card: CardData;
  onBegin: () => void;
}

export const CelestialSky: React.FC<CelestialSkyProps> = ({ card, onBegin }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const starCount = 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? '#e0e7ff' : '#fbbf24',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.alpha += s.speed;
        const currentAlpha = Math.abs(Math.sin(s.alpha));
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-60 h-60 rounded-full bg-pink-500/15 blur-[90px] pointer-events-none translate-x-20 -translate-y-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-semibold tracking-wider uppercase shadow-inner">
          <Star className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>A Starlight Delivery • {card.dateText}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-tight drop-shadow-lg">
          For the One and Only <br />
          <span className="bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 bg-clip-text text-transparent italic font-normal">
            {card.recipientName}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-purple-200/80 font-sans max-w-md mx-auto leading-relaxed">
          {card.senderName} has crafted a celestial journey among the stars just for you.
        </p>

        <div className="relative my-6 group cursor-pointer inline-block" onClick={onBegin}>
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-300 p-1 shadow-[0_0_50px_rgba(232,67,147,0.5)] transition-transform duration-500 group-hover:scale-110">
            <div className="w-full h-full rounded-full bg-neutral-950/90 flex flex-col items-center justify-center p-2 backdrop-blur-sm">
              <span className="text-4xl sm:text-5xl animate-bounce">
                {card.mascot === 'bunny' ? '🐰' : card.mascot === 'cat' ? '🐱' : card.mascot === 'astronaut' ? '👨‍🚀' : '✨'}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200/90 mt-1">
                Touch to Enter
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              sound.playPop();
              sound.playChime(4);
              onBegin();
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg shadow-[0_10px_35px_rgba(217,70,239,0.35)] transition-all duration-300 active:scale-95"
          >
            <span>Begin the Starlight Voyage</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {card.bondTraits.map((trait, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-sm"
            >
              ✨ {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
