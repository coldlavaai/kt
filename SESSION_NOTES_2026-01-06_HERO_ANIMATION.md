# Session Notes: Hero Animation & Process Section Redesign
**Date:** 2026-01-06
**Session Focus:** Hero typewriter animation, load sequence optimization, Process section improvements

---

## 1. Hero Section Typewriter Animation

### Initial Request
User wanted typewriter animation for hero title where:
- Cursor types out headline character by character
- "Wants" gets deleted and replaced with "Needs"
- "Needs" turns cyan and cursor stays blinking

### Evolution Through Multiple Iterations

**Iteration 1: Full character-by-character typewriter**
- Component: `HeroTypewriter.tsx`
- Typed entire headline: "We Build The Systems Your Business Actually Wants"
- Then deleted "Wants" and typed "Needs"
- Problem: Too slow, clunky, felt mechanical

**Iteration 2: Static content with typewriter for last line**
- Component: `TypewriterText.tsx`
- Added `staticPrefix` prop to type "Actually " first
- Then cycled through words: Wants → Deserves → Needs
- Problem: Still felt jerky with multiple staggered delays

**Iteration 3: Premium three-beat approach (FINAL)**
- Component: `PremiumHeroTitle.tsx`
- **Beat 1 (0-0.8s)**: Interface chrome loads (logo, nav, coordinates)
- **Beat 2 (0.8-1.4s)**: All hero content fades in together with "Wants" already visible
- **Beat 3 (1.5-2.1s)**: Delete "Wants" → type "Needs" (turns cyan)
- Used premium easing: `[0.22, 1, 0.36, 1]`

### Key Design Decisions
- Ditched slow character-by-character typing for full headline
- Batched all supporting elements to load together (no scattered staggers)
- Made Wants→Needs swap THE signature moment
- Simplified from 3 words (Wants/Deserves/Needs) to 2 (Wants/Needs)
- Kept cyan blinking cursor at the end

### Final Implementation
**File:** `/Users/oliver/Documents/internal/cl-website-jul25/src/components/PremiumHeroTitle.tsx`

```tsx
export function PremiumHeroTitle({
  contentDelay = 0.8,
  swapDelay = 1.5,
}: PremiumHeroTitleProps) {
  const [displayWord, setDisplayWord] = useState('Wants')
  const [phase, setPhase] = useState<'showing' | 'deleting' | 'typing' | 'complete'>('showing')

  // Deletion: 50ms/char (fast)
  // Typing: 80ms/char (natural)
  // Final: "Needs" turns cyan, cursor stays blinking
}
```

**Usage in page.tsx (line 598):**
```tsx
<PremiumHeroTitle contentDelay={0.8} swapDelay={1.5} />
```

### Load Sequence Timing (FINAL)
```
0-0.8s:   Logo + coordinates + navigation appear
0.8-1.4s: All hero content fades in together (eyebrow, headline with "Wants", subhead, CTA, ticker)
1.5s:     Start deleting "Wants" (50ms/char)
~1.7s:    Start typing "Needs" (80ms/char)
~2.1s:    "Needs" turns cyan, cursor stays blinking
```

---

## 2. Process Section Updates

### Philosophy Copy Change
**Location:** `/Users/oliver/Documents/internal/cl-website-jul25/src/components/Process/ProcessSection.tsx` line 139

**Before:**
```
Good, fast, cheap. Pick two. We optimise for good.
```

**After:**
```
Good, fast, cheap. You can only pick two. We optimise for good.
```

**Rationale:** Makes it clearer and more emphatic.

---

## 3. Development Priorities Addition

### User Request
Add development priorities (Security First, Code Ownership, etc.) to Process section in subtle grey architectural style.

### Design Solution
Added below Philosophy box in left column as technical specifications grid.

**Location:** ProcessSection.tsx lines 155-215

**Visual Design:**
- Architectural header line with "Development Priorities" label
- 2-column grid (8 priorities in 2×4 layout)
- Technical markers: dot + line before each item
- Subtle grey text (white/40) with hover states
- Staggered fade-in animation (50ms delay per item)
- Bottom annotation: "System Parameters / Non-Negotiable"

**Priorities List:**
1. Security First
2. Code Ownership
3. Transparent Pricing
4. GDPR Compliant
5. Full Transparency
6. No Vendor Lock-in
7. Documentation Included
8. Source Control

