import { Metadata } from 'next'
import { ServicesPageHeader } from '@/components/features/services/services-page-header'
import { ServicesGrid } from '@/components/features/services/services-grid'
import { PricingPackages } from '@/components/features/services/pricing-packages'

export const metadata: Metadata = {
  title: 'Our Services | Luxury Nail Salon',
  description: 'Explore our comprehensive range of nail services including manicures, pedicures, nail art, gel polish, extensions, and spa treatments.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesPageHeader />
      <ServicesGrid />
      <PricingPackages />
    </>
  )
}