import { ReactNode } from 'react'
import { Navigation } from './navigation'
import { Footer } from './footer'
import { HydrationBoundary } from '@/components/ui/hydration-boundary'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <HydrationBoundary>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-pink-50/30 to-blush-50/20" suppressHydrationWarning>
        <Navigation />
        <main id="main-content" className="flex-1 pt-20" suppressHydrationWarning>
          {children}
        </main>
        <Footer />
      </div>
    </HydrationBoundary>
  )
}