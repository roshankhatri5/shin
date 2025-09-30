# Component Library Documentation

This document provides comprehensive documentation for all UI components in the Elegant Nails project.

## 📋 Table of Contents

- [Installation](#installation)
- [Core Components](#core-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Design System](#design-system)
- [Usage Examples](#usage-examples)

## Installation

All components are available through the main UI barrel export:

```tsx
import { Button, Card, Modal } from '@/components/ui'
```

## Core Components

### Button

A versatile button component with multiple variants and animations.

**Props:**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'shimmer' | 'glass' | 'gradient' | 'elegant' | 'rose'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}
```

**Basic Usage:**
```tsx
import { Button } from '@/components/ui'

// Primary button
<Button variant="primary" size="md">
  Book Appointment
</Button>

// Button with icon
<Button variant="elegant" leftIcon={<StarIcon />}>
  Add to Favorites
</Button>

// Loading state
<Button loading>
  Processing...
</Button>
```

**Variants:**
- `primary`: Default gold gradient with white text
- `secondary`: Blush gradient with white text
- `outline`: Transparent background with border
- `ghost`: Subtle hover effect, no background
- `elegant`: Sophisticated rose-to-blush gradient
- `shimmer`: Animated shimmer effect

### Card

Flexible card component with multiple variants and animations.

**Props:**
```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'glass-strong' | 'luxury' | 'shimmer' | 'elegant' | 'soft'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  children: React.ReactNode
}
```

**Basic Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

<Card variant="elegant" hover>
  <CardHeader>
    <CardTitle>Service Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Service description goes here...</p>
  </CardContent>
</Card>
```

### Input (Enhanced)

Advanced input component with validation and animations.

**Props:**
```tsx
interface EnhancedInputProps {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'luxury' | 'modern' | 'glass'
  inputSize?: 'sm' | 'md' | 'lg'
}
```

**Usage:**
```tsx
import { EnhancedInput } from '@/components/ui'

<EnhancedInput
  label="Email Address"
  variant="luxury"
  placeholder="you@example.com"
  error={errors.email?.message}
/>
```

### Modal

Accessible modal component with focus management.

**Props:**
```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}
```

**Usage:**
```tsx
import { Modal } from '@/components/ui'

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Booking Confirmation"
  size="md"
>
  <p>Your appointment has been confirmed!</p>
</Modal>
```

## Layout Components

### Navigation

Primary navigation with responsive mobile menu.

**Features:**
- Responsive hamburger menu
- Glass morphism on scroll
- Active state indicators
- Accessibility compliant

### MainLayout

Root layout wrapper for all pages.

**Features:**
- Consistent header and footer
- Toast notifications
- Main content area with proper spacing

### Footer

Site footer with newsletter signup and social links.

**Features:**
- Newsletter subscription form
- Social media links
- Contact information
- Responsive layout

## Feature Components

### HeroSection

Landing page hero with animations and call-to-action.

**Features:**
- Parallax background effects
- Animated text reveals
- Trust indicators
- Responsive design

### BookingWizard

Multi-step booking flow component.

**Steps:**
1. Service selection
2. Date and time selection
3. Technician selection
4. Customer information
5. Booking summary

**Features:**
- Form validation
- Progress indicator
- Step navigation
- Responsive design

### PortfolioGrid

Filterable portfolio gallery.

**Features:**
- Category filtering
- Lightbox viewer
- Lazy loading
- Masonry layout

## Design System

### Color Palette

```css
:root {
  /* Gold Tones */
  --gold-300: #fcd34d;
  --gold-400: #fbbf24;
  --gold-500: #f59e0b;
  --gold-600: #d97706;

  /* Warm Grays */
  --warmgray-50: #fafaf9;
  --warmgray-100: #f5f5f4;
  --warmgray-600: #57534e;

  /* Ivory Base */
  --ivory: #fdf7f0;
}
```

### Typography Scale

```css
/* Display (Headlines) */
.text-display-2xl { font-size: 4.5rem; line-height: 1.1; }
.text-display-xl { font-size: 3.75rem; line-height: 1.1; }
.text-display-lg { font-size: 3rem; line-height: 1.2; }

/* Headings */
.text-h1 { font-size: 2.25rem; line-height: 1.2; }
.text-h2 { font-size: 1.875rem; line-height: 1.3; }
.text-h3 { font-size: 1.5rem; line-height: 1.4; }

/* Body */
.text-body-xl { font-size: 1.25rem; line-height: 1.7; }
.text-body-lg { font-size: 1.125rem; line-height: 1.7; }
.text-body { font-size: 1rem; line-height: 1.7; }
```

### Spacing Scale

```css
/* Custom spacing values */
.space-18 { gap: 4.5rem; }
.space-22 { gap: 5.5rem; }
.space-26 { gap: 6.5rem; }
```

### Shadow System

```css
/* Custom shadows */
.shadow-luxury { box-shadow: 0 10px 40px -10px rgba(212, 165, 116, 0.25); }
.shadow-elegant { box-shadow: 0 4px 20px -4px rgba(193, 135, 135, 0.2); }
.shadow-soft { box-shadow: 0 2px 10px -2px rgba(242, 213, 116, 0.15); }
```

## Usage Examples

### Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EnhancedInput, Button } from '@/components/ui'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters')
})

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EnhancedInput
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
        variant="luxury"
      />
      
      <EnhancedInput
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        variant="luxury"
      />
      
      <Button type="submit" variant="elegant" fullWidth>
        Send Message
      </Button>
    </form>
  )
}
```

### Animated Card Grid

```tsx
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export function ServiceGrid({ services }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={itemVariants}>
          <Card variant="elegant" hover>
            <CardContent>
              <h3 className="text-h4 font-heading">{service.name}</h3>
              <p className="text-body text-warmgray-600">{service.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## Best Practices

### Accessibility

1. **Always provide labels for form inputs**
   ```tsx
   <EnhancedInput label="Email Address" />
   ```

2. **Use semantic HTML elements**
   ```tsx
   <Button as="a" href="/booking">Book Now</Button>
   ```

3. **Include ARIA labels for complex interactions**
   ```tsx
   <Button aria-label="Close modal" onClick={onClose}>
     <X className="w-4 h-4" />
   </Button>
   ```

### Performance

1. **Use React.memo for expensive components**
   ```tsx
   export const ExpensiveComponent = React.memo(({ data }) => {
     // Component logic
   })
   ```

2. **Lazy load images**
   ```tsx
   import Image from 'next/image'
   
   <Image
     src={src}
     alt={alt}
     loading="lazy"
     placeholder="blur"
   />
   ```

### Animations

1. **Respect user preferences**
   ```tsx
   const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   
   <motion.div
     animate={shouldReduceMotion ? {} : { y: -10 }}
   />
   ```

2. **Use consistent timing**
   ```tsx
   const transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
   ```

## Contributing

When adding new components:

1. **Create TypeScript interfaces** for all props
2. **Include JSDoc comments** for complex functions
3. **Add Storybook stories** for visual testing
4. **Include accessibility considerations**
5. **Update this documentation**

Example component structure:
```tsx
/**
 * CustomComponent - Brief description
 * 
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 * @returns JSX element
 */
export const CustomComponent = ({ prop1, prop2 }: CustomComponentProps) => {
  // Component implementation
}
```