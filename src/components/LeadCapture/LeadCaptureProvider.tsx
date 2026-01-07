'use client'

import { LeadCaptureModal } from './LeadCaptureModal'

/**
 * Lead Capture Provider
 * Automatically triggers lead capture modal based on configuration
 */
export function LeadCaptureProvider() {
  const enableLeadCapture = process.env.NEXT_PUBLIC_ENABLE_LEAD_CAPTURE !== 'false'
  const triggerType = (process.env.NEXT_PUBLIC_LEAD_CAPTURE_TRIGGER as 'time' | 'scroll' | 'exit') || 'time'
  const delaySeconds = parseInt(process.env.NEXT_PUBLIC_LEAD_CAPTURE_DELAY || '30')

  if (!enableLeadCapture) {
    return null
  }

  return (
    <LeadCaptureModal
      trigger={triggerType}
      delaySeconds={delaySeconds}
      title="Get Your Free AI Automation Guide"
      description="Learn how AI automation can save you 20+ hours per week. Real examples, actionable strategies, zero fluff."
      leadMagnet="AI Automation Starter Guide"
      buttonText="Send Me The Guide"
    />
  )
}
