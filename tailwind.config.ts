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
        // Rose Gold - Primary brand color with enhanced variations
        'rose-gold': {
          50: '#fdf8f6',
          100: '#f9eeea',
          150: '#f7e6de',
          200: '#f2dcd4',
          250: '#edd2ca',
          300: '#e8c1b4',
          350: '#e3b09e',
          400: '#db9e8e',
          450: '#d38c7e',
          500: '#c97c6c',
          550: '#c16c5c',
          600: '#b76659',
          650: '#ad5e4e',
          DEFAULT: '#b87474',
          700: '#954e45',
          750: '#8a4a40',
          800: '#7a423c',
          850: '#6a3a38',
          900: '#653934',
          950: '#4c2926',
        },
        // Blush Pink - Secondary with enhanced variations
        'blush': {
          50: '#fef7f9',
          100: '#fdf0f4',
          150: '#fce8f0',
          200: '#fce1ea',
          250: '#fbd9e3',
          300: '#f9c8d9',
          350: '#f7b7cf',
          400: '#f5a5c1',
          450: '#f393b3',
          500: '#ed7aa2',
          550: '#e76a92',
          DEFAULT: '#f5a5c1',
          600: '#d65082',
          650: '#cc4a72',
          700: '#b83865',
          750: '#a63258',
          800: '#993158',
          850: '#8c2c50',
          900: '#802d4d',
          950: '#6b2440',
        },
        // Lavender - Accent with enhanced variations
        'lavender': {
          50: '#faf8fc',
          100: '#f4f0f9',
          150: '#f0eaf5',
          200: '#ebe4f3',
          250: '#e6ddf0',
          300: '#dccee9',
          350: '#d2c0e2',
          400: '#c6b0da',
          450: '#baa0d2',
          500: '#a989c5',
          550: '#9c7ab8',
          DEFAULT: '#c6b0da',
          600: '#8b6aac',
          650: '#7e5f9f',
          700: '#745691',
          750: '#6a4d83',
          800: '#614a78',
          850: '#58426b',
          900: '#513f63',
          950: '#3d2f4a',
        },
        // Mint - Fresh accent with enhanced variations
        'mint': {
          50: '#f3faf8',
          100: '#e5f5f0',
          150: '#d7f0e8',
          200: '#cceae0',
          250: '#c1e4d8',
          300: '#a6d8c7',
          350: '#8cccb6',
          400: '#78bfa8',
          450: '#64b29a',
          DEFAULT: '#a6d8c7',
          500: '#51a489',
          550: '#41987a',
          600: '#3d8670',
          650: '#357466',
          700: '#346c5c',
          750: '#2e5c52',
          800: '#2d574b',
          850: '#284e44',
          900: '#28483f',
          950: '#1f352e',
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
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-soft': 'shimmerSoft 3s ease-in-out infinite alternate',
        'gradient': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'metallic-shine': 'metallicShine 2.5s ease-in-out infinite',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shimmerSoft: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '0.7' },
        },
        gradientShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            backgroundSize: '200% 200%'
          },
          '50%': {
            backgroundPosition: '100% 50%',
            backgroundSize: '200% 200%'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(184, 116, 116, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(184, 116, 116, 0.4)' },
        },
        metallicShine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(184, 116, 116, 0.3)',
        'luxury-hover': '0 20px 60px -10px rgba(184, 116, 116, 0.4)',
        'luxury-lg': '0 25px 80px -15px rgba(184, 116, 116, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-subtle': '0 4px 16px 0 rgba(184, 116, 116, 0.1)',
        'metallic': '0 8px 25px -8px rgba(184, 116, 116, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'shimmer': '0 0 20px rgba(184, 116, 116, 0.3), 0 0 40px rgba(245, 165, 193, 0.2)',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #b87474 0%, #f5a5c1 50%, #c6b0da 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fdf8f6 0%, #fef7f9 50%, #faf8fc 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f7e6de 0%, #fce8f0 50%, #f0eaf5 100%)',
        'gradient-cool': 'linear-gradient(135deg, #e6ddf0 0%, #d7f0e8 50%, #f0eaf5 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        'metallic-gradient': 'linear-gradient(135deg, #b87474 0%, #d4a574 50%, #b87474 100%)',
      },
      backgroundSize: {
        'shimmer': '200% 100%',
        'metallic': '200% 100%',
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