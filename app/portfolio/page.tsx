'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { portfolioItems, PortfolioCategory, PortfolioItem } from '@/lib/constants/portfolio'
import { PortfolioFilters } from '@/components/features/portfolio/portfolio-filters'
import { PortfolioGrid } from '@/components/features/portfolio/portfolio-grid'
import { PortfolioLightbox } from '@/components/features/portfolio/portfolio-lightbox'
import { slideUp } from '@/lib/animations'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Filter portfolio items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return portfolioItems
    }
    return portfolioItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // Handle lightbox navigation
  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsLightboxOpen(true)
  }

  const handleNext = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedItem(filteredItems[nextIndex]!)
  }

  const handlePrevious = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    const previousIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedItem(filteredItems[previousIndex]!)
  }

  const handleClose = () => {
    setIsLightboxOpen(false)
  }

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
                  Portfolio
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Explore our collection of stunning nail designs, from classic elegance to bold artistic expressions.
              Each piece represents our commitment to excellence and creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <PortfolioFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Grid */}
          <PortfolioGrid
            items={filteredItems}
            onItemClick={handleItemClick}
          />

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-charcoal-light">
              Showing <span className="font-semibold text-charcoal">{filteredItems.length}</span>{' '}
              {filteredItems.length === 1 ? 'design' : 'designs'}
              {activeCategory !== 'all' && (
                <>
                  {' '}in <span className="font-semibold text-charcoal capitalize">{activeCategory}</span>
                </>
              )}
            </p>
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
              Ready to Create Your Own Masterpiece?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Book an appointment with our talented technicians and bring your nail art vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-block px-8 py-4 bg-white text-rose-gold font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-rose-gold"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <PortfolioLightbox
        item={selectedItem}
        isOpen={isLightboxOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  )
}