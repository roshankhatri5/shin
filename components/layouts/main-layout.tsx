import { ReactNode } from 'react'
import { Navigation } from './navigation'
import { Footer } from './footer'
import { ToastProvider } from '@/components/ui/toast'
import { AIChatbot } from '@/components/ui/ai-chatbot'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-ivory">
        <Navigation />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </ToastProvider>
  )
}