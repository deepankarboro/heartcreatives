import React, { useState } from 'react';
import { ArrowRight, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import type { CardData, CardPhoto } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface ClotheslineGalleryProps {
  card: CardData;
  onNext: () => void;
}

export const ClotheslineGallery: React.FC<ClotheslineGalleryProps> = ({ card, onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CardPhoto | null>(null);

  const handleOpenPhoto = (photo: CardPhoto) => {
    sound.playPop();
    sound.playChime(3);
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-300 text-rose-700 text-xs font-bold uppercase">
          <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
          <span>Memory Gallery</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">
          The Sweet Memory Clothesline
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600">
          Hanging snapshots of our favorite moments together. Tap any memory to take a closer look.
        </p>
      </div>

      <div className="relative w-full max-w-2xl my-4">
        <div className="w-full h-0.5 bg-neutral-400/80 shadow-sm mb-[-12px] relative z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10 pt-3">
          {card.photos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => handleOpenPhoto(photo)}
              style={{
                transform: `rotate(${photo.rotation || (idx % 2 === 0 ? -4 : 4)}deg)`,
              }}
              className="group relative cursor-pointer bg-white p-3 pb-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform-gpu"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-7 bg-amber-700 rounded-sm shadow-md z-20 border border-amber-900 flex flex-col items-center justify-center">
                <div className="w-2.5 h-0.5 bg-neutral-300" />
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100">
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-7 h-7 text-white drop-shadow" />
                </div>
              </div>

              <p className="font-handwritten text-lg sm:text-xl text-neutral-800 mt-2 text-left truncate px-1 font-bold">
                {photo.caption || `Sweet Memory #${idx + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
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
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-handwritten text-2xl text-rose-700 mt-4 text-center font-bold">
              {selectedPhoto.caption || 'Cherished always 💕'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => {
            sound.playPop();
            sound.playChime(8);
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-500/25 transition-all active:scale-95"
        >
          <span>Read Storybook Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
