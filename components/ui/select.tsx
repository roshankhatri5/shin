'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { SelectProps } from '@/types/components'

const selectSizes = {
  sm: 'px-3 py-2 text-body-sm',
  md: 'px-4 py-3 text-body',
  lg: 'px-5 py-4 text-body-lg',
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      size = 'md',
      disabled,
      options,
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
            {props.required && <span className="text-rose-gold ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              'w-full font-body rounded-lg border transition-all duration-200 appearance-none',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream-100',
              'bg-white cursor-pointer',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-cream-200 focus:border-rose-gold focus:ring-rose-gold-200',
              'pr-10', // Space for dropdown arrow
              selectSizes[size],
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-charcoal-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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
            className="mt-2 text-body-sm text-charcoal-light"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'