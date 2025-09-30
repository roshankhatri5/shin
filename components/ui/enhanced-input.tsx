'use client'

import React, { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'luxury' | 'modern' | 'glass'
  inputSize?: 'sm' | 'md' | 'lg'
}

const inputVariants = {
  default: 'border-warmgray-200 focus:border-gold-400 focus:ring-gold-400/20',
  luxury: 'border-gold-200 focus:border-gold-500 focus:ring-gold-500/30 bg-gradient-to-r from-white to-gold-50/30',
  modern: 'border-warmgray-300 focus:border-gold-600 focus:ring-gold-600/25 bg-warmgray-50/50',
  glass: 'border-gold-200/50 focus:border-gold-400 focus:ring-gold-400/20 bg-white/80 backdrop-blur-sm',
}

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className,
    type = 'text',
    label,
    error,
    success,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'luxury',
    inputSize = 'md',
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label 
            className={cn(
              'block text-sm font-medium mb-2 transition-colors duration-200',
              error ? 'text-red-600' : success ? 'text-green-600' : 'text-warmgray-700'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray-400 z-10">
              {leftIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:outline-none',
              'placeholder:text-warmgray-400 font-body',
              inputVariants[variant],
              inputSizes[inputSize],
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
              success && 'border-green-300 focus:border-green-500 focus:ring-green-500/20',
              disabled && 'opacity-50 cursor-not-allowed bg-warmgray-100',
              isFocused && 'shadow-luxury transform scale-[1.02]',
              className
            )}
            {...props}
          />
          
          <AnimatePresence>
            {(rightIcon || isPassword || error || success) && (
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {error && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                {success && !error && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-warmgray-400 hover:text-warmgray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
                {rightIcon && !isPassword && !error && !success && rightIcon}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {(error || helperText) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              <p className={cn(
                'text-sm',
                error ? 'text-red-600' : 'text-warmgray-500'
              )}>
                {error || helperText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

EnhancedInput.displayName = 'EnhancedInput'