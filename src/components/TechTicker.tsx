'use client'

import Image from 'next/image'

const logos = [
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' },
  { name: 'Twilio', path: '/logos/twilio.svg' },
  { name: 'Telegram', path: '/logos/telegram.svg' },
  { name: 'Tailwind CSS', path: '/logos/tailwind.svg' },
  { name: 'OpenAI', path: '/logos/openai.svg' },
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' },
  { name: 'N8n.io', path: '/logos/n8n.svg' },
  { name: 'Anthropic', path: '/logos/anthropic.svg' },
  { name: 'Claude', path: '/logos/claude.svg' },
  { name: 'AWS', path: '/logos/aws.svg' },
  { name: 'Next.js', path: '/logos/nextjs.png' },
  { name: 'Vercel', path: '/logos/vercel.svg' },
  { name: 'GitHub', path: '/logos/github.png' },
]

export function TechTicker() {
  return (
    <div className="relative overflow-hidden py-8 group">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Ticker container */}
      <div className="flex animate-ticker group-hover:[animation-play-state:paused]">
        {/* First set of logos */}
        <div className="flex items-center gap-12 px-6 shrink-0">
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center justify-center h-16 w-auto grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.path}
                alt={logo.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-12 px-6 shrink-0">
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center justify-center h-16 w-auto grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.path}
                alt={logo.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
