import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';
import type { CardData } from '../../types/card';
import { encodeCardToHash } from '../../utils/cardEncoder';
import { sound } from '../../audio/soundEngine';

interface ShareModalProps {
  card: CardData;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ card, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedHash = encodeCardToHash(card);
  const shareUrl = `${window.location.origin}${window.location.pathname}#${encodedHash}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      sound.playPop();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  const shareText = `✨ Open this interactive celebration created with HeartCreatives for ${card.recipientName}! 🎂🎁`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Celebration for ${card.recipientName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-neutral-900 border border-white/15 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg mb-3">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-white">
            Share Celebration
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Send this link to <span className="text-pink-300 font-semibold">{card.recipientName}</span>. Anyone with this link can experience the celebration!
          </p>
        </div>

        {/* Link Copy Box */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/60 border border-white/15 mb-6">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-neutral-300 outline-none truncate font-mono"
          />
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-md'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPop()}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPop()}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-xs font-semibold transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </a>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>More...</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
