import React, { useState } from 'react';
import { ArrowRight, X, ZoomIn, Cpu } from 'lucide-react';
import type { CardData, CardPhoto } from '../../../types/card';
import { sound } from '../../../audio/soundEngine';

interface HologramDeckProps {
  card: CardData;
  onNext: () => void;
}

export const HologramDeck: React.FC<HologramDeckProps> = ({ card, onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<CardPhoto | null>(null);

  const handleOpenPhoto = (photo: CardPhoto) => {
    sound.playArcadeBeep(523);
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 border border-cyan-400 text-cyan-300 text-xs font-cyber uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-pink-500" />
          <span>Holographic Memory Bank</span>
        </div>
        <h2 className="font-cyber text-2xl sm:text-4xl text-white tracking-wide">
          Memory Files // Decrypted
        </h2>
        <p className="text-xs sm:text-sm font-mono text-cyan-200/80">
          Target user memory logs extracted with 100% fidelity. Select memory file to view.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl my-4">
        {card.photos.map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => handleOpenPhoto(photo)}
            className="group relative cursor-pointer rounded-2xl bg-neutral-900 border-2 border-cyan-500/50 p-3 pb-5 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_35px_rgba(255,0,127,0.5)] hover:border-pink-500 hover:scale-105 transition-all duration-300 transform-gpu"
          >
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-yellow-400" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-yellow-400" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-400" />

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black border border-white/10">
              <img
                src={photo.url}
                alt={photo.caption || `Log ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-cyan-300 drop-shadow" />
              </div>
            </div>

            <p className="font-mono text-xs text-cyan-300 mt-3 truncate px-1 text-left">
              &gt; {photo.caption || `LOG_FILE_0${idx + 1}.DAT`}
            </p>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-md w-full bg-neutral-900 border-2 border-pink-500 p-5 rounded-3xl shadow-[0_0_50px_rgba(255,0,127,0.5)] text-white">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-cyan-300 transition-colors border border-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black mt-2 border border-cyan-400">
              <img
                src={selectedPhoto.url}
                alt="Selected log"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-mono text-sm text-yellow-300 mt-4 text-center">
              &gt; {selectedPhoto.caption || 'DECRYPTED WITH SUCCESS'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => {
            sound.playArcadeBeep(659);
            onNext();
          }}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-cyan-500 text-white font-cyber font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all active:scale-95"
        >
          <span>Decrypt Terminal Letter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
