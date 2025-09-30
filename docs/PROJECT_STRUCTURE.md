# Project Structure Documentation

This document provides a comprehensive overview of the Elegant Nails project structure and organization.

## 📋 Table of Contents

- [Root Directory](#root-directory)
- [App Directory](#app-directory)
- [Components Directory](#components-directory)
- [Configuration Files](#configuration-files)
- [Documentation](#documentation)
- [Naming Conventions](#naming-conventions)

## Root Directory

```
elegant-nails/
├── app/                    # Next.js App Router directory
├── components/             # React components
├── docs/                   # Project documentation
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Main project documentation
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## App Directory

The `app/` directory follows Next.js 13+ App Router conventions:

### Page Structure
```
app/
├── globals.css            # Global styles
├── layout.tsx             # Root layout component
├── loading.tsx            # Global loading UI
├── page.tsx               # Home page
├── about/
│   ├── loading.tsx        # About loading UI
│   └── page.tsx           # About page
├── api/
│   └── chat/
│       └── route.ts       # Chat API endpoint
├── booking/
│   ├── loading.tsx
│   └── page.tsx           # Booking page
├── chat/
│   └── page.tsx           # AI Chat page
├── components/
│   └── page.tsx           # Component showcase
├── contact/
│   ├── loading.tsx
│   └── page.tsx           # Contact page
├── faq/
│   ├── loading.tsx
│   └── page.tsx           # FAQ page
├── gift-cards/
│   └── page.tsx           # Gift cards page
├── offers/
│   └── page.tsx           # Special offers page
├── portfolio/
│   ├── loading.tsx
│   └── page.tsx           # Portfolio gallery
└── services/
    ├── loading.tsx
    └── page.tsx           # Services catalog
```

### File Conventions

| File | Purpose | Required |
|------|---------|----------|
| `layout.tsx` | Shared layout for route segment | Optional |
| `page.tsx` | Page component for route | Required |
| `loading.tsx` | Loading UI component | Optional |
| `error.tsx` | Error UI component | Optional |
| `not-found.tsx` | 404 page component | Optional |
| `route.ts` | API route handler | For API routes |

## Components Directory

Organized by feature and reusability:

### Structure
```
components/
├── ui/                    # Base UI components (reusable)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   └── index.ts           # Barrel exports
├── features/              # Feature-specific components
│   ├── about/
│   │   ├── about-page-header.tsx
│   │   ├── about-story.tsx
│   │   ├── team-section.tsx
│   │   └── values-section.tsx
│   ├── booking/
│   │   ├── booking-wizard.tsx
│   │   ├── customer-info.tsx
│   │   ├── date-time-selection.tsx
│   │   ├── service-selection.tsx
│   │   └── technician-selection.tsx
│   ├── contact/
│   │   ├── contact-form.tsx
│   │   └── contact-info.tsx
│   ├── hero/
│   │   └── hero-section.tsx
│   ├── home/
│   │   ├── cta-section.tsx
│   │   ├── features-section.tsx
│   │   ├── services-preview.tsx
│   │   └── testimonials-preview.tsx
│   ├── portfolio/
│   │   ├── portfolio-filters.tsx
│   │   ├── portfolio-grid.tsx
│   │   └── portfolio-lightbox.tsx
│   └── services/
│       ├── pricing-packages.tsx
│       ├── services-grid.tsx
│       └── services-page-header.tsx
└── layouts/               # Layout components
    ├── footer.tsx
    ├── main-layout.tsx
    └── navigation.tsx
```

### Component Categories

#### UI Components (`components/ui/`)
- **Purpose**: Reusable, generic UI components
- **Examples**: Button, Card, Input, Modal
- **Characteristics**:
  - No business logic
  - Highly configurable
  - Design system compliant
  - Exported via barrel file

#### Feature Components (`components/features/`)
- **Purpose**: Feature-specific, domain-aware components
- **Examples**: BookingWizard, ContactForm, HeroSection
- **Characteristics**:
  - Contains business logic
  - May use multiple UI components
  - Specific to application domain

#### Layout Components (`components/layouts/`)
- **Purpose**: Page structure and navigation
- **Examples**: Navigation, Footer, MainLayout
- **Characteristics**:
  - Define page structure
  - Handle routing and navigation
  - Consistent across pages

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES6"],
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
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/hooks/*": ["hooks/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Next.js Configuration (`next.config.js`)
```javascript
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}
```

### Tailwind Configuration (`tailwind.config.ts`)
- **Custom color palette**: Gold, warm grays, ivory
- **Typography scale**: Display, heading, body sizes
- **Custom animations**: Shimmer, glow, float effects
- **Shadow system**: Luxury, elegant, soft variants
- **Design tokens**: Consistent spacing and colors

### ESLint Configuration (`.eslintrc.json`)
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_", 
      "varsIgnorePattern": "^_" 
    }]
  }
}
```

## Library Directory (`lib/`)

### Structure
```
lib/
├── animations.ts          # Framer Motion animation variants
├── utils.ts               # Utility functions
├── constants/             # Application constants
│   ├── availability.ts    # Booking availability data
│   ├── faq.ts            # FAQ content
│   ├── offers.ts         # Special offers data
│   ├── portfolio.ts      # Portfolio items
│   ├── services.ts       # Service definitions
│   ├── team.ts           # Team member data
│   └── testimonials.ts   # Customer testimonials
└── schemas/               # Validation schemas
    └── contact.ts         # Contact form schema
```

### Key Files

#### `lib/utils.ts`
- **cn()**: Tailwind class name merger
- **formatDate()**: Date formatting utilities
- **generateId()**: ID generation helper

#### `lib/animations.ts`
- **staggerContainer**: Container animation variants
- **staggerItem**: Item animation variants
- **hoverLift**: Hover animation effects
- **luxuryTransition**: Premium easing curves

#### `lib/constants/`
- **Centralized data**: All static content and configuration
- **Type-safe**: Full TypeScript interfaces
- **Maintainable**: Single source of truth for content

## Types Directory (`types/`)

### Structure
```
types/
├── index.ts               # Main type exports
└── components.ts          # Component prop interfaces
```

### Type Organization

#### Component Props
```typescript
// types/components.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'elegant'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```

#### Data Models
```typescript
// types/index.ts
export interface Service {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  category: ServiceCategory
  pricing: ServicePricing[]
  duration: { min: number; max: number }
  popular: boolean
  image: string
}
```

## Documentation (`docs/`)

### Structure
```
docs/
├── API_DOCUMENTATION.md     # API endpoints and integration
├── COMPONENT_LIBRARY.md     # Component usage guide
├── CONTRIBUTING.md          # Contribution guidelines
├── DEPLOYMENT.md            # Deployment instructions
└── PROJECT_STRUCTURE.md     # This file
```

### Documentation Standards

1. **Comprehensive Coverage**: All major features documented
2. **Code Examples**: Working examples for all components
3. **Up-to-date**: Documentation updated with code changes
4. **Accessible**: Clear language and good organization

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (`ButtonComponent.tsx`)
- **Pages**: kebab-case directories (`about/`, `gift-cards/`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: camelCase (`serviceData.ts`)

### Code Conventions
- **Components**: PascalCase (`Button`, `HeroSection`)
- **Functions**: camelCase (`handleClick`, `formatPrice`)
- **Variables**: camelCase (`isLoading`, `userEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`ButtonProps`, `Service`)

### CSS Classes
- **Tailwind**: Standard Tailwind utility classes
- **Custom**: kebab-case (`bg-gradient-luxury`)
- **Component**: BEM-like when needed (`.hero-section__title`)

## Asset Organization

### Public Directory
```
public/
├── images/
│   ├── services/          # Service images
│   ├── portfolio/         # Portfolio images
│   ├── team/             # Team member photos
│   └── testimonials/     # Customer photos
├── icons/
│   ├── logo.svg          # Site logo
│   └── favicon.ico       # Site favicon
└── og-image.jpg          # Open Graph image
```

### Image Optimization
- **Next.js Image**: All images use `next/image` component
- **Formats**: AVIF and WebP with fallbacks
- **Remote Patterns**: Configured for Unsplash and other CDNs
- **Responsive**: Multiple sizes for different devices

## Development Workflow

### File Creation Process
1. **Identify Component Type**: UI, Feature, or Layout
2. **Choose Directory**: Based on component type and domain
3. **Create Interface**: Define TypeScript props interface
4. **Implement Component**: Follow component template
5. **Add Documentation**: JSDoc comments and usage examples
6. **Export Component**: Add to barrel file if UI component
7. **Update Documentation**: Add to component library docs

### Code Organization Principles
1. **Separation of Concerns**: Clear boundaries between UI, logic, and data
2. **Reusability**: Components designed for multiple use cases
3. **Maintainability**: Clear structure and comprehensive documentation
4. **Performance**: Optimized imports and lazy loading
5. **Accessibility**: WCAG 2.1 AA compliance throughout

## Best Practices

### Directory Structure
- **Flat when possible**: Avoid deep nesting
- **Group by feature**: Related components together
- **Clear boundaries**: UI vs Feature vs Layout components
- **Barrel exports**: Simplify imports for UI components

### File Organization
- **Single responsibility**: One component per file
- **Co-location**: Related files in same directory
- **Clear naming**: Descriptive and consistent names
- **Index files**: Simplify imports and exports

### Import Organization
```typescript
// 1. React and Next.js
import React from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

// 3. Internal imports (absolute paths)
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Service } from '@/types'

// 4. Relative imports
import './component.css'
```

This structure ensures maintainability, scalability, and developer experience while following Next.js best practices and modern React patterns.