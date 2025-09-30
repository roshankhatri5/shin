import { ReactNode } from 'react'
import { Navigation } from './navigation'
import { Footer } from './footer'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-soft" suppressHydrationWarning>
      <Navigation />
      <main id="main-content" className="flex-1 pt-20" suppressHydrationWarning>
        {children}
      </main>
      <Footer />
    </div>
  )
}