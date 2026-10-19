/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent remapped to DEEP MAROON (500 = primary maroon)
        rose: {
          50: 'rgba(122, 35, 50, 0.08)',
          100: 'rgba(122, 35, 50, 0.14)',
          200: 'rgba(122, 35, 50, 0.24)',
          300: '#b96b76',
          400: '#9c4251',
          500: '#6B1030',
          600: '#5c0c28',
          700: '#4a0a21',
          800: '#380817',
          900: '#2a0610',
        },
        // Soft peach / rose-tinted light surfaces + borders
        blush: {
          50: '#fbf2f1',
          100: '#f3e4e0',
          200: '#e5ccc6',
          300: '#d9b9b1',
        },
        // Gold scale (low = light champagne, high = rich gold)
        gold: {
          50: '#fef9e8',
          100: '#fbf0cd',
          200: '#f6e2a0',
          300: '#edd06a',
          400: '#d8b13b',
          500: '#D4A24C',
          600: '#b8951f',
          700: '#9a7c1a',
        },
        // Cream / ivory page & card backgrounds (light theme)
        cream: {
          50: '#fdf9f2',
          100: '#fffdf9',
          200: '#ffffff',
          300: '#f6f0e4',
        },
        // Deep maroon accent (used for overlays / footer)
        plum: {
          50: '#f6e9ea',
          100: '#ecd0d3',
          200: '#d9a9af',
          300: '#b96b76',
          400: '#a84258',
          500: '#8f2c3a',
          600: '#7a2332',
          700: '#5c1925',
          800: '#45121c',
          900: '#2b0f15',
        },
        // Text scale (dark on light). 900 = darkest primary text
        charcoal: {
          50: '#f5f0f0',
          100: '#ede4e5',
          200: '#ddcbcc',
          300: '#c2a5a6',
          400: '#a68486',
          500: '#8a6265',
          600: '#6a4448',
          700: '#4e2f32',
          800: '#3c2025',
          900: '#2b1418',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}