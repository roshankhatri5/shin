'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles, ShieldCheck, Heart } from 'lucide-react'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

const features = [
  {
    id: '1',
    icon: Award,
    title: 'Expert Nail Artists',
    description: 'Our certified technicians bring years of experience and artistic passion to every luxury service.',
  },
  {
    id: '2',
    icon: Sparkles,
    title: 'Premium Products',
    description: 'We exclusively use high-quality, professional-grade products that ensure safety and lasting beauty.',
  },
  {
    id: '3',
    icon: ShieldCheck,
    title: 'Luxury Environment',
    description: 'Step into our elegant sanctuary where every detail is designed for ultimate relaxation and comfort.',
  },
  {
    id: '4',
    icon: Heart,
    title: 'Custom Designs',
    description: 'From classic elegance to bold statements, we create personalized nail art that reflects your unique style.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-white via-pink-50/20 to-blush-50/30">
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
            Why Choose <span className="bg-gradient-to-r from-pink-400 to-blush-500 bg-clip-text text-transparent font-script">Luxury Nail Studio</span>
          </h2>
          <p className="text-body-lg text-warmgray-600 leading-relaxed">
            We're devoted to creating exceptional experiences that celebrate your beauty and style. 
            Every visit is crafted with <span className="text-pink-600 font-medium">professional care, attention to detail, and luxury service</span>
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
                className="bg-gradient-to-br from-white to-pink-50/50 rounded-3xl p-8 h-full border border-pink-200/30 hover:border-pink-300/50 transition-all duration-500 shadow-soft hover:shadow-luxury backdrop-blur-sm"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-pink-100 to-blush-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft">
                    <feature.icon className="w-9 h-9 text-pink-600 group-hover:text-pink-700" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-h4 text-charcoal mb-4 group-hover:text-pink-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-body text-warmgray-600 leading-relaxed">
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