'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@/lib/animations'

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('features')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-rose-gold-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-lavender-200 rounded-full opacity-20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-rose-gold font-heading text-sm font-semibold shadow-md">
              ✨ Premier Nail Artistry
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal mb-6"
          >
            Experience Luxury
            <br />
            <span className="text-rose-gold">Nail Artistry</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-body-lg md:text-body-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Indulge in premium nail care and spa services in our beautifully designed salon. 
            Where expert craftsmanship meets relaxation and elegance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/booking">
              <Button
                size="xl"
                className="bg-rose-gold hover:bg-rose-gold-600 text-white shadow-luxury hover:shadow-luxury-hover"
              >
                Book Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
              >
                View Services
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-8 text-charcoal-light"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-rose-gold">15+</span>
              <span className="text-sm">Years Experience</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-charcoal-light/30" aria-hidden="true" />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-rose-gold">5000+</span>
              <span className="text-sm">Happy Clients</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-charcoal-light/30" aria-hidden="true" />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-rose-gold">⭐ 5.0</span>
              <span className="text-sm">Client Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-charcoal-light hover:text-rose-gold transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-heading mb-2">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  )
}