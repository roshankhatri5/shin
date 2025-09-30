'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar, Clock, User, Mail, Phone, DollarSign, Edit2, MessageCircle } from 'lucide-react'
import { BookingState } from '@/hooks/use-booking'
import { Button } from '@/components/ui/button'
import { slideUp } from '@/lib/animations'

interface BookingSummaryProps {
  bookingState: BookingState
  totalPrice: number
  totalDuration: number
  onEdit: (step: number) => void
  onConfirm: () => void
  onTermsChange: (agreed: boolean) => void
  isSubmitting: boolean
}

export function BookingSummary({
  bookingState,
  totalPrice,
  totalDuration,
  onEdit,
  onConfirm,
  onTermsChange,
  isSubmitting,
}: BookingSummaryProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Review & Confirm
        </h2>
        <p className="text-charcoal-light">
          Please review your booking details before confirming.
        </p>
      </div>

      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Services Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-rose-gold" />
              Selected Services
            </h3>
            <button
              onClick={() => onEdit(1)}
              className="text-rose-gold hover:text-rose-gold-600 text-sm font-medium flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {bookingState.selectedServices.map((service) => (
              <div key={service.serviceId} className="flex justify-between items-center pb-3 border-b border-cream-100 last:border-0">
                <div>
                  <p className="font-medium text-charcoal">{service.serviceName}</p>
                  <p className="text-sm text-charcoal-light">{service.duration} minutes</p>
                </div>
                <p className="font-semibold text-rose-gold">${service.price}</p>
              </div>
            ))}
            <div className="pt-3 flex justify-between items-center font-semibold">
              <span className="text-charcoal">Subtotal</span>
              <span className="text-rose-gold text-xl">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Date & Time Summary */}
        {bookingState.selectedDate && bookingState.selectedTime && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-semibold text-charcoal flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-gold" />
                Appointment Time
              </h3>
              <button
                onClick={() => onEdit(2)}
                className="text-rose-gold hover:text-rose-gold-600 text-sm font-medium flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-charcoal-light" />
                <p className="text-charcoal">
                  {format(bookingState.selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-charcoal-light" />
                <p className="text-charcoal">
                  {bookingState.selectedTime} ({totalDuration} minutes)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Technician Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal flex items-center gap-2">
              <User className="w-5 h-5 text-rose-gold" />
              Technician
            </h3>
            <button
              onClick={() => onEdit(3)}
              className="text-rose-gold hover:text-rose-gold-600 text-sm font-medium flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>
          <p className="text-charcoal">
            {bookingState.selectedTechnician?.name || 'No preference - Next available'}
          </p>
          {bookingState.selectedTechnician && (
            <p className="text-sm text-charcoal-light mt-1">
              {bookingState.selectedTechnician.role}
            </p>
          )}
        </div>

        {/* Customer Info Summary */}
        {bookingState.customerInfo && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-semibold text-charcoal flex items-center gap-2">
                <User className="w-5 h-5 text-rose-gold" />
                Contact Information
              </h3>
              <button
                onClick={() => onEdit(4)}
                className="text-rose-gold hover:text-rose-gold-600 text-sm font-medium flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-charcoal">
                {bookingState.customerInfo.firstName} {bookingState.customerInfo.lastName}
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-charcoal-light" />
                <p className="text-charcoal-light">{bookingState.customerInfo.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-charcoal-light" />
                <p className="text-charcoal-light">{bookingState.customerInfo.phone}</p>
              </div>
              {bookingState.customerInfo.notes && (
                <div className="pt-3 border-t border-cream-100">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-charcoal-light mt-1" />
                    <p className="text-sm text-charcoal-light">{bookingState.customerInfo.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="bg-rose-gold-50 rounded-xl p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bookingState.agreedToTerms}
              onChange={(e) => onTermsChange(e.target.checked)}
              className="w-5 h-5 text-rose-gold focus:ring-rose-gold rounded mt-1"
              required
            />
            <span className="text-sm text-charcoal">
              I agree to the{' '}
              <a href="/terms" className="text-rose-gold hover:underline" target="_blank">
                terms and conditions
              </a>{' '}
              and{' '}
              <a href="/cancellation-policy" className="text-rose-gold hover:underline" target="_blank">
                cancellation policy
              </a>
              . I understand that a 24-hour notice is required for cancellations.
            </span>
          </label>
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-br from-rose-gold to-rose-gold-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Amount</p>
              <p className="font-display text-4xl font-bold">${totalPrice}</p>
              <p className="text-white/80 text-sm mt-1">Estimated {totalDuration} minutes</p>
            </div>
            <Button
              onClick={onConfirm}
              disabled={!bookingState.agreedToTerms || isSubmitting}
              variant="secondary"
              size="lg"
              className="bg-white text-rose-gold hover:bg-cream-50"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}