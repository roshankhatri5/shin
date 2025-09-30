'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

interface LoadingStateProps {
  isLoading?: boolean
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  className?: string
  overlay?: boolean
  spinnerSize?: 'sm' | 'md' | 'lg'
  message?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading = false,
  children,
  loadingComponent,
  className,
  overlay = false,
  spinnerSize = 'md',
  message = 'Loading...'
}) => {
  if (!isLoading) {
    return <>{children}</>
  }

  const defaultLoadingComponent = (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Spinner size={spinnerSize} color="primary" />
      {message && (
        <p className="text-warmgray-600 font-medium text-center">{message}</p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className={cn('relative', className)}>
        {children}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
        >
          {loadingComponent || defaultLoadingComponent}
        </motion.div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {loadingComponent || defaultLoadingComponent}
    </div>
  )
}

LoadingState.displayName = 'LoadingState'

// Skeleton loading components
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn('bg-gradient-to-br from-pink-50 to-blush-50 rounded-2xl p-6', className)}>
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-pink-200 rounded-full w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-pink-100 rounded-full"></div>
        <div className="h-3 bg-pink-100 rounded-full w-5/6"></div>
      </div>
      <div className="h-8 bg-pink-200 rounded-xl w-1/2"></div>
    </div>
  </div>
)

export const SkeletonText = ({ 
  lines = 3, 
  className 
}: { 
  lines?: number
  className?: string 
}) => {
  // Use deterministic widths to avoid hydration mismatch
  const widths = ['60%', '80%', '70%', '90%', '65%', '85%', '75%', '95%']
  
  return (
    <div className={cn('space-y-2 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-3 bg-pink-100 rounded-full"
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  )
}

export const SkeletonImage = ({ className }: { className?: string }) => (
  <div className={cn(
    'bg-gradient-to-br from-pink-100 to-blush-100 rounded-2xl animate-pulse',
    'flex items-center justify-center',
    className
  )}>
    <svg 
      className="w-12 h-12 text-pink-300"
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3l2 2.5L12 9l4 6H8l2-3z"/>
    </svg>
  </div>
)