'use client'

import Image from 'next/image'

// Top ticker - scrolls left
const topLogos = [
  { name: 'React', path: '/logos/react.svg' },
  { name: 'Next.js', path: '/logos/nextjs.png' },
  { name: 'TypeScript', path: '/logos/typescript.png' },
  { name: 'Node.js', path: '/logos/nodejs.png' },
  { name: 'Supabase', path: '/logos/supabase.png' },
  { name: 'PostgreSQL', path: '/logos/postgresql.png' },
  { name: 'OpenAI', path: '/logos/openai.svg' },
  { name: 'Claude', path: '/logos/claude.svg' },
  { name: 'Anthropic', path: '/logos/anthropic.svg' },
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' },
  { name: 'Retell AI', path: '/logos/retell.svg' },
  { name: 'VAPI', path: '/logos/vapi.svg' },
  { name: 'Twilio', path: '/logos/twilio.svg' },
  { name: 'Telegram', path: '/logos/telegram.svg' },
]

// Bottom ticker - scrolls right
const bottomLogos = [
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' },
  { name: 'Sanity', path: '/logos/sanity.svg' },
  { name: 'Shopify', path: '/logos/shopify.svg' },
  { name: 'WordPress', path: '/logos/wordpress.svg' },
  { name: 'Vercel', path: '/logos/vercel.svg' },
  { name: 'AWS', path: '/logos/aws.svg' },
  { name: 'Docker', path: '/logos/docker.svg' },
  { name: 'GitHub', path: '/logos/github.png' },
  { name: 'n8n', path: '/logos/n8n.svg' },
  { name: 'Google', path: '/logos/google.svg' },
  { name: 'Stripe', path: '/logos/stripe.svg' },
  { name: 'Cal.com', path: '/logos/cal.svg' },
  { name: 'Meta', path: '/logos/meta.svg' },
  { name: 'Tailwind CSS', path: '/logos/tailwind.svg' },
]

function TickerRow({ logos, reverse = false }: { logos: typeof topLogos; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden group">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Ticker container */}
      <div className={`flex ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'} group-hover:[animation-play-state:paused]`}>
        {/* First set */}
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

export function TechTicker() {
  return (
    <div className="py-4 space-y-4">
      {/* Top ticker - scrolls left */}
      <TickerRow logos={topLogos} />

      {/* Bottom ticker - scrolls right */}
      <TickerRow logos={bottomLogos} reverse />
    </div>
  )
}
