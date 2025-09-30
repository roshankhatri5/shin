'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/types/components'

const buttonVariants = {
  primary: 'bg-gradient-to-r from-rose-gold to-rose-gold-600 text-white hover:from-rose-gold-600 hover:to-rose-gold-700 hover:shadow-luxury hover:-translate-y-0.5',
  secondary: 'bg-gradient-to-r from-blush to-blush-600 text-white hover:from-blush-600 hover:to-blush-700 hover:shadow-luxury hover:-translate-y-0.5',
  outline: 'border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white hover:shadow-luxury hover:-translate-y-0.5',
  ghost: 'text-rose-gold hover:bg-rose-gold-50 hover:shadow-glass-subtle',
  link: 'text-rose-gold underline-offset-4 hover:underline',
  shimmer: 'relative overflow-hidden bg-gradient-to-r from-rose-gold via-blush to-rose-gold bg-shimmer animate-shimmer text-white hover:shadow-shimmer',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20 text-rose-gold hover:bg-white/90 hover:shadow-glass hover:-translate-y-0.5',
  gradient: 'bg-gradient-luxury text-white hover:shadow-luxury hover:-translate-y-0.5',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
  xl: 'px-10 py-5 text-body-xl',
  xs: 'px-3 py-1.5 text-body-xs',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={cn(
          'font-heading font-semibold rounded-full transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-rose-gold-300 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
          'inline-flex items-center justify-center gap-2',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          className
        )}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="ml-2">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex mr-2">{leftIcon}</span>}
            <span className="relative">
              {children}
              {variant === 'shimmer' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </span>
            {rightIcon && <span className="inline-flex ml-2">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'