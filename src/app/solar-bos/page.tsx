import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn, GridOverlay, TechnicalLabel, FAQSchema } from '@/components'

export const metadata: Metadata = {
  title: 'Solar BOS – Business Operating System for UK Solar Installers',
  description:
    'Solar BOS is a business operating system built for UK solar installation companies. Manage leads, quotes, jobs, scheduling and light compliance in one place instead of juggling CRMs, spreadsheets and field apps.',
  keywords: [
    'solar CRM UK',
    'solar installer software',
    'solar business software',
    'solar job management software',
    'solar installation software UK',
    'solar business operations software',
    'renewable installer CRM',
    'MCS compliance software',
    'DNO application tracking',
  ],
  openGraph: {
    title: 'Solar BOS – Business Operating System for UK Solar Installers',
    description:
      'Business operating system for UK solar installers. Replace generic CRMs and job tools with a single board for leads, jobs, communications and scheduling.',
    type: 'website',
    url: 'https://coldlava.ai/solar-bos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar BOS – Business Operating System for UK Installers',
    description:
      'Run your entire solar installation business from one board – leads, jobs, communications and scheduling in a single BOS built for UK solar companies.',
  },
}

const faqItems = [
  {
    question: 'What is Solar BOS?',
    answer:
      'Solar BOS is a complete business management platform built specifically for UK solar installation companies. It combines CRM, quoting, job management, calendar scheduling and light compliance tracking in one system designed around the solar installation workflow.',
  },
  {
    question: 'Who is Solar BOS designed for?',
    answer:
      'Solar BOS is built for UK-based solar installers and renewable EPCs, typically teams of 3–50 people doing 50–500+ residential and small commercial installs per year who have outgrown spreadsheets and generic CRMs.',
  },
  {
    question: 'How is Solar BOS different from generic CRM or field-service tools?',
    answer:
      'Generic CRMs and field-service tools treat solar as just another trade. Solar BOS is built around the end-to-end solar lifecycle – lead, survey, quote, install and aftercare – with job stages, fields and workflows that match how UK solar companies actually operate.',
  },
  {
    question: 'Does Solar BOS help with MCS documentation and DNO tracking?',
    answer:
      'Yes. Solar BOS is designed to keep customer, job and communication history in one place so it is much easier to stay on top of MCS documentation and DNO notifications. A dedicated compliance layer can then track specific forms, certificates and approvals as the product evolves.',
  },
  {
    question: 'Can my team use Solar BOS on site?',
    answer:
      'Yes. Solar BOS is built as a web application that works across desktop, tablet and mobile. Installers can see today’s jobs, open the customer timeline, and update job stages and notes while they are on site.',
  },
  {
    question: 'How long does it take to get started with Solar BOS?',
    answer:
      'Most teams can be up and running in days rather than months. The system ships with sensible defaults for stages, fields and views so you can import customers and jobs, then refine as you go rather than starting from a blank sheet.',
  },
  {
    question: 'Can Solar BOS replace my existing CRM?',
    answer:
      'In many cases, yes. Solar BOS is designed to act as the primary system of record for customers, jobs and operational communication. Some companies still pair it with accounting tools such as Xero or QuickBooks for invoicing and finance.',
  },
  {
    question: 'Is my data secure and GDPR compliant?',
    answer:
      'Solar BOS is built on modern infrastructure with tenant-level isolation and strong access controls. Data is encrypted in transit, and the system is designed to help UK businesses meet their GDPR obligations.',
  },
  {
    question: 'Does Solar BOS integrate with my existing tools?',
    answer:
      'Solar BOS is designed to sit alongside the tools you already use, such as design, accounting and communication platforms. Roadmap work includes deeper integrations with popular UK tools where it makes sense.',
  },
  {
    question: 'How is Solar BOS priced?',
    answer:
      'Solar BOS is priced to be accessible for small and mid-size UK solar installers, with plans that scale as your team grows. Exact pricing and packaging are finalised with early customers and published before general release.',
  },
]

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Solar BOS',
  alternateName: 'Solar BOS – Business Operating System for UK Solar Installers',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Business Operating System',
  operatingSystem: 'Web',
  description:
    'Solar BOS is a complete business operating system built for UK solar installation companies. It combines job management, customer CRM, communications inbox, calendar scheduling, and compliance tracking in one platform designed around the solar installation workflow – from lead to survey to quote to install to aftercare.',
  url: 'https://coldlava.ai/solar-bos',
  author: {
    '@type': 'Organization',
    name: 'Cold Lava AI Ltd',
    url: 'https://coldlava.ai',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/PreOrder',
  },
  featureList: [
    'Solar-specific kanban job board with stages from enquiry to aftercare',
    'Customer 360° timeline with jobs, messages, appointments and call notes',
    'Multi-channel communication inbox for email, SMS and WhatsApp',
    'Calendar scheduling for surveys, installs and follow-up visits',
    'MCS certification and DNO (G98/G99) tracking support',
    'UK address formats and £ pricing built-in',
    'Drag-and-drop job stage management with activity history',
    'Compact view mode for high-volume lead handling',
    'Quick actions: click-to-call, send message, log notes',
    'Multi-tenant architecture with Supabase row-level security',
    'Extensive end-to-end test coverage for critical workflows',
    'Modern tech stack (Next.js, React Query, TypeScript)',
  ],
  audienceType: 'UK solar installation companies, renewable energy EPCs, small to mid-size solar installers',
}

