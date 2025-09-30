'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { services } from '@/lib/constants/services'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

export function ServicesPreview() {
  // Get popular services (limited to 6)
  const popularServices = services.filter((service) => service.popular).slice(0, 6)

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-cream-50">
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
            Our <span className="text-rose-gold">Signature Services</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            Discover our most popular treatments, crafted to perfection by our expert technicians.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {popularServices.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover="hover"
              className="group"
            >
              <Link href={`/services/${service.slug}`}>
                <motion.div
                  variants={hoverLift}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-rose-gold-100 to-blush-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">💅</div>
                    </div>
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-rose-gold text-white">Popular</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-heading text-h4 text-charcoal mb-2 group-hover:text-rose-gold transition-colors duration-300">
                        {service.name}
                      </h3>
                      <p className="text-body-sm text-charcoal-light mb-4 line-clamp-2">
                        {service.shortDescription}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-body-sm text-charcoal-light mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>{service.duration.min}-{service.duration.max} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" aria-hidden="true" />
                          <span>From ${service.pricing[0]?.price || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="flex items-center text-rose-gold font-heading text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}