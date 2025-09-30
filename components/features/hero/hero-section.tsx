'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeIn, slideUp, staggerContainer, staggerItem, luxuryTransition } from '@/lib/animations'
import { useRef } from 'react'

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById('features')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50" />

      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #b87474 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #f5a5c1 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #c6b0da 0%, transparent 50%)`
        }} />
      </div>

      {/* Background Decorative Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large floating orbs with parallax */}
        <motion.div
          style={{
            y: y1,
            opacity,
            background: 'linear-gradient(135deg, #b87474 0%, #f5a5c1 50%, #c6b0da 100%)'
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          style={{
            y: y2,
            opacity,
            background: 'linear-gradient(135deg, #c6b0da 0%, #a6d8c7 50%, #b87474 100%)'
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
        />

        {/* Medium floating elements */}
        <motion.div
          style={{
            y: y3,
            opacity,
            background: 'radial-gradient(circle, #b87474 0%, transparent 70%)'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full opacity-10 blur-2xl"
        />

        {/* Small decorative particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/4 w-4 h-4 text-rose-gold-300 opacity-30"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/4 w-3 h-3 text-lavender-300 opacity-40"
        >
          <Star className="w-full h-full" />
        </motion.div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b87474' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
      </div>

      {/* Enhanced Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Enhanced Badge */}
          <motion.div
            variants={staggerItem}
            className="mb-8"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={luxuryTransition}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/90 to-rose-gold-50/80 backdrop-blur-md text-rose-gold font-heading text-sm font-semibold shadow-lg border border-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Premier Nail Artistry & Luxury Spa
            </div>
          </motion.div>

          {/* Enhanced Headline with better typography */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal mb-8 leading-tight"
          >
            Experience Luxury
            <br />
            <motion.span
              className="text-gradient bg-gradient-to-r from-rose-gold via-blush to-lavender bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Nail Artistry
            </motion.span>
          </motion.h1>

          {/* Enhanced Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-body-lg md:text-body-xl text-charcoal-light max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Indulge in premium nail care and spa services in our beautifully designed salon.
            <br className="hidden md:block" />
            <span className="text-rose-gold font-medium">Where expert craftsmanship meets relaxation and elegance.</span>
          </motion.p>

          {/* Enhanced CTAs with better animations */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={luxuryTransition}
            >
              <Link href="/booking">
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-rose-gold to-blush hover:from-rose-gold-600 hover:to-blush-600 text-white shadow-luxury hover:shadow-luxury-hover px-8 py-4 text-lg font-semibold"
                >
                  Book Appointment
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={luxuryTransition}
            >
              <Link href="/services">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/80"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-charcoal-light"
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={luxuryTransition}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-gold to-blush flex items-center justify-center">
                <span className="text-white font-bold text-lg">15+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-rose-gold block">15+</span>
                <span className="text-sm font-medium">Years Experience</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-charcoal-light/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={luxuryTransition}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lavender to-mint flex items-center justify-center">
                <span className="text-white font-bold text-lg">5K+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-lavender block">5000+</span>
                <span className="text-sm font-medium">Happy Clients</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-charcoal-light/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={luxuryTransition}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush to-rose-gold flex items-center justify-center">
                <span className="text-white font-bold text-lg">⭐</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-blush block">5.0</span>
                <span className="text-sm font-medium">Client Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-charcoal-light hover:text-rose-gold transition-all duration-300 group"
        aria-label="Scroll to content"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="text-sm font-heading mb-3 tracking-wide"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Discover More
        </motion.span>
        <div className="relative">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <ChevronDown className="w-6 h-6 opacity-50" aria-hidden="true" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <ChevronDown className="w-6 h-6 text-rose-gold" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-rose-gold/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>
    </section>
  )
}