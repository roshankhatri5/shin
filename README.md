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
            'bg-blush text-white hover:bg-blush-600 hover:shadow-lg hover:-translate-y-0.5': variant === 'secondary',
            'border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white': variant === 'outline',
            'text-rose-gold hover:bg-rose-gold-50': variant === 'ghost',
          },
          {
            'px-4 py-2 text-body-sm': size === 'sm',
            'px-6 py-3 text-body': size === 'md',
            'px-8 py-4 text-body-lg': size === 'lg',
          },
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin mr-2">🌀</span>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

CustomButton.displayName = 'CustomButton'

export { CustomButton }
```

### 4. Adding a new page

```tsx
// app/our-team/page.tsx
import { Metadata } from 'next'
import { TeamGrid } from '@/components/features/team/team-grid'
import { Section } from '@/components/layouts/section'
import { sanityFetch } from '@/lib/sanity/fetch'

export const metadata: Metadata = {
  title: 'Our Team | Luxury Nail Salon',
  description: 'Meet our expert nail technicians and stylists'
}

export default async function OurTeamPage() {
  const teamMembers = await sanityFetch({
    query: `*[_type == "teamMember"] | order(displayOrder asc) {
      _id,
      name,
      role,
      bio,
      photo,
      specialties,
      yearsExperience
    }`,
    tags: ['team']
 })

  return (
    <main className="min-h-screen">
      <Section className="py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
            Meet Our Experts
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Our talented team of nail technicians brings years of experience and passion to every service
          </p>
        </div>
        
        <TeamGrid teamMembers={teamMembers} />
      </Section>
    </main>
  )
}
```

## 🎯 Features

### 1. Advanced Booking System
- Real-time availability checking
- Multi-service selection
- Staff preference options
- Deposit and payment processing
- Automated confirmations and reminders
- Cancellation policies

### 2. Service Gallery with Pricing
- Filterable service catalog
- Detailed service descriptions
- Multiple pricing tiers
- Image galleries for each service
- Duration and availability indicators

### 3. Portfolio Showcase
- Masonry-style gallery layout
- Category filtering
- Lightbox viewing experience
- Customer tags and reviews
- Social media integration

### 4. Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible navigation

### 5. Performance Optimized
- Image optimization with next/image
- Code splitting and lazy loading
- Server-side rendering
- Incremental static regeneration
- Caching strategies

### 6. SEO Optimized
- Semantic HTML structure
- Schema.org markup
- Open Graph tags
- Sitemap generation
- Robots.txt configuration

### 7. Admin Dashboard
- Booking management
- Customer information
- Service editing
- Staff scheduling
- Analytics dashboard

## 🔧 Configuration Options

### Environment Variables

The application uses several environment variables for configuration:

#### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string (Supabase)
- `DIRECT_URL`: Direct database connection for serverless functions

#### CMS Configuration
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project identifier
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset name
- `SANITY_API_TOKEN`: API token for content management

#### Authentication
- `NEXTAUTH_URL`: Base URL for authentication
- `NEXTAUTH_SECRET`: Secret for JWT signing
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

#### Payment Processing
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

#### Email Services
- `RESEND_API_KEY`: API key for transactional emails

#### Analytics
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`: Vercel Analytics ID

### Customization Options

#### Theme Configuration
```typescript
// tailwind.config.ts
module.exports = {
 theme: {
    extend: {
      colors: {
        // Custom color palette
        'rose-gold': '#b87474',
        'blush': '#f5a5c1',
        'lavender': '#c6b0da',
        'mint': '#a6d8c7',
        'cream': '#faf8f5',
        'charcoal': '#2d2d2d',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Custom animations, spacing, etc.
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
```

#### API Configuration
```typescript
// lib/api/config.ts
export const API_CONFIG = {
  TIMEOUT: 1000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  HEADERS: {
    'Content-Type': 'application/json',
  },
}
```

## 📚 API Documentation

### Booking API

#### Get Available Time Slots
```
POST /api/booking/availability
```

**Request Body:**
```json
{
  "serviceIds": ["service-uuid", "service-uuid"],
  "date": "2023-12-25",
  "staffId": "staff-uuid" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timeSlots": [
      {
        "startTime": "2023-12-25T10:00:00Z",
        "endTime": "2023-12-25T11:00:00Z",
        "available": true,
        "staffId": "staff-uuid"
      }
    ]
 }
}
```

