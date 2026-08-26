import React, { useState } from 'react';
import { ArrowRight, Image as ImageIcon, ZoomIn, X } from 'lucide-react';
import type { CardData, CardPhoto } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface OrbitGalleryProps {
  card: CardData;
  onNext: () => void;
}

export const OrbitGallery: React.FC<OrbitGalleryProps> = ({ card, onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CardPhoto | null>(null);

  const handleOpenPhoto = (photo: CardPhoto) => {
    sound.playPop();
    sound.playChime(5);
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    sound.playPop();
    setSelectedPhoto(null);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-semibold">
          <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>Planetary Memory Orbit</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white">
          Snapshots in the Stars
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
          Every picture is a constellation of cherished moments. Tap any photo to view in full resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl my-4">
        {card.photos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => handleOpenPhoto(photo)}
            style={{
              transform: `rotate(${photo.rotation || (index % 2 === 0 ? -3 : 3)}deg)`,
            }}
            className="group relative cursor-pointer bg-white p-3 pb-5 rounded-2xl shadow-2xl hover:shadow-[0_0_35px_rgba(217,70,239,0.45)] hover:scale-105 hover:z-20 transition-all duration-300 transform-gpu"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-200/80 backdrop-blur-sm rounded-sm shadow-sm -rotate-2" />

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900">
              <img
                src={photo.url}
                alt={photo.caption || `Memory ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>

            <p className="font-handwritten text-neutral-800 text-lg sm:text-xl mt-3 truncate px-1 text-left">
              {photo.caption || `Celestial Memory #${index + 1}`}
            </p>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
          <div className="relative max-w-md w-full bg-white p-4 pb-6 rounded-3xl shadow-2xl animate-scaleUp text-neutral-900">
            <button
              onClick={handleClosePhoto}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/10 hover:bg-neutral-900/20 text-neutral-700 transition-colors"
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

            <div className="mt-4 text-center">
              <p className="font-handwritten text-2xl text-pink-700 leading-snug">
                {selectedPhoto.caption || 'A timeless moment with you ✨'}
              </p>
            </div>
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
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-500/30 transition-all active:scale-95"
        >
          <span>Open Starlight Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
