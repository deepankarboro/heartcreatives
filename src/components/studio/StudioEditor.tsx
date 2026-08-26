import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Play, Save, X, Upload } from 'lucide-react';
import type { CardData, ThemeId, Occasion, CakeStyle, Mascot, MusicMood, CardPhoto } from '../../types/card';
import { sound } from '../../audio/soundEngine';

interface StudioEditorProps {
  initialCard?: CardData | null;
  onSave: (card: CardData) => void;
  onLaunch: (card: CardData) => void;
  onBack: () => void;
}

export const StudioEditor: React.FC<StudioEditorProps> = ({
  initialCard,
  onSave,
  onLaunch,
  onBack,
}) => {
  const [recipientName, setRecipientName] = useState(initialCard?.recipientName || 'Maya');
  const [senderName, setSenderName] = useState(initialCard?.senderName || 'Your Best Friend');
  const [occasion, setOccasion] = useState<Occasion>(initialCard?.occasion || 'birthday');
  const [dateText, setDateText] = useState(initialCard?.dateText || 'Today');
  const [theme, setTheme] = useState<ThemeId>(initialCard?.theme || 'celestial');
  const [vibe, setVibe] = useState(initialCard?.vibe || 'Sweet & Magical');
  const [cakeStyle, setCakeStyle] = useState<CakeStyle>(initialCard?.cakeStyle || 'galaxy-starlight');
  const [mascot, setMascot] = useState<Mascot>(initialCard?.mascot || 'bunny');
  const [musicMood, setMusicMood] = useState<MusicMood>(initialCard?.musicMood || 'dreamy-celestial');
  const [traitInput, setTraitInput] = useState('');
  const [bondTraits, setBondTraits] = useState<string[]>(
    initialCard?.bondTraits || ['Sweet Soul', 'Super Loyal', 'Pure Sunshine', 'My Rock']
  );
  const [letter, setLetter] = useState(
    initialCard?.letter ||
      `Dear Maya,\n\nHappy Birthday to someone who brings so much warmth, laughter, and joy into the world! ✨\n\nI am beyond grateful for every conversation, shared smile, and memory we've made together. May this upcoming year be packed with incredible breakthroughs, deep happiness, and every dream you're reaching for.\n\nKeep shining bright! 💖`
  );
  const [secretMessage, setSecretMessage] = useState(
    initialCard?.secretMessage || '🎁 Voucher: 1x Day of Unlimited Fun & Treats on me! Redeem anytime! ✨'
  );
  const [photos, setPhotos] = useState<CardPhoto[]>(
    initialCard?.photos || [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        caption: 'Unforgettable smiles ✨',
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        caption: 'Golden memories together 🌅',
      },
    ]
  );
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');

  const handleAddTrait = (e: React.FormEvent) => {
    e.preventDefault();
    if (!traitInput.trim()) return;
    sound.playPop();
    setBondTraits([...bondTraits, traitInput.trim()]);
    setTraitInput('');
  };

  const handleRemoveTrait = (idx: number) => {
    sound.playPop();
    setBondTraits(bondTraits.filter((_, i) => i !== idx));
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    sound.playPop();
    const newP: CardPhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'Precious moment',
    };
    setPhotos([...photos, newP]);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      sound.playPop();
      const base64 = reader.result as string;
      const newP: CardPhoto = {
        id: `upload-${Date.now()}`,
        url: base64,
        caption: file.name.replace(/\.[^/.]+$/, ''),
      };
      setPhotos([...photos, newP]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (id: string) => {
    sound.playPop();
    setPhotos(photos.filter((p) => p.id !== id));
  };

  const constructCardData = (): CardData => ({
    id: initialCard?.id || `card-${Date.now()}`,
    recipientName: recipientName.trim() || 'Friend',
    senderName: senderName.trim() || 'A Special Friend',
    occasion,
    dateText: dateText.trim() || 'Today',
    theme,
    vibe,
    cakeStyle,
    mascot,
    bondTraits: bondTraits.length > 0 ? bondTraits : ['Sweet Soul', 'Loyal Friend'],
    letter,
    secretMessage,
    photos,
    musicMood,
  });

  const handleSaveAndLaunch = () => {
    const card = constructCardData();
    sound.playPop();
    onSave(card);
    onLaunch(card);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white px-4 py-8 max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={() => {
            sound.playPop();
            onBack();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gallery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const card = constructCardData();
              sound.playPop();
              onSave(card);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          <button
            onClick={handleSaveAndLaunch}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 text-white text-xs font-bold shadow-lg shadow-pink-500/30 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Experience</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-display text-3xl sm:text-4xl text-white">
          Celebration Creator Studio
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Personalize every detail from theme mechanics to starlight candle flame.
        </p>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Mia, Alexander, Sarah"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Sender / From
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Your Bestie, The Squad, Alex"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-sm outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Occasion & Date Text
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as Occasion)}
                className="px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
              >
                <option value="birthday">Birthday 🎂</option>
                <option value="anniversary">Anniversary 💖</option>
                <option value="love">Love Letter 💌</option>
                <option value="friendship">Friendship 🌟</option>
                <option value="milestone">Milestone 🏆</option>
                <option value="thankyou">Thank You 🌸</option>
              </select>

              <input
                type="text"
                value={dateText}
                onChange={(e) => setDateText(e.target.value)}
                placeholder="e.g. August 24"
                className="px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Interactive Theme Concept
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'celestial', label: '✨ Celestial Starlight', mood: 'dreamy-celestial' },
                  { id: 'whimsical', label: '🍰 Whimsical Bakery', mood: 'upbeat-lofi' },
                  { id: 'cyberwave', label: '🕹️ Cyber Arcade', mood: 'synthwave-arcade' },
                  { id: 'botanical', label: '🌸 Botanical Garden', mood: 'zen-garden' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setTheme(t.id);
                    setMusicMood(t.mood);
                  }}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    theme === t.id
                      ? 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-md'
                      : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
                Mascot
              </label>
              <select
                value={mascot}
                onChange={(e) => setMascot(e.target.value as Mascot)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
              >
                <option value="bunny">🐰 Bunny</option>
                <option value="cat">🐱 Cat</option>
                <option value="bear">🧸 Bear</option>
                <option value="astronaut">👨‍🚀 Astronaut</option>
                <option value="cyber-bot">🤖 Cyber-Bot</option>
                <option value="fairy">🧚 Fairy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
                Music Mood
              </label>
              <select
                value={musicMood}
                onChange={(e) => setMusicMood(e.target.value as MusicMood)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
              >
                <option value="dreamy-celestial">Dreamy Celestial</option>
                <option value="upbeat-lofi">Upbeat Lofi</option>
                <option value="synthwave-arcade">Synthwave Arcade</option>
                <option value="zen-garden">Zen Harp</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Vibe / Tone
            </label>
            <input
              type="text"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="e.g. Sweet & Warm, Epic & Fun"
              className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-pink-300 mb-1.5">
              Cake Confectionery Style
            </label>
            <select
              value={cakeStyle}
              onChange={(e) => setCakeStyle(e.target.value as CakeStyle)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
            >
              <option value="galaxy-starlight">Galaxy Starlight 🌌</option>
              <option value="strawberry-chiffon">Strawberry Chiffon 🍓</option>
              <option value="cyber-pixel">Cyber Pixel ⚡</option>
              <option value="matcha-floral">Matcha Floral 🍵</option>
              <option value="chocolate-truffle">Chocolate Truffle 🍫</option>
              <option value="rainbow-magic">Rainbow Magic 🌈</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs font-semibold uppercase text-pink-300">
            Signature Traits / Bond Badges
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            {bondTraits.map((trait, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-200 text-xs font-medium"
              >
                <span>{trait}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTrait(idx)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddTrait} className="flex gap-2 pt-1">
            <input
              type="text"
              value={traitInput}
              onChange={(e) => setTraitInput(e.target.value)}
              placeholder="Add custom trait (e.g. Pure Magic, Loyal Soul)..."
              className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Add Trait
            </button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs font-semibold uppercase text-pink-300">
            Personalized Letter
          </label>
          <textarea
            rows={5}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm outline-none focus:border-pink-500 font-sans leading-relaxed"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs font-semibold uppercase text-pink-300">
            Secret Scratch-Off Keepsake Message
          </label>
          <input
            type="text"
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            placeholder="Hidden message revealed when recipient scratches the card..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-amber-300 text-sm outline-none focus:border-pink-500"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase text-pink-300">
              Attached Memories ({photos.length} photos)
            </label>
            <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 font-semibold">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from device</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-black border border-white/10">
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(p.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/70 text-[10px] text-white truncate text-center">
                  {p.caption || 'Memory'}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="Or paste an image URL (https://...)"
              className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
            />
            <input
              type="text"
              value={newPhotoCaption}
              onChange={(e) => setNewPhotoCaption(e.target.value)}
              placeholder="Caption..."
              className="w-1/3 px-4 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs outline-none focus:border-pink-500"
            />
            <button
              type="button"
              onClick={handleAddPhoto}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={handleSaveAndLaunch}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 text-white font-bold text-base shadow-2xl shadow-pink-500/40 transition-all active:scale-95"
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <span>Launch & Experience Celebration</span>
        </button>
      </div>
    </div>
  );
};
