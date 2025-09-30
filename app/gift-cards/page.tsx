'use client'

import { motion } from 'framer-motion'
import { Gift, Heart, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { slideUp, staggerContainer } from '@/lib/animations'

const giftCardAmounts = [
  { value: 25, popular: false },
  { value: 50, popular: true },
  { value: 100, popular: false },
  { value: 150, popular: false },
]

export default function GiftCardsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto text-center relative z-10"
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
                  Gift Cards
                </li>
              </ol>
            </nav>

            <div className="inline-block p-4 bg-white rounded-full shadow-luxury mb-6">
              <Gift className="w-12 h-12 text-rose-gold" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Give the Gift of Beauty
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Share the luxury nail salon experience with someone special.
              Perfect for birthdays, holidays, or just because.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Sparkles className="w-16 h-16 text-rose-gold" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Heart className="w-16 h-16 text-blush" />
        </div>
      </section>

      {/* Gift Card Amounts */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              Choose Your Amount
            </h2>
            <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
              Select from our popular gift card amounts or contact us for a custom value.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8"
          >
            {giftCardAmounts.map((amount) => (
              <motion.div key={amount.value} variants={slideUp} className="relative">
                {amount.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 bg-rose-gold text-white text-sm font-semibold rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card className={`text-center cursor-pointer transition-all duration-300 hover:shadow-luxury ${
                  amount.popular ? 'border-2 border-rose-gold' : ''
                }`}>
                  <CardContent className="pt-8 pb-6">
                    <div className="mb-4">
                      <span className="font-display text-5xl font-bold text-charcoal">
                        ${amount.value}
                      </span>
                    </div>
                    <Button className="w-full">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-charcoal-light mb-4">
              Need a different amount?
            </p>
            <a href="/contact">
              <Button variant="secondary">
                Request Custom Amount
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              How It Works
            </h2>
            <p className="text-lg text-charcoal-light max-w-2xl mx-auto">
              Sending beauty is easy with our simple gift card process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Choose Amount',
                description: 'Select a preset amount or request a custom value that fits your budget.',
                icon: <Gift className="w-8 h-8" />,
              },
              {
                step: '2',
                title: 'Personalize',
                description: 'Add a personal message and choose between physical card or email delivery.',
                icon: <Heart className="w-8 h-8" />,
              },
              {
                step: '3',
                title: 'Send & Enjoy',
                description: 'Your recipient can use the gift card for any service at our salon.',
                icon: <Sparkles className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-gold-50 to-blush-50 rounded-full mb-4 text-rose-gold">
                  {step.icon}
                </div>
                <div className="mb-2 font-heading text-sm font-semibold text-rose-gold uppercase tracking-wide">
                  Step {step.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
                Gift Card Benefits
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Valid for all salon services',
                'No expiration date',
                'Can be combined with promotions',
                'Transferable to friends and family',
                'Physical or digital delivery',
                'Check balance anytime',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start bg-white rounded-lg p-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-mint-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Check className="w-4 h-4 text-mint" />
                  </div>
                  <p className="text-charcoal font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-6">
              Terms & Conditions
            </h2>
            <div className="prose prose-sm text-charcoal-light space-y-3">
              <ul className="list-disc pl-5 space-y-2">
                <li>Gift cards have no expiration date and do not lose value over time.</li>
                <li>Gift cards are non-refundable but may be transferred to another person.</li>
                <li>Gift cards can be used for any service offered at our salon.</li>
                <li>If service cost exceeds gift card value, the difference must be paid at time of service.</li>
                <li>If service cost is less than gift card value, the remaining balance stays on the card.</li>
                <li>Lost or stolen gift cards can be replaced with proof of purchase.</li>
                <li>Gift cards cannot be redeemed for cash except where required by law.</li>
                <li>Physical gift cards will be mailed within 3-5 business days.</li>
                <li>Digital gift cards are delivered instantly via email.</li>
              </ul>
            </div>
          </motion.div>
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
              Ready to Give?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Purchase a gift card today and make someone's day special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-rose-gold font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
              >
                Purchase Gift Card
              </a>
              <a
                href="/booking"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-rose-gold"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}