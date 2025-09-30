'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { portfolioItems, PortfolioCategory, PortfolioItem } from '@/lib/constants/portfolio'
import { PortfolioFilters } from '@/components/features/portfolio/portfolio-filters'
import { EnhancedPortfolioGrid } from '@/components/features/portfolio/enhanced-portfolio-grid'
import { PortfolioLightbox } from '@/components/features/portfolio/portfolio-lightbox'
import { HydrationBoundary } from '@/components/ui/hydration-boundary'
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
      <section className="relative bg-gradient-to-br from-pink/10 via-blush/10 to-rose/10 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-charcoal/70">
                <li>
                  <a href="/" className="hover:text-pink transition-colors">
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
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
              Explore our collection of stunning nail designs, from classic elegance to bold artistic expressions.
              Each piece represents our commitment to excellence and creativity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-ivory via-cream-50 to-warmgray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-gold-200/40 to-amber-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <PortfolioFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Enhanced Grid */}
          <HydrationBoundary>
            <EnhancedPortfolioGrid
              items={filteredItems}
              onItemClick={handleItemClick}
            />
          </HydrationBoundary>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-charcoal/70">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-pink to-pink-600">
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
                className="inline-block px-8 py-4 bg-white text-pink font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
              >
                Book Appointment
              </a>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-pink"
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