'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { teamMembers } from '@/lib/constants/team'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-h1 md:text-display-lg text-charcoal mb-4">
            Meet Our <span className="text-rose-gold">Expert Team</span>
          </h2>
          <p className="text-body-lg text-charcoal-light">
            Our talented technicians bring years of experience, creativity, and passion 
            to every service they provide.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {teamMembers.filter(member => member.featured).map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItem}
              whileHover="hover"
              className="group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <motion.div
                variants={hoverLift}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300 border-2 border-transparent hover:border-rose-gold-200"
              >
                {/* Avatar */}
                <div className="relative pt-8 pb-6 flex justify-center">
                  <div className="relative">
                    <Avatar
                      size="xl"
                      fallback={member.name.charAt(0)}
                      alt={member.name}
                      className="ring-4 ring-rose-gold-100 group-hover:ring-rose-gold-200 transition-all duration-300"
                    />
                    {member.featured && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-rose-gold text-white text-body-xs">
                          ⭐ Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="font-heading text-h4 text-charcoal mb-1 group-hover:text-rose-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-body-sm text-rose-gold font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-body-sm text-charcoal-light mb-4 line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full bg-cream-100 text-charcoal-light text-body-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {member.specialties.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-cream-100 text-charcoal-light text-body-xs">
                        +{member.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Experience Badge */}
                  <div className="flex items-center justify-center gap-2 text-body-sm text-charcoal-light">
                    <span className="font-semibold text-rose-gold">{member.yearsExperience}+</span>
                    <span>years experience</span>
                  </div>

                  {/* Social */}
                  {member.instagram && (
                    <div className="mt-4">
                      <a
                        href={`https://instagram.com/${member.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-body-sm text-charcoal-light hover:text-rose-gold transition-colors"
                      >
                        <Instagram className="w-4 h-4" aria-hidden="true" />
                        <span>{member.instagram}</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <Modal
              isOpen={true}
              onClose={() => setSelectedMember(null)}
              title={selectedMember.name}
            >
              <div className="space-y-6">
                {/* Avatar & Role */}
                <div className="flex items-center gap-4">
                  <Avatar
                    size="xl"
                    fallback={selectedMember.name.charAt(0)}
                    alt={selectedMember.name}
                  />
                  <div>
                    <h3 className="font-heading text-h3 text-charcoal">
                      {selectedMember.name}
                    </h3>
                    <p className="text-body text-rose-gold font-medium">
                      {selectedMember.role}
                    </p>
                    <p className="text-body-sm text-charcoal-light mt-1">
                      {selectedMember.yearsExperience}+ years of experience
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-heading font-semibold text-charcoal mb-2">About</h4>
                  <p className="text-body text-charcoal-light leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="font-heading font-semibold text-charcoal mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((specialty, index) => (
                      <Badge key={index} variant="default">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selectedMember.certifications && selectedMember.certifications.length > 0 && (
                  <div>
                    <h4 className="font-heading font-semibold text-charcoal mb-3">Certifications</h4>
                    <ul className="space-y-2">
                      {selectedMember.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2 text-body-sm text-charcoal-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold" aria-hidden="true" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Social */}
                {selectedMember.instagram && (
                  <div className="pt-4 border-t border-cream-200">
                    <a
                      href={`https://instagram.com/${selectedMember.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body text-rose-gold hover:text-rose-gold-600 transition-colors"
                    >
                      <Instagram className="w-5 h-5" aria-hidden="true" />
                      <span>Follow on Instagram</span>
                    </a>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}