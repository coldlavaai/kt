# CLAUDE.md — Project Brief for Claude Code

## Project Overview

This is a complete redesign of the Cold Lava website. Cold Lava is a **consultancy and software development company** based in Liverpool, UK. The old site positioned them as a marketing automation agency — the new site positions them as a premium tech consultancy building custom software and AI agents.

**Live site:** https://coldlava.ai (currently the old design)
**Preview:** Will deploy to Vercel preview URL on this branch

---

## What's Been Done

A previous Claude instance (in Claude.ai) completed the following:

### 1. Strategic Foundation
- Full positioning document defining target audience, services, differentiation
- Competitive analysis against other AI consultancies
- Buyer psychology mapping

### 2. Design Direction
- Apple-level minimalism: dark, spacious, typography-led
- Spacing system: 8/12/20/32/48/72/128px scale
- Single accent colour: orange (#f97316)
- Geist font family
- Subtle scroll animations with Framer Motion
- Smooth scrolling with Lenis

### 3. Homepage Copy
All copy has been written for:
- Hero (headline, subhead, CTAs)
- Proof band (stats)
- Services (4 outcome-based cards)
- BOS section (flagship product teaser)
- Case studies (3 projects)
- Process (4 steps)
- Tech stack
- About (founders)
- Contact

### 4. Code Implementation
A working Next.js 14 starter with:
- TypeScript
- Tailwind CSS v3 with custom config
- Framer Motion for animations
- Lenis for smooth scroll
- All homepage sections built with real copy
- Responsive design
- Navigation with mobile menu
- Footer

---

## Project Structure

```
coldlava-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with fonts, nav, footer, grain overlay
│   │   └── page.tsx        # Homepage with all sections
│   ├── components/
│   │   ├── Navigation.tsx  # Sticky nav with mobile menu
│   │   ├── Footer.tsx      # Minimal footer
│   │   ├── SmoothScroll.tsx # Lenis wrapper
│   │   ├── FadeIn.tsx      # Scroll-triggered animations
│   │   └── index.ts        # Component exports
│   ├── styles/
│   │   └── globals.css     # Tailwind + custom utilities
│   └── lib/
│       └── utils.ts        # cn() helper for class merging
├── tailwind.config.js      # Custom colours, typography, animations
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.x | React framework |
| react | 18.x | UI library |
| typescript | 5.x | Type safety |
| tailwindcss | 3.x | Styling |
| framer-motion | 12.x | Animations |
| lenis | 1.x | Smooth scrolling |
| geist | latest | Typography |
| clsx + tailwind-merge | latest | Class utilities |

---

## Design System

### Colours
```
Background: #000000
Foreground: #ffffff
Muted text: #86868b (white/50 or white/40)
Accent: #f97316 (orange, used sparingly)
Cards: white/[0.03] with white/5 border
```

### Typography
- Font: Geist Sans (variable)
- H1: text-4xl to text-7xl, font-semibold, tracking-tight
- H2: text-3xl to text-5xl, font-semibold, tracking-tight
- Body: text-lg, text-white/50, leading-relaxed
- Eyebrow: text-xs/sm, uppercase, tracking-[0.2em], text-white/40

### Spacing
- Section padding: py-24 md:py-32 (128px on desktop)
- Between elements: mb-6, mb-8, mb-12, mb-16
- Card padding: p-6 md:p-8
- Container max-width: max-w-5xl (default), max-w-3xl (narrow)

### Components
- Buttons: rounded-full, px-8 py-4
- Cards: rounded-2xl, subtle background, border, hover state
- Links: text-white/30 hover:text-white transition-colors

---

## Key Sections Explained

### Hero
- Centered layout
- Eyebrow → H1 → Subhead → CTAs
- Subtle orange gradient orb behind (decorative)
- Primary CTA: "Book a discovery call" (links to Cal.com)
- Secondary CTA: "View our work" (anchor to #work)

### Proof Band
- Three stats in a row with dividers
- Keep compact, don't over-emphasise

### Services
- 4 cards in 2x2 grid
- Outcome-focused titles (not feature lists)
- Hover state: slightly lighter background

### BOS (Business Operating System)
- Flagship product, coming 2026
- Two-column: copy left, visual placeholder right
- Orange accent on "Coming 2026" eyebrow
- Waitlist CTA (currently links to #contact)

### Work / Case Studies
- Horizontal card layout (stacked)
- Format: Label → Title → Outcome
- Three projects: Detail Dynamics, Greenstar Solar, Database Reactivation

### Process
- 4 columns with large muted step numbers
- Steps: Diagnose, Design, Build, Support

### Tech
- Single line, very compact
- Just text names for now (logos could be added)

### About
- Centered layout
- Two founder cards (Oliver, Jacob)
- Photo placeholders (circles)

### Contact
- Final CTA section
- Same dual-button pattern as hero

---

## What Still Needs Work

### Must Do
- [ ] Replace founder photo placeholders with real images
- [ ] Add BOS product visualization (abstract, not a UI screenshot)
- [ ] Verify proof band stats are accurate
- [ ] Add case study detail pages (or remove "View case study" links)
- [ ] Mobile polish pass
- [ ] Add favicon and OG images

### Nice to Have
- [ ] Tech logos instead of text
- [ ] Testimonial quotes section
- [ ] Subtle parallax or scroll effects on BOS section
- [ ] Page transitions
- [ ] Loading state / skeleton

### Do Not Do
- No emojis anywhere
- No stock photos
- No gradients (except the subtle hero orb)
- No busy animations
- No feature lists — keep it outcome-focused

---

## Voice & Tone Guidelines

**Do:**
- Confident and direct
- Outcome-focused
- Short sentences
- Plain language

**Don't:**
- Buzzwords (leverage, synergy, cutting-edge, revolutionary)
- Hype claims ("AI will transform everything")
- Fluff ("we're passionate about helping businesses")
- Exclamation marks
- Emojis

**Example good copy:**
> "We build software and automation tailored to how you actually operate — not how a product manager in San Francisco thinks you should."

**Example bad copy:**
> "We're passionate about leveraging cutting-edge AI to revolutionize your business operations!"

---

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Deployment

The repo is connected to Vercel. Pushing to `redesign` branch will create a preview deployment. Merging to `main` will deploy to production (coldlava.ai).

---

## Files to Reference

The following planning documents were created during this project. If you need deeper context on positioning, copy decisions, or design principles, ask the user to provide them:

1. **coldlava-positioning.md** — Full positioning strategy, audience, differentiation
2. **coldlava-homepage-copy.md** — All written copy with alternatives
3. **coldlava-wireframe.jsx** — Interactive wireframe with annotations

---

## Working With This Project

When making changes:

1. **Keep the minimal aesthetic** — when in doubt, remove rather than add
2. **Maintain spacing consistency** — use the established scale
3. **Test on mobile** — the site should feel premium on all devices
4. **Preserve animations** — FadeIn components are intentional, don't strip them
5. **Follow the copy** — if changing text, match the established tone

If the user asks for something that conflicts with the design principles (e.g., "add emojis" or "make it more colourful"), gently push back and explain why it might undermine the premium positioning.

---

## Questions?

If anything is unclear, ask the user. They have full context on the business and can make decisions on:
- Case study details and accuracy
- Founder bios and photos
- BOS product specifics
- Any copy changes
