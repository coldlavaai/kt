'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { updateConsent } from '@/lib/tracking'

// Safe localStorage wrapper - handles private browsing, quota exceeded, etc.
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.warn('localStorage access denied:', e)
      return null
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      console.warn('localStorage write failed:', e)
      return false
    }
  }
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = safeLocalStorage.getItem('cookie_consent')
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const acceptCookies = () => {
    safeLocalStorage.setItem('cookie_consent', 'accepted')
    safeLocalStorage.setItem('cookie_consent_date', new Date().toISOString())
    safeLocalStorage.setItem('cookie_consent_analytics', 'true')
    safeLocalStorage.setItem('cookie_consent_marketing', 'true')
    setShowBanner(false)

    // Update tracking consent (analytics, marketing, functionality)
    updateConsent(true, true, true)

    // Grant consent for Facebook Pixel
    if (typeof window !== 'undefined' && 'fbq' in window && typeof (window as any).fbq === 'function') {
      (window as any).fbq('consent', 'grant')
    }
  }

  const declineCookies = () => {
    safeLocalStorage.setItem('cookie_consent', 'declined')
    safeLocalStorage.setItem('cookie_consent_date', new Date().toISOString())
    safeLocalStorage.setItem('cookie_consent_analytics', 'false')
    safeLocalStorage.setItem('cookie_consent_marketing', 'false')
    setShowBanner(false)

    // Update tracking consent (only essential/functionality, no analytics or marketing)
    updateConsent(false, false, true)

    // Revoke consent for Facebook Pixel
    if (typeof window !== 'undefined' && 'fbq' in window && typeof (window as any).fbq === 'function') {
      (window as any).fbq('consent', 'revoke')
    }
  }

  if (!mounted || !showBanner) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999]"
            onClick={declineCookies}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative max-w-lg w-full"
            >
              {/* Corner Brackets */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50" />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Main Content */}
              <div className="relative bg-black/95 border border-cyan-400/20 rounded-lg p-8 shadow-2xl shadow-cyan-500/10">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-cyan-400 tracking-wider">[NOTICE]</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Cookie Preferences
                  </h3>
                </div>

                {/* Message */}
                <div className="mb-8 space-y-3">
                  <p className="text-white/80 leading-relaxed">
                    We use cookies to understand how you use our site and improve your experience.
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Essential cookies keep the site working. Analytics cookies help us make it better.
                    Nothing creepy, nothing sold.{' '}
                    <Link
                      href="/cookies"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-medium"
                      onClick={() => setShowBanner(false)}
                    >
                      Read our cookie policy
                    </Link>
                  </p>
                </div>

                {/* Cookie Details */}
                <div className="mb-8 p-4 bg-cyan-500/5 border border-cyan-400/10 rounded">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <div className="text-cyan-400 mb-1">Essential</div>
                      <div className="text-white/60">Always Active</div>
                    </div>
                    <div>
                      <div className="text-cyan-400 mb-1">Analytics</div>
                      <div className="text-white/60">Your Choice</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={declineCookies}
                    className="flex-1 px-6 py-3 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded transition-all duration-300 hover:bg-white/5"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={acceptCookies}
                    className="group relative flex-1 px-6 py-3 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded overflow-hidden transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Accept All
                      <span className="text-xs">→</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Tech detail */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-mono text-white/30 text-center">
                    UK GDPR Compliant · Stored Locally · Reviewed Annually
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
