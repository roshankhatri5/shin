'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    
    try {
      // Newsletter subscription logic will be added later
      console.log('Subscribing email:', email)
      // Here you would typically make an API call to subscribe the user
      // await subscribeToNewsletter(email)
      
      // Show success message
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setMessage('Error subscribing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-rose-gold"
        required
        aria-label="Email address for newsletter"
      />
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full bg-rose-gold hover:bg-rose-gold-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {message && (
        <p className="text-white/80 text-body-sm mt-2 text-center">
          {message}
        </p>
      )}
    </form>
  )
}