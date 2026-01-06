'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function MouseCoordinates() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after a brief delay for mystique
    const showTimer = setTimeout(() => setIsVisible(true), 1000)

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(showTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Total Y = mouse Y + scroll Y (limited to 4 digits, no decimals)
  const totalY = Math.min(Math.floor(coords.y + scrollY), 9999)
  const displayX = Math.min(Math.floor(coords.x), 9999)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-6 z-50 select-none"
        >
          <div className="flex items-center gap-4">
            {/* Logo */}
            <a href="#" className="relative pointer-events-auto group cursor-pointer">
              <Image
                src="/Cold Lava Logo/Cold Lava - Icon.png"
                alt="Cold Lava"
                width={48}
                height={48}
                className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </a>

            {/* Separator line */}
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

            {/* Coordinates */}
            <div className="relative pointer-events-none">
              {/* Corner bracket */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-cyan-500/30" />

              <div className="flex items-center gap-3 pt-1 pl-2">
                {/* X coordinate */}
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-wider">X</span>
                  <motion.span
                    key={displayX}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-white/90 tabular-nums"
                  >
                    {String(displayX).padStart(4, '0')}
                  </motion.span>
                </div>

                {/* Separator */}
                <div className="w-px h-3 bg-cyan-500/20" />

                {/* Y coordinate */}
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-wider">Y</span>
                  <motion.span
                    key={totalY}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-white/90 tabular-nums"
                  >
                    {String(totalY).padStart(4, '0')}
                  </motion.span>
                </div>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10 opacity-50" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
