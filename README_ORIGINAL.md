# Luxury Nail Salon Website

A modern, high-performance Next.js application for a luxury nail salon. This project focuses on exceptional UI and UX: refined typography, soft gradients, subtle motion, and accessible interactions. It ships with a polished component library, responsive page templates, and a cohesive design system built on Tailwind CSS.


## Highlights (UI/UX First)

- App Router with server components for speed and clean data boundaries
- Cohesive design system and tokens (colors, typography, spacing, shadows, animations)
- Accessible navigation and controls, keyboard and SR-friendly patterns
- Subtle motion with Framer Motion and reduced-motion safeguards
- Production-ready responsive layout and section templates
- Opinionated UI kit: button, card, modal, tabs, tooltip, toast, skeleton, inputs, rating, etc.
- Extensible constants-based content model (services, team, portfolio, FAQs, offers) for quick prototyping


## Tech Stack

- Framework: Next.js 15+, React 18.3+, TypeScript 5.4+
- Styling: Tailwind CSS 3.4+, Tailwind plugins (forms, typography, container-queries)
- Motion & Icons: Framer Motion 11+, Lucide React
- Forms & Validation: React Hook Form 7+, Zod 3+
- Utils: clsx, tailwind-merge, date-fns, Embla Carousel

Note: The repository is frontend-first. Environment variables are scaffolded for future integrations (Sanity, Supabase, NextAuth, Stripe, Resend, Cloudinary) but not all are wired yet in code. See “Roadmap” below.


## Quick Start

1) Install

```bash
npm install
```

2) Run development server

```bash
npm run dev
# http://localhost:3000
```

3) Production build

```bash
npm run build && npm run start
```

4) Useful scripts

- Lint: `npm run lint`
- Type check: `npm run type-check`


## Project Structure

```
app/
  globals.css          # Global base styles and CSS variables
  layout.tsx           # Root layout (fonts, SEO metadata, providers)
  loading.tsx          # Global loading state
  page.tsx             # Homepage
  about/               # Team/Studio page
  booking/             # Booking flow entry (uses hooks/use-booking)
  contact/             # Contact page
  faq/                 # FAQ page
  gift-cards/          # Gift cards page
  offers/              # Offers and promotions
  portfolio/           # Portfolio gallery
  services/            # Services listing and detail

components/
  layouts/             # Navigation, footer, page frames
  features/            # Hero, home sections, services/portfolio blocks, etc.
  ui/                  # Reusable UI components (buttons, cards, inputs, modal...)

hooks/
  use-booking.ts       # Booking state (selection, time, staff, customer info)

lib/
  animations.ts        # Motion presets
  constants/           # Content seeds: services, team, portfolio, offers, faq, etc.
  schemas/             # Zod schemas (e.g., contact form)
  utils.ts             # Utilities (cn, etc.)

tailwind.config.ts     # Design tokens and extended theme (colors, fonts, motion)
next.config.js         # Images config, experimental (Turbopack)
```


## Design System and UX

This project ships with a thoughtful brand and interaction language.

- Colors: Rose Gold (primary), Blush (secondary), Lavender, Mint, Cream, Charcoal with fine-grained scales (50–950). See tailwind.config.ts for tokens and globals.css for CSS variables.
- Typography: Display (Cormorant Garamond), Headings (Montserrat), Body (Inter). Fonts are preloaded via next/font in app/layout.tsx.
- Spacing & Layout: Enhanced containers, section paddings, grid utilities (grid-luxury, grid-luxury-2/4), content spacing helpers.
- Shadows & Surfaces: Glass morphism, luxury shadows, metallic accents (tailwind.config.ts and globals.css).
- Motion: fade, slide, scale, shimmer, gradient, float, glow. Motion respects prefers-reduced-motion.
- Accessibility: Focus-visible rings, sr-only helpers, semantic navigation with aria labels, keyboard-operable mobile menu.

Design tokens live in two places:
- Tailwind tokens: tailwind.config.ts (colors, font families, sizes, animations, shadows)
- CSS variables: app/globals.css (brand hues, fonts, focus styles)

You can theme the app by changing these tokens; component styles consume them via Tailwind classes.


## UI Kit (Usage Cookbook)

All exports from components/ui are designed to be accessible and composable. A few examples:

1) Buttons

```tsx
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function CTA() {
  return (
    <div className="space-x-3">
      <Button size="lg">Book Now</Button>
      <Button variant="outline">View Services</Button>
      <Button variant="ghost">Learn More</Button>
      <Button variant="shimmer" rightIcon={<Sparkles className="w-4 h-4" />}>Premium</Button>
    </div>
  )
}
```

Variants: primary (default), secondary, outline, ghost, link, shimmer, glass, gradient. Sizes: xs, sm, md, lg, xl. All buttons support loading state and optional left/right icons.

2) Cards

```tsx
import { Card } from '@/components/ui/card'

<Card className="card-luxury">
  <div className="p-6">
    <h3 className="text-h4 mb-2">Luxury Gel Manicure</h3>
    <p className="text-charcoal/70">Premium gel application with nail care.</p>
  </div>
</Card>
```

3) Modal

```tsx
import { useState } from 'react'
import { Modal } from '@/components/ui/modal'

export function BookingPolicy() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="btn btn-outline" onClick={() => setOpen(true)}>View Policy</button>
      <Modal open={open} onOpenChange={setOpen} title="Booking Policy">
        <p className="text-body">A 30% deposit may be required for select services.</p>
      </Modal>
    </>
  )
}
```

