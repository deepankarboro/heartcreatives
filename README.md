# ✨ HeartCreatives — Celestial & Interactive Celebrations Engine

A dynamic interactive celebration web application built with modern web standards, synthesized Web Audio soundscapes, canvas particle physics, 3D memory orbits, interactive mini-games, and custom shareable keepsakes.

---

## 🎨 4 Creative Interactive Themes & Experience Concepts

### 1. 🌌 Celestial Nebula & Star Capsule (`celestial`)
- **Cosmic Gateway:** Starfield with glowing nebulae and starlight delivery entrance.
- **Constellation Alignment Puzzle:** Interactive star node connector with harmonic chime chords (C-E-G-B).
- **3D Cosmic Cake:** Starlight flame with microphone puff blowout or tap simulator, triggering a supernova stardust burst!
- **Planetary Memory Orbit:** 3D perspective tilt polaroid deck in celestial rotation.
- **Cosmic Keepsake Letter:** Star parchment with bond traits and an interactive gold scratch-off hidden secret.

### 2. 🍓 Whimsical Pastel Bakery & Pop-Up Storybook (`whimsical`)
- **3D Wax Seal Envelope:** Interactive wax seal that cracks and opens the storybook.
- **Bakery Cake Station:** Multi-tier cake decorator to place strawberries, cream swirls, sprinkles, and candies with live physics.
- **Candle Wish Ceremony:** Strike matches, light 3 candy candles, and blow them out with air whooshes and celebratory pastel petal showers.
- **Memory Clothesline:** Hanging polaroid snapshots pinned with rustic wooden clothespins and zoom view.
- **Pop-Up Gazette Letter:** 3D papercraft letter with scratch-off gift voucher.

### 3. 🕹️ Cyber Neon Arcade & Rhythm Pulse (`cyberwave`)
- **Arcade Mainframe:** 80s synthwave sunset grid with wireframe floor and countdown.
- **Cyber Rhythm Synthesizer:** 4-lane beat pad mini-game that plays chiptune riffs and builds overdrive combos.
- **Reactor Pixel Cake:** Tap to overcharge celebration reactor up to 100% to unleash laser confetti bursts.
- **Hologram Memory Deck:** Holographic scanline polaroids with encrypted tech accents.
- **Terminal Cipher Letter:** Matrix-styled decoded letter with secret cheat code scratchcard.

### 4. 🌸 Enchanted Botanical Garden & Lantern Release (`botanical`)
- **Twilight Garden Gate:** Glowing fireflies and watercolor wisteria vines.
- **Paper Wish Lanterns:** Interactive floating lanterns carrying personal blessings into the evening sky with serene pentatonic chimes.
- **Matcha Blossom Sparkler Cake:** Golden crackling sparkler candle with petal showers.
- **Botanical Memory Wreath:** Leaf-pinned polaroid memories with editorial captions.
- **Calligraphy Scroll:** Gold-foil accented scroll with scratch blessing.

---

## 🛠️ Key Technical Highlights

- **Synthesized Web Audio Engine (`src/audio/soundEngine.ts`):** 100% zero external audio asset dependencies. Synthesizes polyphonic ambient chord pads, arpeggios, bell chimes, match friction, breath whooshes, brass fanfares, and 8-bit chiptune square waves.
- **Microphone Blow Detection (`src/utils/micListener.ts`):** Uses Web Audio API `AnalyserNode` to detect real breath puffs into the microphone to blow out candles.
- **Interactive Scratch-Off Canvas (`src/components/common/ScratchCard.tsx`):** Real-time percentage tracking with `globalCompositeOperation = 'destination-out'` and tactile sound feedback.
- **Instant URL Sharing & Persistence (`src/utils/cardEncoder.ts`):** Encodes full card states into URL hashes (`#card=...`) for instant cross-device sharing with no backend requirement, plus LocalStorage saving.
- **Celebration Creator Studio (`src/components/studio/StudioEditor.tsx`):** Real-time customizer to create, test, and share custom celebration links with local photo uploads or URLs.

---

## 🚀 Quickstart

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
