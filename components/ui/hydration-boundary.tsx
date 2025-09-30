'use client'

import { useEffect, useState } from 'react'

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * HydrationBoundary component to handle hydration mismatches
 * caused by browser extensions that modify the DOM
 */
export function HydrationBoundary({ children, fallback = null }: HydrationBoundaryProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}