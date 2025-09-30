'use client'

import { motion } from 'framer-motion'
import { Tag, Clock, Gift, Crown } from 'lucide-react'
import { currentOffers, membershipTiers } from '@/lib/constants/offers'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { slideUp, staggerContainer } from '@/lib/animations'

export default function OffersPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-charcoal-light">
                <li>
                  <a href="/" className="hover:text-rose-gold transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-charcoal font-medium" aria-current="page">
                  Special Offers
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Special Offers & Promotions
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Take advantage of our exclusive deals and membership benefits.
              Treat yourself to luxury for less.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              Current Offers
            </h2>
            <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
              Discover our latest promotions and save on your favorite services.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {currentOffers.map((offer) => (
              <motion.div key={offer.id} variants={slideUp}>
                <Card className="h-full hover:shadow-luxury transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-rose-gold-50 rounded-full">
                        {offer.badge === 'new' ? (
                          <Gift className="w-6 h-6 text-rose-gold" />
                        ) : offer.badge === 'limited' ? (
                          <Clock className="w-6 h-6 text-rose-gold" />
                        ) : (
                          <Tag className="w-6 h-6 text-rose-gold" />
                        )}
                      </div>
                      {offer.badge && (
                        <Badge 
                          variant={offer.badge === 'popular' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {offer.badge === 'popular' ? 'Popular' : offer.badge === 'new' ? 'New' : 'Limited Time'}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="inline-block px-6 py-3 bg-rose-gold-50 rounded-full">
                        <span className="font-display text-2xl font-bold text-rose-gold">
                          {offer.discount}
                        </span>
                      </div>
                    </div>

                    {/* Valid Dates */}
                    <div className="mb-4 text-sm text-charcoal-light">
                      <p>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
                      {offer.code && (
                        <p className="mt-2">
                          Code: <span className="font-mono font-semibold text-charcoal">{offer.code}</span>
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="mb-6">
                      <h4 className="font-heading font-semibold text-sm text-charcoal mb-2">
                        Terms & Conditions:
                      </h4>
                      <ul className="text-sm text-charcoal-light space-y-1">
                        {offer.terms.map((term, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a href="/booking" className="block">
                      <Button className="w-full">Book Now</Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              VIP Membership
            </h2>
            <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
              Join our VIP membership program and enjoy exclusive perks, discounts, and priority booking.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="success" className="shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={`h-full ${tier.popular ? 'border-rose-gold border-2 shadow-luxury' : ''}`}>
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-rose-gold-50 to-blush-50 rounded-full inline-block">
                      <Crown className="w-8 h-8 text-rose-gold" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="font-display text-4xl font-bold text-charcoal">
                        ${tier.price}
                      </span>
                      <span className="text-charcoal-light">/{tier.billingPeriod}</span>
                    </div>
                    <p className="text-sm text-mint font-semibold mt-2">
                      Save up to ${tier.savings}/year
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg
                            className="w-5 h-5 text-mint flex-shrink-0 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-charcoal-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="block">
                      <Button
                        variant={tier.popular ? 'primary' : 'secondary'}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-rose-gold to-rose-gold-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to Save?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Book your appointment today and take advantage of these exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-block px-8 py-4 bg-white text-rose-gold font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
              >
                Book Appointment
              </a>
              <a
                href="/gift-cards"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-rose-gold"
              >
                Buy Gift Card
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}