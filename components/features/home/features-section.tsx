'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles, ShieldCheck, Heart } from 'lucide-react'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

const features = [
  {
    id: '1',
    icon: Award,
    title: 'Expert Technicians',
    description: 'Our highly trained professionals bring years of experience and passion to every service.',
  },
  {
    id: '2',
    icon: Sparkles,
    title: 'Premium Products',
    description: 'We use only the finest professional-grade products that are safe, effective, and long-lasting.',
  },
  {
    id: '3',
    icon: ShieldCheck,
    title: 'Relaxing Atmosphere',
    description: 'Escape to our beautifully designed sanctuary where comfort and tranquility await.',
  },
  {
    id: '4',
    icon: Heart,
    title: 'Custom Designs',
    description: 'From classic elegance to trendy art, we bring your nail vision to life with precision.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
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
            Why Choose <span className="text-rose-gold">Luxury Nails</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            We're committed to providing an exceptional experience that combines artistry, 
            hygiene, and relaxation in every visit.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={staggerItem}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={hoverLift}
                className="bg-cream-50 rounded-2xl p-8 h-full border-2 border-transparent hover:border-rose-gold-200 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold-100 to-blush-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-rose-gold" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-h4 text-charcoal mb-3 group-hover:text-rose-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-body text-charcoal-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}