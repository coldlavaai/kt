import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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
  user_agent?: string
  referrer?: string
  company_data?: any
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json')

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Capture visitor context
    const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || 'direct'

    const lead: Lead = {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      lead_magnet: data.lead_magnet,
      source: data.source,
      trigger: data.trigger,
      ip_address,
      user_agent,
      referrer,
    }

    // Try to identify company from IP (Clearbit Reveal)
    if (process.env.CLEARBIT_API_KEY) {
      try {
        const companyData = await identifyCompanyFromIP(ip_address, process.env.CLEARBIT_API_KEY)
        if (companyData) {
          lead.company_data = companyData
          // Auto-fill company if not provided
          if (!lead.company && companyData.name) {
            lead.company = companyData.name
          }
        }
      } catch (error) {
        // Silently fail if Clearbit identification fails
        console.log('Clearbit identification skipped')
      }
    }

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }

    // Read existing leads
    let leads: Lead[] = []
    if (existsSync(LEADS_FILE)) {
      const fileContent = await readFile(LEADS_FILE, 'utf-8')
      leads = JSON.parse(fileContent)
    }

    // Add new lead
    leads.push(lead)

    // Write back to file
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2))

    // TODO: Send email via n8n webhook (optional)
    if (process.env.N8N_LEAD_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        })
      } catch (error) {
        console.error('n8n webhook failed:', error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}

/**
 * Identify company from IP address using Clearbit Reveal
 * Free tier: 50 companies/month
 */
async function identifyCompanyFromIP(ip: string, apiKey: string) {
  try {
    const response = await fetch(`https://company.clearbit.com/v1/companies/find?ip=${ip}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        name: data.name,
        domain: data.domain,
        industry: data.category?.industry,
        employees: data.metrics?.employees,
        estimated_revenue: data.metrics?.estimatedAnnualRevenue,
        location: {
          city: data.geo?.city,
          state: data.geo?.state,
          country: data.geo?.country,
        },
        description: data.description,
      }
    }

    return null
  } catch (error) {
    console.error('Clearbit API error:', error)
    return null
  }
}

// GET endpoint to retrieve leads (protected)
export async function GET(request: NextRequest) {
  // Simple authentication
  const authHeader = request.headers.get('authorization')
  const expectedAuth = `Bearer ${process.env.LEADS_API_KEY || 'coldlava2026'}`

  if (authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!existsSync(LEADS_FILE)) {
      return NextResponse.json({ leads: [] })
    }

    const fileContent = await readFile(LEADS_FILE, 'utf-8')
    const leads = JSON.parse(fileContent)

    return NextResponse.json({ leads, count: leads.length })
  } catch (error) {
    console.error('Error reading leads:', error)
    return NextResponse.json({ error: 'Failed to read leads' }, { status: 500 })
  }
}
