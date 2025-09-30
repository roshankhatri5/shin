import { Metadata } from 'next'
import { MainLayout } from '@/components/layouts/main-layout'

export const metadata: Metadata = {
  title: 'Book Appointment | Luxury Nail Salon',
  description: 'Book your nail appointment online. Choose your service, date, and time that works best for you.',
}

export default function BookingPage() {
  return (
    <MainLayout>
      <section className="py-20 lg:py-28 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-display-lg md:text-display-xl text-charcoal mb-6">
            Book Your <span className="text-rose-gold">Appointment</span>
          </h1>
          <p className="text-body-lg text-charcoal-light max-w-2xl mx-auto mb-8">
            Our advanced booking system is coming soon! In the meantime, please call us to schedule your appointment.
          </p>
          <div className="space-y-4">
            <a 
              href="tel:+15550123456" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-gold text-white font-heading font-semibold hover:bg-rose-gold-600 shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
            >
              Call (555) 012-3456
            </a>
            <p className="text-body-sm text-charcoal-light">
              Monday - Friday: 9:00 AM - 7:00 PM<br />
              Saturday: 10:00 AM - 6:00 PM<br />
              Sunday: 11:00 AM - 5:00 PM
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}