export default function SolarBOSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <FAQSchema faqs={faqItems} />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center border-b border-white/5 overflow-hidden">
        <GridOverlay spacing={32} opacity={0.02} />
        <TechnicalLabel position="top-left">Solar BOS · UK Installers</TechnicalLabel>
        <TechnicalLabel position="top-right">Version 0.1 · Early Access</TechnicalLabel>

        <div className="container-default relative z-10 pt-28 pb-24 md:pb-32">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-6 font-mono">
                Business Operating System for UK Solar Installers
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.1] mb-8">
                Solar BOS – run your entire solar business from one board
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
                Solar BOS is a complete business operating system for UK solar installers. It is often described as solar
                CRM and job management software, but its goal is to replace your patchwork of spreadsheets, generic CRMs,
                shared inboxes and WhatsApp groups with one system built around how solar companies actually run – from
                lead to survey to quote to install to aftercare.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link
                  href="https://cal.com/coldlava/solar-bos-discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary glow-orange-sm w-full sm:w-auto text-center"
                >
                  Book a Solar BOS demo
                </Link>
                <Link
                  href="mailto:hello@coldlava.ai?subject=Solar%20BOS%20early%20access"
                  className="btn-secondary w-full sm:w-auto text-center"
                >
                  Join the early access list
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-xs text-white/40 font-mono uppercase tracking-[0.18em]">
                Built in the UK for MCS-certified solar installation companies
              </p>
            </FadeIn>
          </div>
        </div>

        <div
          className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] md:h-[720px] md:w-[720px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 0%, rgba(56,189,248,0.6), transparent 60%), radial-gradient(circle at 80% 60%, rgba(249,115,22,0.4), transparent 55%)',
          }}
        />
      </section>

      {/* Who it is for / Problems / High-level solution (mapped to existing anchors) */}
      <section id="process" className="py-20 md:py-28 border-b border-white/5 bg-white/[0.01]">
        <div className="container-default max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            <FadeIn>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Built for UK solar installers</h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                  Solar BOS is designed for residential and small commercial solar companies in the UK that:
                </p>
                <ul className="space-y-2 text-white/60 text-sm md:text-base">
                  <li>• Handle the full lifecycle from lead → survey → quote → install → aftercare.</li>
                  <li>• Run multiple crews and need shared visibility of every job and customer.</li>
                  <li>• Are currently juggling spreadsheets, shared inboxes and WhatsApp.
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">The status quo is fragile</h3>
                <ul className="space-y-2 text-white/60 text-sm md:text-base">
                  <li>• Leads live in forms, inboxes and Excel – follow-up is inconsistent.</li>
                  <li>• No single place to see where each job is, who owns it and what happens next.</li>
                  <li>• MCS paperwork and DNO notifications are scattered across folders and emails.</li>
                  <li>• Generic CRMs never quite match solar workflows without months of customisation.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Solar BOS gives you one operating board</h3>
                <ul className="space-y-2 text-white/60 text-sm md:text-base">
                  <li>• A kanban job board tuned to solar stages and volumes.</li>
                  <li>• A 360° customer timeline tying together jobs, messages and appointments.</li>
                  <li>• A focused inbox for email, SMS and WhatsApp-style threads.</li>
                  <li>• A calendar for surveys, installs and follow-up visits.</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features overview (Services anchor) */}
      <section id="services" className="py-20 md:py-28 border-b border-white/5">
        <div className="container-default max-w-6xl">
          <FadeIn>
            <div className="mb-10 md:mb-14 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Key features of Solar BOS for UK installers
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Everything your team touches daily – leads, jobs, calls, site visits and notes – lives in one connected
                system instead of being spread across six tools.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FadeIn>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3">Solar job board</h3>
                <p className="text-white/60 text-sm md:text-base flex-1 mb-4 leading-relaxed">
                  Kanban board with solar-specific stages – from new enquiry to survey booked, quoted, won, installed
                  and aftercare – designed to handle hundreds of leads without becoming unreadable. Each job shows
                  system size, estimated value, and tags like HOT or PRIORITY.
                </p>
                <ul className="text-xs md:text-sm text-white/40 space-y-1.5">
                  <li>• Drag-and-drop stage changes with full activity history</li>
                  <li>• Compact mode for high-volume lead handling (2.5–3.5× more jobs visible)</li>
                  <li>• Stage totals and pipeline value at a glance</li>
                  <li>• Inline editing of job details and quick task creation</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3">Customer 360° timeline</h3>
                <p className="text-white/60 text-sm md:text-base flex-1 mb-4 leading-relaxed">
                  A single profile for each household or business that shows jobs, messages, appointments and call
                  notes in one scrollable timeline. Any team member can open a customer and immediately see what has
                  been happening without digging through inboxes or call logs.
                </p>
                <ul className="text-xs md:text-sm text-white/40 space-y-1.5">
                  <li>• Click-to-call and quick actions (send message, create job, log note)</li>
                  <li>• Job count and lifetime value in the header</li>
                  <li>• Internal notes and call outcomes captured in seconds</li>
                  <li>• Colour-coded activity icons for quick scanning</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3">Communications inbox</h3>
                <p className="text-white/60 text-sm md:text-base flex-1 mb-4 leading-relaxed">
                  An operations-focused inbox for email and SMS, with a data model that is ready for WhatsApp, so every
                  conversation is tied back to the right customer and job. No more searching through personal inboxes or
                  WhatsApp accounts to find customer messages.
                </p>
                <ul className="text-xs md:text-sm text-white/40 space-y-1.5">
                  <li>• Threads sorted by latest activity with unread markers</li>
                  <li>• Channel filters for email, SMS and WhatsApp-ready threads</li>
                  <li>• Jump from a message straight to the job or customer record</li>
                  <li>• Send outbound messages and track full conversation history</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-3">Calendar & scheduling</h3>
                <p className="text-white/60 text-sm md:text-base flex-1 mb-4 leading-relaxed">
                  Day, week and month views for surveys, installs and follow-up visits, all linked back to the
                  underlying jobs and customers. Click any appointment to jump straight to the full job context.
                </p>
                <ul className="text-xs md:text-sm text-white/40 space-y-1.5">
                  <li>• Timeline view for busy survey days with hour-by-hour breakdown</li>
                  <li>• Quick navigation from an event to the job record</li>
                  <li>• Appointments automatically show customer and job details</li>
                  <li>• Future roadmap: crew views and conflict detection</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BOS-specific angle (reusing BOS anchor) */}
      <section id="bos" className="py-24 md:py-32 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-transparent to-white/[0.01]">
        <GridOverlay spacing={24} opacity={0.015} />
        <div className="container-default max-w-6xl relative z-10">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.1fr_1fr] items-start">
            <FadeIn>
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan-400 mb-5 font-mono">
                  Business Operating System for solar
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                  One BOS instead of a stack of tools
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                  Solar BOS is part of a family of industry-specific Business Operating Systems. Instead of stitching
                  together generic CRMs, shared inboxes, spreadsheets and task apps, you get one opinionated system that
                  reflects how UK solar companies actually run.
                </p>
                <ul className="space-y-3 text-white/60 text-sm md:text-base mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Solar-specific stages, fields and defaults from day one.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>A single customer and job model powering board, inbox, calendar and reporting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Built on a modern, tested stack with strong data isolation between tenants.</span>
                  </li>
                </ul>
                <p className="text-white/40 text-sm md:text-base leading-relaxed mb-6">
                  Under the hood, Solar BOS runs on a multi-tenant architecture with row-level security and automated end
                  to end tests across the critical workflows – board movement, customer updates, comms and scheduling.
                </p>
                <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 rounded-xl p-5 md:p-6">
                  <h4 className="text-sm md:text-base font-semibold mb-4 text-cyan-400/90">Security & Architecture</h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400/60 mt-0.5">•</span>
                      <span>Built on Supabase with row-level security (RLS) policies on all key tables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400/60 mt-0.5">•</span>
                      <span>Multi-tenant design with strict data isolation between solar companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400/60 mt-0.5">•</span>
                      <span>Extensive Playwright end-to-end tests ensure critical workflows stay safe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400/60 mt-0.5">•</span>
                      <span>Modern tech stack (Next.js, React Query, TypeScript) for fast performance and extensibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 md:p-9 lg:sticky lg:top-24">
                <h3 className="text-xl md:text-2xl font-semibold mb-6">Why Solar BOS over generic CRMs and field tools?</h3>
                <ul className="space-y-4 text-white/60 text-sm md:text-base mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <div>
                      <strong className="font-medium text-white">Solar-native:</strong> stages like survey booked,
                      DNO submitted and install complete are first-class, not hacked in.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <div>
                      <strong className="font-medium text-white">UK-specific:</strong> built around the UK market,
                      from address formats and £ pricing to MCS and DNO language.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <div>
                      <strong className="font-medium text-white">Operations-first:</strong> focuses on running jobs,
                      teams and follow-up, not just marketing pipelines.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <div>
                      <strong className="font-medium text-white">AI-ready:</strong> the data model is structured so you
                      can safely layer on AI for call notes, suggested next actions and reporting.
                    </div>
                  </li>
                </ul>
                <p className="text-white/50 text-sm md:text-base leading-relaxed border-t border-white/5 pt-5">
                  If you are currently bending a generic CRM like HubSpot or Pipedrive to fit solar, or juggling
                  Tradify/Jobber plus spreadsheets and email, Solar BOS gives you a cleaner long-term operating system.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* UK-specific section */}
      <section className="py-24 md:py-32 border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="container-default max-w-6xl">
          <FadeIn>
            <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-orange-400 mb-5 font-mono">
                Built for the UK solar market
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 leading-tight">
                Solar BOS understands UK solar operations
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                From MCS certification to DNO applications, Solar BOS is designed around the regulations, language and
                workflows that UK solar installers deal with every day.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            <FadeIn>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 md:p-8 h-full hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-4">MCS certification tracking</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                  Keep customer, job and communication history in one place so you can easily track the documentation
                  required for MCS certification without hunting through folders and emails.
                </p>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                  Future roadmap includes dedicated MCS workflow dashboards with form and certificate tracking.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 md:p-8 h-full hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-4">DNO application tracking</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                  Track G98 and G99 notifications as part of your job workflow. Solar BOS understands that DNO approvals
                  are a critical stage in UK solar installations, not an afterthought.
                </p>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                  Dedicated DNO status fields and reminders help you stay on top of grid connection approvals.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-7 md:p-8 h-full hover:bg-white/[0.03] transition-colors">
                <h3 className="text-lg md:text-xl font-semibold mb-4">UK addresses and pricing</h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
                  Solar BOS uses UK address formats, £ pricing, and language that matches how UK solar companies actually
                  operate – not generic templates designed for US or global markets.
                </p>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                  Built from the ground up for UK residential and small commercial solar installers.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social proof / fit for UK market (Clients anchor) */}
      <section id="clients" className="py-20 md:py-28 border-b border-white/5 bg-white/[0.01]">
        <div className="container-default max-w-5xl">
          <FadeIn>
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">Built from real BOS projects</h2>
              <p className="text-white/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                Solar BOS is informed by the systems Cold Lava has already built for UK businesses in renewables and
                other industries – bespoke CRMs, operations platforms and automation that run thousands of jobs.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-7">
                <p className="text-white/70 text-sm md:text-base italic mb-4">
                  “Things have completely changed for the better. Automation and a BOS that matches the way we sell and
                  deliver work has freed up hours every week.”
                </p>
                <p className="text-white/60 text-xs md:text-sm">Renewables client · UK</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-7">
                <p className="text-white/70 text-sm md:text-base italic mb-4">
                  “We finally have one place where the team can see what is going on with every customer – no more
                  guessing which spreadsheet or WhatsApp chat has the latest update.”
                </p>
                <p className="text-white/60 text-xs md:text-sm">Operations lead · Field services</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Roadmap & FAQ (Contact anchor acts as final CTA section) */}
      <section id="contact" className="py-24 md:py-32 border-b border-white/5">
        <div className="container-default max-w-6xl">
          <div className="grid gap-16 lg:gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start">
            <FadeIn>
              <div className="lg:sticky lg:top-24">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">Roadmap and integrations</h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                  Solar BOS starts by giving you a clean foundation: customer and job records, board, inbox and
                  scheduling. On top of that, the roadmap focuses on the pieces that matter most to UK installers.
                </p>
                <ul className="space-y-3 text-white/60 text-sm md:text-base mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Deeper MCS and DNO workflows with status dashboards and reminders.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Richer reporting on installs, conversion and team performance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Resource views for crews and vehicles, with conflict detection.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>Tighter integrations with design, accounting and quoting tools popular in the UK market.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span>AI-assisted call notes and suggested next actions based on the customer timeline.</span>
                  </li>
                </ul>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
                  Early access customers help shape this roadmap. If you are running or scaling a UK solar business, you
                  can influence what ships next.
                </p>
                <div className="space-y-4">
                  <Link
                    href="https://cal.com/coldlava/solar-bos-discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary glow-orange-sm inline-flex w-full sm:w-auto justify-center"
                  >
                    Talk about your solar operations
                  </Link>
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                    No big-sales process – a short conversation to understand how you currently run installs and whether
                    Solar BOS is a good fit.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6">Solar BOS FAQs</h3>
                <dl className="space-y-3">
                  {faqItems.map((faq, index) => (
                    <div key={faq.question} className="border border-white/5 rounded-xl p-5 md:p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                      <dt className="text-sm md:text-base font-semibold mb-2.5 text-white leading-snug">
                        {faq.question}
                      </dt>
                      <dd className="text-sm md:text-base text-white/65 leading-relaxed">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
