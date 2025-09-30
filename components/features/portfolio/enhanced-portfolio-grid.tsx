'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PortfolioItem } from '@/lib/constants/portfolio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Grid3x3, Boxes, Eye, Heart } from 'lucide-react'
import { ThreePortfolioScene } from './three-portfolio-scene'
import { cn } from '@/lib/utils'

interface EnhancedPortfolioGridProps {
  items: PortfolioItem[]
  onItemClick: (item: PortfolioItem) => void
}

type ViewMode = 'grid' | '3d'

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

const overlayVariants = {
  hidden: { 
    opacity: 0,
    backdropFilter: "blur(0px)"
  },
  visible: { 
    opacity: 1,
    backdropFilter: "blur(10px)",
    transition: {
      duration: 0.3
    }
  }
}

function EnhancedPortfolioCard({ 
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
      whileTap="tap"
      className="group relative cursor-pointer"
      onClick={() => onItemClick(item)}
    >
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-lg">
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
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          />
        </div>

        {/* Featured Badge */}
        {item.featured && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 z-10"
          >
            <Badge variant="success" size="sm" className="bg-gradient-to-r from-gold-400 to-gold-600 text-white border-0">
              ⭐ Featured
            </Badge>
          </motion.div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-colors"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )} 
          />
        </motion.button>

        {/* Content Overlay */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
        >
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

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </motion.div>
        </motion.div>

        {/* Shine Effect */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      </div>
    </motion.div>
  )
}

export function EnhancedPortfolioGrid({ items, onItemClick }: EnhancedPortfolioGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
          <Grid3x3 className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-display text-charcoal mb-2">No Items Found</h3>
        <p className="text-charcoal/60">No portfolio items found in this category.</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-200">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              viewMode === 'grid' 
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Grid View
          </Button>
          <Button
            variant={viewMode === '3d' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('3d')}
            className={cn(
              "rounded-full px-6 transition-all duration-300",
              viewMode === '3d' 
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Boxes className="w-4 h-4 mr-2" />
            3D View
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {items.map((item, index) => (
              <EnhancedPortfolioCard
                key={item.id}
                item={item}
                index={index}
                onItemClick={onItemClick}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="3d"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <ThreePortfolioScene items={items} onItemClick={onItemClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}