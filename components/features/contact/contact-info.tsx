'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { salonInfo, businessHours } from '@/lib/constants/availability'
import { slideUp } from '@/lib/animations'

export function ContactInfo() {
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Business Hours */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-rose-gold-50 rounded-full">
            <Clock className="w-6 h-6 text-rose-gold" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            Business Hours
          </h3>
        </div>
        <div className="space-y-2 pl-[60px]">
          {businessHours.map((day) => (
            <div key={day.day} className="flex justify-between items-center">
              <span className="text-charcoal font-medium">{day.day}</span>
              <span className="text-charcoal-light">
                {day.closed ? 'Closed' : `${day.open} - ${day.close}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blush-50 rounded-full">
            <MapPin className="w-6 h-6 text-blush" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            Visit Us
          </h3>
        </div>
        <div className="pl-[60px]">
          <address className="not-italic text-charcoal-light leading-relaxed">
            {salonInfo.address.street}<br />
            {salonInfo.address.city}, {salonInfo.address.state} {salonInfo.address.zip}
          </address>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-rose-gold hover:text-rose-gold-600 font-medium transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>

      {/* Phone */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-lavender-50 rounded-full">
            <Phone className="w-6 h-6 text-lavender" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            Call Us
          </h3>
        </div>
        <div className="pl-[60px]">
          <a
            href={`tel:${salonInfo.phone.replace(/\D/g, '')}`}
            className="text-lg text-charcoal hover:text-rose-gold transition-colors"
          >
            {salonInfo.phone}
          </a>
        </div>
      </div>

      {/* Email */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-mint-50 rounded-full">
            <Mail className="w-6 h-6 text-mint" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            Email Us
          </h3>
        </div>
        <div className="pl-[60px]">
          <a
            href={`mailto:${salonInfo.email}`}
            className="text-lg text-charcoal hover:text-rose-gold transition-colors break-all"
          >
            {salonInfo.email}
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-4">
          Follow Us
        </h3>
        <div className="flex gap-4">
          <a
            href={`https://instagram.com/${salonInfo.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href={`https://facebook.com/${salonInfo.social.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform duration-300"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="pt-8 border-t border-cream-200">
        <p className="text-charcoal-light italic">
          "We can't wait to pamper you! Reach out anytime with questions or to book your next appointment."
        </p>
      </div>
    </motion.div>
  )
}