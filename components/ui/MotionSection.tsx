'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { type ElementType, type ReactNode } from 'react'

interface MotionSectionProps {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  duration?: number
  amount?: number
}

/**
 * Wrapper section que hace fade-in + slide-up cuando entra en viewport.
 * Respeta prefers-reduced-motion: render instantáneo sin transform.
 */
export function MotionSection({
  as = 'section',
  children,
  className,
  id,
  delay = 0,
  duration = 0.6,
  amount = 0.15,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
  const whileInView = { opacity: 1, y: 0 }

  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<'section'>>

  return (
    <MotionComponent
      id={id}
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionComponent>
  )
}
