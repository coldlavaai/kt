'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 6.05 million unnecessary meetings per day in the US
// Based on: 11M daily meetings × 55% deemed unnecessary
// Sources: Lucid Meetings, Calendly State of Meetings Report
const MEETINGS_PER_SECOND = 70.02

function getUnnecessaryMeetingsToday(): number {
  const now = new Date()
  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)
  const secondsElapsed = (now.getTime() - startOfDay.getTime()) / 1000
  return Math.floor(MEETINGS_PER_SECOND * secondsElapsed)
}

function formatNumber(num: number): string {
  return num.toLocaleString()
}

export function MeetingsTicker() {
  const [count, setCount] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCount(getUnnecessaryMeetingsToday())

    // Update every 100ms for smooth ticking
    const interval = setInterval(() => {
      setCount(getUnnecessaryMeetingsToday())
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-baseline gap-2 font-mono text-xs text-white/30">
        <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">📅</span>
        <span className="text-white/20">meetings today that could have been emails:</span>
        <span className="text-cyan-400/50 tabular-nums">—</span>
      </div>
    )
  }

  return (
    <div
      className="relative flex items-baseline gap-2 font-mono text-xs"
      title="Based on 11M daily US meetings (Lucid Meetings) × 55% deemed unnecessary (Calendly)"
    >
      {/* Corner bracket accent */}
      <div className="absolute -top-1 -left-2 w-2 h-2 border-l border-t border-cyan-500/20" />

      {/* Calendar icon */}
      <span className="text-[10px] text-cyan-500/40 uppercase tracking-wider">📅</span>

      {/* Label */}
      <span className="text-white/30 font-light">meetings today that could have been emails:</span>

      {/* Animated count */}
      <motion.span
        key={Math.floor(count / 10000)} // Trigger animation on significant changes
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-cyan-400 font-semibold tabular-nums tracking-tight"
      >
        {formatNumber(count)}
      </motion.span>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10 opacity-40" />
    </div>
  )
}
