'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/constants/portfolio'
import { Badge } from '@/components/ui/badge'
import { Eye, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface PortfolioGridFallbackProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

function PortfolioCard({ 
  item, 
  index, 
  onItemClick 
}: { 
  item: PortfolioItem
  index: number
  onItemClick: (item: PortfolioItem) => void 
}) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative cursor-pointer"
      onClick={() => onItemClick(item)}
    >
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="success" size="sm" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white border-0">
              ⭐ Featured
            </Badge>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-colors hover:bg-white/30"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )} 
          />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Badge 
            variant="outline" 
            size="sm" 
            className="mb-3 bg-white/20 backdrop-blur-sm border-white/30 text-white"
          >
            {item.category}
          </Badge>
          
          <h3 className="font-display text-xl font-semibold mb-2 line-clamp-1">
            {item.title}
          </h3>
          
          <p className="text-white/90 text-sm line-clamp-2 mb-4">
            {item.description}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioGridFallback({ items, onItemClick }: PortfolioGridFallbackProps) {
  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h3 className="text-xl font-display text-charcoal mb-2">No Items Found</h3>
        <p className="text-charcoal/60">No portfolio items found in this category.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {items.map((item, index) => (
        <PortfolioCard
          key={item.id}
          item={item}
          index={index}
          onItemClick={onItemClick}
        />
      ))}
    </motion.div>
  )
}