'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Lead {
  timestamp: string
  name: string
  email: string
  phone?: string
  company?: string
  lead_magnet: string
  source: string
  trigger?: string
  ip_address?: string
  referrer?: string
  company_data?: {
    name: string
    domain: string
    industry: string
    employees: number
    location: {
      city: string
      state: string
      country: string
    }
  }
}

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/leads/capture', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEADS_API_KEY || 'coldlava2026'}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
      } else {
        setError('Failed to load leads')
      }
    } catch (err) {
      setError('Error loading leads')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCSV = () => {
    const csv = [
      ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Lead Magnet', 'Source', 'Trigger', 'IP', 'Referrer'],
      ...leads.map((lead) => [
        new Date(lead.timestamp).toLocaleString(),
        lead.name,
        lead.email,
        lead.phone || '',
        lead.company || (lead.company_data?.name || ''),
        lead.lead_magnet,
        lead.source,
        lead.trigger || '',
        lead.ip_address || '',
        lead.referrer || '',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/analytics"
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Captured Leads
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {leads.length} total leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={downloadCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download CSV
            </button>
            <button
              onClick={fetchLeads}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 mt-4">Loading leads...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-slate-800/50 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-white mb-2">No leads yet</h3>
            <p className="text-slate-400">
              Leads will appear here when visitors submit the lead capture form
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.reverse().map((lead, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-6 hover:border-yellow-500/50 transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{lead.name}</h3>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-yellow-500 hover:underline text-sm block mb-1"
                    >
                      {lead.email}
                    </a>
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-slate-400 hover:text-white text-sm block"
                      >
                        {lead.phone}
                      </a>
                    )}
                  </div>

                  {/* Company Info */}
                  <div>
                    {lead.company_data ? (
                      <>
                        <div className="inline-block px-2 py-1 bg-green-500/20 border border-green-500 rounded text-green-400 text-xs font-semibold mb-2">
                          Company Identified
                        </div>
                        <h4 className="text-white font-medium">{lead.company_data.name}</h4>
                        <p className="text-slate-400 text-sm">{lead.company_data.industry}</p>
                        <p className="text-slate-500 text-xs mt-1">
                          {lead.company_data.location.city}, {lead.company_data.location.country}
                        </p>
                        {lead.company_data.employees && (
                          <p className="text-slate-500 text-xs">
                            ~{lead.company_data.employees} employees
                          </p>
                        )}
                      </>
                    ) : lead.company ? (
                      <>
                        <h4 className="text-white font-medium">{lead.company}</h4>
                        <p className="text-slate-500 text-sm">(Self-reported)</p>
                      </>
                    ) : (
                      <p className="text-slate-600 text-sm italic">No company info</p>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="text-slate-500">Lead Magnet:</span>
                      <span className="text-white ml-2">{lead.lead_magnet}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-slate-500">Source:</span>
                      <span className="text-white ml-2">{lead.source}</span>
                    </div>
                    {lead.trigger && (
                      <div className="mb-2">
                        <span className="text-slate-500">Trigger:</span>
                        <span className="text-white ml-2">{lead.trigger}</span>
                      </div>
                    )}
                    <div className="mb-2">
                      <span className="text-slate-500">Time:</span>
                      <span className="text-white ml-2">
                        {new Date(lead.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {lead.referrer && lead.referrer !== 'direct' && (
                      <div className="mb-2">
                        <span className="text-slate-500">From:</span>
                        <span className="text-white ml-2 truncate block max-w-[200px]">
                          {new URL(lead.referrer).hostname}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
