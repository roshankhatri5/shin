'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { portfolioCategoryLabels, PortfolioCategory } from '@/lib/constants/portfolio'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

interface PortfolioFiltersProps {
  activeCategory: PortfolioCategory
  onCategoryChange: (category: PortfolioCategory) => void
}

const buttonVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
}

const activeBackgroundVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export function PortfolioFilters({ activeCategory, onCategoryChange }: PortfolioFiltersProps) {
  const categories = Object.keys(portfolioCategoryLabels) as PortfolioCategory[]

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-4 mb-16"
    >
      <div className="inline-flex bg-white/80 backdrop-blur-lg rounded-full p-2 shadow-xl border border-white/20">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'relative px-6 py-3 rounded-full font-heading font-medium text-sm uppercase tracking-wide transition-all duration-300 overflow-hidden',
              activeCategory === category
                ? 'text-white shadow-lg'
                : 'text-charcoal hover:text-charcoal/80'
            )}
          >
            {/* Active background */}
            <AnimatePresence>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  variants={activeBackgroundVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Hover background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full opacity-0"
              whileHover={{ opacity: activeCategory === category ? 0 : 0.5 }}
              transition={{ duration: 0.2 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              {activeCategory === category && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 20,
                    delay: 0.1 
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.span>
              )}
              {portfolioCategoryLabels[category]}
            </span>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}