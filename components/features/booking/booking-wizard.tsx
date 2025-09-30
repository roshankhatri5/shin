'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBooking, BookingService } from '@/hooks/use-booking'
import { ServiceSelection } from './service-selection'
import { DateTimeSelection } from './date-time-selection'
import { TechnicianSelection } from './technician-selection'
import { CustomerInfo, CustomerInfoData } from './customer-info'
import { BookingSummary } from './booking-summary'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { slideRight } from '@/lib/animations'

const TOTAL_STEPS = 5

export function BookingWizard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()
  const {
    state,
    setCurrentStep,
    nextStep,
    previousStep,
    addService,
    removeService,
    setDateTime,
    setTechnician,
    setCustomerInfo,
    setAgreedToTerms,
    resetBooking,
    totalDuration,
    totalPrice,
    canProceedToNextStep,
  } = useBooking()

  const handleServiceToggle = (service: BookingService) => {
    const isSelected = state.selectedServices.some((s) => s.serviceId === service.serviceId)
    if (isSelected) {
      removeService(service.serviceId)
    } else {
      addService(service)
    }
  }

  const handleCustomerInfoSubmit = (data: CustomerInfoData) => {
    setCustomerInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      notes: data.notes || '',
    })
    nextStep()
  }

  const handleConfirmBooking = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would be:
      // const response = await fetch('/api/booking/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(state),
      // })

      showToast({
        title: 'Booking confirmed!',
        description: 'Your appointment has been successfully booked. Check your email for confirmation.',
        variant: 'success',
      })

      resetBooking()
    } catch {
      showToast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (state.currentStep === 4) {
      // Trigger customer info form submission
      const submitButton = document.getElementById('customer-info-submit') as HTMLButtonElement
      submitButton?.click()
    } else if (canProceedToNextStep()) {
      nextStep()
    }
  }

  const canGoNext = canProceedToNextStep()
  const canGoBack = state.currentStep > 1

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-charcoal-light">
            Step {state.currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-charcoal-light">
            {Math.round((state.currentStep / TOTAL_STEPS) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-ivory-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink to-blush"
            initial={{ width: 0 }}
            animate={{ width: `${(state.currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        
        {/* Step Labels */}
        <div className="grid grid-cols-5 gap-2 mt-4">
          {['Service', 'Date/Time', 'Technician', 'Info', 'Review'].map((label, index) => (
            <div
              key={label}
              className={cn(
                'text-center text-xs font-medium transition-colors duration-300',
                state.currentStep === index + 1
                  ? 'text-pink'
                  : state.currentStep > index + 1
                    ? 'text-emerald-500'  // Using emerald as a substitute for mint
                    : 'text-charcoal/70'
              )}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-cream rounded-2xl p-8 md:p-10 shadow-lg mb-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          {state.currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={slideRight}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ServiceSelection
                selectedServices={state.selectedServices}
                onServiceToggle={handleServiceToggle}
              />
            </motion.div>
          )}

          {state.currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={slideRight}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DateTimeSelection
                selectedDate={state.selectedDate}
                selectedTime={state.selectedTime}
                onDateTimeChange={setDateTime}
                duration={totalDuration}
              />
            </motion.div>
          )}

          {state.currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={slideRight}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TechnicianSelection
                selectedTechnician={state.selectedTechnician}
                onTechnicianSelect={setTechnician}
              />
            </motion.div>
          )}

          {state.currentStep === 4 && (
            <motion.div
              key="step-4"
              variants={slideRight}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CustomerInfo
                initialData={state.customerInfo}
                onSubmit={handleCustomerInfoSubmit}
              />
            </motion.div>
          )}

          {state.currentStep === 5 && (
            <motion.div
              key="step-5"
              variants={slideRight}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BookingSummary
                bookingState={state}
                totalPrice={totalPrice}
                totalDuration={totalDuration}
                onEdit={setCurrentStep}
                onConfirm={handleConfirmBooking}
                onTermsChange={setAgreedToTerms}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {state.currentStep < 5 && (
        <div className="flex items-center justify-between">
          <Button
            onClick={previousStep}
            disabled={!canGoBack}
            variant="ghost"
            size="lg"
            className="text-charcoal"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canGoNext}
            size="lg"
            className="min-w-[140px]"
          >
            {state.currentStep === 4 ? 'Review' : 'Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}