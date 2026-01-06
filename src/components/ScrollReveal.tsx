'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  /**
   * Start of scroll range in pixels
   * Default: 0
   */
  startScroll?: number
  /**
   * End of scroll range in pixels
   * Default: 100
   */
  endScroll?: number
  /**
   * Output range for opacity
   * Default: [1, 0]
   */
  opacityRange?: [number, number]
  /**
   * Output range for Y translation
   * Default: [0, -50]
   */
  yRange?: [number, number]
  className?: string
}

/**
 * Component that reveals/hides content based on scroll position
 * Perfect for hero sections that transform as you scroll
 */
export function ScrollReveal({
  children,
  startScroll = 0,
  endScroll = 100,
  opacityRange = [1, 0],
  yRange = [0, -50],
  className = '',
}: ScrollRevealProps) {
  const { scrollY } = useScroll()

  const opacity = useTransform(
    scrollY,
    [startScroll, endScroll],
    opacityRange
  )

  const y = useTransform(scrollY, [startScroll, endScroll], yRange)

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

interface ScrollFadeInProps {
  children: ReactNode
  /**
   * Start of scroll range in pixels
   */
  startScroll?: number
  /**
   * End of scroll range in pixels
   */
  endScroll?: number
  className?: string
}

/**
 * Component that fades in content as you scroll down
 * Perfect for revealing secondary information
 */
export function ScrollFadeIn({
  children,
  startScroll = 50,
  endScroll = 150,
  className = '',
}: ScrollFadeInProps) {
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [startScroll, endScroll], [0, 1])

  return (
    <motion.div className={className} style={{ opacity }}>
      {children}
    </motion.div>
  )
}
