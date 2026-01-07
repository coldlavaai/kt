/**
 * Flagship Tracking & Analytics System
 *
 * Centralized tracking utility for:
 * - Google Tag Manager (GTM)
 * - Google Analytics 4 (GA4)
 * - Facebook/Meta Pixel
 * - LinkedIn Insight Tag
 * - Google Ads
 * - Microsoft Clarity
 *
 * All events pushed to GTM data layer for unified tracking.
 */

// Type definitions
declare global {
  interface Window {
    dataLayer: any[]
    fbq: (...args: any[]) => void
    _fbq: any
    gtag: (...args: any[]) => void
    lintrk: (...args: any[]) => void
    clarity: (...args: any[]) => void
  }
}

interface TrackingEvent {
  event: string
  [key: string]: any
}

interface PageViewData {
  page_title?: string
  page_location?: string
  page_path?: string
}

interface ConversionData {
  value?: number
  currency?: string
  transaction_id?: string
  items?: any[]
}

/**
 * Check if tracking is enabled
 */
export const isTrackingEnabled = (): boolean => {
  if (typeof window === 'undefined') return false
  return process.env.NEXT_PUBLIC_ENABLE_TRACKING !== 'false'
}

/**
 * Initialize data layer
 */
export const initDataLayer = (): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }
}

/**
 * Push event to GTM data layer
 */
export const pushToDataLayer = (data: TrackingEvent): void => {
  if (!isTrackingEnabled()) return

  initDataLayer()

  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data)

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 GTM Data Layer:', data)
    }
  }
}

// ============================================
// PAGE TRACKING
// ============================================

/**
 * Track page view
 */
export const trackPageView = (data?: PageViewData): void => {
  pushToDataLayer({
    event: 'page_view',
    page_title: data?.page_title || document.title,
    page_location: data?.page_location || window.location.href,
    page_path: data?.page_path || window.location.pathname,
  })
}

// ============================================
// CONVERSION TRACKING
// ============================================

/**
 * Track booking initiated (clicked Cal.com link)
 */
export const trackBookingInitiated = (): void => {
  pushToDataLayer({
    event: 'initiate_booking',
    event_category: 'engagement',
    event_label: 'Cal.com Click',
    value: 0,
  })

  // Facebook Pixel: InitiateCheckout
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Discovery Call',
      content_category: 'Consultation',
    })
  }
}

/**
 * Track contact/lead (form submission, phone click)
 */
export const trackLead = (source: string): void => {
  pushToDataLayer({
    event: 'generate_lead',
    event_category: 'conversion',
    event_label: source,
    lead_source: source,
  })

  // Facebook Pixel: Lead
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: source,
    })
  }

  // LinkedIn conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: 'lead' })
  }
}

/**
 * Track phone click
 */
export const trackPhoneClick = (): void => {
  trackLead('Phone Click')

  pushToDataLayer({
    event: 'contact',
    method: 'phone',
  })

  // Facebook Pixel: Contact
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact')
  }
}

/**
 * Track email click
 */
export const trackEmailClick = (): void => {
  trackLead('Email Click')

  pushToDataLayer({
    event: 'contact',
    method: 'email',
  })
}

// ============================================
// ENGAGEMENT TRACKING
// ============================================

/**
 * Track video play
 */
export const trackVideoPlay = (videoName: string): void => {
  pushToDataLayer({
    event: 'video_start',
    video_title: videoName,
  })
}

/**
 * Track ISS Tracker interaction
 */
export const trackISSInteraction = (action: string): void => {
  pushToDataLayer({
    event: 'iss_tracker_interaction',
    event_category: 'engagement',
    event_label: action,
  })
}

/**
 * Track service page view (for remarketing)
 */
export const trackServiceView = (serviceName: string): void => {
  pushToDataLayer({
    event: 'view_item',
    event_category: 'engagement',
    item_name: serviceName,
    content_type: 'service',
  })

  // Facebook Pixel: ViewContent
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: serviceName,
      content_category: 'Service',
      content_type: 'product',
    })
  }
}

/**
 * Track CTA click (any call-to-action button)
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string): void => {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: ctaName,
    cta_location: ctaLocation,
  })
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export const trackScrollDepth = (percentage: number): void => {
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: percentage,
  })
}

/**
 * Track time on page milestones (30s, 60s, 120s)
 */