#### Create Booking
```
POST /api/booking/create
```

**Request Body:**
```json
{
  "services": [
    {
      "serviceId": "service-uuid",
      "pricingTierId": "tier-uuid"
    }
 ],
  "appointmentDateTime": "2023-12-25T10:00:00Z",
  "staffId": "staff-uuid",
  "customerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "notes": "Prefer window seat",
  "agreedToPolicy": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking-uuid",
      "status": "pending",
      "totalPrice": 85.00,
      "depositAmount": 25.50,
      "depositPaid": false,
      "confirmationToken": "token-string"
    },
    "paymentUrl": "https://checkout.stripe.com/pay/..."
  }
}
```

#### Get Booking
```
GET /api/booking/[id]?token=confirmation-token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "booking-uuid",
    "status": "confirmed",
    "services": [...],
    "appointmentDateTime": "2023-12-25T10:00:00Z",
    "staff": {
      "name": "Jane Smith",
      "role": "Senior Technician"
    },
    "customerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
}
```

### Services API

#### Get Services
```
GET /api/services?category=manicure&sort=popular&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "service-uuid",
      "name": "Luxury Gel Manicure",
      "shortDescription": "Premium gel polish application",
      "category": "manicure",
      "pricing": [
        {
          "name": "Standard",
          "price": 45.00
        }
      ],
      "duration": {
        "min": 45,
        "max": 60
      },
      "image": {
        "url": "https://cdn.sanity.io/images/...",
        "alt": "Luxury gel manicure"
      }
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 10
  }
}
```

### Portfolio API

#### Get Portfolio Items
```
GET /api/portfolio?category=gel-polish&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "portfolio-uuid",
      "title": "Rose Gold Elegance",
      "description": "Beautiful rose gold gel manicure",
      "serviceCategory": "gel-polish",
      "images": [
        {
          "url": "https://cdn.sanity.io/images/...",
          "alt": "Rose gold gel manicure"
        }
      ],
      "artistId": "staff-uuid",
      "createdAt": "2023-11-15T10:30:00Z"
    }
  ]
}
```

## 🛠️ Troubleshooting Guide

### Common Issues

#### 1. Environment Variables Not Loading
**Problem:** Environment variables are undefined in the application.

**Solution:**
- Ensure `.env.local` file exists in the root directory
- Verify the file is not committed to Git (check `.gitignore`)
- Restart the development server after adding new variables
- Use `NEXT_PUBLIC_` prefix for client-side accessible variables

#### 2. Database Connection Issues
**Problem:** Cannot connect to the database.

**Solution:**
- Verify `DATABASE_URL` is correctly set in environment variables
- Check that your Supabase project is active and accessible
- Ensure the database credentials are correct
- Test the connection string independently

#### 3. Image Loading Problems
**Problem:** Images are not loading or showing broken links.

**Solution:**
- Verify image domains are added to `next.config.js`:
```js
images: {
 domains: ['cdn.sanity.io', 'res.cloudinary.com'],
  formats: ['image/avif', 'image/webp'],
}
```
- Check that image URLs are properly formatted
- Ensure images are correctly uploaded to Sanity CMS

#### 4. Build Failures
**Problem:** The build process fails with errors.

**Solution:**
- Run `npm run type-check` to identify TypeScript issues
- Check for unused imports or exports
- Verify all dependencies are properly installed
- Ensure all environment variables are set for the build environment

#### 5. Authentication Issues
**Problem:** Authentication is not working as expected.

**Solution:**
- Verify `NEXTAUTH_SECRET` is set correctly
- Check that OAuth provider credentials are valid
- Ensure the callback URLs are properly configured in OAuth providers
- Check that the database connection for NextAuth is working

### Performance Issues

#### 1. Slow Page Loads
- Enable Turbopack: `npm run dev -- --turbo`
- Optimize images with proper dimensions and formats
- Implement code splitting for large components
- Use lazy loading for below-the-fold content

#### 2. Large Bundle Size
- Analyze bundle with `npm run build` and check the output
- Use dynamic imports for heavy components
- Remove unused dependencies
- Implement tree-shaking for utility libraries

### Debugging Tips

