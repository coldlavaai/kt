# Solar BOS Product Page – UI/UX Refinement Plan (Front-End Design Pass)

Context
You are working in the `cl-website-jul25` repository, which powers the Cold Lava marketing site.
The content and structure of the Solar BOS product page have already been brought into line with the SEO/LLM strategy using `SOLAR-BOS-PRODUCT-PAGE-PLAN.md`.
Your task in this pass is to focus on **visual design, layout, readability and interaction** of the Solar BOS page, using the existing design language of the site.

Scope
- Route in scope: `src/app/solar-bos/page.tsx` only.
- You may also lightly adjust **shared visual components** if needed, but only where they are used on `/solar-bos` and changes are safe for the rest of the site.
- Do **not** modify:
  - `src/app/layout.tsx`
  - The main homepage content/structure
  - Top navigation behaviour

Design goals
1. Make `/solar-bos` feel like a **flagship product page** for Solar BOS, visually on par with the main Cold Lava site.
2. Improve **scan-ability** for busy UK solar operators:
   - Clear visual hierarchy
   - Comfortable spacing and section breaks
   - Obvious CTAs and “what this is” messaging above the fold
3. Keep the page **fast and lightweight** (no heavy new dependencies or large client-side scripts).
4. Stay consistent with existing design patterns:
   - Typography, colours, gradients
   - Use of `FadeIn`, `GridOverlay`, `TechnicalLabel`
   - Card styles, borders, and subtle motion

Concrete UI/UX tasks

Hero section
- Keep the existing H1 and subcopy, but refine layout so the hero:
  - Is visually balanced on desktop (consider width of text column vs empty space).
  - Stacks cleanly on small screens.
- Check button sizing, spacing and stacking for mobile:
  - Ensure CTAs are easily tappable and not cramped.
- Consider adding subtle **supporting UI** on the right or background for larger screens, for example:
  - A simple abstract BOS-style card stack or grid.
  - Reuse existing components if available rather than introducing new ones.

Features overview
- The four key feature cards under “Key features of Solar BOS for UK installers” should:
  - Present as a coherent grid with consistent card heights.
  - Have clear spacing between title, body copy and bullets.
  - Maintain readability on mobile (avoid walls of text).
- You may:
  - Adjust line lengths and copy chunks for better scanning.
  - Tweak padding/margins and responsive breakpoints (via Tailwind classes) so cards look balanced on md/lg screens.

Deep-dive / BOS vs generic CRMs section
- Ensure the BOS comparison and security/architecture content are visually distinct from the basic feature tiles:
  - Consider a two-column layout with clear separation.
  - Use background tints or subtle borders to make the “Security & Architecture” callout feel like a focused panel.
- Check that the comparison bullets are easy to skim (spacing, bullet alignment, text size).

UK-specific section
- The “Solar BOS understands UK solar operations” section should:
  - Clearly read as its own block (e.g. distinct background tint, top/bottom padding, heading spacing).
  - Have cards sized and spaced consistently with earlier cards.
- Pay particular attention to how this section looks on small screens; avoid overly tall cards with cramped text.

Roadmap & FAQ
- In the final section, ensure that:
  - Roadmap bullets are easy to scan (good line height, spacing between bullets).
  - FAQ cards are visually distinct and not visually overwhelming.
- You can:
  - Limit FAQ card width for large screens (e.g. max-width on the FAQ column) so lines don’t stretch too wide.
  - Adjust padding and border treatments to match other card designs.

Use of existing components
- Prefer reusing existing shared components over creating new ones:
  - `FadeIn`, `GridOverlay`, `TechnicalLabel` for structure and motion.
  - Card styling patterns from other pages (rounded corners, subtle borders and bg tints).
- Optional: consider whether `BOSScreenshotCarousel` (or a simplified screenshot frame) would add clarity to the page:
  - If you add screenshots, position them in a way that doesn’t dominate the copy (e.g. one visual block near the feature or BOS section).
  - Use existing assets and patterns only; do not add new large images in this pass.

Interaction details
- Hover/focus states:
  - Ensure primary/secondary buttons and card links have clear hover and focus states consistent with the rest of the site.
- Accessibility basics:
  - Maintain sensible heading hierarchy (H1 → H2 → H3 etc.).
  - Do not rely solely on colour to indicate interactivity.

Performance & responsiveness
- Verify that the page remains performant:
  - Avoid adding unnecessary client-side state.
  - Keep animations subtle and inexpensive (reusing existing motion components).
- Check breakpoints visually:
  - Small screens (~375–480px): no horizontal scroll, comfortable padding.
  - Tablet (~768px): grids collapse sensibly, text still readable.
  - Desktop (≥1024px): hero and key sections make good use of space without feeling sparse.

Tasks for Claude Code (design pass)
1. Use the front-end design tooling to iterate on `src/app/solar-bos/page.tsx` layout and styling, keeping all existing content but improving visual hierarchy and responsiveness.
2. Adjust Tailwind/utility classes, grid layouts, and component composition to:
   - Improve readability and balance on desktop and mobile.
   - Make CTAs and key messages prominent without being overbearing.
3. Optionally introduce one **lightweight visual element** (e.g. screenshot frame or simple BOS visual) using existing components to reinforce what Solar BOS looks like, without shifting the page into a purely visual gallery.
4. Ensure that all changes:
   - Build successfully (no TypeScript or runtime errors).
   - Do not modify global layout or navigation behaviour beyond what already exists.

Acceptance criteria
- `/solar-bos` feels visually consistent with the rest of the site and clearly like a dedicated product page.
- The page is easy to scan for a time-poor UK solar installer on both mobile and desktop.
- CTAs are visually prominent and accessible.
- No regressions to other routes or shared components beyond intentional styling tweaks that are clearly safe.
- All content decisions from `SOLAR-BOS-PRODUCT-PAGE-PLAN.md` remain intact; this pass is about **how** they are presented, not changing the message.