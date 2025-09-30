'use client'

import { motion } from 'framer-motion'
import { portfolioCategoryLabels, PortfolioCategory } from '@/lib/constants/portfolio'
import { cn } from '@/lib/utils'

interface PortfolioFiltersProps {
  activeCategory: PortfolioCategory
  onCategoryChange: (category: PortfolioCategory) => void
}

export function PortfolioFilters({ activeCategory, onCategoryChange }: PortfolioFiltersProps) {
  const categories = Object.keys(portfolioCategoryLabels) as PortfolioCategory[]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-6 py-3 rounded-full font-heading font-medium text-sm uppercase tracking-wide transition-all duration-300',
            activeCategory === category
              ? 'bg-rose-gold text-white shadow-luxury'
              : 'bg-white text-charcoal hover:bg-cream-100 border border-cream-200'
          )}
        >
          {portfolioCategoryLabels[category]}
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-rose-gold rounded-full -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}