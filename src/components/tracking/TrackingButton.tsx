'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { trackCTAClick } from '@/lib/tracking'

interface TrackingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  trackingLabel: string
  trackingLocation: string
}

/**
 * Button component with automatic CTA tracking
 *
 * Usage:
 * <TrackingButton
 *   trackingLabel="Contact Sales"
 *   trackingLocation="Hero Section"
 *   onClick={() => openModal()}
 * >
 *   Get Started
 * </TrackingButton>
 */
export function TrackingButton({
  children,
  trackingLabel,
  trackingLocation,
  onClick,
  ...props
}: TrackingButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackCTAClick(trackingLabel, trackingLocation)

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
