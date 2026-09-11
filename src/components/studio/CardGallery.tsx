import React from 'react';
import { Sparkles, Plus, Play, Share2, Trash2, Heart, Star, Flower2, Zap } from 'lucide-react';
import type { CardData } from '../../types/card';
import { SAMPLE_CARDS } from '../../data/sampleCards';
import { sound } from '../../audio/soundEngine';

interface CardGalleryProps {
  savedCards: CardData[];
  onOpenCard: (card: CardData) => void;
  onCreateNew: () => void;
  onDeleteSavedCard: (id: string) => void;
  onShareCard: (card: CardData) => void;
  onOpenCupid: () => void;
}

export const CardGallery: React.FC<CardGalleryProps> = ({
  savedCards,
  onOpenCard,
  onCreateNew,
  onDeleteSavedCard,
  onShareCard,
  onOpenCupid,
}) => {
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'celestial': return <Star className="w-4 h-4 text-amber-300" />;
      case 'whimsical': return <Heart className="w-4 h-4 text-rose-400" />;
      case 'cyberwave': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'botanical': return <Flower2 className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-pink-400" />;
    }
  };

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'celestial': return 'from-purple-900/60 via-indigo-950/60 to-black/80 border-purple-500/30';
      case 'whimsical': return 'from-rose-950/40 via-pink-950/30 to-black/80 border-rose-500/30';
      case 'cyberwave': return 'from-cyan-950/60 via-purple-950/60 to-black/80 border-cyan-400/40';
      case 'botanical': return 'from-emerald-950/60 via-teal-950/50 to-black/80 border-emerald-500/30';
      default: return 'from-neutral-900 to-black border-white/10';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white px-4 py-12 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Next-Generation Digital Keepsakes</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          HeartCreatives <br />
          <span className="bg-gradient-to-r from-pink-400 via-amber-200 to-cyan-300 bg-clip-text text-transparent italic">
            Celebration Experiences
          </span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-xl mx-auto">
          Craft breathtaking interactive celebration pages with audio soundscapes, particle physics, 3D memory orbits, cake blowing ceremonies, and scratch-off secrets.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onCreateNew();
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:via-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-pink-500/25 transition-all active:scale-95 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create New Celebration</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenCupid();
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 group border border-pink-400/30"
          >
            <span className="text-lg group-hover:scale-125 transition-transform">🏹</span>
            <span>Cupid&apos;s Strike Scene</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <h2 className="font-display text-2xl text-white">Curated Themes & Experiences</h2>
            <p className="text-xs text-neutral-400">Explore interactive celebration concepts ready to experience or remix.</p>
          </div>
          <span className="text-xs font-mono text-pink-400 font-semibold">{SAMPLE_CARDS.length} Themes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-3xl p-6 bg-gradient-to-br ${getThemeGradient(
                card.theme
              )} border shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-xs font-semibold">
                    {getThemeIcon(card.theme)}
                    <span className="capitalize">{card.theme} Theme</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{card.dateText}</span>
                </div>

                <h3 className="font-display text-2xl text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {card.recipientName}'s {card.occasion === 'birthday' ? 'Birthday' : 'Celebration'}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                  {card.letter}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.bondTraits.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-200">
                      {t}
                    </span>
                  ))}
                  {card.bondTraits.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                      +{card.bondTraits.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    sound.playPop();
                    onOpenCard(card);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-neutral-950 font-bold text-xs hover:bg-neutral-200 transition-colors active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Experience</span>
                </button>

                <button
                  onClick={() => {
                    sound.playPop();
                    onShareCard(card);
                  }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                  title="Share Card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {savedCards.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="font-display text-2xl text-white">Your Custom Creations</h2>
              <p className="text-xs text-neutral-400">Celebrations you have customized and saved.</p>
            </div>
            <span className="text-xs font-mono text-pink-400 font-semibold">{savedCards.length} Saved</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-2xl p-5 bg-neutral-900/90 border border-white/15 hover:border-pink-500/50 shadow-xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold capitalize">
                      {card.theme}
                    </span>
                    <span className="text-[11px] text-neutral-400">{card.dateText}</span>
                  </div>

                  <h4 className="font-display text-xl text-white truncate mb-1">
                    For {card.recipientName}
                  </h4>
                  <p className="text-xs text-neutral-400 mb-3 truncate">By {card.senderName}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      sound.playPop();
                      onOpenCard(card);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => onShareCard(card)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteSavedCard(card.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
