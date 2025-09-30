'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { servicePackages } from '@/lib/constants/services'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

export function PricingPackages() {
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
            Special <span className="text-rose-gold">Packages</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            Save more with our curated service packages designed for regular maintenance, 
            special occasions, and ultimate pampering.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {servicePackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={staggerItem}
              whileHover="hover"
            >
              <motion.div variants={hoverLift}>
                <Card
                  className={`h-full relative overflow-hidden ${
                    pkg.popular 
                      ? 'border-2 border-rose-gold shadow-luxury' 
                      : 'border-2 border-cream-200 hover:border-rose-gold-200'
                  } transition-all duration-300`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-br from-rose-gold to-blush text-white px-4 py-1 rounded-bl-lg flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                        <span className="text-body-xs font-semibold">Most Popular</span>
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-h3 mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-body">
                      {pkg.description}
                    </CardDescription>

                    {/* Price */}
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-display-lg font-bold text-rose-gold">
                          ${pkg.price}
                        </span>
                      </div>
                      {pkg.savings > 0 && (
                        <p className="text-body-sm text-mint-700 mt-2 font-medium">
                          Save ${pkg.savings}
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {pkg.includes.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-mint-700" aria-hidden="true" />
                        </div>
                        <span className="text-body-sm text-charcoal-light">
                          {item}
                        </span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="pt-6">
                    <Link href={`/booking?package=${pkg.id}`} className="w-full">
                      <Button
                        size="lg"
                        className={`w-full ${
                          pkg.popular
                            ? 'bg-rose-gold hover:bg-rose-gold-600 text-white'
                            : 'bg-cream-200 hover:bg-rose-gold hover:text-white text-charcoal'
                        }`}
                      >
                        Choose Package
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-body text-charcoal-light mb-4">
            Need a custom package? We'd love to create something perfect for you.
          </p>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}