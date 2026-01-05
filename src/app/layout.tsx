import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { SmoothScroll, Navigation, Footer } from '@/components'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Cold Lava — Intelligent Business Systems',
  description:
    'Consultancy and software development for businesses ready to build what they actually need.',
  keywords: [
    'AI consultancy',
    'custom software',
    'business automation',
    'AI agents',
    'Liverpool',
  ],
  authors: [{ name: 'Cold Lava' }],
  openGraph: {
    title: 'Cold Lava — Intelligent Business Systems',
    description:
      'Consultancy and software development for businesses ready to build what they actually need.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Cold Lava',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cold Lava — Intelligent Business Systems',
    description:
      'Consultancy and software development for businesses ready to build what they actually need.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <div className="grain" aria-hidden="true" />
        </SmoothScroll>
      </body>
    </html>
  )
}
