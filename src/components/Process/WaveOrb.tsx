'use client'

import React from 'react'

interface WaveOrbProps {
  isAnimating?: boolean
}

export function WaveOrb({ isAnimating = false }: WaveOrbProps) {
  // Wave path - smooth sine curve with 2 full cycles
  const wavePath = "M 0,150 C 50,50 150,50 200,150 C 250,250 350,250 400,150 C 450,50 550,50 600,150 C 650,250 750,250 800,150"
  const pathId = "wavePath"

  if (!isAnimating) {
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
      <svg
        key="animated-orb"
        viewBox="0 0 800 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for the wave */}
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Glow filter for the orb */}
          <filter id="orbGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Define the path for animation */}
          <path
            id={pathId}
            d={wavePath}
          />
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

        {/* The traveling logo group */}
        <g transform="translate(-12, -12)">
          {/* Cold Lava Logo */}
          <image
            href="/Cold Lava Logo/Cold Lava - Icon.png"
            x="0"
            y="0"
            width="24"
            height="24"
            opacity="1"
          />

          {/* Animate motion along the path with auto-rotation for physics */}
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </g>
      </svg>
    </div>
  )
}
