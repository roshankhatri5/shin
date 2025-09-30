'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { format, addDays, isSameDay, isToday, isTomorrow } from 'date-fns'
import { cn } from '@/lib/utils'
import { defaultTimeSlots } from '@/lib/constants/availability'
import { slideUp } from '@/lib/animations'

interface DateTimeSelectionProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateTimeChange: (date: Date | null, time: string | null) => void
  duration: number
}

export function DateTimeSelection({ selectedDate, selectedTime, onDateTimeChange, duration }: DateTimeSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Generate next 30 days for selection
  const availableDates = useMemo(() => {
    const dates: Date[] = []
    for (let i = 0; i < 30; i++) {
      dates.push(addDays(new Date(), i))
    }
    return dates
  }, [])

  // Mock availability - in production, this would check actual availability
  const getAvailableSlots = (date: Date) => {
    return defaultTimeSlots.map((time) => ({
      time,
      available: Math.random() > 0.3, // 70% availability
    }))
  }

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : []

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'EEE, MMM d')
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Choose Date & Time
        </h2>
        <p className="text-charcoal-light">
          Select your preferred appointment date and time slot.
          {duration > 0 && ` This service takes approximately ${duration} minutes.`}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-rose-gold" />
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Select Date
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
              {availableDates.map((date) => {
                const isSelected = selectedDate && isSameDay(date, selectedDate)
                
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      onDateTimeChange(date, null)
                    }}
                    className={cn(
                      'p-4 rounded-lg border-2 text-center transition-all duration-300',
                      isSelected
                        ? 'border-rose-gold bg-rose-gold-50 shadow-md'
                        : 'border-cream-200 hover:border-rose-gold-200 hover:bg-cream-50'
                    )}
                  >
                    <div className="text-xs text-charcoal-light mb-1">
                      {getDateLabel(date)}
                    </div>
                    <div className={cn(
                      'font-heading text-2xl font-bold',
                      isSelected ? 'text-rose-gold' : 'text-charcoal'
                    )}>
                      {format(date, 'd')}
                    </div>
                    <div className="text-xs text-charcoal-light">
                      {format(date, 'MMM')}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Time Selection */}
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-rose-gold" />
              <h3 className="font-heading text-lg font-semibold text-charcoal">
                Select Time
              </h3>
            </div>

            {!selectedDate ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-charcoal-light mx-auto mb-3" />
                <p className="text-charcoal-light">
                  Please select a date first
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => {
                      if (slot.available) {
                        onDateTimeChange(selectedDate, slot.time)
                      }
                    }}
                    disabled={!slot.available}
                    className={cn(
                      'p-3 rounded-lg border-2 text-center transition-all duration-300',
                      selectedTime === slot.time
                        ? 'border-rose-gold bg-rose-gold text-white shadow-md'
                        : slot.available
                          ? 'border-cream-200 hover:border-rose-gold-200 hover:bg-cream-50'
                          : 'border-cream-200 bg-cream-100 opacity-50 cursor-not-allowed',
                      !slot.available && 'line-through'
                    )}
                  >
                    <div className={cn(
                      'font-heading font-semibold',
                      selectedTime === slot.time ? 'text-white' : 'text-charcoal'
                    )}>
                      {slot.time}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-rose-gold-50 rounded-xl"
        >
          <h3 className="font-heading font-semibold text-charcoal mb-2">
            Selected Appointment
          </h3>
          <p className="text-charcoal">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
          </p>
        </motion.div>
      )}
    </div>
  )
}