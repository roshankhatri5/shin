'use client'

import { useEffect, useState } from 'react'

/**
 * Hook that generates hydration-safe IDs
 * Returns empty string on server, actual ID on client after hydration
 */
export function useHydrationSafeId(prefix: string = 'id'): string {
  const [id, setId] = useState('')

  useEffect(() => {
    // Only generate ID on client after hydration
    const timestamp = Date.now().toString(36)
    const random = Math.floor(Math.random() * 1000).toString(36)
    setId(`${prefix}_${timestamp}_${random}`)
  }, [prefix])

  return id
}

/**
 * Generates a deterministic ID based on index and prefix
 * Safe for SSR as it doesn't use random values
 */
export function generateDeterministicId(prefix: string, index: number): string {
  return `${prefix}_${index}`
}

/**
 * Client-side safe ID generation function
 * Only use this in useEffect or event handlers, not during render
 */
export function generateClientId(prefix: string = 'id'): string {
  if (typeof window === 'undefined') {
    // Server-side: return empty or placeholder
    return ''
  }
  
  const timestamp = Date.now().toString(36)
  const random = Math.floor(Math.random() * 1000).toString(36)
  return `${prefix}_${timestamp}_${random}`
}