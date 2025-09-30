'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, Users } from 'lucide-react'

export function AboutStory() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-h1 md:text-display-lg text-charcoal mb-6">
              Our <span className="text-rose-gold">Story</span>
            </h2>
            
            <div className="space-y-4 text-body-lg text-charcoal-light leading-relaxed">
              <p>
                Founded in 2009, Luxury Nail Salon began with a simple vision: to create 
                a space where artistry meets relaxation, and every client leaves feeling 
                beautiful and rejuvenated.
              </p>
              
              <p>
                What started as a small boutique salon has grown into a beloved destination 
                for nail care enthusiasts. Our commitment to excellence, attention to detail, 
                and genuine care for our clients has been the foundation of our success.
              </p>
              
              <p>
                Today, we're proud to offer a comprehensive range of premium services delivered 
                by a team of highly skilled technicians who share our passion for nail artistry. 
                Every visit is an experience crafted with care, precision, and creativity.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-gold mb-1">15+</div>
                <div className="text-body-sm text-charcoal-light">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-gold mb-1">5000+</div>
                <div className="text-body-sm text-charcoal-light">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-gold mb-1">50K+</div>
                <div className="text-body-sm text-charcoal-light">Services</div>
              </div>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-rose-gold-100 via-blush-100 to-lavender-100 rounded-3xl p-8 lg:p-12">
              {/* Decorative Elements */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-gold-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-charcoal mb-1">
                      Passion for Excellence
                    </h3>
                    <p className="text-body-sm text-charcoal-light">
                      Every detail matters in our pursuit of perfection
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blush" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-charcoal mb-1">
                      Creative Artistry
                    </h3>
                    <p className="text-body-sm text-charcoal-light">
                      Transforming nails into works of art
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-lavender-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-lavender" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-charcoal mb-1">
                      Community Focus
                    </h3>
                    <p className="text-body-sm text-charcoal-light">
                      Building lasting relationships with our clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}