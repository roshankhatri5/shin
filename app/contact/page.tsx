'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/features/contact/contact-form'
import { ContactInfo } from '@/components/features/contact/contact-info'
import { slideUp } from '@/lib/animations'

export default function ContactPage() {
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
                  Contact
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed">
              Have a question or ready to book an appointment? We'd love to hear from you.
              Fill out the form below or reach out using our contact information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="mb-8">
                <h2 className="font-display text-3xl text-charcoal mb-3">
                  Send Us a Message
                </h2>
                <p className="text-charcoal-light">
                  Fill out the form and we'll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="mb-8">
                <h2 className="font-display text-3xl text-charcoal mb-3">
                  Contact Information
                </h2>
                <p className="text-charcoal-light">
                  Visit us, call us, or connect with us on social media.
                </p>
              </div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
                Find Us
              </h2>
              <p className="text-lg text-charcoal-light">
                Located in the heart of downtown, with easy access and parking available.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-luxury">
              {/* In production, replace with actual Google Maps embed */}
              <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rose-gold mx-auto mb-4" />
                  <p className="text-lg text-charcoal font-medium mb-2">
                    123 Main Street
                  </p>
                  <p className="text-charcoal-light">
                    Downtown, CA 90210
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-rose-gold hover:bg-rose-gold-600 text-white font-heading font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              
              {/* Uncomment and add your Google Maps API key for production */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luxury Nail Salon Location"
              ></iframe> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-rose-gold to-rose-gold-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Book your appointment today and discover why we're the premier choice for nail care.
            </p>
            <a
              href="/booking"
              className="inline-block px-8 py-4 bg-white text-rose-gold font-heading font-semibold text-lg rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
            >
              Book Appointment
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}