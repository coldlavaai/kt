'use client'

import Image from 'next/image'

// Logos arranged for visual variety - mixing white/colored and different categories
const allLogos = [
  { name: 'React', path: '/logos/react.svg' },
  { name: 'Supabase', path: '/logos/supabase.svg' },
  { name: 'OpenAI', path: '/logos/openai.svg' },
  { name: 'Stripe', path: '/logos/stripe.svg' },
  { name: 'TypeScript', path: '/logos/typescript.svg' },
  { name: 'AWS', path: '/logos/aws.svg' },
  { name: 'PostgreSQL', path: '/logos/postgresql.svg' },
  { name: 'Twilio', path: '/logos/twilio.svg' },
  { name: 'Google', path: '/logos/google.png' },
  { name: 'Docker', path: '/logos/docker.svg' },
  { name: 'Shopify', path: '/logos/shopify.svg' },
  { name: 'Claude', path: '/logos/claude.svg' },
  { name: 'Zapier', path: '/logos/zapier.png' },
  { name: 'Node.js', path: '/logos/nodejs.svg' },
  { name: 'Meta', path: '/logos/meta.svg' },
  { name: 'Retell', path: '/logos/retell.png' },
  { name: 'WordPress', path: '/logos/wordpress.png' },
  { name: 'Next.js', path: '/logos/nextjs.png' },
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' },
  { name: 'HubSpot', path: '/logos/hubspot.png' },
  { name: 'Vercel', path: '/logos/vercel.svg' },
  { name: 'Anthropic', path: '/logos/anthropic.svg' },
  { name: 'Make', path: '/logos/make.png' },
  { name: 'GitHub', path: '/logos/github.png' },
  { name: 'Sanity', path: '/logos/sanity.png' },
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' },
  { name: 'Xero', path: '/logos/xero.png' },
  { name: 'Tailwind', path: '/logos/tailwind.svg' },
  { name: 'LinkedIn', path: '/logos/linkedin.png' },
  { name: 'VAPI', path: '/logos/vapi.svg' },
  { name: 'Cal.com', path: '/logos/cal.svg' },
  { name: 'Airtable', path: '/logos/airtable.png' },
  { name: 'Telegram', path: '/logos/telegram.svg' },
  { name: 'Python', path: '/logos/python.svg' },
  { name: 'n8n', path: '/logos/n8n.svg' },
]

function LogoTicker({ logos, reverse = false }: { logos: typeof allLogos; reverse?: boolean }) {
  // Triple for smooth infinite
  const repeatedLogos = [...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      {/* Subtle gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'}`}
        style={{ width: 'max-content' }}
      >
        {repeatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8 md:px-10 group"
          >
            <div className="h-12 w-32 flex items-center justify-center">
              <Image
                src={logo.path}
                alt={logo.name}
                width={140}
                height={48}
                className="h-10 w-auto max-w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechTicker() {
  // Split logos for continuous carousel effect
  const midpoint = Math.ceil(allLogos.length / 2)
  const topLogos = allLogos.slice(0, midpoint)
  const bottomLogos = allLogos.slice(midpoint)

  return (
    <div className="py-6 space-y-3">
      {/* Top ticker - flows left */}
      <LogoTicker logos={topLogos} />

      {/* Bottom ticker - flows right (reverse) */}
      <LogoTicker logos={bottomLogos} reverse />
    </div>
  )
}
