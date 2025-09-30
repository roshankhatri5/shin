'use client'

import { motion } from 'framer-motion'
import { BookingWizard } from '@/components/features/booking/booking-wizard'
import { slideUp } from '@/lib/animations'

export default function BookingPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-rose-gold-50 via-blush-50 to-lavender-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideUp}
            initial="initial"
            animate="animate"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-charcoal-light">
                <li>
                  <a href="/" className="hover:text-rose-gold transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-charcoal font-medium" aria-current="page">
                  Booking
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Book Your Appointment
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Schedule your luxury nail experience in just a few simple steps.
              Choose your service, select a time, and we'll take care of the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Wizard */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl text-charcoal mb-8 text-center">
              What to Expect
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Confirmation',
                  description: 'Receive instant email confirmation with all your appointment details.',
                },
                {
                  title: 'Reminders',
                  description: 'Get helpful reminders 24 hours before your appointment via email and SMS.',
                },
                {
                  title: 'Easy Rescheduling',
                  description: 'Need to change your appointment? Reschedule easily through your confirmation email.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-rose-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-2xl font-bold text-rose-gold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-light">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-2xl font-semibold text-charcoal mb-6 text-center">
              Booking Policies
            </h2>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
              <div className="space-y-4 text-sm text-charcoal-light">
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">Cancellation Policy</h3>
                  <p>
                    We require at least 24 hours notice for cancellations or rescheduling.
                    Late cancellations or no-shows may be subject to a fee equal to 50% of the service cost.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">Arrival Time</h3>
                  <p>
                    Please arrive 5-10 minutes before your appointment to ensure we can start on time.
                    If you're running late, please call us to let us know.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-2">Payment</h3>
                  <p>
                    We accept all major credit cards, debit cards, and cash. Gratuity for your technician
                    is not included and is greatly appreciated.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}