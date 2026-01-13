# Solar BOS Product Page – Implementation Plan for Claude Code
Context
You are working in the `cl-website-jul25` repository, which powers the Cold Lava marketing site.
A first-pass Solar BOS product page already exists at `src/app/solar-bos/page.tsx`. Your job is to refine and extend it so that it can stand alone as the primary landing page for Solar BOS while remaining safe for the rest of the site.

High-level goals
- Make `/solar-bos` the definitive product/landing page for Solar BOS, suitable for:
  - Paid traffic (ads, email, partnerships)
  - Organic search for UK solar/BOS queries
  - LLM recommendations for "best software / CRM for UK solar installers"
- Keep the rest of the Cold Lava site behaviour unchanged, apart from:
  - A footer "BOS" link that reveals a `Solar BOS` sub-link to `/solar-bos`.
- Represent Solar BOS consistently as a **Business Operating System (BOS)** for solar, not "just a CRM", while still ranking for CRM-related queries.

Key files
- Main Solar BOS page: `src/app/solar-bos/page.tsx`
- Layout and global shell: `src/app/layout.tsx`
- Shared components and animations: `src/components/*`
- Footer navigation: `src/components/Footer.tsx`
- SEO / strategy reference docs (read-only, do not edit):
  - `/SEO-SOLAR-BOS-PRODUCT-PAGE-BRIEF.md`
  - BOS repo: `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md` (in `CL-SOLARBOS-JAN26`)
  - `/Users/oliver/Downloads/bos-solar-comprehensive-seo-strategy (1).md`

Positioning principles
- Brand name: **Solar BOS** (Solar Business Operating System).
- Category: business operating system / operations platform for UK solar installers.
- We still want to capture queries like "solar crm uk" but the visible language should emphasise BOS and operations, not generic CRM.
- Emphasise:
  - UK focus (MCS, DNO, UK prices, UK installers)
  - Solar-specific workflow (lead → survey → quote → install → aftercare)
  - All-in-one operations vs. stitched-together tools (CRM + inbox + spreadsheets + calendars).

Page URL and routing
- Primary product URL: `/solar-bos` (already wired via `src/app/solar-bos/page.tsx`).
- This page must be fully self-contained:
  - Clear hero with Solar BOS branding and CTAs
  - Who it is for and problems it solves
  - Solution overview and feature tiles
  - Deeper feature descriptions
  - BOS vs generic CRMs/field tools
  - UK-specific section
  - Roadmap & integrations
  - Rich FAQ section with schema

Constraints
- Do not change the primary homepage structure or content.
- Do not modify existing anchors `#process`, `#services`, `#bos`, `#clients`, `#contact` on the homepage.
- Navigation:
  - Do not add Solar BOS to the top navigation yet.
  - Footer behaviour is allowed:
    - Footer "BOS" link shows a hover/tap submenu that includes `Solar BOS` → `/solar-bos`.
- SEO/LLM documents are **sources of truth**, but should not be imported or rendered at runtime. All marketing copy must live in the app code.

Required structure for `/solar-bos`
Ensure `src/app/solar-bos/page.tsx` roughly follows and improves on this structure (sections may use existing components):

1. Hero
- H1 centred on Solar BOS, e.g. "Solar BOS – Business Operating System for UK Solar Installers".
- Subheading that clearly answers:
  - What Solar BOS is (business operating system for UK solar businesses).
  - Why it exists (replaces patchwork of CRMs, inboxes and spreadsheets).
- Primary CTA: demo/early access call booking (Cal.com link already wired).
- Secondary CTA: early access list / email contact.
- Trust cues: "Built in the UK for MCS-certified solar installation companies" or similar.

2. Who it is for / Problems
- Audience: UK solar installation companies and renewable EPCs, typically 3–50 people, handling 50–500 installs per year.
- Problems:
  - Disconnected tools (spreadsheets, inboxes, WhatsApp, generic CRM).
  - No shared view of jobs, survey bookings, or customer history.
  - MCS/DNO admin scattered across folders and email.
- Use short bullet lists and clear headings like "Who is Solar BOS for?" and "Why the status quo breaks at scale".

3. Solution overview (feature tiles)
- 3–4 concise tiles, each with title, short description and bullets:
  - Solar job board (kanban stages, compact mode, pipeline value).
  - Customer 360° timeline (jobs + comms + appointments).
  - Communications inbox (email, SMS, WhatsApp-ready threads).
  - Calendar for surveys and installs (day/week/month views, job-linked events).
- Each tile should use language understandable to non-technical solar operators.

