'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles, ShieldCheck, Heart, Home, Smile } from 'lucide-react'
import { salonValues } from '@/lib/constants/team'
import { staggerContainer, staggerItem } from '@/lib/animations'

const iconMap = {
  award: Award,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  heart: Heart,
  home: Home,
  smile: Smile,
}

export function ValuesSection() {
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
            Why Choose <span className="text-rose-gold">Us</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            We're committed to providing an exceptional experience that goes beyond beautiful nails.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {salonValues.map((value) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Sparkles

            return (
              <motion.div
                key={value.id}
                variants={staggerItem}
                className="group"
              >
                <div className="bg-cream-50 rounded-2xl p-8 h-full hover:bg-gradient-to-br hover:from-rose-gold-50 hover:to-blush-50 transition-all duration-300 border-2 border-transparent hover:border-rose-gold-200">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold-100 to-blush-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-rose-gold" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-h4 text-charcoal mb-3 group-hover:text-rose-gold transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-body text-charcoal-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-body-lg text-charcoal-light mb-6">
            Ready to experience the difference?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-gold text-white font-heading font-semibold hover:bg-rose-gold-600 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Your Appointment
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-rose-gold text-rose-gold font-heading font-semibold hover:bg-rose-gold hover:text-white transition-all duration-300"
            >
              Explore Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}