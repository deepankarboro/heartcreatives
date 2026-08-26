import React, { useState } from 'react';
import { ArrowRight, Flame, RotateCcw } from 'lucide-react';
import type { CardData } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';
import { fireStarlightSparkles } from '../../../utils/confetti';

interface WishLanternReleaseProps {
  card: CardData;
  onNext: () => void;
}

interface Lantern {
  id: number;
  text: string;
  isReleased: boolean;
  leftPercent: number;
  note: number;
}

export const WishLanternRelease: React.FC<WishLanternReleaseProps> = ({ card, onNext }) => {
  const initialLanterns: Lantern[] = [
    { id: 1, text: 'Joy & Laughter', isReleased: false, leftPercent: 20, note: 0 },
    { id: 2, text: 'Endless Adventures', isReleased: false, leftPercent: 40, note: 4 },
    { id: 3, text: 'Peace & Serenity', isReleased: false, leftPercent: 60, note: 7 },
    { id: 4, text: 'Boundless Love', isReleased: false, leftPercent: 80, note: 11 },
  ];

  const [lanterns, setLanterns] = useState<Lantern[]>(initialLanterns);

  const releaseLantern = (id: number) => {
    setLanterns((prev) =>
      prev.map((l) => {
        if (l.id === id && !l.isReleased) {
          sound.playChime(l.note);
          return { ...l, isReleased: true };
        }
        return l;
      })
    );

    const remaining = lanterns.filter((l) => l.id !== id && !l.isReleased);
    if (remaining.length === 0) {
      sound.playFanfare();
      fireStarlightSparkles();
    }
  };

  const allReleased = lanterns.every((l) => l.isReleased);

  const handleReset = () => {
    setLanterns(initialLanterns);
    sound.playPop();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center overflow-hidden">
      <div className="space-y-1 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Wish Lantern Ceremony</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white">
          Release Wishes for <span className="text-amber-300 italic">{card.recipientName}</span>
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80">
          Tap each floating paper lantern to ignite and release it into the twilight heavens.
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-[420px] rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/80 border border-emerald-500/30 shadow-2xl p-4 my-2 overflow-hidden select-none">
        {lanterns.map((l) => (
          <div
            key={l.id}
            onClick={() => releaseLantern(l.id)}
            style={{
              left: `${l.leftPercent}%`,
              bottom: l.isReleased ? '110%' : '15%',
              transition: l.isReleased ? 'bottom 4s cubic-bezier(0.25, 1, 0.5, 1), opacity 4s ease' : 'all 0.3s ease',
              opacity: l.isReleased ? 0.3 : 1,
            }}
            className="absolute -translate-x-1/2 cursor-pointer group flex flex-col items-center z-20"
          >
            <div
              className={`w-14 sm:w-16 h-20 sm:h-22 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-2xl transition-all duration-300 ${
                l.isReleased
                  ? 'bg-gradient-to-t from-amber-400 via-yellow-200 to-orange-500 border-amber-300 shadow-[0_0_35px_#f59e0b]'
                  : 'bg-gradient-to-t from-orange-600/80 to-amber-200/90 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-110'
              }`}
            >
              <div className="w-8 h-1 bg-amber-900 rounded-full" />
              <div className="w-5 h-7 rounded-full bg-amber-200/90 blur-[1px] animate-pulse flex items-center justify-center">
                <div className="w-2.5 h-3.5 rounded-full bg-white" />
              </div>
              <div className="w-8 h-1 bg-amber-900 rounded-full" />
            </div>

            <span
              className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm transition-colors ${
                l.isReleased
                  ? 'bg-amber-400/20 text-amber-200'
                  : 'bg-black/60 text-white group-hover:bg-amber-500 group-hover:text-black'
              }`}
            >
              {l.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors"
          title="Reset lanterns"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            sound.playPop();
            sound.playChime(7);
            onNext();
          }}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all active:scale-95 ${
            allReleased
              ? 'bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-500 text-neutral-950 shadow-xl shadow-amber-400/25'
              : 'bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40'
          }`}
        >
          <span>{allReleased ? 'Gather at Blossom Cake' : 'Skip Ceremony'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