#### 1. Enable Debug Logging
Add the following to your environment variables:
```
DEBUG=app:*
LOG_LEVEL=debug
```

#### 2. Check Browser Console
- Look for JavaScript errors
- Check network requests for failures
- Verify API calls are successful

#### 3. Server-Side Logging
Use structured logging in API routes:
```typescript
import { logger } from '@/lib/utils/logger'

export async function POST(request: Request) {
  logger.info('Booking creation request received')
  
  try {
    // Your logic here
    logger.info('Booking created successfully', { bookingId })
  } catch (error) {
    logger.error('Booking creation failed', { error })
    // Handle error
  }
}
```

## 🤝 Contributing

We welcome contributions to improve the Luxury Nail Salon website! Here's how you can contribute:

### Getting Started

1. **Fork the repository**
   - Click the "Fork" button at the top right of this repository
   - Clone your forked repository: `git clone https://github.com/your-username/luxury-nail-salon.git`

2. **Set up the development environment**
   ```bash
   cd luxury-nail-salon
   npm install
   cp .env.example .env.local
   # Configure your environment variables
   npm run dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   ```

### Code Standards

#### TypeScript
- Use strict mode in all files
- Write comprehensive type definitions
- Follow naming conventions (PascalCase for types, camelCase for variables)
- Add JSDoc comments for exported functions and components

#### React Components
- Use functional components with hooks
- Follow the container/presentational pattern
- Keep components focused on a single responsibility
- Use TypeScript interfaces for props

#### Styling
- Use Tailwind CSS utility classes
- Follow the design system tokens
- Maintain consistent spacing and typography
- Use semantic HTML elements

#### File Structure
- Organize components by feature in the `components/features/` directory
- Keep reusable UI components in `components/ui/`
- Place layout components in `components/layouts/`
- Group related files in feature directories

### Development Workflow

1. **Create an issue** (if it doesn't exist)
   - Describe the feature or bug
   - Include any relevant context

2. **Create a pull request**
   - Link to the related issue
   - Provide a clear description of changes
   - Include screenshots if UI changes are made
   - Add tests if applicable

3. **Code review process**
   - All PRs must be reviewed by at least one team member
   - Address any feedback before merging
   - Ensure all checks pass (CI, tests, linting)

### Testing Guidelines

#### Unit Tests
- Write tests for utility functions
- Test custom hooks with React Testing Library
- Use meaningful test descriptions

#### Integration Tests
- Test API routes
- Verify component interactions
- Test form submissions and validations

#### Example Test Structure
```typescript
// hooks/useBooking.test.ts
import { renderHook, act } from '@testing-library/react'
import { useBooking } from '@/hooks/useBooking'

describe('useBooking', () => {
  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useBooking())
    
    expect(result.current.selectedServices).toEqual([])
    expect(result.current.customerInfo).toBeNull()
  })

  it('should add a service to the booking', () => {
    const { result } = renderHook(() => useBooking())
    
    act(() => {
      result.current.addService('service-id', 'tier-id')
    })
    
    expect(result.current.selectedServices).toHaveLength(1)
    expect(result.current.selectedServices[0]).toEqual({
      serviceId: 'service-id',
      pricingTierId: 'tier-id'
    })
  })
})
```

### Commit Message Guidelines

Follow the conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect meaning
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding missing tests or correcting existing tests
- `chore`: Other changes that don't modify src or test files

Examples:
- `feat(booking): add staff selection to booking flow`
- `fix(services): resolve image loading issue on service cards`
- `docs(readme): update installation instructions`

## 📄 License

This project is private and proprietary. All rights reserved.

For licensing inquiries, please contact the development team.

## 🙏 Acknowledgments

- Design inspired by luxury spa and salon aesthetics
- Built with modern web technologies and best practices
- Optimized for performance and accessibility
- Special thanks to the open-source community for the tools and libraries that made this project possible

## 📞 Support

For technical support or questions about the Luxury Nail Salon website:

- **Documentation:** Check this README and the architecture specification document
- **Issues:** Report bugs or request features through GitHub Issues
- **Email:** Contact the development team at [your-email@example.com]

## 🔄 Updates

This project follows semantic versioning. Check the releases page for updates and changelog information.

---

**Need help?** Refer to the architecture specification document in `ARCHITECTURE_SPECIFICATION.md` or contact the development team.