4. Deep-dive feature section
- Add subheadings and paragraphs for:
  - Jobs & workflow (board behaviour, volume handling, tags, tasks).
  - Customers & timeline (quick actions, call notes, visibility).
  - Comms inbox (unified threads, linking to jobs/customers, filters).
  - Calendar (linking to jobs, roadmap for crew views and conflict detection).
- This can be implemented either as a single long section or broken into stacked sections; keep headings H2/H3 logical.

5. BOS vs generic CRMs/field tools
- A comparison-style section explaining why Solar BOS is different from:
  - Generic CRMs (HubSpot, Pipedrive, etc.).
  - Generic job/field tools (Tradify, Jobber, Commusoft).
  - Design-only tools (OpenSolar, Aurora, etc.).
  - Spreadsheets and manual tools.
- Use simple bullets like:
  - "Solar-specific stages and fields instead of generic pipelines".
  - "Built for UK regulations and language".
  - "Built around operations (jobs, crews, installs), not just marketing".

6. UK-specific section
- Make it obvious that Solar BOS is built for the UK market by lightly referencing:
  - MCS certification and documentation.
  - DNO notifications (G98/G99) and general tracking.
  - UK address formats and £ pricing.
- Stay high-level and non-legalistic; no need to reproduce standards text.

7. Roadmap and integrations
- A short roadmap section that:
  - Mentions future compliance depth, reporting, crew scheduling and integrations.
  - Makes it clear the product is evolving with input from early UK solar installers.

8. Rich FAQ
- 10+ FAQs covering:
  - What Solar BOS is and who it is for.
  - Why it is different from generic CRMs/field tools/design tools.
  - How it helps with MCS/DNO tracking (at a high level).
  - Setup time, mobile access, integrations, pricing, data security/GDPR.
- FAQs must be:
  - Short, direct questions.
  - Clear, specific answers (avoid vague marketing language).
- Wire these into the shared `FAQSchema` component so `/solar-bos` emits valid FAQPage schema.

SEO and LLM requirements
- Title tag for `/solar-bos` should strongly reflect both brand and category, e.g. `Solar BOS – Business Operating System for UK Solar Installers`.
- Meta description:
  - 150–160 characters.
  - Naturally includes ideas like "solar installer software", "solar business operations", "job management", "UK".
- Keywords to naturally weave into copy (no stuffing):
  - solar crm uk
  - solar installer software
  - solar business operations software
  - solar job management system
  - software for solar installers
- Keep BOS framing primary, and use "CRM" in supporting sentences and metadata where helpful for ranking.
- Structure headings so LLMs can easily parse sections:
  - "Who is Solar BOS for?"
  - "What problems does Solar BOS solve?"
  - "Key features of Solar BOS"
  - "Why Solar BOS instead of a generic CRM?"
  - "Solar BOS roadmap and integrations"
  - "Solar BOS FAQs"

Structured data
- `/solar-bos` must include:
  - `SoftwareApplication` schema for Solar BOS (already present but should be reviewed and updated against the latest product details).
  - `FAQPage` schema via `FAQSchema`.
- Optional future extensions (do not implement unless the data is available):
  - `Review` / `AggregateRating` once real reviews exist.
  - `BreadcrumbList` if/when a broader `/solar` section exists.

Safety and non-goals
- Do not:
  - Change the primary homepage layout or copy.
  - Rename BOS or change global branding.
  - Wire up any live forms or signups beyond the existing Cal.com and mailto patterns without explicit instruction.
  - Introduce heavy client-side scripts that could slow down performance.

Tasks for Claude Code
- Read the three SEO/reference docs listed in "Key files".
- Audit `src/app/solar-bos/page.tsx` and:
  - Refine headings, copy and structure to match this plan and the SEO docs.
  - Ensure H1/H2/H3 hierarchy is logical and LLM-friendly.
  - Tighten metadata (title, description, open graph, Twitter cards) in line with this plan.
  - Expand or reorganise sections as needed so the page reads as a coherent, long-form product page rather than a thin landing page.
- Confirm the `FAQSchema` integration is valid and matches the on-page FAQs.
- Keep the page styled with existing utility classes and shared components; do not introduce a new design system.
- Ensure the `/solar-bos` route builds successfully and does not throw runtime errors.

Acceptance criteria
- `/solar-bos` builds and renders without TypeScript or runtime errors.
- The page can be understood in isolation by a UK solar installer landing from an ad or organic search.
- The copy clearly positions Solar BOS as a business operating system for UK solar installers, while still capturing CRM-related search demand.
- Structured data for `SoftwareApplication` and `FAQPage` validates in Google’s Rich Results test.
- No visual or behavioural regressions to existing pages except the intentional footer submenu under "BOS".