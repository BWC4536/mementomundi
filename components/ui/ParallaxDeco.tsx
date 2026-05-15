'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ParallaxDecoProps {
  children: ReactNode
  className?: string
  /** Multiplier for scroll-linked translateY. 0.3 = subtle, 0.6 = strong. Default 0.4. */
  factor?: number
  /** Pixels of total translateY at the end of scroll progress. Default 80. */
  range?: number
}

/**
 * Wrapper para decoraciones absolute que se desplazan suavemente con el scroll.
 * Respeta prefers-reduced-motion: sin parallax, render estático.
 */
export function ParallaxDeco({
  children,
  className,
  factor = 0.4,
  range = 80,
}: ParallaxDecoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -range * factor])

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
