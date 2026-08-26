import React, { useState, useEffect } from 'react';
import type { CardData } from '../../types/card';
import { sound } from '../../audio/soundEngine';
import { AudioVisualizer } from '../common/AudioVisualizer';
import { NavigationDots } from '../common/NavigationDots';

// Celestial Theme
import { CelestialSky } from '../themes/celestial/CelestialSky';
import { ConstellationGame } from '../themes/celestial/ConstellationGame';
import { CosmicCake } from '../themes/celestial/CosmicCake';
import { OrbitGallery } from '../themes/celestial/OrbitGallery';
import { CelestialLetter } from '../themes/celestial/CelestialLetter';

// Whimsical Theme
import { WaxSealEnvelope } from '../themes/whimsical/WaxSealEnvelope';
import { CakeDecorating } from '../themes/whimsical/CakeDecorating';
import { CandleBlowout } from '../themes/whimsical/CandleBlowout';
import { ClotheslineGallery } from '../themes/whimsical/ClotheslineGallery';
import { PopUpLetter } from '../themes/whimsical/PopUpLetter';

// Cyberwave Theme
import { SynthGridBackground } from '../themes/cyberwave/SynthGridBackground';
import { RhythmBeatGame } from '../themes/cyberwave/RhythmBeatGame';
import { PixelCakeOverdrive } from '../themes/cyberwave/PixelCakeOverdrive';
import { HologramDeck } from '../themes/cyberwave/HologramDeck';
import { CipherLetter } from '../themes/cyberwave/CipherLetter';

// Botanical Theme
import { GardenGate } from '../themes/botanical/GardenGate';
import { WishLanternRelease } from '../themes/botanical/WishLanternRelease';
import { BlossomSparklerCake } from '../themes/botanical/BlossomSparklerCake';
import { FloralWreathGallery } from '../themes/botanical/FloralWreathGallery';
import { CalligraphyScroll } from '../themes/botanical/CalligraphyScroll';

interface CardExperienceViewerProps {
  card: CardData;
  onExit: () => void;
}

export const CardExperienceViewer: React.FC<CardExperienceViewerProps> = ({ card, onExit }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    sound.startBackgroundMusic(card.musicMood);
    return () => {
      sound.stopBackgroundMusic();
    };
  }, [card.musicMood]);

  const stageNamesMap: Record<string, string[]> = {
    celestial: ['Starlight Gate', 'Constellation', 'Cosmic Cake', 'Orbit Memories', 'Cosmic Letter'],
    whimsical: ['Wax Envelope', 'Cake Bakery', 'Candle Wish', 'Clothesline', 'Storybook'],
    cyberwave: ['Arcade Grid', 'Rhythm Beat', 'Reactor Cake', 'Hologram Deck', 'Cipher Letter'],
    botanical: ['Garden Gate', 'Wish Lanterns', 'Blossom Cake', 'Memory Wreath', 'Calligraphy Scroll'],
  };

  const stageNames = stageNamesMap[card.theme] || ['Intro', 'Activity', 'Cake', 'Memories', 'Letter'];

  const getThemeBgClass = () => {
    switch (card.theme) {
      case 'celestial': return 'bg-mesh-celestial text-white';
      case 'whimsical': return 'bg-mesh-whimsical text-neutral-900';
      case 'cyberwave': return 'bg-mesh-cyber text-white';
      case 'botanical': return 'bg-mesh-botanical text-white';
      default: return 'bg-neutral-950 text-white';
    }
  };

  const renderStageContent = () => {
    switch (card.theme) {
      case 'celestial':
        switch (currentStage) {
          case 0: return <CelestialSky card={card} onBegin={() => setCurrentStage(1)} />;
          case 1: return <ConstellationGame card={card} onNext={() => setCurrentStage(2)} />;
          case 2: return <CosmicCake card={card} onNext={() => setCurrentStage(3)} />;
          case 3: return <OrbitGallery card={card} onNext={() => setCurrentStage(4)} />;
          case 4: return <CelestialLetter card={card} onRestart={() => setCurrentStage(0)} />;
          default: return null;
        }

      case 'whimsical':
        switch (currentStage) {
          case 0: return <WaxSealEnvelope card={card} onOpen={() => setCurrentStage(1)} />;
          case 1: return <CakeDecorating card={card} onNext={() => setCurrentStage(2)} />;
          case 2: return <CandleBlowout card={card} onNext={() => setCurrentStage(3)} />;
          case 3: return <ClotheslineGallery card={card} onNext={() => setCurrentStage(4)} />;
          case 4: return <PopUpLetter card={card} onRestart={() => setCurrentStage(0)} />;
          default: return null;
        }

      case 'cyberwave':
        switch (currentStage) {
          case 0: return <SynthGridBackground card={card} onStart={() => setCurrentStage(1)} />;
          case 1: return <RhythmBeatGame card={card} onNext={() => setCurrentStage(2)} />;
          case 2: return <PixelCakeOverdrive card={card} onNext={() => setCurrentStage(3)} />;
          case 3: return <HologramDeck card={card} onNext={() => setCurrentStage(4)} />;
          case 4: return <CipherLetter card={card} onRestart={() => setCurrentStage(0)} />;
          default: return null;
        }

      case 'botanical':
        switch (currentStage) {
          case 0: return <GardenGate card={card} onEnter={() => setCurrentStage(1)} />;
          case 1: return <WishLanternRelease card={card} onNext={() => setCurrentStage(2)} />;
          case 2: return <BlossomSparklerCake card={card} onNext={() => setCurrentStage(3)} />;
          case 3: return <FloralWreathGallery card={card} onNext={() => setCurrentStage(4)} />;
          case 4: return <CalligraphyScroll card={card} onRestart={() => setCurrentStage(0)} />;
          default: return null;
        }

      default:
        return null;
    }
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-700 pb-20 ${getThemeBgClass()}`}>
      <AudioVisualizer mood={card.musicMood} />

      <div className="relative z-10 w-full animate-fadeIn pt-4 sm:pt-8">
        {renderStageContent()}
      </div>

      <NavigationDots
        currentStage={currentStage}
        totalStages={5}
        stageNames={stageNames}
        onSelectStage={(s) => setCurrentStage(s)}
        onNext={() => setCurrentStage((prev) => Math.min(4, prev + 1))}
        onPrev={() => setCurrentStage((prev) => Math.max(0, prev - 1))}
        onExit={onExit}
        themeColor={
          card.theme === 'whimsical'
            ? 'bg-rose-500'
            : card.theme === 'cyberwave'
            ? 'bg-cyan-400 shadow-[0_0_15px_#00f0ff]'
            : card.theme === 'botanical'
            ? 'bg-emerald-400'
            : 'bg-pink-500'
        }
      />
    </div>
  );
};
