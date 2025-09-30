# Luxury Nail Salon Website - Technical Architecture Specification

## Document Overview
**Project Name:** Luxury Nail Salon Website  
**Framework:** Next.js 14+ with Turbopack  
**Architecture Type:** Full-stack with SSR, ISR, and Client Components  
**Target Deployment:** Vercel (recommended) or self-hosted  
**Version:** 1.0.0  
**Last Updated:** 2025-09-30

---

## Table of Contents
1. [Project Structure & Organization](#1-project-structure--organization)
2. [Technology Stack Details](#2-technology-stack-details)
3. [Design System Specification](#3-design-system-specification)
4. [Feature Breakdown with Technical Details](#4-feature-breakdown-with-technical-details)
5. [Performance & Optimization Strategy](#5-performance--optimization-strategy)
6. [Accessibility Compliance Plan](#6-accessibility-compliance-plan)
7. [File & Folder Structure](#7-file--folder-structure)
8. [Database Schema](#8-database-schema)
9. [API Architecture](#9-api-architecture)
10. [Deployment Strategy](#10-deployment-strategy)

---

## 1. Project Structure & Organization

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│           Client Layer (Browser)                │
│  ┌──────────────────────────────────────────┐  │
│  │  Next.js App Router (React 18+)          │  │
│  │  - Server Components (default)           │  │
│  │  - Client Components ('use client')      │  │
│  │  - Server Actions (mutations)            │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────┐
│        Next.js Server Layer (Edge/Node)         │
│  ┌──────────────────────────────────────────┐  │
│  │  API Routes (/app/api/*)                 │  │
│  │  Server Actions (form submissions)       │  │
│  │  Middleware (auth, rate limiting)        │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↕ Database Client
┌─────────────────────────────────────────────────┐
│           Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐           │
│  │  PostgreSQL  │  │  Sanity CMS  │           │
│  │  (Supabase)  │  │  (Content)   │           │
│  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────┘
                      ↕ External APIs
┌─────────────────────────────────────────────────┐
│        External Services                        │
│  - Stripe (Payments)                            │
│  - SendGrid/Resend (Emails)                     │
│  - Cloudinary/Vercel Blob (Images)              │
│  - Google Calendar API (Availability)           │
└─────────────────────────────────────────────────┘
```

### 1.2 App Router Structure

The application follows Next.js 14+ App Router conventions with clear separation of concerns:

- **Server Components by Default**: Maximize performance with RSC
- **Strategic Client Components**: Only for interactivity (forms, animations, modals)
- **Colocation**: Components live near their routes when possible
- **Feature-Based Organization**: Group by feature, not by type

### 1.3 Component Organization Strategy

**Three-Tier Component Architecture:**

1. **UI Components** (`/components/ui`): Atomic, reusable design system components
2. **Feature Components** (`/components/features`): Business logic components
3. **Layout Components** (`/components/layouts`): Page-level structural components

### 1.4 Configuration Files

Required configuration files:
- `next.config.js` - Next.js with Turbopack configuration
- `tsconfig.json` - TypeScript strict mode configuration
- `tailwind.config.ts` - Design system tokens
- `postcss.config.js` - CSS processing
- `.env.local` - Environment variables (git-ignored)
- `.env.example` - Environment variable template
- `middleware.ts` - Authentication and rate limiting
- `instrumentation.ts` - OpenTelemetry monitoring (optional)

### 1.5 Asset Organization

```
/public
  /images
    /hero        - Hero section images
    /services    - Service category images
    /team        - Team member photos
    /favicon     - Favicon variants
  /fonts         - Self-hosted fonts (optional)
  /animations    - Lottie JSON files
  robots.txt
  sitemap.xml
  manifest.json
```

---

## 2. Technology Stack Details

### 2.1 Core Framework

**Next.js 14.2+**
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
```

**Turbopack Configuration:**
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Enable modern JavaScript features
  swcMinify: true,
  // Image optimization
  images: {
    domains: ['cdn.sanity.io', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### 2.2 TypeScript Configuration

**Strict Mode Setup:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    },
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.3 Styling Solution

**Tailwind CSS 3.4+ with Custom Design Tokens**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette (defined in section 3)
      },
      fontFamily: {
        // Custom fonts (defined in section 3)
      },
      animation: {
        // Custom animations (defined in section 3)
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
```

### 2.4 Animation Library

**Framer Motion 11+**
```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

**Implementation Strategy:**
- Use `motion` components for page transitions
- Create reusable animation variants
- Leverage layout animations for smooth transitions
- Respect `prefers-reduced-motion` for accessibility

### 2.5 Complete Dependency List

```json
{
  "dependencies": {
    // Core Framework
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    
    // Database & ORM
    "@supabase/supabase-js": "^2.43.0",
    "drizzle-orm": "^0.30.0",
    "postgres": "^3.4.0",
    
    // CMS
    "@sanity/client": "^6.15.0",
    "@sanity/image-url": "^1.0.2",
    "next-sanity": "^9.0.0",
    
    // Authentication
    "next-auth": "^5.0.0-beta.17",
    "@auth/drizzle-adapter": "^1.0.0",
    
    // Payment Processing
    "@stripe/stripe-js": "^3.3.0",
    "stripe": "^15.0.0",
    
    // Forms & Validation
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.4",
    
    // UI Components
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-calendar": "^1.0.0",
    "react-day-picker": "^8.10.0",
    
    // Animation
    "framer-motion": "^11.0.0",
    
    // Icons
    "lucide-react": "^0.368.0",
    
    // Utilities
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "date-fns": "^3.6.0",
    "nanoid": "^5.0.7",
    
    // Email
    "resend": "^3.2.0",
    "react-email": "^2.1.0",
    "@react-email/components": "^0.0.16",
    
    // Image Handling
    "sharp": "^0.33.3",
    
    // Analytics (optional)
    "@vercel/analytics": "^1.2.2",
    "@vercel/speed-insights": "^1.0.10"
  },
  "devDependencies": {
    // TypeScript
    "typescript": "^5.4.5",
    "@types/node": "^20.12.7",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    
    // Tailwind
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.12",
    "@tailwindcss/container-queries": "^0.1.1",
    
    // Database Tools
    "drizzle-kit": "^0.20.0",
    
    // Linting & Formatting
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.14",
    
    // Testing (optional but recommended)
    "@testing-library/react": "^15.0.2",
    "@testing-library/jest-dom": "^6.4.2",
    "vitest": "^1.5.0"
  }
}
```

### 2.6 Database Solution

**Supabase (PostgreSQL) with Drizzle ORM**

**Rationale:**
- Supabase provides managed PostgreSQL with real-time capabilities
- Drizzle ORM offers type-safe database queries
- Built-in authentication support
- Edge-compatible
- Excellent Next.js integration

**Schema Location:** `/src/lib/db/schema.ts`

### 2.7 CMS Solution

**Sanity.io**

**Rationale:**
- Real-time content editing
- Structured content with strong typing
- Excellent image pipeline
- Custom studio customization
- Portable text for rich content

**Content Types:**
- Services (title, description, price, duration, image, category)
- Team Members (name, role, bio, photo, specialties)
- Portfolio Items (images, service category, description)
- Testimonials (client name, review, rating, date, service)
- Salon Information (hours, location, contact, policies)

### 2.8 Authentication

**NextAuth.js v5 (Auth.js)**

**Providers:**
- Email (magic link)
- Google OAuth
- Credentials (for admin)

**Session Strategy:**
- JWT sessions for scalability
- Database sessions for admin users
- Role-based access control (customer, staff, admin)

---

## 3. Design System Specification

### 3.1 Color Palette

**Primary Colors:**
```typescript
// tailwind.config.ts colors
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
    DEFAULT: '#b87474', // Main rose gold
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
    DEFAULT: '#f5a5c1', // Main blush
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
    DEFAULT: '#c6b0da', // Main lavender
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
    DEFAULT: '#a6d8c7', // Main mint
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
    DEFAULT: '#faf8f5', // Main background
    200: '#f5f1ec',
    300: '#ebe5dd',
  },
  
  'charcoal': {
    DEFAULT: '#2d2d2d', // Text
    light: '#4a4a4a',
  },
}
```

**Color Usage Guidelines:**
- **Rose Gold**: Primary buttons, CTAs, important headings, hover states
- **Blush Pink**: Secondary buttons, highlights, active states, accents
- **Lavender**: Tertiary accents, badges, subtle backgrounds
- **Mint**: Success states, fresh/clean indicators, environmental messaging
- **Cream**: Main backgrounds, cards, panels
- **Charcoal**: Body text, headings, icons

### 3.2 Typography System

**Font Families:**
```typescript
fontFamily: {
  // Display - For hero headlines and major headings
  display: ['Cormorant Garamond', 'Georgia', 'serif'],
  
  // Headings - For section titles and subheadings
  heading: ['Montserrat', 'Inter', 'sans-serif'],
  
  // Body - For paragraphs and UI text
  body: ['Inter', 'system-ui', 'sans-serif'],
  
  // Accent - For special callouts (optional)
  accent: ['Playfair Display', 'Georgia', 'serif'],
}
```

**Font Loading Strategy:**
- Use `next/font/google` for optimization
- Include font-display: swap
- Preload critical fonts
- Self-host fonts for maximum performance

**Typography Scale:**
```typescript
fontSize: {
  // Display sizes (hero, major headings)
  'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 72px
  'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],  // 60px
  'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],     // 48px
  
  // Heading sizes
  'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],   // 40px
  'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],     // 32px
  'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],         // 24px
  'h4': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],        // 20px
  'h5': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],       // 18px
  'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],           // 16px
  
  // Body sizes
  'body-xl': ['1.25rem', { lineHeight: '1.6' }],   // 20px
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],  // 18px
  'body': ['1rem', { lineHeight: '1.6' }],         // 16px (base)
  'body-sm': ['0.875rem', { lineHeight: '1.5' }],  // 14px
  'body-xs': ['0.75rem', { lineHeight: '1.5' }],   // 12px
}
```

**Typography Usage:**
- **Display fonts**: Hero headlines, landing sections
- **Heading fonts**: Section titles, card headers
- **Body fonts**: Paragraphs, form labels, buttons, navigation

### 3.3 Spacing Scale

**8px Base Grid System:**
```typescript
spacing: {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px - base unit
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
}
```

**Spacing Guidelines:**
- Component internal spacing: 2-6 (8px-24px)
- Section padding: 12-24 (48px-96px)
- Container max-width: 1280px with responsive padding
- Card padding: 6-8 (24px-32px)

### 3.4 Component Variants

#### Button Variants

**Primary Button (Rose Gold):**
```typescript
// Variant specifications
{
  base: 'font-heading font-semibold rounded-full transition-all duration-300',
  size: {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
    xl: 'px-10 py-5 text-body-xl',
  },
  variant: {
    primary: 'bg-rose-gold text-white hover:bg-rose-gold-600 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-blush text-white hover:bg-blush-600 hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white',
    ghost: 'text-rose-gold hover:bg-rose-gold-50',
  }
}
```

#### Input Variants

```typescript
// Form input specifications
{
  base: 'font-body rounded-lg border transition-colors duration-200',
  size: {
    sm: 'px-3 py-2 text-body-sm',
    md: 'px-4 py-3 text-body',
    lg: 'px-5 py-4 text-body-lg',
  },
  state: {
    default: 'border-cream-200 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold-200',
    error: 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200',
    success: 'border-mint focus:border-mint focus:ring-2 focus:ring-mint-200',
  }
}
```

#### Card Variants

```typescript
// Card component specifications
{
  base: 'rounded-2xl overflow-hidden transition-all duration-300',
  variant: {
    default: 'bg-white shadow-sm hover:shadow-md',
    elevated: 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1',
    bordered: 'bg-cream border-2 border-rose-gold-200',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
  },
  padding: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }
}
```

### 3.5 Animation & Transition Guidelines

**Core Animation Principles:**
1. **Smooth & Luxurious**: All transitions should feel premium (300-500ms)
2. **Purposeful**: Animations should enhance UX, not distract
3. **Performant**: Use transform and opacity for 60fps animations
4. **Respectful**: Always respect `prefers-reduced-motion`

**Animation Timing Functions:**
```typescript
transitionTimingFunction: {
  'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',      // Smooth ease
  'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Gentle bounce
  'snap': 'cubic-bezier(0.4, 0, 0.6, 1)',        // Quick snap
}
```

**Standard Animation Durations:**
```typescript
transitionDuration: {
  'fast': '150ms',      // Micro-interactions (button hover)
  'normal': '300ms',    // Standard transitions
  'slow': '500ms',      // Page transitions, modals
  'slower': '700ms',    // Hero animations
}
```

**Framer Motion Variants:**
```typescript
// Reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3 }
}

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}
```

**Animation Usage Guidelines:**
- **Page Transitions**: Use subtle fade + slide
- **Modal/Dialog**: Scale + fade in from center
- **Cards on Scroll**: Fade up with stagger
- **Hover States**: Subtle lift (-translate-y) + shadow increase
- **Loading States**: Skeleton screens with pulse animation
- **Success States**: Gentle check mark animation

### 3.6 Elevation System (Shadows)

```typescript
boxShadow: {
  'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Special luxury shadows
  'luxury': '0 10px 40px -10px rgba(184, 116, 116, 0.3)',
  'luxury-hover': '0 20px 60px -10px rgba(184, 116, 116, 0.4)',
}
```

### 3.7 Border Radius System

```typescript
borderRadius: {
  'none': '0',
  'sm': '0.25rem',    // 4px
  'md': '0.5rem',     // 8px - cards
  'lg': '0.75rem',    // 12px
  'xl': '1rem',       // 16px
  '2xl': '1.5rem',    // 24px - large cards
  'full': '9999px',   // Buttons, pills
}
```

---

## 4. Feature Breakdown with Technical Details

### 4.1 Hero Section

**Purpose:** Captivating first impression with luxury aesthetic and clear value proposition.

#### Component Structure
```
HeroSection/ (Server Component)
├── HeroBackground (Client Component - parallax)
├── HeroContent (Server Component)
│   ├── HeroHeadline
│   ├── HeroSubheadline
│   └── HeroCTA (Client Component - animation)
└── HeroMedia (Client Component - video/image carousel)
```

#### Data Requirements
```typescript
// From Sanity CMS
interface HeroContent {
  id: string
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  backgroundMedia: {
    type: 'image' | 'video'
    url: string
    alt?: string
    mobileFallback?: string
  }
  overlayOpacity: number // 0-1
  textPosition: 'left' | 'center' | 'right'
}
```

#### Technical Implementation
- **Server Component**: Fetch content from Sanity
- **Client Components**: Only for interactive elements (parallax, video player, CTA button)
- **Animations**: Fade in headline, slide up CTA with stagger
- **Responsive**: Full viewport height on desktop, auto height mobile
- **Performance**: 
  - Lazy load background video
  - Provide image fallback
  - Use priority image loading for hero image
  - AVIF/WebP with fallbacks

#### State Management
- No global state needed
- Local state for video play/pause
- Intersection observer for scroll-triggered animations

#### Performance Considerations
- Preload hero image with `priority` prop
- Use next/image for automatic optimization
- Lazy load video, autoplay on viewport entry
- Implement skeleton loader for CMS content

---

### 4.2 Service Gallery with Pricing

**Purpose:** Showcase all nail services with beautiful imagery, detailed descriptions, and transparent pricing.

#### Component Structure
```
ServicesSection/ (Server Component)
├── SectionHeader
├── ServiceFilters (Client Component)
├── ServiceGrid
│   └── ServiceCard[] (Client Component)
│       ├── ServiceImage
│       ├── ServiceInfo
│       │   ├── Title
│       │   ├── Description
│       │   ├── Duration
│       │   └── Price
│       └── BookButton (Client Component)
└── ServiceModal (Client Component)
    ├── ModalGallery
    ├── DetailedDescription
    ├── PricingTiers
    └── BookingTrigger
```

#### Data Models
```typescript
interface Service {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: PortableText
  category: ServiceCategory
  images: SanityImage[]
  pricing: PricingTier[]
  duration: {
    min: number // minutes
    max: number
  }
  features: string[]
  availability: 'always' | 'appointment' | 'seasonal'
  popularityScore: number // For sorting
  seoMetadata: {
    title: string
    description: string
    keywords: string[]
  }
}

interface PricingTier {
  id: string
  name: string // e.g., "Basic", "Premium", "Deluxe"
  price: number
  description: string
  includes: string[]
}

type ServiceCategory = 
  | 'manicure'
  | 'pedicure'
  | 'nail-art'
  | 'gel-polish'
  | 'extensions'
  | 'spa-treatments'
```

#### API Routes
```
GET /api/services
  - Query params: category, sort, limit
  - Returns: Service[]
  - Caching: ISR with 1 hour revalidation

GET /api/services/[slug]
  - Returns: Service with full details
  - Caching: ISR with 1 hour revalidation
```

#### State Management
```typescript
// Client-side filter state
interface ServiceFilterState {
  category: ServiceCategory | 'all'
  sortBy: 'popular' | 'price-low' | 'price-high' | 'name'
  searchQuery: string
}

// Use URL search params for shareable filters
// Example: /services?category=manicure&sort=price-low
```

#### Performance Considerations
- **Server-side filtering**: Pre-filter services before sending to client
- **Image optimization**: All service images through next/image
- **Lazy loading**: Services below fold with intersection observer
- **Virtual scrolling**: If >50 services, implement virtual list
- **Search**: Client-side fuzzy search with Fuse.js for instant results

#### Animations
- **Card entrance**: Stagger fade-up animation (100ms delay between cards)
- **Hover**: Lift effect + shadow expansion
- **Filter transitions**: Smooth fade-out/in when category changes
- **Modal**: Scale-in from clicked card position

---

### 4.3 Advanced Booking System

**Purpose:** Allow customers to book appointments with real-time availability, service selection, and staff preferences.

#### Component Structure
```
BookingFlow/ (Multi-step wizard)
├── BookingWizard (Client Component - state machine)
│   ├── Step1_ServiceSelection
│   │   ├── ServicePicker
│   │   └── AddOnSelector
│   ├── Step2_DateTimePicker
│   │   ├── CalendarView (Client Component)
│   │   ├── TimeSlotGrid
│   │   └── AvailabilityIndicator
│   ├── Step3_StaffSelection (Optional)
│   │   └── StaffCard[]
│   ├── Step4_CustomerInfo
│   │   └── CustomerForm (react-hook-form + zod)
│   └── Step5_Confirmation
│       ├── BookingSummary
│       ├── PaymentOption
│       └── PolicyAgreement
└── BookingProgressBar
```

#### Data Models
```typescript
interface Booking {
  id: string
  customerId: string | null // null for guests
  services: BookingService[]
  appointmentDateTime: Date
  staffMemberId: string | null // null for "no preference"
  status: BookingStatus
  totalPrice: number
  depositPaid: boolean
  depositAmount: number
  paymentIntentId: string | null // Stripe payment intent
  notes: string | null
  createdAt: Date
  updatedAt: Date
  confirmationToken: string
  reminderSent: boolean
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

interface BookingService {
  serviceId: string
  pricingTierId: string
  duration: number
  price: number
}

type BookingStatus =
  | 'pending'        // Awaiting payment
  | 'confirmed'      // Paid, confirmed
  | 'checked-in'     // Customer arrived
  | 'in-progress'    // Service in progress
  | 'completed'      // Service done
  | 'cancelled'      // Cancelled by customer or salon
  | 'no-show'        // Customer didn't show up

interface TimeSlot {
  startTime: Date
  endTime: Date
  available: boolean
  staffId: string | null
  bufferTime: number // minutes before/after
}

interface StaffMember {
  id: string
  name: string
  role: string
  bio: string
  photo: SanityImage
  specialties: string[]
  availability: StaffAvailability
  bookingPreference: 'preferred' | 'available'
}

interface StaffAvailability {
  [dayOfWeek: string]: {
    isWorking: boolean
    shifts: Array<{
      start: string // "09:00"
      end: string   // "17:00"
    }>
    breaks: Array<{
      start: string
      end: string
    }>
  }
}
```

#### API Routes
```
POST /api/booking/availability
  Body: { serviceIds: string[], date: string, staffId?: string }
  Returns: { timeSlots: TimeSlot[] }
  - Check database for existing bookings
  - Filter by staff availability
  - Calculate duration needed
  - Return available slots

POST /api/booking/create
  Body: BookingCreateRequest
  Returns: { booking: Booking, paymentUrl?: string }
  - Validate availability (double-check)
  - Create booking in database
  - If deposit required, create Stripe payment intent
  - Send confirmation email
  - Return booking details

GET /api/booking/[id]
  Returns: Booking (with all relations)
  - Requires authentication or confirmation token

PATCH /api/booking/[id]
  Body: Partial<Booking>
  Returns: Booking
  - Requires authentication
  - Allow reschedule (check new availability)
  - Send update email

DELETE /api/booking/[id]
  Returns: { success: boolean }
  - Requires authentication or confirmation token
  - Check cancellation policy
  - Process refund if applicable
  - Send cancellation email
```

#### State Management
```typescript
// Booking wizard state (using zustand or React Context)
interface BookingState {
  // Step 1
  selectedServices: Array<{
    serviceId: string
    pricingTierId: string
  }>
  
  // Step 2
  selectedDate: Date | null
  selectedTimeSlot: TimeSlot | null
  
  // Step 3
  selectedStaff: string | null
  
  // Step 4
  customerInfo: CustomerInfo | null
  isAuthenticated: boolean
  
  // Computed
  totalDuration: number
  totalPrice: number
  requiresDeposit: boolean
  depositAmount: number
  
  // Actions
  addService: (serviceId: string, tierId: string) => void
  removeService: (serviceId: string) => void
  setDateTime: (date: Date, slot: TimeSlot) => void
  setStaff: (staffId: string | null) => void
  setCustomerInfo: (info: CustomerInfo) => void
  submitBooking: () => Promise<void>
  reset: () => void
}
```

#### Real-time Availability Algorithm
```typescript
// Pseudocode for availability calculation
async function getAvailableTimeSlots(params: {
  services: Service[]
  date: Date
  staffId?: string
}): Promise<TimeSlot[]> {
  // 1. Get salon operating hours for date
  const salonHours = await getSalonHours(params.date)
  
  // 2. Calculate total duration needed (services + buffer)
  const totalDuration = params.services.reduce(
    (sum, s) => sum + s.duration.max, 0
  ) + BUFFER_TIME
  
  // 3. Get staff availability
  let availableStaff = params.staffId 
    ? [await getStaff(params.staffId)]
    : await getAllAvailableStaff(params.date)
  
  // 4. Get existing bookings for date
  const existingBookings = await getBookingsByDate(params.date)
  
  // 5. Generate potential time slots (15-min intervals)
  const potentialSlots = generateTimeSlots(
    salonHours.open,
    salonHours.close,
    15 // interval in minutes
  )
  
  // 6. Filter out unavailable slots
  const availableSlots = potentialSlots.filter(slot => {
    // Check if slot + duration fits before closing
    const slotEnd = addMinutes(slot.startTime, totalDuration)
    if (slotEnd > salonHours.close) return false
    
    // Check if any staff member is available
    return availableStaff.some(staff => {
      return isStaffAvailable(staff, slot.startTime, slotEnd, existingBookings)
    })
  })
  
  return availableSlots
}
```

#### Performance Considerations
- **Debounced availability checks**: Don't query on every calendar click
- **Optimistic UI**: Show loading states immediately
- **Caching**: Cache availability for 2-3 minutes
- **Date range**: Only fetch 60 days of availability at a time
- **Staff filtering**: Pre-filter staff by service specialty

#### Validation (Zod Schema)
```typescript
const bookingSchema = z.object({
  services: z.array(z.object({
    serviceId: z.string().uuid(),
    pricingTierId: z.string().uuid(),
  })).min(1, 'Select at least one service'),
  
  appointmentDateTime: z.date().refine(
    date => date > new Date(),
    'Appointment must be in the future'
  ),
  
  customerInfo: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  }),
  
  notes: z.string().max(500).optional(),
  
  agreedToPolicy: z.boolean().refine(
    val => val === true,
    'You must agree to the cancellation policy'
  ),
})
```

#### Email Notifications
```typescript
// Email templates using react-email
enum BookingEmailType {
  CONFIRMATION = 'confirmation',
  REMINDER = 'reminder',
  CANCELLATION = 'cancellation',
  RESCHEDULE = 'reschedule',
}

// Sent via Resend
async function sendBookingEmail(
  type: BookingEmailType,
  booking: Booking
) {
  const template = getEmailTemplate(type, booking)
  await resend.emails.send({
    from: 'bookings@luxurynailsalon.com',
    to: booking.customerInfo.email,
    subject: getEmailSubject(type),
    react: template,
  })
}
```

---

### 4.4 Portfolio/Gallery with Filtering

**Purpose:** Showcase nail art and completed work with beautiful grid layout and filtering capabilities.

#### Component Structure
```
PortfolioGallery/ (Server Component)
├── GalleryHeader
├── FilterTabs (Client Component)
│   └── CategoryFilter[]
├── GalleryGrid (Client Component - Masonry layout)
│   └── GalleryItem[] (Client Component)
│       └── GalleryImage (with zoom)
└── LightboxModal (Client Component)
    ├── ImageCarousel
    ├── ImageInfo
    └── RelatedImages
```

#### Data Models
```typescript
interface PortfolioItem {
  id: string
  images: SanityImage[]
  title: string
  description: string
  serviceCategory: ServiceCategory
  tags: string[]
  artistId: string // Staff member who created it
  featured: boolean
  createdAt: Date
  likes: number // For social proof
  instagramUrl?: string
}
```

#### API Routes
```
GET /api/portfolio
  Query: { category?, tags?, limit?, offset? }
  Returns: { items: PortfolioItem[], total: number }
  Caching: ISR with 30 min revalidation
```

#### State Management
```typescript
// Client-side filtering and pagination
interface GalleryState {
  items: PortfolioItem[]
  activeCategory: ServiceCategory | 'all'
  activeTags: string[]
  page: number
  hasMore: boolean
  isLoading: boolean
}
```

#### Technical Implementation
- **Masonry Layout**: Use CSS Grid or react-masonry-css
- **Infinite Scroll**: Intersection observer for lazy loading
- **Image Optimization**: 
  - Thumbnail: 400x400
  - Full: 1200x1200
  - Use blur placeholder
- **Lightbox**: Implement with Framer Motion + focus trap
- **Filtering**: Client-side for instant feedback
- **URL State**: Reflect filters in URL for sharing

#### Performance Considerations
- Lazy load images below fold
- Virtual scrolling for large galleries (>100 items)
- Prefetch next page on scroll approach
- WebP with JPEG fallback

---

### 4.5 Team Section

**Purpose:** Introduce nail technicians and staff with photos, bios, and specialties to build trust and enable staff selection during booking.

#### Component Structure
```
TeamSection/ (Server Component)
├── SectionHeader
├── TeamGrid
│   └── TeamMemberCard[] (Client Component)
│       ├── MemberPhoto
│       ├── MemberInfo
│       │   ├── Name
│       │   ├── Role
│       │   └── Specialties[]
│       └── MemberModal (Client Component)
│           ├── FullBio
│           ├── PortfolioSamples
│           └── BookWithButton
└── TeamCarousel (Client Component - mobile)
```

#### Data Model
```typescript
interface TeamMember {
  id: string
  slug: string
  name: string
  role: string
  bio: PortableText
  photo: SanityImage
  specialties: string[]
  certifications: string[]
  yearsExperience: number
  portfolioHighlights: PortfolioItem[]
  availability: StaffAvailability
  socialMedia: {
    instagram?: string
    portfolio?: string
  }
  featured: boolean
  displayOrder: number
}
```

#### Technical Implementation
- **Server Component**: Fetch all team members
- **Client Components**: Only for modals and carousel
- **Image optimization**: Professional headshots
- **Biography**: Rich text from Sanity
- **Integration**: Link to booking with pre-selected staff

---

### 4.6 Testimonials/Reviews

**Purpose:** Display social proof through customer reviews with ratings, photos, and verified badges.

#### Component Structure
```
TestimonialsSection/ (Server Component)
├── SectionHeader
├── TestimonialCarousel (Client Component)
│   └── TestimonialCard[]
│       ├── Rating (stars)
│       ├── ReviewText
│       ├── CustomerInfo
│       │   ├── Name
│       │   ├── Photo (optional)
│       │   └── VerifiedBadge
│       └── ServiceMentioned
└── ReviewStats
    ├── AverageRating
    ├── TotalReviews
    └── RatingDistribution
```

#### Data Models
```typescript
interface Testimonial {
  id: string
  customerName: string
  customerPhoto?: SanityImage
  rating: number // 1-5
  reviewText: string
  serviceId: string
  verified: boolean // Linked to actual booking
  featured: boolean
  createdAt: Date
  response?: {
    text: string
    respondedAt: Date
    responderId: string
  }
}
```

#### API Routes
```
GET /api/testimonials
  Query: { featured?, limit?, offset? }
  Returns: Testimonial[]
  Caching: ISR with 1 hour revalidation

POST /api/testimonials (authenticated)
  Body: TestimonialCreate
  Returns: Testimonial
  - Requires completed booking
  - Auto-verify if linked to booking
```

#### Technical Implementation
- **Carousel**: Auto-rotate every 5 seconds, pause on hover
- **Star Rating**: Custom SVG icons with half-star support
- **Moderation**: Admin review before publishing
- **Rich Snippets**: Include schema.org markup for SEO

---

### 4.7 Contact Form

**Purpose:** Allow visitors to send inquiries with validation and spam protection.

#### Component Structure
```
ContactForm/ (Client Component)
├── FormFields
│   ├── NameInput
│   ├── EmailInput
│   ├── PhoneInput
│   ├── MessageTextarea
│   └── PreferredContactMethod
├── SpamProtection (Turnstile/reCAPTCHA)
└── SubmitButton
```

#### Data Model
```typescript
interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  preferredContact: 'email' | 'phone'
  status: 'new' | 'read' | 'responded'
  createdAt: Date
  ipAddress: string
  userAgent: string
}
```

#### API Route
```
POST /api/contact
  Body: ContactSubmissionRequest
  Returns: { success: boolean, id: string }
  - Rate limiting: 3 requests per hour per IP
  - Spam check: Cloudflare Turnstile or reCAPTCHA
  - Send email notification to salon
  - Send auto-reply to customer
```

#### Validation Schema
```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  message: z.string().min(10).max(1000),
  preferredContact: z.enum(['email', 'phone']),
  turnstileToken: z.string(),
})
```

#### Rate Limiting
```typescript
// Using Vercel KV or Upstash Redis
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
})

// In API route
const identifier = req.ip ?? 'anonymous'
const { success } = await ratelimit.limit(identifier)
if (!success) {
  return res.status(429).json({ error: 'Too many requests' })
}
```

---

### 4.8 Navigation System

**Purpose:** Intuitive navigation with smooth transitions, mobile menu, and sticky header.

#### Component Structure
```
Navigation/
├── DesktopNav (Server Component)
│   ├── Logo
│   ├── NavLinks[]
│   │   └── DropdownMenu (Client Component)
│   └── CTAButton
└── MobileNav (Client Component)
    ├── Hamburger
    └── MobileMenu
        ├── MobileNavLinks[]
        └── MobileCTA
```

#### Navigation State
```typescript
interface NavState {
  isOpen: boolean // Mobile menu
  activeDropdown: string | null
  isScrolled: boolean // For sticky nav styling
}
```

#### Technical Implementation
- **Sticky Header**: Fixed position when scrolled past 100px
- **Active Link**: Highlight current page
- **Dropdown**: Hover on desktop, click on mobile
- **Mobile Menu**: Slide-in from right with overlay
- **Scroll Lock**: Prevent body scroll when mobile menu open
- **Smooth Scroll**: Anchor links scroll smoothly
- **Logo**: Animated logo that shrinks on scroll

#### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management in dropdowns
- Skip to main content link

---

### 4.9 Additional Features

#### Newsletter Signup
```typescript
interface NewsletterSubscriber {
  id: string
  email: string
  firstName?: string
  source: 'footer' | 'popup' | 'checkout'
  subscribedAt: Date
  active: boolean
}

// API endpoint
POST /api/newsletter/subscribe
  Body: { email: string, firstName?: string }
  Returns: { success: boolean }
  - Validate email
  - Check for duplicates
  - Add to mailing list (Mailchimp/SendGrid)
  - Send welcome email
```

#### Location & Hours
```typescript
interface SalonInfo {
  name: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  phone: string
  email: string
  hours: {
    [dayOfWeek: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
  googleMapsUrl: string
  parkingInfo: string
}
```

#### FAQ Section
```typescript
interface FAQ {
  id: string
  question: string
  answer: PortableText
  category: string
  order: number
}

// Accordion component with search
```

#### Admin Dashboard
```typescript
// Protected routes under /admin
/admin/dashboard          - Overview stats
/admin/bookings          - Manage bookings
/admin/customers         - Customer management
/admin/services          - Edit services
/admin/staff             - Staff management
/admin/portfolio         - Upload portfolio items
/admin/testimonials      - Review/approve reviews
/admin/settings          - Salon settings

// Authentication required
// Role: 'admin' or 'staff'
```

---

## 5. Performance & Optimization Strategy

### 5.1 Image Optimization

**Strategy:**
1. **Use next/image everywhere**: Automatic optimization, lazy loading, responsive images
2. **Format Selection**: AVIF > WebP > JPEG/PNG
3. **Sizing Strategy**:
   - Hero images: 1920x1080 (full width)
   - Service cards: 800x600
   - Portfolio thumbnails: 400x400
   - Team photos: 600x600
   - Thumbnails: 200x200

**Implementation:**
```typescript
// Reusable image component with blur placeholder
<Image
  src={imageUrl}
  alt={alt}
  width={width}
  height={height}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isPriority}
/>
```

**External Images:**
- Cloudinary or Vercel Blob for uploaded images
- Sanity CDN for CMS images (built-in optimization)
- Always specify dimensions to prevent layout shift

### 5.2 Code Splitting Strategy

**Automatic Splitting:**
- Next.js automatically splits by route
- Dynamic imports for heavy components

**Manual Splitting:**
```typescript
// Heavy components loaded only when needed
const BookingWizard = dynamic(
  () => import('@/components/features/booking/BookingWizard'),
  { 
    loading: () => <BookingSkeleton />,
    ssr: false // Client-only if needed
  }
)

const LightboxGallery = dynamic(
  () => import('@/components/features/gallery/LightboxGallery'),
  { ssr: false }
)

// Load calendar only when booking flow starts
const DatePicker = dynamic(
  () => import('react-day-picker'),
  { loading: () => <CalendarSkeleton /> }
)
```

**Third-Party Libraries:**
```typescript
// Load Stripe only on payment page
const StripeWrapper = dynamic(
  () => import('@/components/features/payment/StripeWrapper'),
  { ssr: false }
)

// Framer Motion animations only when element is visible
const AnimatedSection = dynamic(
  () => import('@/components/ui/AnimatedSection')
)
```

### 5.3 SEO Implementation

**Page-Level SEO:**
```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Luxury Nail Salon | Premium Nail Care & Spa Services',
  description: 'Experience luxury nail care with our expert technicians. Offering manicures, pedicures, nail art, and spa treatments in a beautiful, relaxing environment.',
  keywords: ['nail salon', 'manicure', 'pedicure', 'nail art', 'luxury spa'],
  openGraph: {
    title: 'Luxury Nail Salon',
    description: 'Premium nail care and spa services',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Nail Salon',
    description: 'Premium nail care and spa services',
    images: ['/twitter-image.jpg'],
  },
}

// Dynamic metadata for service pages
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getService(params.slug)
  
  return {
    title: `${service.name} | Luxury Nail Salon`,
    description: service.shortDescription,
    openGraph: {
      images: [service.images[0].url],
    },
  }
}
```

**Structured Data (JSON-LD):**
```typescript
// components/JsonLd.tsx
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: 'Luxury Nail Salon',
    image: 'https://luxurynailsalon.com/og-image.jpg',
    '@id': 'https://luxurynailsalon.com',
    url: 'https://luxurynailsalon.com',
    telephone: '+1-555-0123',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main St',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Sitemap:**
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices()
  const portfolioItems = await getAllPortfolioItems()
  
  return [
    {
      url: 'https://luxurynailsalon.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://luxurynailsalon.com/services',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...services.map(service => ({
      url: `https://luxurynailsalon.com/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // ... more pages
  ]
}
```

**Robots.txt:**
```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
    ],
    sitemap: 'https://luxurynailsalon.com/sitemap.xml',
  }
}
```

### 5.4 Loading States Strategy

**Skeleton Screens:**
```typescript
// components/ui/skeletons/
ServiceCardSkeleton.tsx
BookingWizardSkeleton.tsx
GallerySkeleton.tsx
TestimonialSkeleton.tsx

// Use during data fetching
<Suspense fallback={<ServiceCardSkeleton />}>
  <ServiceCard />
</Suspense>
```

**Loading Indicators:**
- Skeleton screens for initial page load
- Spinner for actions (button loading states)
- Progressive loading for galleries
- Optimistic UI for form submissions

**React Suspense:**
```typescript
// app/services/page.tsx
export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesPageSkeleton />}>
      <ServicesContent />
    </Suspense>
  )
}
```

### 5.5 Caching Strategy

**Server-Side:**
```typescript
// ISR (Incremental Static Regeneration)
export const revalidate = 3600 // 1 hour

// On-demand revalidation
import { revalidatePath } from 'next/cache'
revalidatePath('/services')

// Route segment config
export const dynamic = 'force-static' // or 'force-dynamic'
```

**Client-Side:**
```typescript
// React Query for client data fetching
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['services', category],
  queryFn: () => fetchServices(category),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
})
```

**CDN Caching:**
```typescript
// Vercel Edge Caching headers
export async function GET(request: Request) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

### 5.6 Bundle Size Optimization

**Analyze Bundle:**
```bash
npm run build
# Use @next/bundle-analyzer
```

**Optimization Techniques:**
1. Tree-shaking: Import only what you need
2. Code splitting: Dynamic imports
3. Remove unused dependencies
4. Use lighter alternatives (date-fns vs moment)
5. Lazy load below-the-fold content

**Target Metrics:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

---

## 6. Accessibility Compliance Plan

### 6.1 WCAG 2.1 AA Requirements

**Color Contrast:**
- Text: Minimum 4.5:1 ratio for normal text
- Large Text: Minimum 3:1 ratio (18pt+ or 14pt+ bold)
- UI Components: 3:1 ratio for interactive elements

**Implementation:**
```typescript
// Verify contrast ratios in design tokens
// Use online tools: WebAIM Contrast Checker

// Example: Ensure rose-gold on white meets requirements
// Rose gold #b87474 on white #ffffff = 4.8:1 ✓
```

### 6.2 Keyboard Navigation

**Requirements:**
1. All interactive elements must be focusable
2. Focus order must be logical
3. Focus indicators must be visible
4. Keyboard shortcuts for common actions

**Implementation:**
```typescript
// Custom focus styles
/* globals.css */
*:focus-visible {
  outline: 2px solid theme('colors.rose-gold.DEFAULT');
  outline-offset: 2px;
}

// Skip to main content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Trap focus in modals
import { useFocusTrap } from '@/hooks/useFocusTrap'

function Modal() {
  const trapRef = useFocusTrap()
  return <div ref={trapRef}>...</div>
}

// Keyboard event handlers
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Book Now
</button>
```

### 6.3 Screen Reader Support

**Semantic HTML:**
```typescript
// Use proper HTML elements
<nav aria-label="Main navigation">
<main id="main-content">
<article>
<section aria-labelledby="services-heading">
<h2 id="services-heading">Our Services</h2>

// Avoid div/span soup
```

**ARIA Labels:**
```typescript
// Descriptive labels for all interactive elements
<button aria-label="Close modal">
  <XIcon aria-hidden="true" />
</button>

// Image alt text
<Image
  src={service.image}
  alt={`${service.name} - Luxury nail service featuring ${service.description}`}
/>

// Form labels
<label htmlFor="email" className="sr-only">
  Email Address
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}

// Loading states
<div role="status" aria-live="polite">
  {isLoading ? 'Loading services...' : 'Services loaded'}
</div>
```

### 6.4 ARIA Implementation Strategy

**Live Regions:**
```typescript
// Announce dynamic content changes
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// For critical announcements
<div role="alert" aria-live="assertive">
  {error}
</div>
```

**Modal Dialogs:**
```typescript
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Service Details</h2>
  <p id="modal-description">Complete information about...</p>
</div>
```

**Expandable Content:**
```typescript
<button
  aria-expanded={isOpen}
  aria-controls="faq-answer-1"
  onClick={() => setIsOpen(!isOpen)}
>
  {question}
</button>
<div id="faq-answer-1" hidden={!isOpen}>
  {answer}
</div>
```

### 6.5 Form Accessibility

**Requirements:**
- All inputs must have labels
- Error messages must be associated with inputs
- Required fields must be indicated
- Form submission feedback must be announced

**Implementation:**
```typescript
// Accessible form with react-hook-form
<form onSubmit={handleSubmit(onSubmit)}>
  <div>
    <label htmlFor="name" className="required">
      Full Name
      <span aria-label="required">*</span>
    </label>
    <input
      id="name"
      {...register('name')}
      aria-required="true"
      aria-invalid={!!errors.name}
      aria-describedby={errors.name ? 'name-error' : undefined}
    />
    {errors.name && (
      <span id="name-error" role="alert" className="error">
        {errors.name.message}
      </span>
    )}
  </div>
  
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
      <>
        <span className="sr-only">Submitting form...</span>
        <Spinner aria-hidden="true" />
      </>
    ) : (
      'Submit'
    )}
  </button>
</form>
```

### 6.6 Motion & Animation Accessibility

**Respect User Preferences:**
```typescript
// CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// React/Framer Motion
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { x: 100 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

### 6.7 Testing Strategy

**Automated Testing:**
```bash
# Install accessibility testing tools
npm install -D @axe-core/react jest-axe

# Test component accessibility
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

**Manual Testing:**
1. Keyboard navigation test
2. Screen reader test (NVDA, JAWS, VoiceOver)
3. Color contrast verification
4. Zoom test (up to 200%)
5. Browser extension checks (axe DevTools, WAVE)

**Accessibility Checklist:**
- [ ] All images have descriptive alt text
- [ ] All form inputs have labels
- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] ARIA labels are used appropriately
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Links have descriptive text (no "click here")
- [ ] Error messages are associated with form fields
- [ ] Loading states are announced to screen readers
- [ ] Modals trap focus and have close buttons
- [ ] Respect prefers-reduced-motion
- [ ] Tables have proper headers
- [ ] Videos have captions
- [ ] SVG icons have appropriate labels

---

## 7. File & Folder Structure

```
luxury-nail-salon/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── hero-1.jpg
│   │   │   └── hero-1-mobile.jpg
│   │   ├── services/
│   │   ├── team/
│   │   └── favicon/
│   │       ├── favicon.ico
│   │       ├── apple-touch-icon.png
│   │       └── favicon-32x32.png
│   ├── fonts/ (if self-hosting)
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/
│   │   ├── (marketing)/ # Route group for public pages
│   │   │   ├── page.tsx # Homepage
│   │   │   ├── layout.tsx # Marketing layout
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx
│   │   │   │   └── success/
│   │   │   │       └── page.tsx
│   │   │   ├── portfolio/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/ # Route group for authenticated pages
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── bookings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── profile/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── bookings/
│   │   │       │   └── page.tsx
│   │   │       ├── customers/
│   │   │       │   └── page.tsx
│   │   │       ├── services/
│   │   │       │   └── page.tsx
│   │   │       ├── staff/
│   │   │       │   └── page.tsx
│   │   │       ├── portfolio/
│   │   │       │   └── page.tsx
│   │   │       └── settings/
│   │   │           └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── booking/
│   │   │   │   ├── availability/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── create/
│   │   │   │   │   └── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── services/
│   │   │   │   ├── route.ts
│   │   │   │   └── [slug]/
│   │   │   │       └── route.ts
│   │   │   ├── portfolio/
│   │   │   │   └── route.ts
│   │   │   ├── team/
│   │   │   │   └── route.ts
│   │   │   ├── testimonials/
│   │   │   │   └── route.ts
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── newsletter/
│   │   │   │   └── subscribe/
│   │   │   │       └── route.ts
│   │   │   ├── payments/
│   │   │   │   ├── create-intent/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── admin/
│   │   │       └── [...routes]/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx # Root layout
│   │   ├── loading.tsx # Root loading
│   │   ├── error.tsx # Root error
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── providers.tsx # Context providers
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── ui/ # Reusable design system components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Dropdown/
│   │   │   ├── Toast/
│   │   │   ├── Badge/
│   │   │   ├── Spinner/
│   │   │   ├── Skeleton/
│   │   │   ├── Tabs/
│   │   │   ├── Calendar/
│   │   │   └── index.ts
│   │   │
│   │   ├── features/ # Feature-specific components
│   │   │   ├── hero/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HeroBackground.tsx
│   │   │   │   └── HeroCTA.tsx
│   │   │   ├── services/
│   │   │   │   ├── ServiceGrid.tsx
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ServiceFilters.tsx
│   │   │   │   └── ServiceModal.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingWizard.tsx
│   │   │   │   ├── ServiceSelection.tsx
│   │   │   │   ├── DateTimeSelection.tsx
│   │   │   │   ├── StaffSelection.tsx
│   │   │   │   ├── CustomerInfo.tsx
│   │   │   │   ├── BookingSummary.tsx
│   │   │   │   └── AvailabilityCalendar.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── PortfolioGallery.tsx
│   │   │   │   ├── GalleryFilters.tsx
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   └── Lightbox.tsx
│   │   │   ├── team/
│   │   │   │   ├── TeamGrid.tsx
│   │   │   │   ├── TeamMemberCard.tsx
│   │   │   │   └── TeamMemberModal.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── TestimonialCarousel.tsx
│   │   │   │   ├── TestimonialCard.tsx
│   │   │   │   └── ReviewStats.tsx
│   │   │   ├── contact/
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   └── LocationMap.tsx
│   │   │   ├── newsletter/
│   │   │   │   └── NewsletterForm.tsx
│   │   │   └── admin/
│   │   │       ├── BookingManagement.tsx
│   │   │       ├── CustomerList.tsx
│   │   │       └── ServiceEditor.tsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── DesktopNav.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   └── NavDropdown.tsx
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FooterLinks.tsx
│   │   │   │   └── FooterSocial.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   │
│   │   └── shared/ # Shared across features
│   │       ├── JsonLd.tsx
│   │       ├── SocialShare.tsx
│   │       ├── BackToTop.tsx
│   │       └── CookieConsent.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts # Database client
│   │   │   ├── schema.ts # Drizzle schema
│   │   │   └── queries.ts # Reusable queries
│   │   ├── auth/
│   │   │   ├── auth.config.ts
│   │   │   └── auth.ts # NextAuth configuration
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── schemas/
│   │   │       ├── service.ts
│   │   │       ├── teamMember.ts
│   │   │       ├── portfolioItem.ts
│   │   │       └── testimonial.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── utils.ts
│   │   ├── email/
│   │   │   ├── client.ts
│   │   │   └── templates/
│   │   │       ├── booking-confirmation.tsx
│   │   │       ├── booking-reminder.tsx
│   │   │       └── contact-reply.tsx
│   │   ├── validation/
│   │   │   ├── booking.ts # Zod schemas
│   │   │   ├── contact.ts
│   │   │   └── auth.ts
│   │   ├── utils/
│   │   │   ├── cn.ts # Class name merger
│   │   │   ├── date.ts # Date utilities
│   │   │   ├── currency.ts # Price formatting
│   │   │   └── api.ts # API helpers
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── config.ts
│   │       └── animations.ts # Framer Motion variants
│   │
│   ├── hooks/
│   │   ├── useBooking.ts
│   │   ├── useAuth.ts
│   │   ├── useToast.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useFocusTrap.ts
│   │   └── useScrollLock.ts
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── database.ts
│   │   ├── api.ts
│   │   ├── sanity.ts
│   │   └── stripe.ts
│   │
│   ├── styles/
│   │   ├── animations.css
│   │   └── utilities.css
│   │
│   └── middleware.ts # Auth & rate limiting
│
├── sanity/
│   ├── schemas/
│   │   ├── service.ts
│   │   ├── teamMember.ts
│   │   ├── portfolioItem.ts
│   │   ├── testimonial.ts
│   │   └── salonInfo.ts
│   ├── lib/
│   │   └── client.ts
│   └── sanity.config.ts
│
├── drizzle/
│   └── migrations/
│       └── 0000_initial.sql
│
├── tests/
│   ├── unit/
│   │   └── components/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── booking-flow.spec.ts
│
├── .env.example
├── .env.local (git-ignored)
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── drizzle.config.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### 7.1 File Naming Conventions

**Components:**
- PascalCase for component files: `BookingWizard.tsx`
- Index files for component exports: `index.ts`
- Test files alongside components: `Button.test.tsx`
- Stories for Storybook (optional): `Button.stories.tsx`

**Utilities & Hooks:**
- camelCase for utility files: `formatDate.ts`
- Hooks start with `use`: `useBooking.ts`

**API Routes:**
- Route handlers in `route.ts` files
- Follow Next.js conventions

**Types:**
- Interfaces and types in dedicated type files
- Export from index: `types/index.ts`

---

## 8. Database Schema

### 8.1 PostgreSQL Schema (Drizzle ORM)

```typescript
// src/lib/db/schema.ts
import { pgTable, uuid, varchar, text, timestamp, integer, boolean, decimal, jsonb } from 'drizzle-orm/pg-core'

// Users table (handled by NextAuth)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  role: varchar('role', { length: 20 }).default('customer'), // customer, staff, admin
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Customers (extended user info)
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  dateOfBirth: timestamp('date_of_birth'),
  preferences: jsonb('preferences'), // Allergies, preferences, etc.
  loyaltyPoints: integer('loyalty_points').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Staff members (for booking system)
export const staff = pgTable('staff', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  sanityId: varchar('sanity_id', { length: 255 }), // Link to Sanity CMS
  availability: jsonb('availability'), // Weekly schedule
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Bookings
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  staffId: uuid('staff_id').references(() => staff.id),
  appointmentDateTime: timestamp('appointment_date_time').notNull(),
  duration: integer('duration').notNull(), // minutes
  status: varchar('status', { length: 20 }).notNull(), // pending, confirmed, completed, cancelled, no-show
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  depositPaid: boolean('deposit_paid').default(false),
  depositAmount: decimal('deposit_amount', { precision: 10, scale: 2 }),
  paymentIntentId: varchar('payment_intent_id', { length: 255 }),
  notes: text('notes'),
  confirmationToken: varchar('confirmation_token', { length: 255 }).unique(),
  reminderSent: boolean('reminder_sent').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  
  // Guest booking info (if no customerId)
  guestFirstName: varchar('guest_first_name', { length: 100 }),
  guestLastName: varchar('guest_last_name', { length: 100 }),
  guestEmail: varchar('guest_email', { length: 255 }),
  guestPhone: varchar('guest_phone', { length: 20 }),
})

// Booking services (many-to-many)
export const bookingServices = pgTable('booking_services', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
  serviceSanityId: varchar('service_sanity_id', { length: 255 }).notNull(),
  pricingTierId: varchar('pricing_tier_id', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  duration: integer('duration').notNull(),
})

// Contact form submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  message: text('message').notNull(),
  preferredContact: varchar('preferred_contact', { length: 20 }),
  status: varchar('status', { length: 20 }).default('new'), // new, read, responded
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Newsletter subscribers
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }),
  source: varchar('source', { length: 50 }), // footer, popup, checkout
  active: boolean('active').default(true),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
  unsubscribedAt: timestamp('unsubscribed_at'),
})

// Testimonials (user-submitted reviews)
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  bookingId: uuid('booking_id').references(() => bookings.id),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  rating: integer('rating').notNull(), // 1-5
  reviewText: text('review_text').notNull(),
  serviceSanityId: varchar('service_sanity_id', { length: 255 }),
  verified: boolean('verified').default(false),
  featured: boolean('featured').default(false),
  approved: boolean('approved').default(false),
  response: text('response'), // Salon response
  responseDate: timestamp('response_date'),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### 8.2 Database Relationships

```
users (1) ──→ (1) customers
users (1) ──→ (1) staff

customers (1) ──→ (many) bookings
staff (1) ──→ (many) bookings

bookings (1) ──→ (many) bookingServices
bookings (1) ──→ (0..1) testimonials
```

### 8.3 Indexes

```sql
-- Performance indexes
CREATE INDEX idx_bookings_appointment_datetime ON bookings(appointment_date_time);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_staff_id ON bookings(staff_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_confirmation_token ON bookings(confirmation_token);

CREATE INDEX idx_testimonials_approved ON testimonials(approved);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
```

---

## 9. API Architecture

### 9.1 RESTful Conventions

```
GET    /api/resource       - List resources
GET    /api/resource/:id   - Get single resource
POST   /api/resource       - Create resource
PATCH  /api/resource/:id   - Update resource
DELETE /api/resource/:id   - Delete resource
```

### 9.2 Response Format

```typescript
// Success response
{
  success: true,
  data: { /* resource */ },
  meta: {
    timestamp: "2024-01-01T00:00:00Z",
    requestId: "uuid"
  }
}

// Error response
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input data",
    details: [
      {
        field: "email",
        message: "Invalid email format"
      }
    ]
  },
  meta: {
    timestamp: "2024-01-01T00:00:00Z",
    requestId: "uuid"
  }
}
```

### 9.3 Authentication

```typescript
// Protected API routes
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Check role
  if (session.user.role !== 'admin') {
    return new Response('Forbidden', { status: 403 })
  }
  
  // Handle request
}
```

### 9.4 Rate Limiting

```typescript
// Middleware for rate limiting
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```

### 9.5 Error Handling

```typescript
// lib/utils/api.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
  }
}

// In API route
try {
  // Logic
} catch (error) {
  if (error instanceof ApiError) {
    return Response.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        }
      },
      { status: error.statusCode }
    )
  }
  
  // Log unexpected errors
  console.error(error)
  
  return Response.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      }
    },
    { status: 500 }
  )
}
```

---

## 10. Deployment Strategy

### 10.1 Vercel Deployment (Recommended)

**Prerequisites:**
- Vercel account
- GitHub repository
- Environment variables configured

**Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"], // US East
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Environment Variables:**
```bash
# Database
DATABASE_URL=
DIRECT_URL=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=

