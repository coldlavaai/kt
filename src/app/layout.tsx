import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { SmoothScroll, Navigation, Footer, CookieBanner } from '@/components'
import { ConsoleEasterEgg } from '@/components/ConsoleEasterEgg'
import { DynamicFavicon } from '@/components/DynamicFavicon'
import { OrganizationSchema, LocalBusinessSchema, ServiceSchema, WebsiteSchema } from '@/components/StructuredData'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://coldlava.ai'),
  title: {
    default: 'Cold Lava | AI Automation for Business',
    template: '%s | Cold Lava',
  },
  description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents, and workflow automation that actually work. We build the systems that let you focus on what matters.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  keywords: [
    'AI automation',
    'business automation',
    'Business Operating System',
    'BOS',
    'custom CRM',
    'AI voice agents',
    'workflow automation',
    'n8n automation',
    'database reactivation',
    'AI consultancy',
    'UK',
    'United Kingdom',
    'Cold Lava',
  ],
  authors: [{ name: 'Cold Lava AI Ltd' }],
  creator: 'Cold Lava AI Ltd',
  publisher: 'Cold Lava AI Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://coldlava.ai',
    siteName: 'Cold Lava',
    title: 'Cold Lava | AI Automation for Business',
    description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents, and workflow automation that actually work.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cold Lava - AI Automation for Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cold Lava | AI Automation for Business',
    description: 'Bespoke Business Operating Systems, custom CRMs, AI voice agents, and workflow automation that actually work.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <WebsiteSchema />
      </head>
      <body className="font-sans antialiased">
        <ConsoleEasterEgg />
        <DynamicFavicon />
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <div className="grain" aria-hidden="true" />
        </SmoothScroll>
      </body>
    </html>
  )
}
