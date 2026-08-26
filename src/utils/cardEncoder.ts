import type { CardData } from '../types/card';

const STORAGE_KEY = 'heartcreatives_saved_cards';

export function encodeCardToHash(card: CardData): string {
  try {
    const jsonStr = JSON.stringify(card);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    const base64 = btoa(binary);
    return `card=${encodeURIComponent(base64)}`;
  } catch (err) {
    console.error('Failed to encode card:', err);
    return '';
  }
}

export function decodeCardFromHash(hash: string): CardData | null {
  try {
    const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
    const params = new URLSearchParams(cleanHash);
    const cardParam = params.get('card') || params.get('c');
    if (!cardParam) return null;

    const base64 = decodeURIComponent(cardParam);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr) as CardData;
  } catch (err) {
    console.error('Failed to decode card:', err);
    return null;
  }
}

export function saveCardToLocal(card: CardData): void {
  try {
    const existing = getSavedCards();
    const filtered = existing.filter(c => c.id !== card.id);
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
    const updated = existing.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete card:', err);
  }
}
