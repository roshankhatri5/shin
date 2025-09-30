'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, DollarSign, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { services, serviceCategoryLabels, ServiceCategory } from '@/lib/constants/services'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'
import { cn } from '@/lib/utils'

export function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all')

  // Get unique categories
  const categories: Array<ServiceCategory | 'all'> = ['all', ...Array.from(new Set(services.map(s => s.category)))]

  // Filter services based on active category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-heading font-medium transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-rose-gold-300 focus:ring-offset-2',
                  activeCategory === cat
                    ? 'bg-rose-gold text-white shadow-lg scale-105'
                    : 'bg-cream-100 text-charcoal hover:bg-cream-200'
                )}
              >
                {cat === 'all' ? 'All Services' : serviceCategoryLabels[cat]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover="hover"
              className="group"
            >
              <Link href={`/services/${service.slug}`}>
                <motion.div
                  variants={hoverLift}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-luxury border-2 border-transparent hover:border-rose-gold-200 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-rose-gold-100 to-blush-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">💅</div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <Badge className="bg-white/90 text-charcoal border-charcoal/20">
                        {serviceCategoryLabels[service.category]}
                      </Badge>
                      {service.popular && (
                        <Badge className="bg-rose-gold text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
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

                      {/* Features */}
                      {service.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full bg-cream-100 text-charcoal-light text-body-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

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

                    {/* Pricing Tiers Preview */}
                    {service.pricing.length > 1 && (
                      <div className="pt-4 border-t border-cream-200 mb-4">
                        <p className="text-body-xs text-charcoal-light mb-2">
                          {service.pricing.length} pricing options available
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-rose-gold font-heading text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                      </div>
                      <Button
                        size="sm"
                        className="bg-rose-gold hover:bg-rose-gold-600 text-white"
                        onClick={(e) => {
                          e.preventDefault()
                          // Navigate to booking with service pre-selected
                          window.location.href = `/booking?service=${service.id}`
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-body-lg text-charcoal-light mb-4">
              No services found in this category.
            </p>
            <Button
              variant="outline"
              onClick={() => setActiveCategory('all')}
              className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              View All Services
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}