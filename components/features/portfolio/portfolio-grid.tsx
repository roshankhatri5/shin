'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/constants/portfolio'
import { Badge } from '@/components/ui/badge'
import { slideUp, staggerContainer } from '@/lib/animations'

interface PortfolioGridProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
}

export function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-light text-lg">No portfolio items found in this category.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={slideUp}
          className="group relative cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream shadow-md hover:shadow-xl transition-all duration-300">
            {/* Image */}
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Badge variant="default" size="sm" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-display text-xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Featured Badge */}
            {item.featured && (
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="success" size="sm" dot>
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}