
# Luxury Nail Salon Website

A modern, high-performance website for a luxury nail salon built with Next.js 14+, TypeScript, and Tailwind CSS. This comprehensive solution includes booking systems, service galleries, portfolio showcases, and admin capabilities.

## 🚀 Tech Stack

### Core Framework
- **Next.js 15+** with App Router and Turbopack
- **React 18.3+** with Server Components
- **TypeScript 5.4+** with strict mode

### Styling & UI
- **Tailwind CSS 3.4+** with custom design system
- **Framer Motion 11+** for animations
- **Lucide React** for icons

### Forms & Validation
- **React Hook Form 7+** for form management
- **Zod 3+** for schema validation

### Database & CMS
- **Supabase** (PostgreSQL) with Drizzle ORM
- **Sanity CMS** for content management

### Utilities
- **date-fns** for date manipulation
- **clsx** & **tailwind-merge** for class management
- **Embla Carousel** for carousels

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git
- A code editor (VS Code recommended)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd luxury-nail-salon
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`:

```env
# Database
DATABASE_URL="your_supabase_database_url"
DIRECT_URL="your_supabase_direct_url"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="your_dataset_name"
SANITY_API_TOKEN="your_sanity_api_token"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# Email
RESEND_API_KEY="your_resend_api_key"

# Optional services
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your_analytics_id"
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
luxury-nail-salon/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Global loading state
│   ├── page.tsx           # Homepage
│   ├── about/            # About page
│   ├── booking/          # Booking system
│   ├── contact/          # Contact page
│   ├── services/         # Services page
│   ├── portfolio/        # Portfolio gallery
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                  # Utility functions
│   ├── db/              # Database utilities
│   ├── sanity/          # Sanity CMS utilities
│   ├── stripe/          # Stripe payment utilities
│   ├── utils.ts         # Common utilities
│   └── constants/       # Constants and config
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── public/              # Static assets
│   └── images/         # Image files
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

# Run tests
npm run test

# Format code with Prettier
npm run format

# Run all checks (lint, type-check, test)
npm run check
```

## 🚀 Usage Examples

### 1. Adding a new service

Create a new service in Sanity CMS with the following structure:

```typescript
// Service content type in Sanity
{
  _type: 'service',
  name: 'Luxury Gel Manicure',
  slug: { current: 'luxury-gel-manicure' },
 shortDescription: 'Premium gel polish application with nail care',
  fullDescription: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Experience our premium gel manicure service featuring high-quality products and expert application.'
        }
      ]
    }
 ],
  category: 'manicure',
  images: [/* array of Sanity image objects */],
  pricing: [
    {
      name: 'Standard',
      price: 45,
      description: 'Basic gel application',
      includes: ['Nail shaping', 'Cuticle care', 'Gel polish application']
    },
    {
      name: 'Deluxe',
      price: 65,
      description: 'Premium gel with nail art',
      includes: ['Nail shaping', 'Cuticle care', 'Gel polish application', 'Simple nail art']
    }
  ],
  duration: { min: 45, max: 60 }, // in minutes
 features: ['Organic products', 'Luxury experience', 'Long-lasting'],
  availability: 'always',
  popularityScore: 95
}
```

### 2. Customizing the booking flow

The booking system is built with a multi-step wizard:

```typescript
// Example of booking state management
import { useBooking } from '@/hooks/useBooking'

function BookingPage() {
  const {
    selectedServices,
    selectedDate,
    selectedTimeSlot,
    selectedStaff,
    customerInfo,
    addService,
    removeService,
    setDateTime,
    setStaff,
    setCustomerInfo,
    submitBooking,
    reset
 } = useBooking()

 // Use the state and actions in your component
  return (
    <div className="booking-wizard">
      {/* Step 1: Service Selection */}
      <ServiceSelection 
        selected={selectedServices}
        onSelect={addService}
        onRemove={removeService}
      />
      
      {/* Step 2: Date & Time */}
      <DateTimeSelection 
        date={selectedDate}
        onDateChange={setDateTime}
        availableSlots={/* fetched from API */}
      />
      
      {/* Step 3: Staff Selection */}
      <StaffSelection 
        selected={selectedStaff}
        onSelect={setStaff}
        staff={/* fetched from API */}
      />
      
      {/* Step 4: Customer Information */}
      <CustomerInfo 
        info={customerInfo}
        onChange={setCustomerInfo}
      />
      
      {/* Step 5: Confirmation */}
      <BookingSummary 
        services={selectedServices}
        date={selectedDate}
        time={selectedTimeSlot}
        staff={selectedStaff}
        customer={customerInfo}
        onSubmit={submitBooking}
      />
    </div>
  )
}
```

### 3. Creating a custom UI component

```tsx
// components/ui/CustomButton.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-heading font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center',
          {
            'bg-rose-gold text-white hover:bg-rose-gold-600 hover:shadow-lg hover:-translate-y-0.5': variant === 'primary',
