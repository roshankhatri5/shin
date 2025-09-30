'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { fadeIn, slideUp } from '@/lib/animations'

export function AboutPageHeader() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-lavender-200 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeIn}
            className="flex items-center justify-center space-x-2 text-body-sm text-charcoal-light mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-rose-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-charcoal font-medium">About Us</span>
          </motion.nav>

          {/* Page Title */}
          <motion.h1
            variants={slideUp}
            className="font-display text-display-lg md:text-display-xl text-charcoal mb-6"
          >
            Meet Our <span className="text-rose-gold">Team</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={slideUp}
            className="text-body-lg md:text-body-xl text-charcoal-light max-w-2xl mx-auto leading-relaxed"
          >
            Behind every beautiful manicure is a passionate team of artists dedicated to 
            making you feel pampered, confident, and absolutely stunning.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}