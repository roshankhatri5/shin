'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Rating } from '@/components/ui/rating'
import { Avatar } from '@/components/ui/avatar'
import { testimonials } from '@/lib/constants/testimonials'
import { cn } from '@/lib/utils'

export function TestimonialsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Get featured testimonials
  const featuredTestimonials = testimonials.filter((t) => t.featured)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredTestimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-h1 md:text-display-lg text-charcoal mb-4">
            What Our <span className="text-rose-gold">Clients Say</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            Don't just take our word for it. Hear from our satisfied clients about their experiences.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {featuredTestimonials[currentIndex] && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-cream-50 to-white rounded-3xl p-8 md:p-12 shadow-lg relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-24 h-24 text-rose-gold" aria-hidden="true" />
                  </div>

                  <div className="relative">
                    {/* Rating */}
                    <div className="mb-6">
                      <Rating value={featuredTestimonials[currentIndex].rating} readonly />
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-body-lg md:text-body-xl text-charcoal leading-relaxed mb-8 italic">
                      "{featuredTestimonials[currentIndex].reviewText}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={featuredTestimonials[currentIndex].image}
                        alt={featuredTestimonials[currentIndex].customerName}
                        size="lg"
                        fallback={featuredTestimonials[currentIndex].customerName.charAt(0)}
                      />
                      <div>
                        <p className="font-heading font-semibold text-charcoal">
                          {featuredTestimonials[currentIndex].customerName}
                        </p>
                        <p className="text-body-sm text-charcoal-light">
                          {featuredTestimonials[currentIndex].service}
                        </p>
                      </div>
                      {featuredTestimonials[currentIndex].verified && (
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-mint-100 text-mint-700 text-body-xs font-semibold">
                            ✓ Verified
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={goToPrevious}
                className="pointer-events-auto -ml-4 md:-ml-6 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-charcoal hover:text-rose-gold transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                onClick={goToNext}
                className="pointer-events-auto -mr-4 md:-mr-6 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-charcoal hover:text-rose-gold transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-300',
                  index === currentIndex
                    ? 'w-8 h-2 bg-rose-gold rounded-full'
                    : 'w-2 h-2 bg-charcoal-light/30 rounded-full hover:bg-rose-gold-300'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-rose-gold mb-2">5.0</div>
            <div className="text-body-sm text-charcoal-light">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-rose-gold mb-2">500+</div>
            <div className="text-body-sm text-charcoal-light">Happy Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-rose-gold mb-2">98%</div>
            <div className="text-body-sm text-charcoal-light">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}