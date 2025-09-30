'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { contactSchema, ContactFormData } from '@/lib/schemas/contact'
import { services } from '@/lib/constants/services'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { useToast } from '@/components/ui/toast'
import { slideUp } from '@/lib/animations'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContact: 'email',
    },
  })

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would be:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      showToast({
        title: 'Message sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
        variant: 'success',
      })

      reset()
    } catch {
      showToast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      variants={slideUp}
      initial="initial"
      animate="animate"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Name Field */}
      <FormField
        label="Name"
        required
        error={errors.name?.message}
        htmlFor="name"
      >
        <Input
          id="name"
          {...register('name')}
          placeholder="Your full name"
          error={errors.name?.message}
        />
      </FormField>

      {/* Email Field */}
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
          placeholder="your@email.com"
          error={errors.email?.message}
        />
      </FormField>

      {/* Phone Field */}
      <FormField
        label="Phone"
        error={errors.phone?.message}
        htmlFor="phone"
      >
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 000-0000"
          error={errors.phone?.message}
        />
      </FormField>

      {/* Service Interest */}
      <FormField
        label="Service Interest"
        htmlFor="service"
      >
        <select
          id="service"
          {...register('service')}
          className="w-full px-4 py-3 font-body rounded-lg border border-ivory-200 focus:border-pink focus:ring-2 focus:ring-pink/30 focus:outline-none transition-all duration-200"
        >
          <option value="">Select a service (optional)</option>
          {services.map((service) => (
            <option key={service.id} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Preferred Contact Method */}
      <FormField
        label="Preferred Contact Method"
        required
        htmlFor="preferredContact"
      >
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="email"
              {...register('preferredContact')}
              className="w-4 h-4 text-pink focus:ring-pink"
            />
            <span className="text-charcoal">Email</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="phone"
              {...register('preferredContact')}
              className="w-4 h-4 text-pink focus:ring-pink"
            />
            <span className="text-charcoal">Phone</span>
          </label>
        </div>
      </FormField>

      {/* Message Field */}
      <FormField
        label="Message"
        required
        error={errors.message?.message}
        htmlFor="message"
      >
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us how we can help you..."
          rows={6}
          error={errors.message?.message}
        />
      </FormField>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </motion.form>
  )
}