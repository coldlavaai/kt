# Solar BOS Product Page – Implementation Brief (Cold Lava Website)

**Repo:** `cl-website-jul25`  
**Purpose:** Guide an agent/tab to implement the Solar BOS product page within the existing Cold Lava marketing site.

This brief assumes:
- The Solar BOS application lives in a separate repo (`CL-SOLARBOS-JAN26`).
- `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md` in that repo is the factual/feature source of truth.

The job of this repo is to present that product to the outside world.

---

## 1. Overall Goal

Create a dedicated **Solar BOS product page** on the Cold Lava website that:

- Clearly explains what Solar BOS is, who it’s for, and what problems it solves.
- Showcases core features: Jobs board, Customer timeline, Communications inbox, Calendar, and Security.
- Is SEO-optimised for UK solar/BOS queries and structured in a way that LLMs can easily summarise and recommend.
- Lives under a stable URL, e.g.:
  - `/solar-bos` or
  - `/products/solar-bos` (depending on existing site routing conventions).

---

## 2. Source of Truth for Content

Use the following document from the BOS repo as the primary factual reference:

- **Path (in CL-SOLARBOS-JAN26 repo):** `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md`

It contains:
- Product positioning.
- Detailed feature inventory.
- Differentiators vs generic CRMs.
- SEO themes & target keywords.
- Suggested page structure.

Do **not** re-invent feature descriptions from scratch here; instead, adapt/summarise them into marketing copy appropriate for the website.

---

## 3. Page Structure to Implement

Suggested sections for the Solar BOS product page (these can be mapped to components/sections in the site):

1. **Hero**
   - H1: Something like "Run your entire solar business from one board".
   - Subheading: Short description: "Jobs, customers, calendar, and communications in a single BOS built for UK solar installers.".
   - Primary CTA: e.g. `Book a demo` or `Join the early access list`.
   - Secondary CTA: e.g. `Watch a 3‑minute walkthrough` (can be a placeholder for now).

2. **Who is Solar BOS for?**
   - Brief description of ideal customer profile:
     - UK solar installation companies.
     - Teams of ~3–50 people.
     - Handling lead → survey → quote → install → aftercare.

3. **Problems with the status quo**
   - Short bullet list of pain points:
     - Spreadsheets + shared inboxes + WhatsApp.
     - No shared view of job stage or customer history.
     - Generic CRMs that don’t fit solar workflows.

4. **How Solar BOS helps** (high-level solution)
   - 3–4 tiles or subsections:
     - Solar-specific Job Board.
     - Unified Customer Timeline.
     - Multi-channel Communications Inbox.
     - Calendar for surveys & installs.

5. **Detailed Features**
   - **Jobs & Workflow:**
     - Kanban stages, drag & drop, compact view for high volume, inline editing, tasks.
   - **Customers & Timeline:**
     - 360° view of each customer, quick actions, activity feed.
   - **Communications:**
     - Threads by channel (email/SMS/WhatsApp), filters, linking to customers/jobs.
   - **Calendar:**
     - Day/Week/Month views, appointments tied to jobs/customers, quick navigation.
   - **Security & Architecture:**
     - Supabase RLS, multi-tenant design, test coverage.

6. **Why Solar BOS vs generic CRMs/field tools**
   - Short comparison section emphasising:
     - Solar-specific workflow.
     - All-in-one operations focus.
     - Modern stack & fast iteration.

7. **Roadmap & Integrations (teaser)**
   - Mention planned/early-stage items:
     - Call recording / Otter.ai.
     - Advanced reporting/dashboards.
     - Installer resource scheduling & conflict detection.

8. **FAQ**
   - Common buyer questions, e.g. "Can this replace my CRM?", "Does it integrate with X?", "How is my data handled?".

---

## 4. SEO & Meta Data

For the agent implementing the page, ensure:

- **Title tag:**
  - Something like: `Solar BOS – Solar Installer CRM & Operations Software (UK) | Cold Lava`.

- **Meta description:** ~150–160 characters, including:
  - "solar installer software", "job management", "calendar", "communications", "UK".

- **H1:**
  - Clear, descriptive, aligned with main keyword (e.g. "Solar BOS – Solar Installer Operations Software for the UK").

- **H2s/H3s:**
  - Reflect sections: Who it’s for, Problems, Features, Why Solar BOS, FAQ.

- **Copy:**
  - Naturally include target phrases (from `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md` §4) without keyword stuffing.

---

## 5. Implementation Notes (Repo-Specific)

The agent should:

1. Inspect the existing `cl-website-jul25` structure:
   - Determine routing mechanism (Next.js pages/app router, Astro, etc.).
   - Decide where to place the new page (e.g. `app/solar-bos/page.tsx` or `pages/solar-bos.tsx`).

2. Create the Solar BOS page component:
   - Use existing layout components and design system from this repo.
   - Wire in the sections listed above.

3. Add navigation entry:
   - Add a menu item or footer link to the Solar BOS page, as appropriate.

4. Keep all **content** in this repo; only treat `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md` as a read-only data source.

5. Ensure the new page builds and passes any existing lint/tests in this repo.

---

## 6. Prompt for the Marketing/SEO Agent (New Tab)

> You are working in the `cl-website-jul25` repository, which is the Cold Lava marketing site. Use `SEO-SOLAR-BOS-PRODUCT-PAGE-BRIEF.md` in this repo and `SEO-PRODUCT-PAGE-NOTES-SOLAR-BOS.md` from the `CL-SOLARBOS-JAN26` repo as your factual references. Implement a new Solar BOS product page (e.g. at `/solar-bos`), structured with a hero, audience/problem section, solution overview, detailed feature sections, security note, comparison vs generic CRMs, roadmap teaser, and FAQ. Write marketing copy optimised for UK solar installer search terms (solar CRM UK, solar installer software, solar job management, etc.) while keeping language natural. Wire the page into the site’s navigation and ensure the site builds and passes lint/tests.