**Code Pattern:**
```tsx
{['Security First', 'Code Ownership', ...].map((priority, idx) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + idx * 0.05 }}
  >
    <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
    <span className="font-mono text-[10px] text-white/40">{priority}</span>
  </motion.div>
))}
```

---

## 4. Process Section Layout Restructure

### Problem Identified
- Left column: Header + Philosophy + Priorities = tall
- Right column: Wave animation = shorter
- **Result:** Unbalanced, empty space below wave

### Solution: Pull heading to full-width
Restructured to match Services section pattern.

**Before:**
```
Grid [35% | 65%]
├─ Left: Header + Philosophy + Priorities (tall)
└─ Right: Wave animation (short)
```

**After:**
```
Full-width: Header
Grid [35% | 65%]
├─ Left: Philosophy + Priorities
└─ Right: Wave animation (aligned)
```

### Implementation
**File:** ProcessSection.tsx lines 93-217

**Header (full-width):**
```tsx
<motion.div className="mb-16">
  <div className="flex items-center gap-4 mb-4">
    <div className="h-px w-12 bg-cyan-500/40" />
    <p className="font-mono text-[10px]">Process / Methodology</p>
  </div>
  <h2 className="text-4xl md:text-5xl lg:text-6xl">
    No surprises.
    <br />
    No black boxes.
  </h2>
</motion.div>
```

**Grid below header:**
- Left: Philosophy + Priorities (stacked)
- Right: Wave animation (now perfectly balanced)

### Timing Fix
Removed `delay: 0.3` from wave animation container to sync orb movement with section visibility.

**Before:** `transition={{ duration: 0.8, delay: 0.3 }}`
**After:** `transition={{ duration: 0.8 }}`

---

## 5. Wave Orb → Cold Lava Logo

### Evolution

**Version 1: Generic cyan orb**
- Two circles (outer glow + inner core)
- Pulsing animation
- Traveled along wave path

**Version 2: Logo with glow**
- Replaced circles with Cold Lava logo (24×24px)
- Added cyan glow backdrop with pulsing
- Logo opacity pulse animation

**Version 3: Clean logo only (CURRENT)**
- Removed glow circle
- Removed pulsing animations
- Just logo traveling smoothly with `rotate="auto"` for slope-based tilting

### Current Implementation
**File:** `/Users/oliver/Documents/internal/cl-website-jul25/src/components/Process/WaveOrb.tsx` lines 74-94

```tsx
<g transform="translate(-12, -12)">
  <image
    href="/Cold Lava Logo/Cold Lava - Icon.png"
    x="0"
    y="0"
    width="24"
    height="24"
    opacity="1"
  />
  <animateMotion
    dur="12s"
    repeatCount="indefinite"
    rotate="auto"  // Logo tilts based on wave slope
  >
    <mpath href="#wavePath" />
  </animateMotion>
</g>
```

**Behavior:**
- Logo travels along dotted wave path
- Automatically tilts based on slope (uphill = lean back, downhill = lean forward)
- Clean, professional, branded

---

## 6. Physics Animation Attempt (FAILED)

### User Request
Add realistic physics: logo should bounce/wobble like running character
- More bounce uphill (struggling)
- Less bounce downhill (easier)
- Head/neck wobble based on terrain

### Implementation Attempt
**File:** `/Users/oliver/Documents/internal/cl-website-jul25/src/components/Process/WaveOrbPhysics.tsx` (created but not used)

**Approach:**
1. Sample SVG path into 120 discrete points
2. Calculate slope at each point (derivative)
3. Use Framer Motion to apply layered transforms:
   - Rotation based on slope
   - Vertical bounce (intensity varies with slope)
   - Horizontal wobble
   - Squash/stretch

**Error:**
```
Error: Rendered more hooks than during the previous render.
src/components/Process/WaveOrbPhysics.tsx (200:27)
```

**Root Cause:**
Called `bounceOffset.get()` and `wobbleOffset.get()` during render (lines 200-201), violating React's rules of hooks.

**Resolution:**
Reverted to working `WaveOrb.tsx` component. Physics version needs restructuring to avoid `.get()` calls during render.

**Current Status:**
- `WaveOrb.tsx` = working version (in use)
- `WaveOrbPhysics.tsx` = broken version (not imported, preserved for future fix)

