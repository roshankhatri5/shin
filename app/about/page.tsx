import { Metadata } from 'next'
import { AboutPageHeader } from '@/components/features/about/about-page-header'
import { AboutStory } from '@/components/features/about/about-story'
import { TeamSection } from '@/components/features/about/team-section'
import { ValuesSection } from '@/components/features/about/values-section'

export const metadata: Metadata = {
  title: 'About Us & Our Team | Luxury Nail Salon',
  description: 'Meet our talented team of nail technicians and learn about our commitment to excellence in nail care and customer service.',
}

export default function AboutPage() {
  return (
    <>
      <AboutPageHeader />
      <AboutStory />
      <TeamSection />
      <ValuesSection />
    </>
  )
}