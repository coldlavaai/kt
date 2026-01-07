'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface WebVitalsData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export default function AnalyticsDashboard() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [webVitals, setWebVitals] = useState<WebVitalsData[]>([])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Logout function
  const handleLogout = async () => {
    await fetch('/api/analytics/auth', { method: 'DELETE' })
    router.push('/analytics/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Cold Lava <span className="text-yellow-500">Analytics</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time performance dashboard
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Current Time */}
            <div className="text-right">
              <p className="text-slate-400 text-xs">Last updated</p>
              <p className="text-white font-mono text-sm">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Setup Notice */}
        <div className="mb-8 bg-blue-500/10 border border-blue-500 rounded-lg p-6">
          <h3 className="text-blue-400 font-semibold text-lg mb-2">
            📊 Analytics Dashboard Active
          </h3>
          <p className="text-slate-300 mb-4">
            Your tracking scripts are now live! Here's what's currently tracking:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-400 text-sm">Google Analytics 4</span>
              </div>
              <p className="text-white font-mono text-xs">G-N5QPDBSBJP</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-400 text-sm">Facebook Pixel</span>
              </div>
              <p className="text-white font-mono text-xs">1680728342604919</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-slate-400 text-sm">LinkedIn Insight</span>
              </div>
              <p className="text-slate-500 text-xs">Add partner ID in .env.local</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Real-time Visitors (Placeholder) */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Real-time Visitors</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-4xl font-bold text-white mb-2">—</p>
            <p className="text-slate-500 text-xs">Connect GA4 API to view</p>
          </div>

          {/* Today's Visitors */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Today's Visitors</h3>
            <p className="text-4xl font-bold text-white mb-2">—</p>
            <p className="text-slate-500 text-xs">Connect GA4 API to view</p>
          </div>

          {/* Page Views */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Page Views</h3>
            <p className="text-4xl font-bold text-white mb-2">—</p>
            <p className="text-slate-500 text-xs">Connect GA4 API to view</p>
          </div>

          {/* Conversions */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Conversions</h3>
            <p className="text-4xl font-bold text-white mb-2">—</p>
            <p className="text-slate-500 text-xs">Tracked via GTM events</p>
          </div>
        </div>

        {/* Web Vitals */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Core Web Vitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'LCP', label: 'Largest Contentful Paint', target: '< 2.5s', unit: 's' },
              { name: 'FID', label: 'First Input Delay', target: '< 100ms', unit: 'ms' },
              { name: 'CLS', label: 'Cumulative Layout Shift', target: '< 0.1', unit: '' },
              { name: 'FCP', label: 'First Contentful Paint', target: '< 1.8s', unit: 's' },
              { name: 'TTFB', label: 'Time to First Byte', target: '< 600ms', unit: 'ms' },
            ].map((metric) => (
              <div key={metric.name} className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-400 text-xs font-medium">{metric.name}</h3>
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">—</p>
                <p className="text-slate-500 text-xs mb-2">{metric.label}</p>
                <p className="text-slate-600 text-xs">Target: {metric.target}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400 text-sm">
              💡 <strong>Tip:</strong> Web Vitals are being tracked automatically. View real-time data in{' '}
              <a
                href="https://analytics.google.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
              >
                Google Analytics 4 →
              </a>
            </p>
          </div>
        </div>

        {/* Leads Section */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Lead Capture System</h2>
              <p className="text-green-300 text-sm">Active on homepage</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-slate-300 mb-4">
            Automatically captures visitor emails when they show interest. Identifies companies using Clearbit Reveal (50 free/month).
          </p>
          <Link
            href="/analytics/leads"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors"
          >
            View Captured Leads →
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Google Analytics */}
          <a
            href="https://analytics.google.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-xl p-6 hover:from-blue-500/30 hover:to-blue-600/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <div>
                <h3 className="text-white font-semibold">Google Analytics</h3>
                <p className="text-blue-300 text-sm">View full dashboard</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              Access detailed visitor analytics, real-time data, and conversion tracking
            </p>
            <div className="mt-4 text-blue-400 text-sm group-hover:text-blue-300 flex items-center gap-2">
              Open GA4 Dashboard →
            </div>
          </a>

          {/* Facebook Events Manager */}
          <a
            href="https://business.facebook.com/events_manager"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/50 rounded-xl p-6 hover:from-purple-500/30 hover:to-pink-600/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                f
              </div>
              <div>
                <h3 className="text-white font-semibold">Facebook Pixel</h3>
                <p className="text-purple-300 text-sm">Events & Audiences</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              View pixel events, create custom audiences, and track ad conversions
            </p>
            <div className="mt-4 text-purple-400 text-sm group-hover:text-purple-300 flex items-center gap-2">
              Open Events Manager →
            </div>
          </a>

          {/* LinkedIn Campaign Manager */}
          <a
            href="https://www.linkedin.com/campaignmanager"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/50 rounded-xl p-6 hover:from-sky-500/30 hover:to-blue-600/30 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                in
              </div>
              <div>
                <h3 className="text-white font-semibold">LinkedIn Ads</h3>
                <p className="text-sky-300 text-sm">B2B Campaigns</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              Access LinkedIn Campaign Manager for B2B remarketing and conversions
            </p>
            <div className="mt-4 text-sky-400 text-sm group-hover:text-sky-300 flex items-center gap-2">
              Open Campaign Manager →
            </div>
          </a>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">📚 Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Add LinkedIn Partner ID</h3>
                <p className="text-slate-400 text-sm">
                  Get your LinkedIn Partner ID from Campaign Manager and add it to <code className="bg-slate-900 px-2 py-1 rounded text-yellow-500">.env.local</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Setup Google Analytics API (Optional)</h3>
                <p className="text-slate-400 text-sm">
                  Connect GA4 Data API to show real-time stats in this dashboard. See{' '}
                  <code className="bg-slate-900 px-2 py-1 rounded text-yellow-500">FLAGSHIP_SETUP.md</code>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Create Remarketing Audiences</h3>
                <p className="text-slate-400 text-sm">
                  Use the tracking events to create custom audiences in Facebook, LinkedIn, and Google Ads
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-slate-500 text-sm">
            Cold Lava Analytics Dashboard • Flagship Product • v1.0
          </p>
        </div>
      </footer>
    </div>
  )
}
