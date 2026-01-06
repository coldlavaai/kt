'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

interface WaveOrbPhysicsProps {
  isAnimating?: boolean
}

// Parse cubic bezier path and sample points along it
function sampleBezierPath(pathData: string, numSamples: number = 120): Array<{x: number, y: number, slope: number}> {
  const points: Array<{x: number, y: number, slope: number}> = []

  // Parse the path: "M 0,150 C 50,50 150,50 200,150 C 250,250 350,250 400,150 ..."
  const segments = pathData.split('C').slice(1) // Skip the M command
  const startMatch = pathData.match(/M\s*([\d.]+),([\d.]+)/)
  let currentX = startMatch ? parseFloat(startMatch[1]) : 0
  let currentY = startMatch ? parseFloat(startMatch[2]) : 150

  segments.forEach(segment => {
    const coords = segment.trim().split(/[\s,]+/).map(parseFloat)
    const [cp1x, cp1y, cp2x, cp2y, x, y] = coords

    // Sample this cubic bezier segment
    const samplesPerSegment = Math.floor(numSamples / segments.length)
    for (let i = 0; i <= samplesPerSegment; i++) {
      const t = i / samplesPerSegment

      // Cubic bezier formula
      const mt = 1 - t
      const px = mt * mt * mt * currentX +
                 3 * mt * mt * t * cp1x +
                 3 * mt * t * t * cp2x +
                 t * t * t * x
      const py = mt * mt * mt * currentY +
                 3 * mt * mt * t * cp1y +
                 3 * mt * t * t * cp2y +
                 t * t * t * y

      // Calculate derivative for slope (simplified)
      const dx = 3 * mt * mt * (cp1x - currentX) +
                 6 * mt * t * (cp2x - cp1x) +
                 3 * t * t * (x - cp2x)
      const dy = 3 * mt * mt * (cp1y - currentY) +
                 6 * mt * t * (cp2y - cp1y) +
                 3 * t * t * (y - cp2y)

      const slope = dx !== 0 ? dy / dx : 0

      points.push({ x: px, y: py, slope })
    }

    currentX = x
    currentY = y
  })

  return points
}

export function WaveOrbPhysics({ isAnimating = false }: WaveOrbPhysicsProps) {
  const wavePath = "M 0,150 C 50,50 150,50 200,150 C 250,250 350,250 400,150 C 450,50 550,50 600,150 C 650,250 750,250 800,150"
  const [pathPoints, setPathPoints] = useState<Array<{x: number, y: number, slope: number}>>([])
  const progressRef = useRef(0)

  // Sample the path once
  useEffect(() => {
    setPathPoints(sampleBezierPath(wavePath))
  }, [])

  // Motion value for progress (0 to 1)
  const progress = useMotionValue(0)
  const springProgress = useSpring(progress, { stiffness: 50, damping: 20 })

  // Animate progress
  useEffect(() => {
    if (!isAnimating || pathPoints.length === 0) return

    let startTime: number | null = null
    const duration = 12000 // 12 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const newProgress = (elapsed % duration) / duration

      progress.set(newProgress)
      progressRef.current = newProgress

      requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isAnimating, pathPoints, progress])

  // Transform progress to position
  const x = useTransform(springProgress, (p) => {
    if (pathPoints.length === 0) return 0
    const index = Math.floor(p * (pathPoints.length - 1))
    return pathPoints[index]?.x || 0
  })

  const y = useTransform(springProgress, (p) => {
    if (pathPoints.length === 0) return 150
    const index = Math.floor(p * (pathPoints.length - 1))
    return pathPoints[index]?.y || 150
  })

  // Calculate slope at current position for physics
  const slope = useTransform(springProgress, (p) => {
    if (pathPoints.length === 0) return 0
    const index = Math.floor(p * (pathPoints.length - 1))
    return pathPoints[index]?.slope || 0
  })

  // Rotation based on slope (subtle tilt)
  const rotation = useTransform(slope, (s) => {
    return Math.atan(s) * (180 / Math.PI) * 0.3 // Subtle multiplier
  })

  // Bounce intensity based on slope (more bounce going uphill)
  const bounceIntensity = useTransform(slope, (s) => {
    const isUphill = s < -0.5 // Negative slope = going up
    const isDownhill = s > 0.5 // Positive slope = going down

    if (isUphill) return 1.5 // More bounce uphill
    if (isDownhill) return 0.8 // Less bounce downhill
    return 1.0 // Normal bounce on flat
  })

  // Vertical bounce (sine wave that varies with slope)
  const bounceOffset = useTransform(springProgress, (p) => {
    const frequency = 8 // 8 bounces per cycle
    const currentIntensity = bounceIntensity.get()
    return Math.sin(p * Math.PI * 2 * frequency) * 3 * currentIntensity
  })

  // Horizontal wobble (subtle side-to-side)
  const wobbleOffset = useTransform(springProgress, (p) => {
    const frequency = 12
    return Math.sin(p * Math.PI * 2 * frequency) * 1.5
  })

  // Squash/stretch for impact feel
  const scaleY = useTransform(springProgress, (p) => {
    const frequency = 8
    const bounce = Math.abs(Math.sin(p * Math.PI * 2 * frequency))
    return 1 + bounce * 0.1 // Subtle squash/stretch
  })

  const scaleX = useTransform(scaleY, (sy) => {
    return 2 - sy // Inverse for conservation of volume
  })

  if (!isAnimating || pathPoints.length === 0) {
    return (
      <div className="relative w-full h-[300px] flex items-center justify-center">
        <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <path
            d={wavePath}
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* The visible dotted wave path */}
        <path
          d={wavePath}
          fill="none"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="2"
          strokeDasharray="8 4"
          filter="url(#waveGlow)"
        />
      </svg>

      {/* Physics-based logo */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: useTransform(x, (val) => val + wobbleOffset.get()),
          y: useTransform(y, (val) => val + bounceOffset.get()),
          rotate: rotation,
          scaleX,
          scaleY,
        }}
      >
        <Image
          src="/Cold Lava Logo/Cold Lava - Icon.png"
          alt="Cold Lava"
          width={24}
          height={24}
          className="relative -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </div>
  )
}
