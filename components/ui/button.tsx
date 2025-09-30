/**
 * Enhanced Button Component
 * 
 * A sophisticated button component with multiple variants, animations, and accessibility features.
 * Supports loading states, icons, and full customization while maintaining design consistency.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary" onClick={handleClick}>
 *   Book Appointment
 * </Button>
 * 
 * // With icons and loading
 * <Button 
 *   variant="elegant" 
 *   leftIcon={<StarIcon />}
 *   loading={isSubmitting}
 *   fullWidth
 * >
 *   Submit Form
 * </Button>
 * ```
 */
'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/types/components'

/**
 * Button variant styles mapping
 * Each variant provides a different visual style while maintaining consistency
 */
const buttonVariants = {
  primary: 'bg-gradient-to-r from-pink to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:shadow-luxury hover:-translate-y-0.5 shadow-soft',
  secondary: 'bg-gradient-to-r from-blush to-blush-600 text-white hover:from-blush-600 hover:to-blush-700 hover:shadow-luxury hover:-translate-y-0.5 shadow-soft',
  outline: 'border-2 border-pink text-pink hover:bg-pink hover:text-white hover:shadow-luxury hover:-translate-y-0.5 transition-all duration-300',
  ghost: 'text-pink hover:bg-pink-50 hover:shadow-glass-subtle transition-all duration-300',
  link: 'text-pink underline-offset-4 hover:underline hover:text-pink-600 transition-colors duration-300',
  shimmer: 'relative overflow-hidden bg-gradient-to-r from-pink via-blush to-gold bg-shimmer animate-shimmer text-white hover:shadow-shimmer',
  glass: 'bg-white/90 backdrop-blur-md border border-ivory-200 text-pink hover:bg-white hover:shadow-elegant hover:-translate-y-0.5',
  gradient: 'bg-gradient-luxury text-white hover:shadow-luxury hover:-translate-y-0.5 shadow-soft',
  elegant: 'bg-gradient-to-r from-rose to-blush text-white hover:from-rose-600 hover:to-blush-600 hover:shadow-elegant hover:-translate-y-0.5 shadow-soft',
  rose: 'bg-gradient-to-r from-rose-300 to-rose-400 text-white hover:from-rose-400 hover:to-rose-500 hover:shadow-elegant hover:-translate-y-0.5',
  girly: 'bg-girly-gradient text-white hover:shadow-luxury hover:-translate-y-0.5 shadow-soft hover:scale-105',
  feminine: 'bg-feminine-glow text-white hover:shadow-luxury hover:-translate-y-0.5 shadow-soft hover:scale-105',
  dreamy: 'bg-blush-dream text-pink-700 hover:bg-gradient-luxury hover:text-white hover:shadow-luxury hover:-translate-y-0.5 shadow-soft',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
  xl: 'px-10 py-5 text-body-xl',
  xs: 'px-3 py-1.5 text-body-xs',
}

/**
 * Button component with advanced features and animations
 * 
 * @param variant - Visual style variant (primary, secondary, outline, etc.)
 * @param size - Size variant (xs, sm, md, lg, xl)
 * @param disabled - Whether the button is disabled
 * @param loading - Whether to show loading state
 * @param fullWidth - Whether button should take full width
 * @param leftIcon - Icon to display on the left side
 * @param rightIcon - Icon to display on the right side
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click event handler
 */
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
          'focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-ivory',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
          'inline-flex items-center justify-center gap-2',
          'active:scale-95 hover:scale-105 transform-gpu',
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