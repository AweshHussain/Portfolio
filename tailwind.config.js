/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F0E7',
          50: '#FDFCF9',
          100: '#F5F0E7',
          200: '#EAE2D6',
          300: '#DCCFBE',
        },
        'near-black': '#171717',
        terracotta: {
          DEFAULT: '#C96D4F',
          dark: '#B25A3D',
          light: '#DA8468',
          glow: 'rgba(201, 109, 79, 0.25)',
        },
        charcoal: {
          900: '#111111',
          800: '#171717',
          700: '#232220',
          600: '#2D2B28',
        },
        muted: '#77736D',
      },
      fontFamily: {
        display: ['"ITC Avant Garde Gothic"', '"Avant Garde"', '"Outfit"', '"Century Gothic"', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        signature: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'clay': '0 20px 40px -15px rgba(201, 109, 79, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
        'clay-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(201, 109, 79, 0.3)',
        'editorial': '0 10px 30px -10px rgba(23, 23, 23, 0.08)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
