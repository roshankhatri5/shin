'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { SkeletonProps } from '@/types/components'

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangle',
  width,
  height,
  lines = 1,
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-4 bg-cream-200 rounded animate-pulse',
              index === lines - 1 && 'w-4/5' // Last line is shorter
            )}
            style={{ width: index === lines - 1 ? '80%' : width }}
          />
        ))}
      </div>
    )
  }

  const variantStyles = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  }

  return (
    <div
      className={cn(
        'bg-cream-200 animate-pulse',
        variantStyles[variant],
        variant === 'circle' && !width && !height && 'w-12 h-12',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

Skeleton.displayName = 'Skeleton'