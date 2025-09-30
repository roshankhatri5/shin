'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tabsIndicator } from '@/lib/animations'
import { TabsProps } from '@/types/components'

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = 'horizontal',
  className,
}) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || tabs[0]?.value || ''
  )

  const activeValue = controlledValue !== undefined ? controlledValue : internalValue

  const handleTabChange = (value: string) => {
    if (controlledValue === undefined) {
      setInternalValue(value)
    }
    onChange?.(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const availableTabs = tabs.filter((tab) => !tab.disabled)
    const currentIndex = availableTabs.findIndex((tab) => tab.value === activeValue)

    let nextIndex = currentIndex

    if (orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : availableTabs.length - 1
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextIndex = currentIndex < availableTabs.length - 1 ? currentIndex + 1 : 0
      }
    } else {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : availableTabs.length - 1
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        nextIndex = currentIndex < availableTabs.length - 1 ? currentIndex + 1 : 0
      }
    }

    if (nextIndex !== currentIndex && availableTabs[nextIndex]) {
      handleTabChange(availableTabs[nextIndex]!.value)
    }
  }


  return (
    <div
      className={cn(
        'w-full',
        orientation === 'vertical' && 'flex gap-6',
        className
      )}
    >
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'relative',
          orientation === 'horizontal'
            ? 'flex border-b-2 border-pink-200/60 bg-gradient-to-r from-white to-pink-50/30 rounded-t-2xl p-1'
            : 'flex flex-col space-y-1 min-w-[200px] bg-gradient-to-b from-white to-pink-50/30 rounded-2xl p-2'
        )}
      >
        {tabs.map((tab, _index) => {
          const isActive = tab.value === activeValue
          const isDisabled = tab.disabled

          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.value}`}
              aria-disabled={isDisabled}
              id={`tab-${tab.value}`}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleTabChange(tab.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className={cn(
                'relative px-4 py-3 font-heading font-medium transition-all duration-300 rounded-xl',
                'focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'hover:scale-105 hover:shadow-soft',
                orientation === 'horizontal'
                  ? 'whitespace-nowrap'
                  : 'text-left w-full',
                isActive
                  ? 'text-pink-600 bg-white shadow-elegant border border-pink-200/50'
                  : 'text-warmgray-600 hover:text-pink-500 hover:bg-pink-50/50'
              )}
            >
              {tab.label}

              {/* Active indicator for horizontal tabs */}
              {orientation === 'horizontal' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-blush-400 rounded-full"
                  transition={tabsIndicator}
                />
              )}

              {/* Active indicator for vertical tabs */}
              {orientation === 'vertical' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-rose-gold"
                  transition={tabsIndicator}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      <div className={cn('flex-1', orientation === 'horizontal' && 'mt-6')}>
        {tabs.map((tab) => {
          const isActive = tab.value === activeValue

          return (
            <div
              key={tab.value}
              role="tabpanel"
              id={`tabpanel-${tab.value}`}
              aria-labelledby={`tab-${tab.value}`}
              hidden={!isActive}
              className={cn(!isActive && 'hidden')}
            >
              {tab.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Tabs.displayName = 'Tabs'