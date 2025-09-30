'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { InputProps } from '@/types/components'

const inputSizes = {
  sm: 'px-3 py-2 text-body-sm',
  md: 'px-4 py-3 text-body',
  lg: 'px-5 py-4 text-body-lg',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    const id = props.id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block text-body-sm font-medium text-charcoal mb-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {props.required && <span className="text-pink ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              'w-full font-body rounded-xl border transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-pink-50/20',
              'placeholder:text-warmgray-400 bg-white/95 backdrop-blur-sm',
              'hover:border-pink-300 hover:shadow-soft hover:bg-white hover:scale-[1.01]',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200 shadow-red-100'
                : 'border-pink-200/60 focus:border-pink-400 focus:ring-pink-200/50 focus:shadow-elegant focus:scale-[1.01]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              inputSizes[size],
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p
            id={`${id}-error`}
            className="mt-2 text-body-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={`${id}-helper`}
            className="mt-2 text-body-sm text-warmgray"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'