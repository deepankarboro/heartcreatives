import type { CardData } from '../types/card';
import { SAMPLE_CARDS } from '../data/sampleCards';

const STORAGE_KEY = 'heartcreatives_saved_cards';

// Compact representation to drastically reduce URL size
interface CompactCard {
  r: string; // recipientName
  s: string; // senderName
  o: string; // occasion
  d: string; // dateText
  t: string; // theme
  v: string; // vibe
  c: string; // cakeStyle
  m: string; // mascot
  b: string[]; // bondTraits
  l: string; // letter
  sm: string; // secretMessage
  p: [string, string, string][]; // [id, url, caption]
  mm: string; // musicMood
  id?: string;
}

export function encodeCardToHash(card: CardData): string {
  try {
    // 1. If it matches a sample template card, encode with ultra-short sample id
    const isSample = SAMPLE_CARDS.find((sc) => sc.id === card.id);
    if (isSample) {
      return `s=${encodeURIComponent(card.id)}`;
    }

    // 2. Otherwise encode using compact minified schema
    const compact: CompactCard = {
      r: card.recipientName,
      s: card.senderName,
      o: card.occasion,
      d: card.dateText,
      t: card.theme,
      v: card.vibe,
      c: card.cakeStyle,
      m: card.mascot,
      b: card.bondTraits,
      l: card.letter,
      sm: card.secretMessage,
      p: card.photos.map((photo) => [photo.id, photo.url, photo.caption || '']),
      mm: card.musicMood,
      id: card.id,
    };

    const jsonStr = JSON.stringify(compact);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    const base64 = btoa(binary);
    return `c=${encodeURIComponent(base64)}`;
  } catch (err) {
    console.error('Failed to encode card:', err);
    return '';
  }
}

export function decodeCardFromHash(hash: string): CardData | null {
  try {
    const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
    const params = new URLSearchParams(cleanHash);

    // 1. Check for sample id: ?s=sample-id
    const sampleId = params.get('s');
    if (sampleId) {
      const found = SAMPLE_CARDS.find((c) => c.id === sampleId);
      if (found) return found;
    }

    // 2. Check for compact card: ?c=... or legacy ?card=...
    const cardParam = params.get('c') || params.get('card');
    if (!cardParam) return null;

    const base64 = decodeURIComponent(cardParam);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);

    // Check if it's compact format
    if ('r' in parsed && 's' in parsed && 't' in parsed) {
      const c = parsed as CompactCard;
      return {
        id: c.id || `card-${Date.now()}`,
        recipientName: c.r || 'Friend',
        senderName: c.s || 'Special Friend',
        occasion: (c.o as CardData['occasion']) || 'birthday',
        dateText: c.d || 'Today',
        theme: (c.t as CardData['theme']) || 'celestial',
        vibe: c.v || 'Sweet & Warm',
        cakeStyle: (c.c as CardData['cakeStyle']) || 'galaxy-starlight',
        mascot: (c.m as CardData['mascot']) || 'bunny',
        bondTraits: c.b || ['Sweet Soul'],
        letter: c.l || '',
        secretMessage: c.sm || '',
        photos: (c.p || []).map((arr) => ({
          id: arr[0],
          url: arr[1],
          caption: arr[2],
        })),
        musicMood: (c.mm as CardData['musicMood']) || 'dreamy-celestial',
      };
    }

    // Legacy format
    return parsed as CardData;
  } catch (err) {
    console.error('Failed to decode card:', err);
    return null;
  }
}

export function saveCardToLocal(card: CardData): void {
  try {
    const existing = getSavedCards();
    const filtered = existing.filter((c) => c.id !== card.id);
    const updated = [card, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function getSavedCards(): CardData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CardData[];
  } catch {
    return [];
  }
}

export function deleteSavedCard(id: string): void {
  try {
    const existing = getSavedCards();
    const updated = existing.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete card:', err);
  }
}
