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
  x: number;
  y: number;
  tier: 1 | 2;
}

export const CakeDecorating: React.FC<CakeDecoratingProps> = ({ card, onNext }) => {
  const [toppings, setToppings] = useState<PlacedTopping[]>([
    { id: 1, emoji: '🍓', x: 25, y: 35, tier: 1 },
    { id: 2, emoji: '🍓', x: 75, y: 35, tier: 1 },
    { id: 3, emoji: '✨', x: 50, y: 25, tier: 1 },
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
    const newTopping: PlacedTopping = {
      id: Date.now() + Math.random(),
      emoji,
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 50) + 25,
      tier: Math.random() > 0.4 ? 1 : 2,
    };
    setToppings((prev) => [...prev, newTopping]);
  };

  const handleReset = () => {
    sound.playPop();
    setToppings([]);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto text-center">
      <div className="space-y-1 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-300 text-rose-700 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Interactive Bakery</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">
          Decorate <span className="text-rose-600 italic">{card.recipientName}'s</span> Cake!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600">
          Tap the sweet toppings below to customize this birthday delicacy.
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-[360px] rounded-3xl bg-gradient-to-b from-rose-100/70 to-amber-50 border-2 border-rose-200/80 shadow-xl flex flex-col items-center justify-end pb-8 my-2 select-none overflow-hidden">
        {toppings.map((item) => (
          <span
            key={item.id}
            style={{
              left: `${item.x}%`,
              top: `${item.tier === 1 ? item.y : item.y + 35}%`,
            }}
            className="absolute text-2xl sm:text-3xl transform -translate-x-1/2 -translate-y-1/2 animate-bounce drop-shadow pointer-events-none"
          >
            {item.emoji}
          </span>
        ))}

        <div className="relative z-10 w-40 h-16 rounded-t-3xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-t-4 border-white shadow-md flex items-center justify-center">
          <div className="w-full h-3 bg-white/80 rounded-full mx-2" />
        </div>

        <div className="relative z-0 w-60 h-24 rounded-t-2xl bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border-t-4 border-rose-300 shadow-lg flex flex-col items-center justify-center">
          <span className="font-handwritten text-xl text-rose-800 font-bold">
            Freshly Baked with Love 💕
          </span>
        </div>

        <div className="w-68 h-4 bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 rounded-full shadow-md" />
      </div>

      <div className="w-full max-w-sm my-3">
        <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-2">
          Select Toppings ({toppings.length} added)
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {availableToppings.map((top, idx) => (
            <button
              key={idx}
              onClick={() => addTopping(top.emoji)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200 hover:border-rose-400 text-neutral-800 text-xs font-semibold shadow-sm hover:scale-105 transition-transform active:scale-95"
            >
              <span>{top.emoji}</span>
              <span className="text-[11px]">{top.name}</span>
            </button>
          ))}
        </div>
      </div>

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
