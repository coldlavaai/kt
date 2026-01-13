# Solar BOS Product Page – Conversion Enhancements (Solar-Only)

Context
You are working in the `cl-website-jul25` repository. The Solar BOS product page at `src/app/solar-bos/page.tsx` already has solid messaging, structure and basic UI, guided by:
- `planning/SOLAR-BOS-PRODUCT-PAGE-PLAN.md`
- `planning/SOLAR-BOS-UI-REFINEMENT-PLAN.md`

Your job in this pass is to add and refine the **conversion elements** on `/solar-bos`: visuals, pricing signals, social proof and CTAs, while keeping the focus strictly on **Solar BOS for solar installers**.

Important constraints
- This page is about **Solar BOS only**.
- Do not mention other industries or future BOS verticals (no references to other BOS products or non-solar use cases).
- Do not change the main homepage or create a BOS hub page in this pass.
- Scope is limited to `src/app/solar-bos/page.tsx` and any new or existing components it directly uses.

Goals
- Increase trust and conversion likelihood for a UK solar installer landing on `/solar-bos` from ads or organic search.
- Provide clear visual proof that Solar BOS is a real product.
- Set pricing expectations without locking in final pricing.
- Strengthen social proof without fabricating testimonials.
- Introduce a more varied CTA stack so not every action is “Book a demo”.

P0 changes (this pass)

1. Add product visuals
- Add 3–4 simple product visuals to `/solar-bos` that illustrate real or representative UI for Solar BOS.
- Recommended placements:
  - Hero: one key screenshot (or tight crop) that suggests the main board or day-to-day working view.
  - Features section: at least one visual for the job board and one for either customer 360 or the communications inbox.
- Notes:
  - Reuse existing screenshot assets if they reasonably approximate Solar BOS; otherwise, use neutral, non-deceptive mock visuals that convey layout and workflow without promising specific unreleased UI.
  - Keep file sizes reasonable and use existing image optimisation patterns (Next `Image` etc.).
  - Always include alt text that describes the feature shown from a solar operator’s point of view.

2. Add a demo video placeholder
- Add a small section or element near the hero (or just below it) for a 30–60 second product walkthrough video.
- Implementation options:
  - A reusable `VideoEmbed`-style component, or a simple responsive container with a thumbnail, play icon and external link (e.g. Loom or YouTube).
- Behaviour for now:
  - You can hardcode a placeholder URL and thumbnail; make sure it is easy to swap later.
- Copy guidance:
  - Use a low-commitment CTA label such as “Watch a 60-second walkthrough of Solar BOS”.

3. Strengthen or neutralise social proof
- The current quotes are generic and anonymous. That weakens credibility.
- Short term options (pick one safe option):
  - Option A: Remove testimonial quotes entirely from `/solar-bos` until named or more specific ones are available.
  - Option B: Replace existing quotes with more specific but still anonymised ones, for example:
    - “Operations director at a 12-person UK solar installer, managing 40+ installs per month.”
  - Option C: Replace testimonials with a simple metrics block if you have real numbers (for example: number of early access companies, jobs tracked, hours saved). Only do this if you have real data to back it up.
- Do not fabricate names, company names or hard numbers.

4. Add a pricing signal
- Add a short “Pricing” or “Early access pricing” subsection near the roadmap or above the FAQ.
- The goal is to set expectations without promising final GA pricing.
- Example patterns you can adapt:
  - “Solar BOS is currently in early access. Pricing is being finalised with early customers and is designed to be accessible for small and mid-size UK solar installers.”
  - If you have safe ranges or anchors, you may include them (e.g. “from £X per user per month”); otherwise keep it qualitative.
- Do not build a full pricing table or tiers in this pass; just a simple text section plus a CTA to talk about pricing on a call.

5. Improve CTA mix
- Current CTAs are primarily “Book a Solar BOS demo” (Cal.com) and a mailto-based early access list.
- Enhance this by:
  - Retaining “Book a demo” as the primary CTA.
  - Adding a “Watch demo” CTA tied to the new video block.
  - Optionally adding a lower-commitment “Talk through your solar operations” or similar CTA near the roadmap section.
- If feasible, replace or supplement the mailto waitlist with a simple form or an external form (e.g. Typeform) so you are not reliant solely on email links.
- Ensure CTAs are clearly distinguished visually (primary vs secondary) but still consistent with the site’s design system.

6. Reframe architecture/security copy
- Keep the fact that Solar BOS is built on modern, secure infrastructure, but make the language business-facing.
- Adjust the security/architecture content to emphasise:
  - Data isolation between companies.
  - Protection of customer information.
  - Reliability and automated testing, in plain language.
- You may leave a short note or small link for technical readers, such as “View technical details” that can later point to more developer-focused documentation.
- Remove or minimise acronyms and tool names that only developers care about (RLS, Playwright, etc.) from the main body text.

7. Footer behaviour on /solar-bos
- Consider whether the playful ISS and “meetings that could have been emails” footer elements should appear on `/solar-bos`.
- For this pass, you may:
  - Leave the global footer as-is, or
  - Condition the playful elements off on `/solar-bos` only, if that can be done in a simple, low-risk way.
- If you choose to hide them on `/solar-bos`, keep all legal links and company info intact.

P1 ideas (optional in this pass, good to prepare for)
- Prepare a simple visual comparison block for later use (vs HubSpot, vs job tools, vs spreadsheets), but do not create full new comparison pages in this pass.
- Sketch a simple “Integration logos” row (e.g. Xero, calendar, messaging providers) with placeholder or monochrome logos that can be swapped later.
- Think about a future lead-magnet CTA (“Download the Solar Operations Checklist”), but do not implement the actual download flow yet.

Tasks for Claude Code
- Work only on `/solar-bos` and any new or reused components it needs.
- Implement the P0 changes above, keeping everything solar-only and avoiding mentions of other verticals or industries.
- Maintain existing headings, copy and structure from the previous plans where possible; add new sections or visuals in a way that enhances, not rewrites, the core message.
- Ensure the page builds and renders without TypeScript or runtime errors.
- Keep performance in mind when adding images or embeds.

Acceptance criteria
- `/solar-bos` includes at least one clear product visual in the hero and additional visuals for one or more core features.
- There is a visible demo video CTA or placeholder.
- Social proof is either removed (to avoid harm) or made meaningfully more specific without fabricating details.
- A short pricing signal section exists and does not over-promise.
- CTAs feel varied and appropriate: demo, video, and at least one lower-commitment option.
- Security/architecture language is understandable to a non-technical solar business owner while still signalling robustness.
- The page continues to focus exclusively on Solar BOS for solar installers, with no references to other industries or BOS products.