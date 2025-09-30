import { Metadata } from 'next'
import { MainLayout } from '@/components/layouts/main-layout'
import { HeroSection } from '@/components/features/hero/hero-section'
import { FeaturesSection } from '@/components/features/home/features-section'
import { ServicesPreview } from '@/components/features/home/services-preview'
import { CTASection } from '@/components/features/home/cta-section'
import { TestimonialsPreview } from '@/components/features/home/testimonials-preview'

export const metadata: Metadata = {
  title: 'Luxury Nail Salon | Premium Nail Care & Spa Services',
  description: 'Experience luxury nail care with our expert technicians. Offering manicures, pedicures, nail art, and spa treatments in a beautiful, relaxing environment.',
}

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CTASection />
      <TestimonialsPreview />
    </MainLayout>
  )
}