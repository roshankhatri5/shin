'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { SpinnerProps } from '@/types/components'

const spinnerSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

const spinnerColors = {
  primary: 'text-pink-500',
  secondary: 'text-blush-500',
  rose: 'text-rose-500',
  gold: 'text-gold-500',
  white: 'text-white',
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className,
  color = 'primary',
  variant = 'default',
}) => {
  const colorClass = typeof color === 'string' && spinnerColors[color as keyof typeof spinnerColors] 
    ? spinnerColors[color as keyof typeof spinnerColors] 
    : 'text-pink-500'

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)} role="status" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-pulse',
              size === 'xs' ? 'w-1 h-1' : 
              size === 'sm' ? 'w-1.5 h-1.5' :
              size === 'md' ? 'w-2 h-2' :
              size === 'lg' ? 'w-3 h-3' : 'w-4 h-4',
              colorClass.replace('text-', 'bg-')
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.4s',
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (variant === 'heart') {
    return (
      <div
        className={cn('inline-block animate-pulse', spinnerSizes[size], colorClass, className)}
        role="status"
        aria-label="Loading"
      >
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      className={cn('inline-block animate-spin', spinnerSizes[size], colorClass, className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

Spinner.displayName = 'Spinner'