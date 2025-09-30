import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { MainLayout } from '@/components/layouts/main-layout'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luxury Nail Salon | Premium Nail Care & Spa Services',
    template: '%s | Luxury Nail Salon',
  },
  description: 'Experience luxury nail care with our expert technicians. Offering manicures, pedicures, nail art, and spa treatments in a beautiful, relaxing environment.',
  keywords: ['nail salon', 'manicure', 'pedicure', 'nail art', 'luxury spa', 'nail care', 'beauty salon'],
  authors: [{ name: 'Luxury Nail Salon' }],
  creator: 'Luxury Nail Salon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luxurynailsalon.com',
    siteName: 'Luxury Nail Salon',
    title: 'Luxury Nail Salon | Premium Nail Care & Spa Services',
    description: 'Experience luxury nail care with our expert technicians.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Nail Salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Nail Salon',
    description: 'Premium nail care and spa services',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <ToastProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ToastProvider>
      </body>
    </html>
  )
}