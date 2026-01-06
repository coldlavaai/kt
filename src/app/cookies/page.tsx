import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What cookies we use and why. No dark patterns here.',
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4">
            <span className="font-mono text-xs text-cyan-400/50">LEGAL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-3">
            Yes, we use cookies. No, we're not tracking your every move.
            Here's what's actually happening.
          </p>
          <p className="font-mono text-sm text-white/30">
            Last updated: January 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <Section
            number="01"
            title="What are cookies?"
            content={
              <>
                <p>
                  Cookies are small text files stored on your device when you visit
                  websites. They help sites remember things about your visit.
                  Some are essential; some are optional.
                </p>
              </>
            }
          />

          <Section
            number="02"
            title="Cookies we use"
            content={
              <>
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Essential cookies</h3>
                <p className="mb-4">These make the site work. You can't opt out of these.</p>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Purpose</th>
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-cyan-400">session_id</td>
                        <td className="py-3 px-4 text-white/70">Keeps you logged in during your visit</td>
                        <td className="py-3 px-4 text-white/50">Session</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-cyan-400">cookie_consent</td>
                        <td className="py-3 px-4 text-white/70">Remembers your cookie preferences</td>
                        <td className="py-3 px-4 text-white/50">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Analytics cookies</h3>
                <p className="mb-4">
                  These help us understand how people use the site.
                  We use Meta Pixel for basic analytics.
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Purpose</th>
                        <th className="text-left py-3 px-4 text-white font-semibold text-sm">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-sm">
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-cyan-400">_fbp</td>
                        <td className="py-3 px-4 text-white/70">Facebook pixel for visitor analytics</td>
                        <td className="py-3 px-4 text-white/50">3 months</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 px-4 text-cyan-400">_fbc</td>
                        <td className="py-3 px-4 text-white/70">Facebook click ID for conversion tracking</td>
                        <td className="py-3 px-4 text-white/50">3 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            }
          />

          <Section
            number="03"
            title="Managing cookies"
            content={
              <>
                <p className="mb-4">
                  Most browsers let you block or delete cookies. Here's how:
                </p>
                <ul className="space-y-2">
                  <ListItem>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      Chrome
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      Firefox
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      Safari
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                    >
                      Edge
                    </a>
                  </ListItem>
                </ul>
                <p className="mt-4 text-white/90">
                  Blocking cookies might break some features of this site.
                </p>
              </>
            }
          />

          <Section
            number="04"
            title="Third-party cookies"
            content={
              <>
                <p>
                  We don't allow advertising cookies on this site. Any third-party
                  cookies come from tools we use (like analytics or embedded content).
                  We've listed them above.
                </p>
              </>
            }
          />

          <Section
            number="05"
            title="Questions?"
            content={
              <>
                <p>
                  Email{' '}
                  <a
                    href="mailto:hello@coldlava.ai"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-mono"
                  >
                    hello@coldlava.ai
                  </a>
                  .
                </p>
              </>
            }
          />
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link
              href="/"
              className="text-white/60 hover:text-white transition-colors group flex items-center gap-2"
            >
              <span className="text-cyan-400 group-hover:translate-x-[-4px] transition-transform">←</span>
              Back to home
            </Link>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Section Component
function Section({
  number,
  title,
  content
}: {
  number: string
  title: string
  content: React.ReactNode
}) {
  return (
    <section className="group">
      <div className="flex items-start gap-6 mb-4">
        <span className="font-mono text-xs text-cyan-400/50 mt-1 group-hover:text-cyan-400/80 transition-colors">
          {number}
        </span>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
            {title}
          </h2>
          <div className="text-white/70 leading-relaxed space-y-4">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}

// List Item Component
function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-cyan-400 mt-1 text-xs">▸</span>
      <span className="flex-1">{children}</span>
    </li>
  )
}
