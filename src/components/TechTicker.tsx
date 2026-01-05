'use client'

import Image from 'next/image'

// All 27 logos for continuous flow
const allLogos = [
  { name: 'React', path: '/logos/react.svg' },
  { name: 'TypeScript', path: '/logos/typescript.png' },
  { name: 'Node.js', path: '/logos/nodejs.svg' },
  { name: 'Next.js', path: '/logos/nextjs.png' },
  { name: 'Supabase', path: '/logos/supabase.svg' },
  { name: 'PostgreSQL', path: '/logos/postgresql.svg' },
  { name: 'Docker', path: '/logos/docker.svg' },
  { name: 'OpenAI', path: '/logos/openai.svg' },
  { name: 'Claude', path: '/logos/claude.svg' },
  { name: 'Anthropic', path: '/logos/anthropic.svg' },
  { name: 'ElevenLabs', path: '/logos/elevenlabs.svg' },
  { name: 'Retell AI', path: '/logos/retell.png' },
  { name: 'VAPI', path: '/logos/vapi.png' },
  { name: 'Twilio', path: '/logos/twilio.svg' },
  { name: 'Telegram', path: '/logos/telegram.svg' },
  { name: 'WhatsApp', path: '/logos/whatsapp.svg' },
  { name: 'Sanity', path: '/logos/sanity.png' },
  { name: 'Shopify', path: '/logos/shopify.svg' },
  { name: 'WordPress', path: '/logos/wordpress.svg' },
  { name: 'Stripe', path: '/logos/stripe.svg' },
  { name: 'Vercel', path: '/logos/vercel.svg' },
  { name: 'AWS', path: '/logos/aws.svg' },
  { name: 'GitHub', path: '/logos/github.png' },
  { name: 'n8n', path: '/logos/n8n.svg' },
  { name: 'Google', path: '/logos/google.svg' },
  { name: 'Cal.com', path: '/logos/cal.svg' },
  { name: 'Meta', path: '/logos/meta.png' },
  { name: 'Tailwind CSS', path: '/logos/tailwind.svg' },
]

function SmoothTicker({ logos, reverse = false }: { logos: typeof allLogos; reverse?: boolean }) {
  // Quadruple logos for ultra-smooth infinite scroll
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Smooth infinite ticker */}
      <div
        className={`flex ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'} will-change-transform`}
        style={{
          width: 'max-content',
        }}
      >
        {repeatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center px-8 md:px-12 h-20 group"
          >
            <Image
              src={logo.path}
              alt={logo.name}
              width={180}
              height={80}
              className="h-14 md:h-16 w-auto object-contain brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500 ease-out"
              unoptimized
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechTicker() {
  // Split for top and bottom continuous flow
  const midpoint = Math.ceil(allLogos.length / 2)
  const topLogos = allLogos.slice(0, midpoint)
  const bottomLogos = allLogos.slice(midpoint)

  return (
    <div className="relative py-6">
      {/* Top ticker - flows right */}
      <div className="mb-8">
        <SmoothTicker logos={topLogos} />
      </div>

      {/* Bottom ticker - flows left (continuous with top) */}
      <div className="mt-8">
        <SmoothTicker logos={bottomLogos} reverse />
      </div>

      {/* Visual connectors for continuous flow effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  )
}
