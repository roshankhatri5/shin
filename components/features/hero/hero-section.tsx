'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem, luxuryTransition } from '@/lib/animations'
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
      {/* Modern Gradient Background with sophisticated design */}
      <div className="absolute inset-0 bg-gradient-to-br from-warmgray-50 via-gold-50 to-warmgray-100" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gold-100/20 to-warmgray-200/30" />

      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #d4a574 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #e6945a 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #c18787 0%, transparent 50%)`
        }} />
      </div>

      {/* Background Decorative Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large floating orbs with parallax */}
        <motion.div
          style={{
            y: y1,
            opacity,
            background: 'linear-gradient(135deg, #d4a574 0%, #e6945a 50%, #c18787 100%)'
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-15 blur-3xl"
        />
        <motion.div
          style={{
            y: y2,
            opacity,
            background: 'linear-gradient(135deg, #c18787 0%, #f2d574 50%, #d4a574 100%)'
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-15 blur-3xl"
        />

        {/* Medium floating elements */}
        <motion.div
          style={{
            y: y3,
            opacity,
            background: 'radial-gradient(circle, #d4a574 0%, transparent 70%)'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full opacity-8 blur-2xl"
        />

        {/* Small decorative particles */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/4 w-4 h-4 text-pink-300 opacity-25"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/4 w-3 h-3 text-blush-300 opacity-30"
        >
          <Star className="w-full h-full" />
        </motion.div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
          {/* Enhanced Modern Badge */}
          <motion.div
            variants={staggerItem}
            className="mb-8"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={luxuryTransition}
          >
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-white/95 to-gold-50/90 backdrop-blur-xl text-charcoal font-heading text-sm font-semibold shadow-luxury border border-gold-200/50 hover:shadow-glow transition-all duration-300">
              <Sparkles className="w-5 h-5 mr-3 text-gold animate-pulse-glow" />
              Premier Nail Artistry & Elegant Spa Experience
            </div>
          </motion.div>

          {/* Enhanced Modern Headline */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal mb-8 leading-tight"
          >
            Experience Sophisticated
            <br />
            <motion.span
              className="text-gradient bg-gradient-to-r from-gold via-gold-400 to-gold-600 bg-clip-text text-transparent"
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
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold-400/20 rounded-lg blur-lg"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.h1>

          {/* Enhanced Modern Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-body-lg md:text-body-xl text-warmgray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Indulge in premium nail care and spa services in our elegantly designed salon.
            <br className="hidden md:block" />
            <span className="text-gold-600 font-medium bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">Where expert craftsmanship meets relaxation and feminine elegance.</span>
          </motion.p>

          {/* Enhanced CTAs with better animations */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={luxuryTransition}
            >
              <Link href="/booking">
                <Button
                  variant="elegant"
                  size="xl"
                  className="shadow-luxury hover:shadow-glow px-12 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white border-0 transform hover:scale-105 transition-all duration-300"
                >
                  ✨ Book Appointment
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={luxuryTransition}
            >
              <Link href="/services">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-gold-400 text-gold-700 hover:bg-gold-400 hover:text-white px-12 py-6 text-lg font-semibold backdrop-blur-sm bg-white/90 rounded-2xl hover:shadow-luxury transform hover:scale-105 transition-all duration-300"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-warmgray"
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.08, y: -3 }}
              transition={luxuryTransition}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-luxury animate-pulse-glow">
                <span className="text-white font-bold text-xl">15+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-gold-600 block">15+</span>
                <span className="text-sm font-medium text-warmgray-600">Years Experience</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-warmgray/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.08, y: -3 }}
              transition={luxuryTransition}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-luxury animate-bounce-soft">
                <span className="text-white font-bold text-xl">5K+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-gold-700 block">5000+</span>
                <span className="text-sm font-medium text-warmgray-600">Happy Clients</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-warmgray/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.08, y: -3 }}
              transition={luxuryTransition}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blush to-pink flex items-center justify-center shadow-elegant">
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
          delay: 2.5,
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-warmgray hover:text-pink transition-all duration-300 group"
        aria-label="Scroll to content"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="text-sm font-heading mb-3 tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Discover More
        </motion.span>
        <div className="relative">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
          >
            <ChevronDown className="w-6 h-6 opacity-40" aria-hidden="true" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          >
            <ChevronDown className="w-6 h-6 text-pink" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>
    </section>
  )
}