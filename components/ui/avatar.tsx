'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { AvatarProps } from '@/types/components'

const avatarSizes = {
  xs: 'w-6 h-6 text-body-xs',
  sm: 'w-8 h-8 text-body-sm',
  md: 'w-10 h-10 text-body',
  lg: 'w-12 h-12 text-body-lg',
  xl: 'w-16 h-16 text-h4',
}

const statusColors = {
  online: 'bg-mint-500',
  offline: 'bg-charcoal-light',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', fallback, size = 'md', status, className, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    const [initials, setInitials] = React.useState('')

    React.useEffect(() => {
      if (fallback) {
        // Generate initials from fallback text
        const names = fallback.trim().split(' ')
        const initials = names
          .map((name) => name[0])
          .join('')
          .substring(0, 2)
          .toUpperCase()
        setInitials(initials)
      }
    }, [fallback])

    const showFallback = !src || imageError

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full overflow-hidden',
          'bg-rose-gold-100 text-rose-gold-700 font-heading font-semibold',
          avatarSizes[size],
          className
        )}
        {...props}
      >
        {!showFallback ? (
          <Image
            src={src!}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="select-none">{initials || fallback?.[0]?.toUpperCase() || '?'}</span>
        )}

        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white',
              statusColors[status],
              size === 'xs' && 'w-2 h-2',
              size === 'sm' && 'w-2.5 h-2.5',
              size === 'md' && 'w-3 h-3',
              size === 'lg' && 'w-3.5 h-3.5',
              size === 'xl' && 'w-4 h-4'
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'