import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Rose Gold - Primary brand color
        'rose-gold': {
          50: '#fdf8f6',
          100: '#f9eeea',
          200: '#f2dcd4',
          300: '#e8c1b4',
          400: '#db9e8e',
          500: '#c97c6c',
          600: '#b76659',
          DEFAULT: '#b87474',
          700: '#954e45',
          800: '#7a423c',
          900: '#653934',
        },
        // Blush Pink - Secondary
        'blush': {
          50: '#fef7f9',
          100: '#fdf0f4',
          200: '#fce1ea',
          300: '#f9c8d9',
          400: '#f5a5c1',
          500: '#ed7aa2',
          DEFAULT: '#f5a5c1',
          600: '#d65082',
          700: '#b83865',
          800: '#993158',
          900: '#802d4d',
        },
        // Lavender - Accent
        'lavender': {
          50: '#faf8fc',
          100: '#f4f0f9',
          200: '#ebe4f3',
          300: '#dccee9',
          400: '#c6b0da',
          500: '#a989c5',
          DEFAULT: '#c6b0da',
          600: '#8b6aac',
          700: '#745691',
          800: '#614a78',
          900: '#513f63',
        },
        // Mint - Fresh accent
        'mint': {
          50: '#f3faf8',
          100: '#e5f5f0',
          200: '#cceae0',
          300: '#a6d8c7',
          400: '#78bfa8',
          DEFAULT: '#a6d8c7',
          500: '#51a489',
          600: '#3d8670',
          700: '#346c5c',
          800: '#2d574b',
          900: '#28483f',
        },
        // Neutrals
        'cream': {
          50: '#fdfcfb',
          100: '#fbf9f6',
          DEFAULT: '#faf8f5',
          200: '#f5f1ec',
          300: '#ebe5dd',
        },
        'charcoal': {
          DEFAULT: '#2d2d2d',
          light: '#4a4a4a',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        heading: ['var(--font-montserrat)', 'Inter', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Heading sizes
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'h4': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'h5': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-in-out',
        'slide-in-left': 'slideInLeft 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(184, 116, 116, 0.3)',
        'luxury-hover': '0 20px 60px -10px rgba(184, 116, 116, 0.4)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'snap': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
        'slower': '700ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}

export default config