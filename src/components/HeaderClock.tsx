'use client'

import { useState, useEffect } from 'react'
import { getContextualMessage } from '@/lib/contextualMessages'

export function HeaderClock() {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [mounted, setMounted] = useState(false)

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
      setMessage(getContextualMessage(now))
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
          {message && (
            <>
              <span className="text-cyan-400/50">·</span>
              <span className="text-cyan-400/70 font-sans italic">{message}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
