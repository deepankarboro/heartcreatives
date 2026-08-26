import type { CardData } from '../types/card';

export const SAMPLE_CARDS: CardData[] = [
  {
    id: 'sample-celestial-mia',
    recipientName: 'Mia',
    senderName: 'Your Special Someone',
    occasion: 'birthday',
    dateText: 'August 24',
    theme: 'celestial',
    vibe: 'Sweet & Cosmic',
    cakeStyle: 'galaxy-starlight',
    mascot: 'bunny',
    bondTraits: ['Sweet Soul', 'Super Loyal', 'My Rock', 'Pure Magic'],
    letter: `Dear Mia,\n\nHappy Birthday to someone truly extraordinary! ✨\n\nYou bring so much warmth, laughter, and starlight into every room you walk into. Looking back at all the memories we've shared, every moment with you has been a rare and precious gift.\n\nOn your special day, I wish you endless wonder, dreams that take flight, and all the boundless happiness you give so freely to others.\n\nHere's to celebrating you today, tomorrow, and through every galaxy yet to come! 💫\n\nWith love and cosmic hugs,\nYour Special Someone 💖`,
    secretMessage: '🌟 P.S. Look up at the stars tonight — I wished on the brightest one that this year brings you everything your heart desires!',
    musicMood: 'dreamy-celestial',
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        caption: 'Radiant smile & golden sunsets 🌅',
        rotation: -3
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        caption: 'The unforgettable summer night ✨',
        rotation: 4
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
        caption: 'Pure joy & laughter always 💖',
        rotation: -2
      }
    ],
    customBlessings: ['Endless Joy', 'Bright Adventures', 'Peace & Light']
  },
  {
    id: 'sample-whimsical-chloe',
    recipientName: 'Chloe',
    senderName: 'Maya',
    occasion: 'birthday',
    dateText: 'September 18',
    theme: 'whimsical',
    vibe: 'Playful & Sweet',
    cakeStyle: 'strawberry-chiffon',
    mascot: 'cat',
    bondTraits: ['Partner in Crime', 'Sunshine Energy', 'Boba Lover', 'Bestie for Life'],
    letter: `Hey Chloe!\n\nHappy, Happy Birthday to my absolute favorite human! 🎂🍓\n\nThank you for always being the one who makes late night snack runs feel like epic adventures, and for listening to my stories a thousand times over.\n\nI baked this virtual strawberry dream cake just for you (with extra sprinkles and zero calories)! May this year be filled with sweet treats, spontaneous road trips, and endless laughter.\n\nLove you to the moon and back! 💕`,
    secretMessage: '🧁 Voucher: Valid for 1x Free Boba Milk Tea + Unlimited Cake whenever we meet next! Redeem anytime! ✨',
    musicMood: 'upbeat-lofi',
    photos: [
      {
        id: 'w1',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
        caption: 'Bestie selfie spree 📸',
        rotation: 2
      },
      {
        id: 'w2',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
        caption: 'Picnic in the park memories 🍰',
        rotation: -4
      },
      {
        id: 'w3',
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        caption: 'Never a dull moment with you 🌸',
        rotation: 3
      }
    ]
  },
  {
    id: 'sample-cyberwave-alex',
    recipientName: 'Alex',
    senderName: 'The Squad',
    occasion: 'birthday',
    dateText: 'October 30',
    theme: 'cyberwave',
    vibe: 'Electrifying & Retro',
    cakeStyle: 'cyber-pixel',
    mascot: 'cyber-bot',
    bondTraits: ['Level 99 Legend', 'Clutch Master', 'Midnight Coder', 'Unstoppable'],
    letter: `PLAYER 1: ALEX // LEVEL UP DETECTED!\n\nHappy Birthday, Legend! 🕹️⚡\n\nYou have officially reached the next tier of life with maximum XP and legendary stats. Whether we're grinding games into the night or building crazy new ideas, having you on the team is always an instant win.\n\nMay your frame rates be high, your latency low, and your upcoming year packed with major achievements and critical hits!\n\nKeep dominating the leaderboard! 🚀`,
    secretMessage: '👾 [EASTER EGG UNLOCKED]: Secret cheat code activated -> Unlimited happiness, luck +1000%, and legendary drops ahead!',
    musicMood: 'synthwave-arcade',
    photos: [
      {
        id: 'c1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        caption: 'Command center vibes 💻',
        rotation: -3
      },
      {
        id: 'c2',
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
        caption: 'Victory royale squad! 🏆',
        rotation: 4
      }
    ]
  },
  {
    id: 'sample-botanical-elena',
    recipientName: 'Elena',
    senderName: 'David',
    occasion: 'anniversary',
    dateText: 'November 14',
    theme: 'botanical',
    vibe: 'Serene & Romantic',
    cakeStyle: 'matcha-floral',
    mascot: 'fairy',
    bondTraits: ['Kind Heart', 'Gentle Soul', 'My Sanctuary', 'Forever Love'],
    letter: `Dearest Elena,\n\nLike flowers that quietly bloom in the soft morning light, your grace and kindness bring calm and beauty to everything around you.\n\nThank you for every quiet walk, every shared glance, and every heartbeat that feels like coming home. Releasing these lanterns into the evening sky is just a small reflection of the endless wishes I hold for our future together.\n\nHappy Anniversary, my love. 🌸🍃`,
    secretMessage: '🏮 A promise to hold your hand through every season, under every starlit sky, forever.',
    musicMood: 'zen-garden',
    photos: [
      {
        id: 'b1',
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
        caption: 'Where our story blossomed 🌿',
        rotation: -2
      },
      {
        id: 'b2',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
        caption: 'Golden mountain vistas with you ✨',
        rotation: 3
      }
    ]
  }
];
