import React, { useState } from 'react';
import { ArrowRight, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import type { CardData, CardPhoto } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface FloralWreathGalleryProps {
  card: CardData;
  onNext: () => void;
}

export const FloralWreathGallery: React.FC<FloralWreathGalleryProps> = ({ card, onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CardPhoto | null>(null);

  const handleOpenPhoto = (photo: CardPhoto) => {
    sound.playPop();
    sound.playChime(3);
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase">
          <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>Botanical Keepsake Gallery</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white">
          Moments in Blossom
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md mx-auto">
          Every chapter captured like pressed petals in an old book. Tap any photo to expand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl my-4">
        {card.photos.map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => handleOpenPhoto(photo)}
            style={{
              transform: `rotate(${photo.rotation || (idx % 2 === 0 ? -2 : 2)}deg)`,
            }}
            className="group relative cursor-pointer bg-white p-3 pb-5 rounded-2xl shadow-xl hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:scale-105 transition-all duration-300 transform-gpu"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">
              🌿
            </div>

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900">
              <img
                src={photo.url}
                alt={photo.caption || `Memory ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white drop-shadow" />
              </div>
            </div>

            <p className="font-editorial text-sm sm:text-base text-neutral-800 mt-3 truncate px-1 text-left italic">
              "{photo.caption || `Garden Chapter #${idx + 1}`}"
            </p>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full bg-white p-4 pb-6 rounded-3xl shadow-2xl text-neutral-900">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-950 mt-2">
              <img
                src={selectedPhoto.url}
                alt="Selected Memory"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-editorial text-lg text-emerald-900 mt-4 text-center italic">
              "{selectedPhoto.caption || 'A timeless memory with you'}"
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => {
            sound.playPop();
            sound.playChime(11);
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all active:scale-95"
        >
          <span>Unfurl Calligraphy Scroll</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
