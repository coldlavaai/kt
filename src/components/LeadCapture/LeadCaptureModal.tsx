'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackLead } from '@/lib/tracking'

interface LeadCaptureModalProps {
  trigger?: 'time' | 'scroll' | 'exit' | 'manual'
  delaySeconds?: number
  scrollThreshold?: number
  title?: string
  description?: string
  leadMagnet?: string
  buttonText?: string
  onClose?: () => void
}

export function LeadCaptureModal({
  trigger = 'time',
  delaySeconds = 30,
  scrollThreshold = 50,
  title = 'Get Your Free AI Automation Guide',
  description = 'Learn how AI automation can save you 20+ hours per week. Real examples, actionable strategies, zero fluff.',
  leadMagnet = 'AI Automation Starter Guide',
  buttonText = 'Send Me The Guide',
  onClose,
}: LeadCaptureModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')

  // Check if user has already seen/submitted
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('lead_capture_seen')
    const hasSubmitted = localStorage.getItem('lead_capture_submitted')

    if (hasSeenModal || hasSubmitted) {
      return // Don't show again
    }

    // Time-based trigger
    if (trigger === 'time') {
      const timer = setTimeout(() => {
        setIsVisible(true)
        localStorage.setItem('lead_capture_seen', 'true')
      }, delaySeconds * 1000)

      return () => clearTimeout(timer)
    }

    // Scroll-based trigger
    if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercentage =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

        if (scrollPercentage >= scrollThreshold) {
          setIsVisible(true)
          localStorage.setItem('lead_capture_seen', 'true')
          window.removeEventListener('scroll', handleScroll)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    // Exit-intent trigger
    if (trigger === 'exit') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true)
          localStorage.setItem('lead_capture_seen', 'true')
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }

    // Manual trigger
    if (trigger === 'manual') {
      setIsVisible(true)
    }
  }, [trigger, delaySeconds, scrollThreshold])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit lead to API
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          lead_magnet: leadMagnet,
          source: 'lead_capture_modal',
          trigger,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        localStorage.setItem('lead_capture_submitted', 'true')

        // Track conversion
        trackLead('Lead Capture Modal')

        // Close after 3 seconds
        setTimeout(() => {
          handleClose()
        }, 3000)
      }
    } catch (error) {
      console.error('Lead capture error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative max-w-lg w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-yellow-500/30 rounded-2xl shadow-2xl shadow-yellow-500/20 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Accent Line */}
          <div className="h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />

          {/* Content */}
          <div className="p-8">
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
                    <span className="text-yellow-500 text-xs font-semibold uppercase tracking-wider">
                      Free Resource
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
                  <p className="text-slate-300 leading-relaxed">{description}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/30"
                  >
                    {isSubmitting ? 'Sending...' : buttonText}
                  </button>
                </form>

                {/* Footer */}
                <p className="text-center text-slate-500 text-xs mt-6">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Check Your Email!</h3>
                <p className="text-slate-300">
                  We've sent the {leadMagnet} to <strong className="text-white">{email}</strong>
                </p>
                <p className="text-slate-500 text-sm mt-4">
                  (Check your spam folder if you don't see it)
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
