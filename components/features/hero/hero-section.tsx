'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem, luxuryTransition } from '@/lib/animations'
import { useRef } from 'react'
import { ClientOnly } from '@/components/ui/client-only'

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
    <ClientOnly fallback={
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sweet-dreams">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/95 backdrop-blur-xl text-charcoal font-heading text-sm font-semibold shadow-luxury border border-pink-300/50 ring-1 ring-pink-200/30 mb-8">
              <Sparkles className="w-5 h-5 mr-3 text-pink-600" />
              Premier Nail Artistry & Luxury Spa Experience
            </div>
            <h1 className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal mb-8 leading-tight">
              Experience Luxury
              <br />
              <span className="text-gradient bg-gradient-to-r from-pink-500 via-pink-600 to-blush-600 bg-clip-text text-transparent">
                Nail Artistry
              </span>
            </h1>
          </div>
        </div>
      </section>
    }>
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* Enhanced Feminine Gradient Background */}
      <div className="absolute inset-0 bg-sweet-dreams" />
      <div className="absolute inset-0 bg-gradient-radial from-white/90 via-pink-50/40 to-blush-50/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-50/30 via-transparent to-white/60" />

      {/* Enhanced Background Pattern with better visibility */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #e91e63 0%, transparent 60%),
                           radial-gradient(circle at 80% 20%, #f472b6 0%, transparent 60%),
                           radial-gradient(circle at 60% 80%, #f43f5e 0%, transparent 60%),
                           radial-gradient(circle at 30% 70%, #ffdf44 0%, transparent 60%)`
        }} />
      </div>

      {/* Background Decorative Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large floating orbs with parallax */}
        <motion.div
          style={{
            y: y1,
            opacity,
            background: 'linear-gradient(135deg, #e91e63 0%, #f472b6 50%, #f43f5e 100%)'
          }}
          className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-15 blur-3xl"
        />
        <motion.div
          style={{
            y: y2,
            opacity,
            background: 'linear-gradient(135deg, #f43f5e 0%, #ffdf44 50%, #f472b6 100%)'
          }}
          className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full opacity-15 blur-3xl"
        />
        <motion.div
          style={{
            y: y3,
            opacity,
            background: 'linear-gradient(135deg, #ffdf44 0%, #e91e63 50%, #f472b6 100%)'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full opacity-12 blur-2xl"
        />

        {/* Medium floating elements */}
        <motion.div
          style={{
            y: y3,
            opacity,
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)'
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
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full opacity-5 blur-2xl"
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
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/95 backdrop-blur-xl text-charcoal font-heading text-sm font-semibold shadow-luxury border border-pink-200/50 ring-1 ring-pink-100/30">
              <Sparkles className="w-5 h-5 mr-3 text-pink animate-pulse-glow" />
              Premium Nail Art & Luxury Spa Experience
            </div>
          </motion.div>

          {/* Enhanced Modern Headline */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-charcoal mb-8 leading-tight relative"
          >
            <span className="relative z-10 font-script text-pink-600">Experience Luxury</span>
            <br />
            <motion.span
              className="relative z-10 text-gradient bg-gradient-to-r from-pink-500 via-blush-400 to-rose-400 bg-clip-text text-transparent"
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
              className="absolute -inset-2 bg-gradient-to-r from-gold/15 via-gold-400/20 to-gold-600/15 rounded-2xl blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.h1>

          {/* Enhanced Modern Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-body-lg md:text-body-xl text-warmgray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Step into our dreamy sanctuary where every detail sparkles with femininity and grace.
            <br className="hidden md:block" />
            <span className="text-pink-600 font-medium bg-gradient-to-r from-pink-500 to-blush-500 bg-clip-text text-transparent font-script text-xl">✨ Where girly dreams come true through exquisite nail artistry ✨</span>
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
                  variant="girly"
                  size="xl"
                  className="shadow-luxury hover:shadow-luxury-hover px-12 py-6 text-lg font-semibold rounded-2xl text-white border-0 transform hover:scale-105 transition-all duration-300 ring-2 ring-pink-300/30 hover:ring-pink-400/40"
                >
                  💖 Book My Dream Appointment 💖
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
                  variant="dreamy"
                  className="border-2 border-pink-300 px-12 py-6 text-lg font-semibold backdrop-blur-sm rounded-2xl hover:shadow-luxury transform hover:scale-105 transition-all duration-300 ring-1 ring-pink-200/30 hover:ring-pink-300/50"
                >
                  🌸 Explore Our Magic 🌸
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-blush-500 flex items-center justify-center shadow-luxury ring-2 ring-pink-300/30">
                <span className="text-white font-bold text-xl">15+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-pink-600 block">15+</span>
                <span className="text-sm font-medium text-warmgray-700">Years of Girly Glam</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-warmgray/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.08, y: -3 }}
              transition={luxuryTransition}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush-400 to-pink-500 flex items-center justify-center shadow-luxury ring-2 ring-blush-300/30">
                <span className="text-white font-bold text-xl">5K+</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-blush-600 block">5000+</span>
                <span className="text-sm font-medium text-warmgray-700">Beautiful Queens</span>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-warmgray/30 to-transparent" aria-hidden="true" />

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.08, y: -3 }}
              transition={luxuryTransition}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-luxury ring-2 ring-rose-300/30">
                <span className="text-white font-bold text-lg">💕</span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold text-rose-600 block">5.0</span>
                <span className="text-sm font-medium text-warmgray-700">Love Rating</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-warmgray-600 hover:text-gold-600 transition-all duration-300 group"
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
    </ClientOnly>
  )
}