export const trackTimeOnPage = (seconds: number): void => {
  pushToDataLayer({
    event: 'time_on_page',
    time_seconds: seconds,
  })
}

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, linkText?: string): void => {
  pushToDataLayer({
    event: 'outbound_link',
    link_url: url,
    link_text: linkText || url,
  })
}

/**
 * Track file download
 */
export const trackFileDownload = (fileName: string, fileType: string): void => {
  pushToDataLayer({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
  })
}

// ============================================
// CUSTOM DIMENSIONS
// ============================================

/**
 * Track user segment (for custom audiences)
 */
export const trackUserSegment = (segment: string): void => {
  pushToDataLayer({
    event: 'user_segment',
    segment_name: segment,
  })
}

/**
 * Track high-intent behavior
 */
export const trackHighIntent = (reason: string): void => {
  pushToDataLayer({
    event: 'high_intent_user',
    intent_reason: reason,
  })

  trackUserSegment('High Intent')
}

// ============================================
// ERROR TRACKING
// ============================================

/**
 * Track JavaScript errors
 */
export const trackError = (error: Error, errorInfo?: any): void => {
  pushToDataLayer({
    event: 'js_error',
    error_message: error.message,
    error_stack: error.stack,
    error_info: errorInfo,
  })
}

// ============================================
// ECOMMERCE TRACKING (for future use)
// ============================================

/**
 * Track purchase/conversion
 */
export const trackPurchase = (data: ConversionData): void => {
  pushToDataLayer({
    event: 'purchase',
    transaction_id: data.transaction_id,
    value: data.value || 0,
    currency: data.currency || 'GBP',
    items: data.items || [],
  })

  // Facebook Pixel: Purchase
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: data.value || 0,
      currency: data.currency || 'GBP',
    })
  }
}

// ============================================
// REMARKETING HELPERS
// ============================================

/**
 * Track high-value page visit (3+ pages)
 */
let pageViewCount = 0
export const incrementPageViewCount = (): void => {
  pageViewCount++

  if (pageViewCount >= 3) {
    trackHighIntent('Viewed 3+ pages')
  }
}

/**
 * Track engaged user (2+ minutes on site)
 */
let siteEntryTime: number | null = null
export const trackSiteEntry = (): void => {
  if (siteEntryTime === null) {
    siteEntryTime = Date.now()

    // Check at 2 minutes
    setTimeout(() => {
      trackHighIntent('Spent 2+ minutes on site')
      trackTimeOnPage(120)
    }, 120000)
  }
}

// ============================================
// UTILITY: AUTO-TRACKING SETUP
// ============================================

/**
 * Setup automatic scroll depth tracking
 */
export const setupScrollTracking = (): void => {
  if (typeof window === 'undefined') return

  const trackedDepths = new Set<number>()
  const depths = [25, 50, 75, 100]

  const handleScroll = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    depths.forEach(depth => {
      if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth)
        trackScrollDepth(depth)
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
}

/**
 * Setup automatic outbound link tracking
 */
export const setupOutboundLinkTracking = (): void => {
  if (typeof window === 'undefined') return

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const link = target.closest('a')

    if (link && link.href) {
      const url = new URL(link.href, window.location.href)

      // Check if external link
      if (url.hostname !== window.location.hostname) {
        trackOutboundLink(url.href, link.textContent || undefined)
      }
    }
  })
}

/**
 * Setup automatic time on page tracking
 */
export const setupTimeTracking = (): void => {
  if (typeof window === 'undefined') return

  const milestones = [30, 60, 120, 300] // 30s, 1min, 2min, 5min
  const tracked = new Set<number>()

  const startTime = Date.now()

  const checkMilestones = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)

    milestones.forEach(milestone => {
      if (elapsed >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone)
        trackTimeOnPage(milestone)
      }
    })
  }

  setInterval(checkMilestones, 5000) // Check every 5 seconds
}

/**
 * Initialize all auto-tracking
 */
export const initializeTracking = (): void => {
  if (!isTrackingEnabled()) return

  setupScrollTracking()
  setupOutboundLinkTracking()
  setupTimeTracking()
  trackSiteEntry()
}

// ============================================
// CONSENT MODE (GDPR)
// ============================================

/**
 * Update consent settings
 */
export const updateConsent = (
  analytics: boolean,
  marketing: boolean,
  functionality: boolean
): void => {
  pushToDataLayer({
    event: 'consent_update',
    consent_analytics: analytics,
    consent_marketing: marketing,
    consent_functionality: functionality,
  })

  // GTM Consent Mode
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      functionality_storage: functionality ? 'granted' : 'denied',
    })
  }
}
