'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { faqItems, faqCategoryLabels, FAQCategory } from '@/lib/constants/faq'
import { Accordion } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { slideUp } from '@/lib/animations'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'all'>('all')

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqItems

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((faq) => faq.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, activeCategory])

  // Group FAQs by category for display
  const groupedFAQs = useMemo(() => {
    const groups: Record<FAQCategory, typeof faqItems> = {
      general: [],
      services: [],
      booking: [],
      products: [],
      pricing: [],
    }

    filteredFAQs.forEach((faq) => {
      groups[faq.category].push(faq)
    })

    return groups
  }, [filteredFAQs])

  const categories: Array<FAQCategory | 'all'> = ['all', 'general', 'services', 'booking', 'products', 'pricing']

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
                  FAQ
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Find answers to common questions about our services, booking process, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5" />}
                  className="pr-4"
                />
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-heading font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-rose-gold text-white shadow-luxury'
                      : 'bg-white text-charcoal hover:bg-cream-100 border border-cream-200'
                  }`}
                >
                  {category === 'all' ? 'All Questions' : faqCategoryLabels[category]}
                </button>
              ))}
            </motion.div>

            {/* FAQ Results */}
            {filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-lg text-charcoal-light">
                  No questions found matching your search. Try different keywords or{' '}
                  <a href="/contact" className="text-rose-gold hover:underline">
                    contact us
                  </a>{' '}
                  directly.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {activeCategory === 'all' ? (
                  // Show grouped by category when "All" is selected
                  Object.entries(groupedFAQs).map(([category, faqs]) => {
                    if (faqs.length === 0) return null
                    return (
                      <div key={category}>
                        <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                          {faqCategoryLabels[category as FAQCategory]}
                        </h2>
                        <Accordion
                          items={faqs.map((faq) => ({
                            id: faq.id,
                            trigger: faq.question,
                            content: faq.answer,
                          }))}
                          type="multiple"
                        />
                      </div>
                    )
                  })
                ) : (
                  // Show single category
                  <Accordion
                    items={filteredFAQs.map((faq) => ({
                      id: faq.id,
                      trigger: faq.question,
                      content: faq.answer,
                    }))}
                    type="multiple"
                  />
                )}
              </motion.div>
            )}

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-charcoal-light"
            >
              <p>
                Showing <span className="font-semibold text-charcoal">{filteredFAQs.length}</span>{' '}
                {filteredFAQs.length === 1 ? 'question' : 'questions'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-charcoal-light mb-8 leading-relaxed">
              Can't find what you're looking for? Our team is here to help. Contact us directly
              and we'll be happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-rose-gold hover:bg-rose-gold-600 text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
              >
                Contact Us
              </a>
              <a
                href="tel:(555)012-3456"
                className="inline-block px-8 py-4 bg-transparent border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white font-heading font-semibold text-lg rounded-full transition-all duration-300"
              >
                Call (555) 012-3456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}