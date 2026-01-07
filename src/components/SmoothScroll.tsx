'use client'

import { ReactNode } from 'react'
import { LenisProvider } from '@/contexts/LenisContext'

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * SmoothScroll wrapper component
 * Provides Lenis smooth scrolling via React Context
 * @deprecated - Use LenisProvider directly instead
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  return <LenisProvider>{children}</LenisProvider>
}