4) Tabs, Tooltip, Toast

- Tabs: components/ui/tabs.tsx for segmented content
- Tooltip: components/ui/tooltip.tsx for helpful hints
- Toast: components/ui/toast.tsx with provider wired in app/layout.tsx

5) Skeleton & Spinner

```tsx
import { Skeleton } from '@/components/ui/skeleton'

<div className="space-y-3">
  <Skeleton className="h-6 w-2/3" />
  <Skeleton className="h-6 w-1/2" />
  <Skeleton className="h-40 w-full rounded-xl" />
</div>
```

6) Form Field with React Hook Form + Zod

```tsx
'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/ui/form-field'

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

type Values = z.infer<typeof Schema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(Schema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(console.log)}>
      <FormField label="Name" error={errors.name?.message}>
        <input {...register('name')} className="input" />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" className="input" />
      </FormField>
      <FormField label="Message" error={errors.message?.message}>
        <textarea {...register('message')} rows={4} className="textarea" />
      </FormField>
      <button className="btn btn-primary" disabled={isSubmitting}>Send</button>
    </form>
  )
}
```


## Page Templates and Patterns

The homepage composes polished, reusable sections:

- HeroSection: Immersive intro with gradient text and motion
- FeaturesSection: Value highlights
- ServicesPreview: Curated services grid
- CTASection: Primary CTA block
- TestimonialsPreview: Social proof

Navigation (components/layouts/navigation.tsx):
- Sticky header with scroll-aware surface and shadow
- Keyboard and screen-reader friendly links
- Animated mobile menu (framer-motion) with overlay, focus management, aria attributes

Main layout (components/layouts/main-layout.tsx):
- Header + footer composition
- Content container helpers


## Content Model (No CMS Needed to Start)

The app ships with constants you can edit immediately without a CMS:
- lib/constants/services.ts
- lib/constants/portfolio.ts
- lib/constants/team.ts
- lib/constants/faq.ts
- lib/constants/offers.ts
- lib/constants/testimonials.ts

Update these to change content surfaced by the sections and pages. This makes prototyping extremely fast.


## Booking Experience (Prototype)

The booking area uses a dedicated hook (hooks/use-booking.ts) to manage booking state:
- Selected services and tiers
- Preferred date/time and staff
- Customer info and notes

You can integrate a real backend later (see Roadmap). The UI patterns (multi-step flows, summary/confirmation) are ready to extend.


## Accessibility (WCAG 2.1 AA minded)

- Use semantic HTML and native controls where possible
- Visible focus states via Tailwind and :focus-visible
- sr-only utilities for off-screen labels
- Reduced motion support (globals.css disables animations when users prefer less motion)
- Sufficient color contrast and large tap targets

Checklist for new components:
- Keyboard operable (Tab/Shift+Tab, Space/Enter)
- ARIA attributes only when necessary, and kept in sync
- Label elements correctly associated with inputs


## Performance and SEO

- Server Components by default for minimal JS
- next/image configured in next.config.js with remote patterns
- Code-splitting and lazy patterns available via dynamic imports
- Typography with next/font to avoid layout shift
- Metadata configured in app/layout.tsx (Open Graph, Twitter, robots)

Budgets (guidelines):
- Aim for < 100KB JS on first load for a typical page
- Image widths sized responsively; prefer AVIF/WebP
- Avoid heavy client-side libraries in Server Components


## Theming and Branding

- Tailwind tokens: edit colors, font families, sizes, shadows, and animations in tailwind.config.ts
- CSS variables: brand hues and focus styles in app/globals.css
- Icons: lucide-react for a clean, consistent iconography set
- Gradients: .text-gradient, .text-gradient-luxury and bg-luxury-gradient utilities

To rebrand quickly:
1) Update rose-gold/blush/lavender/mint scale values in tailwind.config.ts
2) Adjust CSS variables in globals.css
3) Swap brand text and favicon/og images in public/


## Environment Variables (Scaffolded)

Copy and fill as needed for future integrations:

```bash
cp .env.example .env.local
```

Common variables included (optional/planned):
- Sanity (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN)
- Database (DATABASE_URL, DIRECT_URL)
- Auth (NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- Payments (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
- Email (RESEND_API_KEY)
- Media (CLOUDINARY_*)
- Analytics (NEXT_PUBLIC_VERCEL_ANALYTICS_ID)


## Roadmap

- Connect real data sources (Sanity for content, Supabase/Postgres for bookings)
- Add authentication (NextAuth) and role-based admin area
- Stripe checkout flow for deposits and gift cards
- Email / SMS notifications (Resend, Twilio)
- Internationalization (i18n) and RTL support
- Visual regression and unit tests (Playwright/RTL)


## Troubleshooting

- Images not loading? Check next.config.js `images.domains` and `remotePatterns`
- Styles not updating? Ensure Tailwind content paths include app/, components/
- Animations too strong? Use reduced motion media queries or switch to more subtle presets
- Type issues? Run `npm run type-check` for detailed diagnostics


## Contributing

- Branch from main: `git checkout -b feat/<name>`
- Keep PRs small and focused, include before/after screenshots for UI changes
- Follow Tailwind utility-first conventions and reuse design tokens
- Add ARIA and keyboard interactions for any new interactive components


## License

This project is private and proprietary. All rights reserved.


## Credits

- Aesthetics inspired by luxury spa and salon brands
- Built with Next.js, Tailwind CSS, Framer Motion, and the open-source ecosystem

---

Tip: Explore ARCHITECTURE_SPECIFICATION.md for a deep technical dive.
