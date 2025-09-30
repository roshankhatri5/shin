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
}) => {
  const colorClass = typeof color === 'string' && spinnerColors[color as keyof typeof spinnerColors] 
    ? spinnerColors[color as keyof typeof spinnerColors] 
    : 'text-pink-500'

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