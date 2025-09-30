'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'Team' },
  { href: '/faq', label: 'FAQ' },
  { href: '/offers', label: 'Offers' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/chat', label: 'Bella AI' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-luxury border-b border-pink-300/40 ring-1 ring-pink-200/20'
            : 'bg-gradient-to-b from-white/85 via-white/75 to-white/50 backdrop-blur-lg shadow-lg border-b border-white/30'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              aria-label="Luxury Nail Salon Home"
            >
              <Sparkles 
                className={cn(
                  'w-8 h-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110',
                  isScrolled ? 'text-pink-600' : 'text-charcoal drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
                )} 
                aria-hidden="true"
              />
              <span 
                className={cn(
                  'font-script text-2xl font-semibold transition-all duration-500',
                  isScrolled ? 'text-pink-600' : 'text-charcoal drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]'
                )}
              >
                Luxury Nail Studio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-heading font-medium text-sm uppercase tracking-wide transition-all duration-300 relative group py-2 px-4 rounded-full',
                    pathname === link.href
                      ? isScrolled 
                        ? 'text-pink-700 font-semibold bg-pink-100/80 shadow-soft border border-pink-200/50' 
                        : 'text-charcoal font-semibold bg-white/90 shadow-soft border border-white/60 backdrop-blur-sm'
                      : isScrolled
                        ? 'text-charcoal hover:text-pink-700 hover:bg-pink-50 hover:shadow-soft'
                        : 'text-charcoal/80 hover:text-charcoal hover:bg-white/80 hover:shadow-soft hover:backdrop-blur-sm'
                  )}
                >
                  {link.label}
                  <span 
                    className={cn(
                      'absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-blush-500 transition-all duration-300 group-hover:w-3/4 rounded-full',
                      pathname === link.href && 'w-3/4'
                    )}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link href="/booking">
                <Button
                  variant="girly"
                  size="lg"
                  className="rounded-full shadow-luxury hover:shadow-luxury-hover transform-gpu text-white border-0 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 ring-1 ring-pink-300/30"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-110',
                isScrolled 
                  ? 'text-charcoal hover:bg-pink-50 hover:shadow-soft border border-pink-200/50' 
                  : 'text-charcoal hover:bg-white/80 hover:backdrop-blur-sm border border-white/40 bg-white/60'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                duration: 0.5
              }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-white via-pink-50/70 to-blush-50/50 border-l border-pink-300/40 z-50 lg:hidden shadow-2xl overflow-y-auto backdrop-blur-xl ring-1 ring-pink-200/30"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-pink-300/40 bg-white/80 backdrop-blur-sm">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-8 h-8 text-pink-600 group-hover:rotate-12 transition-transform duration-300 animate-pulse-glow" aria-hidden="true" />
                    <span className="font-script text-2xl font-semibold text-pink-600">
                      Luxury Nail Studio
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-charcoal hover:bg-ivory-100 hover:shadow-soft transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'block px-5 py-4 rounded-xl font-heading font-medium text-lg transition-all duration-300 transform hover:scale-[1.02]',
                            pathname === link.href
                              ? 'bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 shadow-soft border border-pink-200'
                              : 'text-charcoal hover:bg-gradient-to-r hover:from-warmgray-50 hover:to-pink-50 hover:shadow-soft'
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-8 border-t border-pink-300/40 bg-white/60 backdrop-blur-sm">
                  <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="block mb-6">
                    <Button
                      variant="girly"
                      size="lg"
                      fullWidth
                      className="rounded-xl shadow-luxury text-lg py-4 text-white border-0 hover:scale-105 transition-all duration-300"
                    >
                      Book My Appointment
                    </Button>
                  </Link>
                  <div className="text-center space-y-3">
                    <p className="text-sm text-charcoal/70">
                      Call us: <a href="tel:+15550123" className="text-pink hover:text-pink-600 font-medium hover:underline transition-colors">(555) 012-3456</a>
                    </p>
                    <p className="text-xs text-charcoal/60">
                      Experience luxury nail care with us
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}