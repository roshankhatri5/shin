# Luxury Nail Salon Website

A modern, high-performance website for a luxury nail salon built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

### Core Framework
- **Next.js 14.2+** with App Router and Turbopack
- **React 18.3+** with Server Components
- **TypeScript 5.4+** with strict mode

### Styling & UI
- **Tailwind CSS 3.4+** with custom design system
- **Framer Motion 11+** for animations
- **Lucide React** for icons

### Forms & Validation
- **React Hook Form 7+** for form management
- **Zod 3+** for schema validation

### Utilities
- **date-fns** for date manipulation
- **clsx** & **tailwind-merge** for class management
- **Embla Carousel** for carousels

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luxury-nail-salon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
luxury-nail-salon/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                  # Utility functions
│   ├── utils.ts         # Common utilities
│   └── constants/       # Constants and config
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── public/              # Static assets
│   └── images/         # Image files
├── styles/              # Additional styles
└── [config files]       # Configuration files
```

## 🎨 Design System

### Color Palette
- **Rose Gold** (#b87474) - Primary brand color
- **Blush Pink** (#f5a5c1) - Secondary color
- **Lavender** (#c6b0da) - Accent color
- **Mint** (#a6d8c7) - Fresh accent
- **Cream** (#faf8f5) - Background
- **Charcoal** (#2d2d2d) - Text

### Typography
- **Display**: Cormorant Garamond (serif)
- **Headings**: Montserrat (sans-serif)
- **Body**: Inter (sans-serif)

### Key Features
- 8px grid system for consistent spacing
- Smooth animations with Framer Motion
- Fully responsive design
- WCAG 2.1 AA accessibility compliant
- Optimized for Core Web Vitals

## 📜 Available Scripts

```bash
# Development with Turbopack (fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🔧 Development

### Using Turbopack
This project is configured to use Turbopack for faster development builds. The `dev` script automatically uses the `--turbo` flag.

### Path Aliases
The project uses TypeScript path aliases for cleaner imports:
- `@/*` - Root directory
- `@/components/*` - Components directory
- `@/lib/*` - Library utilities
- `@/types/*` - Type definitions

Example:
```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
```

### Adding Components
1. Create component in appropriate directory (`ui/`, `features/`, or `layouts/`)
2. Use TypeScript for type safety
3. Follow the naming convention: `ComponentName.tsx`
4. Export from index file if needed

### Styling Guidelines
- Use Tailwind utility classes
- Leverage custom design tokens from `tailwind.config.ts`
- Use the `cn()` utility for conditional classes
- Follow mobile-first responsive design

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

## 🎯 Roadmap

### Phase 1 - Foundation ✅
- [x] Project setup with Next.js 14+
- [x] Design system implementation
- [x] Basic routing structure
- [x] Homepage with hero section

### Phase 2 - Core Features (Upcoming)
- [ ] Service catalog with filtering
- [ ] Booking system integration
- [ ] Team member profiles
- [ ] Portfolio gallery
- [ ] Contact form

### Phase 3 - Advanced Features
- [ ] User authentication
- [ ] Customer dashboard
- [ ] Admin panel
- [ ] Email notifications
- [ ] Payment integration

### Phase 4 - CMS & Backend
- [ ] Sanity CMS integration
- [ ] Database setup (Supabase)
- [ ] API routes
- [ ] Real-time availability

## 📚 Documentation

For detailed technical specifications, see [`ARCHITECTURE_SPECIFICATION.md`](ARCHITECTURE_SPECIFICATION.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Design inspired by luxury spa and salon aesthetics
- Built with modern web technologies and best practices
- Optimized for performance and accessibility

---

**Need help?** Contact the development team or refer to the architecture specification document.