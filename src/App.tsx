import React, { useState, useEffect } from 'react';
import type { CardData, ViewMode } from './types/card';
import { SAMPLE_CARDS } from './data/sampleCards';
import { decodeCardFromHash, getSavedCards, saveCardToLocal, deleteSavedCard } from './utils/cardEncoder';
import { CardGallery } from './components/studio/CardGallery';
import { StudioEditor } from './components/studio/StudioEditor';
import { CardExperienceViewer } from './components/viewer/CardExperienceViewer';
import { ShareModal } from './components/common/ShareModal';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [activeCard, setActiveCard] = useState<CardData>(SAMPLE_CARDS[0]);
  const [savedCards, setSavedCards] = useState<CardData[]>([]);
  const [shareModalCard, setShareModalCard] = useState<CardData | null>(null);

  useEffect(() => {
    const stored = getSavedCards();
    setSavedCards(stored);

    if (window.location.hash) {
      const decoded = decodeCardFromHash(window.location.hash);
      if (decoded) {
        setActiveCard(decoded);
        setViewMode('viewer');
        return;
      }
    }

    const handleHashChange = () => {
      if (window.location.hash) {
        const decoded = decodeCardFromHash(window.location.hash);
        if (decoded) {
          setActiveCard(decoded);
          setViewMode('viewer');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenCard = (card: CardData) => {
    setActiveCard(card);
    setViewMode('viewer');
  };

  const handleCreateNew = () => {
    setActiveCard({
      ...SAMPLE_CARDS[0],
      id: `card-${Date.now()}`,
      recipientName: '',
      senderName: '',
      dateText: 'Today',
    });
    setViewMode('studio');
  };

  const handleSaveCard = (card: CardData) => {
    saveCardToLocal(card);
    setSavedCards(getSavedCards());
    setActiveCard(card);
  };

  const handleDeleteSavedCard = (id: string) => {
    deleteSavedCard(id);
    setSavedCards(getSavedCards());
  };

  const handleExitViewer = () => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setViewMode('gallery');
  };

  return (
    <main className="min-h-screen w-full bg-neutral-950 font-sans text-neutral-100 selection:bg-pink-500 selection:text-white">
      {viewMode === 'gallery' && (
        <CardGallery
          savedCards={savedCards}
          onOpenCard={handleOpenCard}
          onCreateNew={handleCreateNew}
          onDeleteSavedCard={handleDeleteSavedCard}
          onShareCard={(card) => setShareModalCard(card)}
        />
      )}

      {viewMode === 'studio' && (
        <StudioEditor
          initialCard={activeCard}
          onSave={handleSaveCard}
          onLaunch={(card) => {
            setActiveCard(card);
            setViewMode('viewer');
          }}
          onBack={() => setViewMode('gallery')}
        />
      )}

      {viewMode === 'viewer' && (
        <CardExperienceViewer
          card={activeCard}
          onExit={handleExitViewer}
        />
      )}

      {shareModalCard && (
        <ShareModal
          card={shareModalCard}
          isOpen={!!shareModalCard}
          onClose={() => setShareModalCard(null)}
        />
      )}
    </main>
  );
};

export default App;
