'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CardProps } from '@/types/components'

const cardVariants = {
  default: 'bg-white shadow-glass-subtle hover:shadow-luxury hover:-translate-y-1',
  elevated: 'bg-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-2',
  bordered: 'bg-gradient-to-br from-white to-cream-50 border-2 border-rose-gold-200 hover:border-rose-gold-300 hover:shadow-luxury',
  glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-glass hover:bg-white/90 hover:shadow-luxury hover:-translate-y-1',
  'glass-strong': 'bg-white/90 backdrop-blur-lg border border-white/30 shadow-glass hover:bg-white/95 hover:shadow-luxury-lg hover:-translate-y-1',
  luxury: 'bg-gradient-to-br from-white via-cream-50 to-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-2 border border-rose-gold-100',
  shimmer: 'bg-gradient-to-br from-white to-cream-50 shadow-luxury hover:shadow-shimmer relative overflow-hidden',
}

const cardPadding = {
  none: 'p-0',
  xs: 'p-3',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', padding = 'md', hover = false, ...props }, ref) => {
    const Component = hover ? motion.div : 'div'
    const motionProps = hover
      ? {
          whileHover: {
            y: variant === 'luxury' || variant === 'elevated' ? -8 : -4,
            scale: variant === 'luxury' ? 1.03 : 1.02
          },
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        }
      : {}

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden transition-all duration-300 relative',
          cardVariants[variant],
          cardPadding[padding],
          className
        )}
        {...motionProps}
        {...props}
      >
        {variant === 'shimmer' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeInOut',
            }}
          />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-heading text-h3 font-semibold leading-none tracking-tight text-charcoal',
      className
    )}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body-sm text-charcoal-light', className)}
    {...props}
  />
))

CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))

CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-0', className)}
    {...props}
  />
))

CardFooter.displayName = 'CardFooter'