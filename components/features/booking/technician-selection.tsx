'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Check, Star } from 'lucide-react'
import { teamMembers, TeamMember } from '@/lib/constants/team'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { slideUp, staggerContainer } from '@/lib/animations'

interface TechnicianSelectionProps {
  selectedTechnician: TeamMember | null
  onTechnicianSelect: (technician: TeamMember | null) => void
}

export function TechnicianSelection({ selectedTechnician, onTechnicianSelect }: TechnicianSelectionProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Select Your Technician
        </h2>
        <p className="text-charcoal-light">
          Choose a preferred technician or select "No Preference" and we'll assign the next available expert.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* No Preference Option */}
        <motion.div variants={slideUp}>
          <div
            className="cursor-pointer"
            onClick={() => onTechnicianSelect(null)}
          >
            <Card
              className={cn(
                'transition-all duration-300 hover:shadow-luxury relative h-full',
                selectedTechnician === null && 'border-2 border-rose-gold shadow-luxury'
              )}
            >
              {selectedTechnician === null && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center justify-center w-8 h-8 bg-rose-gold rounded-full">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-rose-gold-50 to-blush-50 rounded-full flex items-center justify-center">
                  <Star className="w-12 h-12 text-rose-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                  No Preference
                </h3>
                <p className="text-sm text-charcoal-light">
                  Next available technician
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Team Members */}
        {teamMembers.filter(member => member.featured).map((member) => {
          const isSelected = selectedTechnician?.id === member.id

          return (
            <motion.div key={member.id} variants={slideUp}>
              <div
                className="cursor-pointer"
                onClick={() => onTechnicianSelect(member)}
              >
                <Card
                  className={cn(
                    'transition-all duration-300 hover:shadow-luxury relative h-full',
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
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="font-heading text-xl font-semibold text-charcoal mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-charcoal-light mb-3">
                        {member.role}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-sm text-charcoal-light">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{member.yearsExperience} years experience</span>
                      </div>
                    </div>

                    {member.specialties.length > 0 && (
                      <div className="pt-4 border-t border-cream-200">
                        <p className="text-xs text-charcoal-light mb-2 font-semibold uppercase tracking-wide">
                          Specialties
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="info" size="xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {selectedTechnician && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-rose-gold-50 rounded-xl"
        >
          <h3 className="font-heading font-semibold text-charcoal mb-2">
            Selected Technician
          </h3>
          <p className="text-charcoal">
            {selectedTechnician.name} - {selectedTechnician.role}
          </p>
        </motion.div>
      )}
    </div>
  )
}