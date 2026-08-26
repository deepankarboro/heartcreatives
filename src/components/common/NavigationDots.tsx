import React from 'react';
import { ChevronLeft, ChevronRight, Home, Sparkles } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface NavigationDotsProps {
  currentStage: number;
  totalStages: number;
  stageNames: string[];
  onSelectStage: (stage: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  themeColor?: string;
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  currentStage,
  totalStages,
  stageNames,
  onSelectStage,
  onNext,
  onPrev,
  onExit,
  themeColor = 'bg-pink-500'
}) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 max-w-4xl mx-auto pointer-events-none">
      {/* Home / Exit button */}
      <button
        onClick={() => {
          sound.playPop();
          onExit();
        }}
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white shadow-lg transition-all duration-200 active:scale-95 text-xs font-medium"
        title="Exit to Gallery / Studio"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Studio</span>
      </button>

      {/* Center navigation dots */}
      <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-xl">
        {Array.from({ length: totalStages }).map((_, idx) => {
          const isActive = currentStage === idx;
          const isCompleted = idx < currentStage;

          return (
            <button
              key={idx}
              onClick={() => {
                sound.playPop();
                onSelectStage(idx);
              }}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Go to stage ${idx + 1}: ${stageNames[idx] || ''}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? `w-7 h-2.5 ${themeColor} shadow-md shadow-pink-500/50`
                    : isCompleted
                    ? 'w-2.5 h-2.5 bg-white/70 hover:bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
              />

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-neutral-900/90 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap border border-white/10 shadow">
                {stageNames[idx] || `Step ${idx + 1}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Prev / Next controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {currentStage > 0 && (
          <button
            onClick={() => {
              sound.playPop();
              onPrev();
            }}
            aria-label="Previous step"
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-white shadow-lg transition-all duration-200 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {currentStage < totalStages - 1 ? (
          <button
            onClick={() => {
              sound.playPop();
              onNext();
            }}
            aria-label="Next step"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold text-xs shadow-lg shadow-pink-500/30 transition-all duration-200 active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete</span>
          </div>
        )}
      </div>
    </div>
  );
};
