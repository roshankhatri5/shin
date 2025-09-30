'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CardProps } from '@/types/components'

const cardVariants = {
  default: 'bg-white shadow-glass-subtle hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300',
  elevated: 'bg-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300',
  bordered: 'bg-gradient-to-br from-white to-pink-50/30 border-2 border-pink-200/50 hover:border-pink-300 hover:shadow-luxury hover:scale-[1.02] transition-all duration-300',
  glass: 'bg-white/85 backdrop-blur-lg border border-pink-100/30 shadow-glass hover:bg-white/95 hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300',
  'glass-strong': 'bg-white/95 backdrop-blur-xl border border-pink-200/40 shadow-glass hover:bg-white hover:shadow-luxury hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300',
  luxury: 'bg-gradient-to-br from-white via-pink-50/20 to-white shadow-luxury hover:shadow-luxury-lg hover:-translate-y-3 hover:scale-[1.03] border border-pink-100/50 transition-all duration-500',
  shimmer: 'bg-gradient-to-br from-white to-pink-50/30 shadow-luxury hover:shadow-shimmer relative overflow-hidden hover:scale-[1.02] transition-all duration-300',
  elegant: 'bg-gradient-soft shadow-elegant hover:shadow-luxury hover:-translate-y-2 hover:scale-[1.02] border border-pink-200/40 transition-all duration-300',
  soft: 'bg-white/90 backdrop-blur-sm shadow-soft hover:shadow-elegant hover:-translate-y-1 hover:scale-[1.01] border border-pink-100/40 transition-all duration-300',
  girly: 'bg-gradient-to-br from-white via-pink-50/40 to-blush-50/30 shadow-elegant hover:shadow-luxury hover:-translate-y-2 hover:scale-[1.03] border border-pink-200/60 transition-all duration-300',
  feminine: 'bg-gradient-warm shadow-soft hover:shadow-luxury hover:-translate-y-1 hover:scale-[1.02] border border-blush-200/50 transition-all duration-300',
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
          'rounded-2xl overflow-hidden transition-all duration-500 relative transform-gpu',
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