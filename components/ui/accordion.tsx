'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { accordionContent } from '@/lib/animations'
import { AccordionProps, AccordionItem } from '@/types/components'

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultValue,
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggleItem = (id: string) => {
    if (type === 'single') {
      setExpandedItems((prev) => (prev.includes(id) ? [] : [id]))
    } else {
      setExpandedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleItem(id)
    }
  }

  return (
    <div className={cn('divide-y divide-cream-200', className)} role="region">
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id)

        return (
          <div key={item.id} className="border-cream-200">
            <button
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className={cn(
                'flex items-center justify-between w-full py-4 px-2',
                'text-left font-heading font-medium text-charcoal',
                'hover:text-rose-gold transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-rose-gold-300 focus:ring-offset-2 rounded'
              )}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
            >
              <span className="flex-1">{item.trigger}</span>
              <motion.svg
                className="w-5 h-5 text-rose-gold flex-shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  variants={accordionContent}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="px-2 pb-4 text-body text-charcoal-light">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

Accordion.displayName = 'Accordion'