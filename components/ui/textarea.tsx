'use client'

import React, { forwardRef, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { TextareaProps } from '@/types/components'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      autoResize = false,
      maxLength,
      showCount = false,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const id = props.id || props.name
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [charCount, setCharCount] = React.useState(0)

    // Handle auto-resize
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [value, autoResize])

    // Handle character count
    useEffect(() => {
      if (typeof value === 'string') {
        setCharCount(value.length)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) {
        return
      }
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

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

        <textarea
          ref={(node) => {
            textareaRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full font-body rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cream-100',
            'placeholder:text-charcoal-light/50',
            'px-4 py-3 text-body min-h-[100px]',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-cream-200 focus:border-rose-gold focus:ring-rose-gold-200',
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          maxLength={maxLength}
          {...props}
        />

        <div className="flex items-center justify-between mt-2">
          <div className="flex-1">
            {error && (
              <p
                id={`${id}-error`}
                className="text-body-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}

            {helperText && !error && (
              <p
                id={`${id}-helper`}
                className="text-body-sm text-charcoal-light"
              >
                {helperText}
              </p>
            )}
          </div>

          {(showCount || maxLength) && (
            <p className="text-body-sm text-charcoal-light ml-4">
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'