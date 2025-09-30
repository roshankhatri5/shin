export interface TimeSlot {
  time: string
  available: boolean
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  closed: boolean
}

export const businessHours: BusinessHours[] = [
  { day: 'Monday', open: '09:00', close: '19:00', closed: false },
  { day: 'Tuesday', open: '09:00', close: '19:00', closed: false },
  { day: 'Wednesday', open: '09:00', close: '19:00', closed: false },
  { day: 'Thursday', open: '09:00', close: '19:00', closed: false },
  { day: 'Friday', open: '09:00', close: '19:00', closed: false },
  { day: 'Saturday', open: '09:00', close: '18:00', closed: false },
  { day: 'Sunday', open: '10:00', close: '18:00', closed: false },
]

// Generate time slots for booking (every 15 minutes)
export function generateTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = []
  const startParts = startTime.split(':').map(Number)
  const endParts = endTime.split(':').map(Number)
  
  const startHour = startParts[0] ?? 9
  const startMin = startParts[1] ?? 0
  const endHour = endParts[0] ?? 18
  const endMin = endParts[1] ?? 0
  
  let currentHour = startHour
  let currentMin = startMin
  
  while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour
    const period = currentHour >= 12 ? 'PM' : 'AM'
    const minStr = currentMin.toString().padStart(2, '0')
    slots.push(`${hour12}:${minStr} ${period}`)
    
    currentMin += 15
    if (currentMin >= 60) {
      currentMin = 0
      currentHour += 1
    }
  }
  
  return slots
}

// Default time slots for a typical business day (9 AM - 6 PM)
export const defaultTimeSlots = generateTimeSlots('09:00', '18:00')

// Mock function to check availability (in real app, this would check database)
export function getAvailableSlots(date: Date, duration: number): TimeSlot[] {
  // For demo purposes, randomly mark some slots as unavailable
  return defaultTimeSlots.map(time => ({
    time,
    available: Math.random() > 0.3, // 70% availability
  }))
}

export const salonInfo = {
  name: 'Luxury Nail Salon',
  address: {
    street: '123 Main Street',
    city: 'Downtown',
    state: 'CA',
    zip: '90210',
    country: 'USA',
  },
  phone: '(555) 012-3456',
  email: 'info@luxurynailsalon.com',
  social: {
    instagram: '@luxurynailsalon',
    facebook: 'LuxuryNailSalon',
    pinterest: 'luxurynails',
  },
}