'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { RatingProps } from '@/types/components'

const ratingSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  allowHalf = false,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const displayValue = hoverValue !== null ? hoverValue : value

  const handleClick = (index: number) => {
    if (readonly) return

    if (allowHalf) {
      onChange?.(index)
    } else {
      onChange?.(Math.ceil(index))
    }
  }

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (readonly) return

    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const isHalf = x < rect.width / 2
      setHoverValue(index - (isHalf ? 0.5 : 0))
    } else {
      setHoverValue(index)
    }
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const renderStar = (index: number) => {
    const starValue = index
    const fillPercentage = Math.min(Math.max((displayValue - (starValue - 1)) * 100, 0), 100)

    return (
      <button
        key={index}
        type="button"
        disabled={readonly}
        onClick={() => handleClick(starValue)}
        onMouseMove={(e) => handleMouseMove(starValue, e)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative transition-transform duration-200',
          !readonly && 'hover:scale-110 cursor-pointer',
          readonly && 'cursor-default',
          'focus:outline-none focus:ring-2 focus:ring-rose-gold-300 focus:ring-offset-2 rounded'
        )}
        aria-label={`Rate ${starValue} out of ${max}`}
      >
        <svg
          className={cn('text-cream-300', ratingSizes[size])}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        {/* Filled star overlay */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <svg
            className={cn('text-rose-gold', ratingSizes[size])}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </button>
    )
  }

  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role={readonly ? 'img' : 'radiogroup'}
      aria-label={readonly ? `Rating: ${value} out of ${max}` : 'Rate this item'}
    >
      {Array.from({ length: max }, (_, i) => renderStar(i + 1))}
      {!readonly && (
        <span className="sr-only">
          {displayValue} out of {max} stars
        </span>
      )}
    </div>
  )
}

Rating.displayName = 'Rating'