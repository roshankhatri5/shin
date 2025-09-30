'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
// import Image from 'next/image' // TODO: Add service images
import { ArrowRight, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { services } from '@/lib/constants/services'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

export function ServicesPreview() {
  // Get popular services (limited to 6)
  const popularServices = services.filter((service) => service.popular).slice(0, 6)

  return (
    <section className="section-padding bg-gradient-to-b from-blush-50/30 to-white">
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
            Our <span className="bg-gradient-to-r from-pink-400 to-blush-500 bg-clip-text text-transparent">Signature Services</span>
          </h2>
          <p className="text-body-lg text-warmgray-600 leading-relaxed">
            Discover our most popular treatments, crafted to perfection by our expert technicians with <span className="text-pink-600 font-medium">premium products and techniques.</span>
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
                  className="bg-gradient-to-br from-white to-warmgray-50/30 rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 h-full flex flex-col border border-gold-200/20 hover:border-gold-300/40 backdrop-blur-sm"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-pink-100 to-blush-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30 animate-bounce-soft">💅</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-300/20 to-transparent"></div>
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-pink-500 text-white shadow-elegant border-0">
                          Popular
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-heading text-h4 text-charcoal mb-3 group-hover:text-gold-600 transition-colors duration-300">
                        {service.name}
                      </h3>
                      <p className="text-body-sm text-warmgray-600 mb-4 line-clamp-2 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-body-sm text-warmgray-500 mb-4">
                        <div className="flex items-center gap-1 bg-warmgray-50 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-gold-500" aria-hidden="true" />
                          <span>{service.duration.min}-{service.duration.max} min</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gold-50 px-3 py-1 rounded-full">
                          <DollarSign className="w-4 h-4 text-gold-600" aria-hidden="true" />
                          <span>From ${service.pricing[0]?.price || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="flex items-center text-gold-600 font-heading text-sm font-semibold group-hover:gap-2 transition-all duration-300 bg-gold-50 px-4 py-2 rounded-full hover:bg-gold-100">
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