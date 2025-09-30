// Common types for the application

export interface Service {
  id: string
  slug: string
  name: string
  shortDescription: string
  category: ServiceCategory
  price: number
  duration: number
  image?: string
}

export type ServiceCategory =
  | 'manicure'
  | 'pedicure'
  | 'nail-art'
  | 'gel-polish'
  | 'extensions'
  | 'spa-treatments'

export interface Booking {
  id: string
  customerId?: string
  serviceId: string
  appointmentDateTime: Date
  status: BookingStatus
  totalPrice: number
  customerInfo: CustomerInfo
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no-show'

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo?: string
  specialties: string[]
}

export interface Testimonial {
  id: string
  customerName: string
  rating: number
  reviewText: string
  serviceId?: string
  createdAt: Date
}

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  message: string
  preferredContact: 'email' | 'phone'
}