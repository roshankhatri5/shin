'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { slideUp } from '@/lib/animations'

const customerInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  notes: z.string().max(500).optional(),
})

export type CustomerInfoData = z.infer<typeof customerInfoSchema>

interface CustomerInfoProps {
  initialData: CustomerInfoData | null
  onSubmit: (data: CustomerInfoData) => void
}

export function CustomerInfo({ initialData, onSubmit }: CustomerInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfoData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: initialData || undefined,
  })

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Your Information
        </h2>
        <p className="text-charcoal-light">
          Please provide your contact information so we can confirm your appointment.
        </p>
      </div>

      <motion.form
        variants={slideUp}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* First Name */}
          <FormField
            label="First Name"
            required
            error={errors.firstName?.message}
            htmlFor="firstName"
          >
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="John"
              leftIcon={<User className="w-5 h-5" />}
              error={errors.firstName?.message}
            />
          </FormField>

          {/* Last Name */}
          <FormField
            label="Last Name"
            required
            error={errors.lastName?.message}
            htmlFor="lastName"
          >
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Doe"
              leftIcon={<User className="w-5 h-5" />}
              error={errors.lastName?.message}
            />
          </FormField>
        </div>

        {/* Email */}
        <FormField
          label="Email"
          required
          error={errors.email?.message}
          htmlFor="email"
        >
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john.doe@example.com"
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
          />
        </FormField>

        {/* Phone */}
        <FormField
          label="Phone"
          required
          error={errors.phone?.message}
          htmlFor="phone"
        >
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone className="w-5 h-5" />}
            error={errors.phone?.message}
          />
        </FormField>

        {/* Special Requests */}
        <FormField
          label="Special Requests"
          error={errors.notes?.message}
          htmlFor="notes"
        >
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Any allergies, preferences, or special requests..."
            rows={4}
            error={errors.notes?.message}
          />
        </FormField>

        {/* Hidden submit button - parent component will trigger this */}
        <button type="submit" className="hidden" id="customer-info-submit" />
      </motion.form>
    </div>
  )
}