# Optional
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

### 10.2 Database Setup

**Supabase:**
1. Create project
2. Run migrations: `npx drizzle-kit push:pg`
3. Set up connection pooling
4. Configure backup schedule

### 10.3 CMS Setup

**Sanity Studio:**
1. Deploy studio: `npx sanity deploy`
2. Configure CORS for production domain
3. Set up webhooks for ISR revalidation

### 10.4 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

### 10.5 Monitoring & Analytics

**Vercel Analytics:**
- Enable Web Analytics
- Enable Speed Insights
- Set up custom events

**Error Tracking:**
- Sentry integration for error monitoring
- Custom error boundaries

**Performance Monitoring:**
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Lighthouse CI for performance regression testing

---

## Conclusion

This architecture specification provides a comprehensive blueprint for building a production-ready luxury nail salon website. The stack leverages Next.js 14+ with Turbopack for optimal performance, Sanity CMS for content management, Supabase for database needs, and a carefully designed component system for maintainability and scalability.

Key architectural decisions:
- **Server Components first** for performance
- **Strategic client components** for interactivity
- **Type-safe** throughout with TypeScript and Zod
- **Accessible** following WCAG 2.1 AA standards
- **Performant** with aggressive optimization strategies
- **Scalable** architecture ready for growth

The development team can use this document as a complete reference for implementation, with clear guidelines on component structure, data models, API design, and deployment strategy.