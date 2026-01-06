'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hapticFeedback } from '@/utils/haptics'

export function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (adjust threshold as needed)
      setShow(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            paddingBottom: 'calc(1rem + var(--safe-area-bottom))',
          }}
        >
          {/* Gradient fade background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none" />

          {/* CTA Container */}
          <div className="relative px-4 pb-4 pt-6">
            <a
              href="https://cal.com/coldlava/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => hapticFeedback('medium')}
              className="group relative block w-full"
            >
              {/* Architectural frame */}
              <div className="absolute -inset-2 border border-cyan-500/20 group-active:border-[#C9A962]/40 transition-all duration-300" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l border-t border-cyan-500/40 group-active:border-[#C9A962]/70 transition-all duration-300" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r border-b border-cyan-500/40 group-active:border-[#C9A962]/70 transition-all duration-300" />

              {/* Button */}
              <div className="relative px-6 py-4 bg-white text-black font-semibold overflow-hidden active:scale-[0.98] transition-transform">
                {/* Hover/Active effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A962] to-[#D4B76E] transform scale-x-0 group-active:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Text */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Book Discovery Call</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
