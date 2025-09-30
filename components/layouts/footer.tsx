'use client'

import Link from 'next/link'
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { NewsletterForm } from '@/components/features/footer/newsletter-form'

const quickLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Book Now' },
]

const socialLinks = [
  { 
    href: 'https://instagram.com', 
    label: 'Instagram',
    icon: Instagram,
  },
  { 
    href: 'https://facebook.com', 
    label: 'Facebook',
    icon: Facebook,
  },
]

const salonHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 5:00 PM' },
]

export function Footer() {
  const currentYear = typeof window !== 'undefined' ? new Date().getFullYear() : new Date().getUTCFullYear()

  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              aria-label="Luxury Nail Salon Home"
            >
              <Sparkles 
                className="w-8 h-8 text-rose-gold group-hover:rotate-12 transition-transform duration-300" 
                aria-hidden="true"
              />
              <span className="font-display text-2xl font-semibold">
                Luxury Nails
              </span>
            </Link>
            
            <p className="text-white/80 text-body-sm leading-relaxed">
              Experience the art of luxury nail care. Where beauty meets relaxation, 
              and every detail is perfected with care.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold flex items-center justify-center transition-colors duration-300 group"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon 
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-rose-gold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-rose-gold text-body-sm transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-rose-gold transition-all duration-200 group-hover:w-4 group-hover:mr-2" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-rose-gold">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white/80 text-body-sm">
                    123 Beauty Lane<br />
                    Suite 100<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a 
                  href="tel:+15550123456" 
                  className="text-white/80 hover:text-rose-gold text-body-sm transition-colors duration-200"
                >
                  (555) 012-3456
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a 
                  href="mailto:hello@luxurynails.com" 
                  className="text-white/80 hover:text-rose-gold text-body-sm transition-colors duration-200"
                >
                  hello@luxurynails.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-rose-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-white/80 text-body-sm space-y-1">
                  {salonHours.map((schedule) => (
                    <div key={schedule.day}>
                      <span className="font-medium">{schedule.day}:</span>
                      <br />
                      {schedule.hours}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4 text-rose-gold">
              Newsletter
            </h3>
            <p className="text-white/80 text-body-sm mb-4">
              Subscribe for exclusive offers, beauty tips, and updates on new services.
            </p>
            <NewsletterForm />
            <p className="text-white/60 text-body-xs mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-body-sm text-center md:text-left">
              © {currentYear} Luxury Nail Salon. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-rose-gold text-body-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40" aria-hidden="true">|</span>
              <Link
                href="/terms"
                className="text-white/60 hover:text-rose-gold text-body-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}