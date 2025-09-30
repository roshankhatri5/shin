'use client'

import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { modalOverlay, modalContent } from '@/lib/animations'
import { ModalProps } from '@/types/components'

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}) => {
  // Handle ESC key
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose()
      }
    },
    [closeOnEsc, onClose]
  )

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const modal = document.getElementById('modal-content')
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    firstElement?.focus()

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleEscape])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
            variants={modalOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            id="modal-content"
            className={cn(
              'relative bg-gradient-to-br from-white to-pink-50/30 rounded-3xl shadow-luxury w-full',
              'max-h-[90vh] overflow-y-auto border border-pink-200/40 backdrop-blur-sm',
              modalSizes[size],
              className
            )}
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 p-2 rounded-full',
                'text-warmgray-600 hover:text-pink-600 hover:bg-pink-50',
                'transition-all duration-300 hover:scale-110',
                'focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2'
              )}
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            {(title || description) && (
              <div className="p-6 pb-4 pr-12">
                {title && (
                  <h2
                    id="modal-title"
                    className="font-heading text-h3 font-semibold text-charcoal"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-2 text-body text-charcoal-light"
                  >
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 pt-0">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

Modal.displayName = 'Modal'