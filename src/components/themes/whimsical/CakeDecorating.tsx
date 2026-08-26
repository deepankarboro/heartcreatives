import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface CakeDecoratingProps {
  card: CardData;
  onNext: () => void;
}

interface PlacedTopping {
  id: number;
  emoji: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  tier: 1 | 2;
}

export const CakeDecorating: React.FC<CakeDecoratingProps> = ({ card, onNext }) => {
  const [toppings, setToppings] = useState<PlacedTopping[]>([
    { id: 1, emoji: '🍓', x: 38, y: 48, tier: 1 },
    { id: 2, emoji: '🍓', x: 62, y: 48, tier: 1 },
    { id: 3, emoji: '✨', x: 50, y: 42, tier: 1 },
    { id: 4, emoji: '🧁', x: 28, y: 72, tier: 2 },
    { id: 5, emoji: '🌸', x: 72, y: 72, tier: 2 },
  ]);

  const availableToppings = [
    { emoji: '🍓', name: 'Strawberry' },
    { emoji: '🍒', name: 'Cherry' },
    { emoji: '🧁', name: 'Cream Swirl' },
    { emoji: '✨', name: 'Sprinkles' },
    { emoji: '🍫', name: 'Choco Crisp' },
    { emoji: '🌸', name: 'Edible Blossom' },
  ];

  const addTopping = (emoji: string) => {
    sound.playPop();
    const isTopTier = Math.random() > 0.45;
    const newTopping: PlacedTopping = {
      id: Date.now() + Math.random(),
      emoji,
      x: isTopTier ? Math.floor(Math.random() * 34) + 33 : Math.floor(Math.random() * 54) + 23,
      y: isTopTier ? Math.floor(Math.random() * 12) + 44 : Math.floor(Math.random() * 16) + 68,
      tier: isTopTier ? 1 : 2,
    };
    setToppings((prev) => [...prev, newTopping]);
  };

  const handleCakeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Pick random available topping on direct click
    const randomEmoji = availableToppings[Math.floor(Math.random() * availableToppings.length)].emoji;
    sound.playPop();

    const newTopping: PlacedTopping = {
      id: Date.now() + Math.random(),
      emoji: randomEmoji,
      x: Math.max(15, Math.min(85, x)),
      y: Math.max(35, Math.min(85, y)),
      tier: y < 60 ? 1 : 2,
    };
    setToppings((prev) => [...prev, newTopping]);
  };

  const handleReset = () => {
    sound.playPop();
    setToppings([]);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto text-center">
      {/* Stage Header */}
      <div className="space-y-1 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-300 text-rose-700 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Interactive Bakery</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">
          Decorate <span className="text-rose-600 italic">{card.recipientName}'s</span> Cake!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600">
          Tap the toppings below or click directly on the cake to add delicious treats!
        </p>
      </div>

      {/* Interactive Cake Canvas */}
      <div
        onClick={handleCakeClick}
        className="relative w-full aspect-[4/3] max-w-[360px] rounded-3xl bg-gradient-to-b from-rose-100/70 to-amber-50 border-2 border-rose-200/80 shadow-xl flex flex-col items-center justify-end pb-6 my-2 select-none cursor-pointer overflow-hidden group"
      >
        {/* Helper Hint */}
        <div className="absolute top-3 text-[11px] font-semibold text-rose-500/80 bg-white/70 px-3 py-0.5 rounded-full shadow-sm pointer-events-none">
          🍰 Tap cake or buttons to place toppings
        </div>

        {/* Top Cake Tier */}
        <div className="relative z-10 w-44 h-20 rounded-t-3xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-t-4 border-white shadow-md flex flex-col items-center justify-start pt-2">
          {/* Frosted drip overlay */}
          <div className="w-full flex justify-around px-2 pointer-events-none opacity-60">
            <span className="w-3 h-4 bg-white rounded-b-full shadow-xs" />
            <span className="w-3 h-5 bg-white rounded-b-full shadow-xs" />
            <span className="w-4 h-3 bg-white rounded-b-full shadow-xs" />
            <span className="w-3 h-5 bg-white rounded-b-full shadow-xs" />
            <span className="w-3 h-4 bg-white rounded-b-full shadow-xs" />
          </div>
        </div>

        {/* Bottom Cake Tier */}
        <div className="relative z-0 w-64 h-24 rounded-t-2xl bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border-t-4 border-rose-300 shadow-lg flex flex-col items-center justify-end pb-3">
          <div className="w-full flex justify-around px-4 pointer-events-none opacity-50 mb-auto pt-1">
            <span className="w-4 h-4 bg-rose-200 rounded-b-full" />
            <span className="w-4 h-6 bg-rose-200 rounded-b-full" />
            <span className="w-5 h-3 bg-rose-200 rounded-b-full" />
            <span className="w-4 h-5 bg-rose-200 rounded-b-full" />
          </div>
          <span className="font-handwritten text-base sm:text-lg text-rose-800/80 font-bold pointer-events-none z-10">
            Freshly Baked with Love 💕
          </span>
        </div>

        {/* Cake Stand Base */}
        <div className="relative z-10 w-72 h-4 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 rounded-full shadow-md border border-amber-300/40" />

        {/* Placed Toppings - Rendered on top of all tiers with z-30 and drop-shadow */}
        {toppings.map((item) => (
          <span
            key={item.id}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            className="absolute text-2xl sm:text-3xl transform -translate-x-1/2 -translate-y-1/2 z-30 animate-bounce drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] pointer-events-none select-none transition-all duration-300"
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Topping Palette */}
      <div className="w-full max-w-sm my-3">
        <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-2">
          Select Toppings ({toppings.length} added)
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {availableToppings.map((top, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                addTopping(top.emoji);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 hover:border-rose-400 text-neutral-800 text-xs font-semibold shadow-sm hover:scale-105 transition-transform active:scale-95"
            >
              <span className="text-base">{top.emoji}</span>
              <span className="text-[11px]">{top.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors"
          title="Clear toppings"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            sound.playPop();
            sound.playChime(4);
            onNext();
          }}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all active:scale-95"
        >
          <span>Light the Candles</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
