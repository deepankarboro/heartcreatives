export type ThemeId = 'celestial' | 'whimsical' | 'cyberwave' | 'botanical';

export type Occasion = 
  | 'birthday' 
  | 'anniversary' 
  | 'love' 
  | 'friendship' 
  | 'milestone' 
  | 'thankyou';

export type CakeStyle = 
  | 'galaxy-starlight' 
  | 'strawberry-chiffon' 
  | 'cyber-pixel' 
  | 'matcha-floral' 
  | 'chocolate-truffle' 
  | 'rainbow-magic';

export type Mascot = 
  | 'bunny' 
  | 'cat' 
  | 'bear' 
  | 'astronaut' 
  | 'cyber-bot' 
  | 'fairy';

export type MusicMood = 
  | 'dreamy-celestial' 
  | 'upbeat-lofi' 
  | 'synthwave-arcade' 
  | 'zen-garden';

export interface CardPhoto {
  id: string;
  url: string;
  caption?: string;
  rotation?: number;
}

export interface CardData {
  id: string;
  recipientName: string;
  senderName: string;
  occasion: Occasion;
  dateText: string;
  theme: ThemeId;
  vibe: string;
  cakeStyle: CakeStyle;
  mascot: Mascot;
  bondTraits: string[];
  letter: string;
  secretMessage: string;
  photos: CardPhoto[];
  musicMood: MusicMood;
  customBlessings?: string[];
  createdAt?: string;
}

export type ViewMode = 'gallery' | 'viewer' | 'studio' | 'cupid';
