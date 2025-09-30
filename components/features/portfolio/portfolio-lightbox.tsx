'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/constants/portfolio'
import { Badge } from '@/components/ui/badge'

interface PortfolioLightboxProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function PortfolioLightbox({ item, isOpen, onClose, onNext, onPrevious }: PortfolioLightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50"
            onClick={onClose}
          />

          {/* Lightbox Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 text-charcoal" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-charcoal" />
              </button>

              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-charcoal" />
              </button>

              <div className="grid md:grid-cols-2 gap-0 h-full max-h-[90vh]">
                {/* Image Section */}
                <div className="relative bg-cream h-full min-h-[300px] md:min-h-[500px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Details Section */}
                <div className="p-8 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <Badge variant="info" className="mb-3">
                        {item.category}
                      </Badge>
                      <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-3">
                        {item.title}
                      </h2>
                      <p className="text-charcoal-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="pt-4">
                        <h3 className="font-heading text-sm font-semibold text-charcoal mb-2 uppercase tracking-wide">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-cream-100 text-charcoal-light text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-6 border-t border-cream-200">
                      <p className="text-sm text-charcoal-light mb-4">
                        Love this design? Book an appointment to recreate it or create your own custom look!
                      </p>
                      <a
                        href="/booking"
                        className="inline-block px-8 py-3 bg-rose-gold hover:bg-rose-gold-600 text-white font-heading font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}