'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getContextualMessage, type ContextualMessageData } from '@/lib/contextualMessages'

export function HeaderClock() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [messageData, setMessageData] = useState<ContextualMessageData>({ message: '' })
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateDateTime = () => {
      const now = new Date()

      // Convert to London time
      const londonTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)

      const londonDate = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now)

      setTime(londonTime)
      setDate(londonDate)
      setMessageData(getContextualMessage(now))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute top-2 left-0 right-0 font-mono z-50 hidden md:block">
        <div className="container-full">
          <div className="flex items-center justify-end gap-2 text-[10px] text-white/30">
            <span>London · --:--:--</span>
            <span className="text-cyan-400/40">·</span>
            <span>Loading...</span>
            <span className="text-cyan-400/40">·</span>
            <span className="text-cyan-400/40 font-sans italic">&nbsp;</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-2 left-0 right-0 font-mono z-50 hidden md:block">
      <div className="container-full">
        <div className="flex items-center justify-end gap-2 text-[10px] text-white/30">
          <span>London · {time}</span>
          <span className="text-cyan-400/50">·</span>
          <span>{date}</span>
          {messageData.message && (
            <>
              <span className="text-cyan-400/50">·</span>
              <span
                className="relative text-cyan-400/70 font-sans italic cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {messageData.message}

                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltip && messageData.description && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 p-4 bg-black/95 border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-xl"
                    >
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-cyan-500/40" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-cyan-500/40" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-cyan-500/40" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-cyan-500/40" />

                      <p className="text-[11px] leading-relaxed text-white/70 font-sans not-italic">
                        {messageData.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