---

## Files Modified

### Created
1. `/src/components/TypewriterText.tsx` - Initial typewriter component
2. `/src/components/HeroTypewriter.tsx` - Full headline typewriter
3. `/src/components/PremiumHeroTitle.tsx` - **FINAL hero animation component**
4. `/src/components/Process/WaveOrbPhysics.tsx` - Physics version (broken, not in use)

### Modified
1. `/src/components/index.ts` - Exported PremiumHeroTitle
2. `/src/app/page.tsx` - Updated hero section with PremiumHeroTitle, adjusted timing
3. `/src/components/Process/ProcessSection.tsx` - Added Development Priorities, restructured layout
4. `/src/components/Process/WaveOrb.tsx` - Replaced orb with Cold Lava logo

---

## Key Technical Patterns

### Framer Motion
- Premium easing curve: `[0.22, 1, 0.36, 1]`
- Batched animations with shared delay for cohesion
- `AnimatePresence` with `mode="wait"` for smooth word swaps
- `useMotionValue`, `useTransform`, `useSpring` for complex animations

### SVG Animation
- `animateMotion` with `<mpath>` for path following
- `rotate="auto"` for automatic slope-based rotation
- Filter effects for glows

### React Patterns
- Conditional rendering based on animation phase state
- `useEffect` with `setTimeout` for sequenced animations
- State machines for typewriter phases: showing → deleting → typing → complete

---

## Design Principles Applied

### Load Sequence
- **3-beat structure** instead of scattered staggers
- Beat 1: Chrome/frame
- Beat 2: Content block
- Beat 3: Signature moment
- Inspired by Linear, Stripe, Apple product launches

### Typography Animation
- Fast enough to feel responsive (~2 seconds total)
- Slow enough to register the transformation
- One memorable moment (Wants→Needs swap)

### Visual Balance
- Full-width headers for commanding attention
- Two-column grids for balanced content
- Left column: text/principles (35%)
- Right column: visual/animation (65%)

### Architectural Aesthetic
- Technical labels: monospace, uppercase, letter-spacing
- Corner brackets, dimension markers
- Subtle grey text (white/30, white/40, white/50)
- Cyan accents (#06b6d4)
- Grid overlays, border separators

---

## User Preferences & Feedback

### Animation Philosophy
- "Smooth, not clunky"
- Premium feel, not startup-y
- Fast enough to be responsive, refined enough to register
- Natural physics preferred over mechanical movement
- Subtle > flashy

### Copy Style
- Human-sounding, not AI-generated
- Clear and emphatic ("You can only pick two")
- No hyphens or special characters when possible

### Design Approach
- Architectural/technical aesthetic
- Everything should feel intentional
- Visual balance is critical
- "It would be really cool if..." = worth exploring

---

## Pending/Future Improvements

1. **Fix WaveOrbPhysics.tsx**
   - Restructure to avoid `.get()` calls during render
   - Use proper Framer Motion patterns for composed transforms
   - Test thoroughly before swapping in

2. **Consider alternative physics approaches**
   - CSS animations layered on top of SVG path?
   - Web Animations API?
   - Simpler approximation with synced keyframes?

---

## Current State Summary

### What's Working
✅ Premium hero animation with Wants→Needs swap
✅ Smooth load sequence (3-beat structure)
✅ Process section with Development Priorities
✅ Balanced two-column layout
✅ Cold Lava logo traveling along wave with auto-rotation
✅ All timing synchronized properly

### What Needs Work
⚠️ Physics-based wobble/bounce (if still desired - current version already looks good)

### Git Status
All changes committed to `redesign` branch.

**Total Session Changes:**
- 3 new components created
- 4 components modified
- 1 failed experiment (preserved for learning)
- ~200 lines of code added/modified

---

## Commands Reference

### Swap to physics version (when fixed):
```tsx
// In ProcessSection.tsx line 5:
import { WaveOrbPhysics } from './WaveOrbPhysics'

// Line 255:
<WaveOrbPhysics isAnimating={isAnimating} />
```

### Revert to simple version:
```tsx
// In ProcessSection.tsx line 5:
import { WaveOrb } from './WaveOrb'

// Line 255:
<WaveOrb isAnimating={isAnimating} />
```

---

**Session End Status:** All working, no errors, ready for review/deployment.
