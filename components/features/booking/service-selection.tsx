'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { services } from '@/lib/constants/services'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { slideUp, staggerContainer } from '@/lib/animations'
import { BookingService } from '@/hooks/use-booking'

interface ServiceSelectionProps {
  selectedServices: BookingService[]
  onServiceToggle: (service: BookingService) => void
}

export function ServiceSelection({ selectedServices, onServiceToggle }: ServiceSelectionProps) {
  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.serviceId === serviceId)
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Select Your Service
        </h2>
        <p className="text-charcoal-light">
          Choose the service(s) you'd like to book. You can select multiple services.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 gap-6"
      >
        {services.map((service) => {
          const isSelected = isServiceSelected(service.id)
          const defaultPricing = service.pricing[0]

          return (
            <motion.div key={service.id} variants={slideUp}>
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (defaultPricing) {
                    onServiceToggle({
                      serviceId: service.id,
                      pricingTierId: defaultPricing.id,
                      serviceName: service.name,
                      price: defaultPricing.price,
                      duration: service.duration.max,
                    })
                  }
                }}
              >
                <Card
                  className={cn(
                    'transition-all duration-300 hover:shadow-luxury relative',
                    isSelected && 'border-2 border-rose-gold shadow-luxury'
                  )}
                >
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center justify-center w-8 h-8 bg-rose-gold rounded-full">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                        {service.name}
                      </h3>
                      <Badge variant="info" size="sm">
                        {service.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-charcoal-light mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                    <div>
                      <p className="text-sm text-charcoal-light">Starting at</p>
                      <p className="font-display text-2xl font-bold text-rose-gold">
                        ${defaultPricing?.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-charcoal-light">Duration</p>
                      <p className="font-semibold text-charcoal">
                        {service.duration.min}-{service.duration.max} min
                      </p>
                    </div>
                  </div>

                  {service.pricing.length > 1 && (
                    <p className="text-xs text-charcoal-light mt-3">
                      {service.pricing.length} pricing options available
                    </p>
                  )}
                </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-rose-gold-50 rounded-xl"
        >
          <h3 className="font-heading font-semibold text-charcoal mb-3">
            Selected Services ({selectedServices.length})
          </h3>
          <div className="space-y-2">
            {selectedServices.map((service) => (
              <div key={service.serviceId} className="flex justify-between items-center">
                <span className="text-charcoal">{service.serviceName}</span>
                <span className="font-semibold text-rose-gold">${service.price}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-rose-gold-200 flex justify-between items-center font-semibold">
              <span className="text-charcoal">Total</span>
              <span className="text-rose-gold text-xl">
                ${selectedServices.reduce((sum, s) => sum + s.price, 0)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}