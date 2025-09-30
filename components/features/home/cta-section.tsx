'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold via-blush to-lavender" aria-hidden="true" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-10 h-10 text-white" aria-hidden="true" />
          </motion.div>

          {/* Headline */}
          <h2 className="font-display text-h1 md:text-display-lg text-white mb-6">
            Ready for Your Perfect Nails?
          </h2>

          {/* Description */}
          <p className="text-body-lg md:text-body-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book your appointment today and experience the luxury you deserve. 
            Our expert team is ready to pamper you with exceptional service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking">
              <Button
                size="xl"
                className="bg-white text-rose-gold hover:bg-cream-50 shadow-2xl hover:shadow-luxury-hover hover:scale-105 transition-all duration-300"
              >
                Book Your Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-rose-gold"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-white/80 text-body-sm"
          >
            Walk-ins welcome • Same-day appointments available • Call us at{' '}
            <a href="tel:+15550123456" className="font-semibold hover:underline">
              (555) 012-3456
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}