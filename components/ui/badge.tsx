'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { BadgeProps } from '@/types/components'

const badgeVariants = {
  default: 'bg-rose-gold-100 text-rose-gold-700 border-rose-gold-200',
  success: 'bg-mint-100 text-mint-700 border-mint-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-lavender-100 text-lavender-700 border-lavender-200',
}

const badgeSizes = {
  xs: 'px-1.5 py-0.5 text-body-xs',
  sm: 'px-2 py-0.5 text-body-xs',
  md: 'px-2.5 py-1 text-body-sm',
  lg: 'px-3 py-1.5 text-body',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = 'default', size = 'md', dot = false, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors duration-200',
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              variant === 'default' && 'bg-rose-gold',
              variant === 'success' && 'bg-mint-600',
              variant === 'warning' && 'bg-yellow-600',
              variant === 'error' && 'bg-red-600',
              variant === 'info' && 'bg-lavender-600'
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'