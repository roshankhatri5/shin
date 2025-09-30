'use client'

import { useState, useCallback } from 'react'
import { Service } from '@/lib/constants/services'
import { TeamMember } from '@/lib/constants/team'

export interface BookingService {
  serviceId: string
  pricingTierId: string
  serviceName: string
  price: number
  duration: number
}

export interface BookingState {
  currentStep: number
  selectedServices: BookingService[]
  selectedDate: Date | null
  selectedTime: string | null
  selectedTechnician: TeamMember | null
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    notes: string
  } | null
  agreedToTerms: boolean
}

const initialState: BookingState = {
  currentStep: 1,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  selectedTechnician: null,
  customerInfo: null,
  agreedToTerms: false,
}

export function useBooking() {
  const [state, setState] = useState<BookingState>(initialState)

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
  }, [])

  const previousStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }))
  }, [])

  const addService = useCallback((service: BookingService) => {
    setState((prev) => ({
      ...prev,
      selectedServices: [...prev.selectedServices, service],
    }))
  }, [])

  const removeService = useCallback((serviceId: string) => {
    setState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((s) => s.serviceId !== serviceId),
    }))
  }, [])

  const setServices = useCallback((services: BookingService[]) => {
    setState((prev) => ({ ...prev, selectedServices: services }))
  }, [])

  const setDateTime = useCallback((date: Date | null, time: string | null) => {
    setState((prev) => ({ ...prev, selectedDate: date, selectedTime: time }))
  }, [])

  const setTechnician = useCallback((technician: TeamMember | null) => {
    setState((prev) => ({ ...prev, selectedTechnician: technician }))
  }, [])

  const setCustomerInfo = useCallback((info: BookingState['customerInfo']) => {
    setState((prev) => ({ ...prev, customerInfo: info }))
  }, [])

  const setAgreedToTerms = useCallback((agreed: boolean) => {
    setState((prev) => ({ ...prev, agreedToTerms: agreed }))
  }, [])

  const resetBooking = useCallback(() => {
    setState(initialState)
  }, [])

  // Computed values
  const totalDuration = state.selectedServices.reduce((sum, service) => sum + service.duration, 0)
  const totalPrice = state.selectedServices.reduce((sum, service) => sum + service.price, 0)
  const canProceedToNextStep = useCallback(() => {
    switch (state.currentStep) {
      case 1:
        return state.selectedServices.length > 0
      case 2:
        return state.selectedDate !== null && state.selectedTime !== null
      case 3:
        return true // Technician is optional
      case 4:
        return state.customerInfo !== null
      case 5:
        return state.agreedToTerms
      default:
        return false
    }
  }, [state])

  return {
    state,
    setCurrentStep,
    nextStep,
    previousStep,
    addService,
    removeService,
    setServices,
    setDateTime,
    setTechnician,
    setCustomerInfo,
    setAgreedToTerms,
    resetBooking,
    totalDuration,
    totalPrice,
    canProceedToNextStep,
  }
}