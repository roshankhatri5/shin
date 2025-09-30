'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { FormFieldProps } from '@/types/components'

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  children,
  htmlFor,
  className,
}) => {
  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-body-sm font-medium text-charcoal"
        >
          {label}
          {required && <span className="text-rose-gold ml-1" aria-label="required">*</span>}
        </label>
      )}

      {children}

      {error && (
        <p className="text-body-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-body-sm text-charcoal-light">
          {helperText}
        </p>
      )}
    </div>
  )
}

FormField.displayName = 'FormField'