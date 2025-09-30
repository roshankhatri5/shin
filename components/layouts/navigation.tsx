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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
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
                  'w-8 h-8 transition-all duration-300 group-hover:rotate-12',
                  isScrolled ? 'text-rose-gold' : 'text-white'
                )} 
                aria-hidden="true"
              />
              <span 
                className={cn(
                  'font-display text-2xl font-semibold transition-colors duration-300',
                  isScrolled ? 'text-charcoal' : 'text-white'
                )}
              >
                Luxury Nails
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-heading font-medium text-sm uppercase tracking-wide transition-colors duration-300 relative group',
                    pathname === link.href
                      ? isScrolled 
                        ? 'text-rose-gold' 
                        : 'text-white'
                      : isScrolled
                        ? 'text-charcoal hover:text-rose-gold'
                        : 'text-white/90 hover:text-white'
                  )}
                >
                  {link.label}
                  <span 
                    className={cn(
                      'absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-gold transition-all duration-300 group-hover:w-full',
                      pathname === link.href && 'w-full'
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
                  size="lg"
                  className="bg-rose-gold hover:bg-rose-gold-600 text-white rounded-full shadow-luxury hover:shadow-luxury-hover"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors duration-300',
                isScrolled 
                  ? 'text-charcoal hover:bg-cream-200' 
                  : 'text-white hover:bg-white/10'
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
                damping: 30, 
                stiffness: 300 
              }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles className="w-8 h-8 text-rose-gold" aria-hidden="true" />
                    <span className="font-display text-2xl font-semibold text-charcoal">
                      Luxury Nails
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-charcoal hover:bg-cream-200 transition-colors"
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
                            'block px-4 py-3 rounded-lg font-heading font-medium text-lg transition-colors duration-200',
                            pathname === link.href
                              ? 'bg-rose-gold-50 text-rose-gold'
                              : 'text-charcoal hover:bg-cream-100'
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
                <div className="px-6 py-6 border-t border-cream-200">
                  <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button
                      size="lg"
                      className="w-full bg-rose-gold hover:bg-rose-gold-600 text-white rounded-full shadow-luxury"
                    >
                      Book Appointment
                    </Button>
                  </Link>
                  <p className="mt-4 text-center text-sm text-charcoal-light">
                    Call us: <a href="tel:+15550123" className="text-rose-gold hover:underline">(555) 012-3456</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}