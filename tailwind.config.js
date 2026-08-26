/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
        editorial: ['"Playfair Display"', 'serif'],
        arcade: ['"Press Start 2P"', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'],
      },
      colors: {
        celestial: {
          dark: '#070913',
          purple: '#1a103c',
          glow: '#8a5cf6',
          gold: '#fbbf24',
          star: '#e0e7ff',
          neon: '#38bdf8'
        },
        whimsical: {
          bg: '#fff5f7',
          pink: '#f43f5e',
          softPink: '#fecdd3',
          cream: '#fffbeb',
          berry: '#881337',
          gold: '#f59e0b'
        },
        cyber: {
          black: '#0a0a14',
          grid: '#241442',
          neonPink: '#ff007f',
          neonCyan: '#00f0ff',
          neonYellow: '#ffe600',
          neonPurple: '#9d00ff'
        },
        botanical: {
          twilight: '#0f172a',
          emerald: '#064e3b',
          sage: '#10b981',
          gold: '#fde047',
          peach: '#fed7aa',
          lantern: '#ff9800'
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'candle-flicker': 'flicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '50%': { transform: 'scale(1.08) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(0.96) rotate(-2deg)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
