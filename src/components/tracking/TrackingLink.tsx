'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { trackCTAClick, trackBookingInitiated, trackPhoneClick, trackEmailClick, trackOutboundLink } from '@/lib/tracking'

interface TrackingLinkProps {
  href: string
  children: ReactNode
  className?: string
  trackingType?: 'cta' | 'booking' | 'phone' | 'email' | 'outbound' | 'none'
  trackingLabel?: string
  trackingLocation?: string
  target?: string
  rel?: string
}

/**
 * Link component with automatic tracking
 *
 * Usage:
 * <TrackingLink href="/services" trackingType="cta" trackingLabel="View Services">
 *   Explore Services
 * </TrackingLink>
 */
export function TrackingLink({
  href,
  children,
  className,
  trackingType = 'none',
  trackingLabel,
  trackingLocation,
  target,
  rel,
}: TrackingLinkProps) {
  const handleClick = () => {
    switch (trackingType) {
      case 'cta':
        if (trackingLabel && trackingLocation) {
          trackCTAClick(trackingLabel, trackingLocation)
        }
        break

      case 'booking':
        trackBookingInitiated()
        break

      case 'phone':
        trackPhoneClick()
        break

      case 'email':
        trackEmailClick()
        break

      case 'outbound':
        trackOutboundLink(href, trackingLabel)
        break

      default:
        // No tracking
        break
    }
  }

  // For external links, use <a> tag
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </a>
    )
  }

  // For internal links, use Next.js Link
  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  )
}
