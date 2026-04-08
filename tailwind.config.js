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
        neon: {
          cyan: '#00f0ff',
          purple: '#a855f7',
          pink: '#f43f5e',
        },
        dark: {
          900: '#030014',
          800: '#0a0a1a',
          700: '#111132',
          600: '#1a1a3e',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'scan': 'scan 4s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff' },
          '100%': { textShadow: '0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #a855f7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)' },
          '20%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px, 2px)' },
          '40%': { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(2px, -1px)' },
          '60%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(-1px, 1px)' },
          '80%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(1px, -2px)' },
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: '#00f0ff' },
          '33%': { borderColor: '#a855f7' },
          '66%': { borderColor: '#f43f5e' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #030014 0%, #0a0a2e 25%, #1a0a2e 50%, #0a1a2e 75%, #030014 100%)',
      }
    },
  },
  plugins: [],
}
