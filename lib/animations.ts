import { Variants, Transition } from 'framer-motion'

// Luxury timing functions
export const timingFunctions = {
  luxury: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounceSoft: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  snap: [0.4, 0, 0.6, 1] as [number, number, number, number],
}

// Standard durations
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
}

// Fade animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeOut: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 1 },
}

// Slide animations
export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const slideLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export const slideRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const scaleOut: Variants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.95 },
  exit: { opacity: 1, scale: 1 },
}

// Stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Modal animations
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: timingFunctions.luxury,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: {
      duration: durations.fast,
    }
  },
}

// Toast animations
export const toastSlideIn: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: durations.normal,
      ease: timingFunctions.luxury,
    }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: {
      duration: durations.fast,
    }
  },
}

// Accordion animations
export const accordionContent: Variants = {
  collapsed: { 
    height: 0, 
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: timingFunctions.luxury,
    }
  },
  expanded: { 
    height: 'auto', 
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: timingFunctions.luxury,
    }
  },
}

// Tabs indicator animation
export const tabsIndicator: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

// Hover lift effect
export const hoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -4, 
    scale: 1.02,
    transition: {
      duration: durations.fast,
      ease: timingFunctions.luxury,
    }
  },
}

// Pulse animation for loading
export const pulse: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 0.8,
    },
  },
}

// Reduced motion variants (respects prefers-reduced-motion)
export const createReducedMotionVariants = (variants: Variants): Variants => {
  const reducedVariants: Variants = {}
  
  Object.keys(variants).forEach((key) => {
    reducedVariants[key] = {
      transition: { duration: 0.01 },
    }
  })
  
  return reducedVariants
}

// Helper to get transition with respect to reduced motion
export const getTransition = (
  transition: Transition,
  prefersReducedMotion?: boolean
): Transition => {
  if (prefersReducedMotion) {
    return { duration: 0.01 }
  }
  return transition
}

// Default luxury transition
export const luxuryTransition: Transition = {
  duration: durations.normal,
  ease: timingFunctions.luxury,
}