# Scroll & Entry Animations — Design

**Date:** 2026-04-14
**Scope:** Homepage (`src/app/page.tsx` and its sections)
**Goal:** Bring the finished homepage to life with editorial-grade page-load choreography, scroll-triggered staggered reveals, and momentum scroll. Target feel: restrained, confident, luxurious — Hermès / Aesop / Loro Piana, not Awwwards theatrics.


## Principles

- **Editorial restraint.** Slow eases, subtle distances, unhurried timing. Motion should feel expensive, not loud.
- **Play once.** After first reveal, elements stay visible. No re-animation on re-scroll.
- **Tokens, not magic numbers.** One central `motion.ts` defines every ease, duration, distance, stagger, and viewport threshold. Tuning the feel = editing one file.
- **Opt-in primitives.** Animation lives in wrapper components. Sections stay dumb and composable. Removing animation = removing wrappers, zero logic changes.
- **Accessibility first.** `prefers-reduced-motion` bypasses all transforms and smooth scroll. Non-negotiable.


## Stack

- **`lenis`** — momentum / smooth scroll. ~3kb. Industry standard for editorial sites.
- **`motion`** — declarative animation (successor to Framer Motion). React 19 compatible. `whileInView` handles scroll triggers.
- No GSAP, no CSS libraries, no additional runtime deps.


## Motion Tokens (`src/lib/motion.ts`)

```ts
export const ease = [0.16, 1, 0.3, 1] as const;   // slow-out editorial curve

export const duration = {
  nav: 0.7,
  text: 0.9,
  card: 1.1,
} as const;

export const distance = {
  text: 24,   // px
  card: 40,   // px
} as const;

export const stagger = {
  text: 0.1,   // 100ms between text siblings
  card: 0.12,  // 120ms between cards in a grid
} as const;

export const viewport = {
  desktop: 0.15,  // fire when 15% of element is visible
  mobile: 0.08,   // lower threshold for taller mobile viewports
  breakpointPx: 768,
  once: true,
} as const;
```

Plus a `useRevealAmount()` hook that returns the correct threshold based on a `matchMedia` query, and a `useReducedMotion()` re-export / wrapper used by every primitive.


## Components

### `src/components/motion/SmoothScroll.tsx` (client)
- Mounts Lenis on body.
- Runs a single `requestAnimationFrame` loop.
- Cleans up on unmount.
- Short-circuits when `prefers-reduced-motion: reduce` — native scroll only.
- Mounted once in `src/app/layout.tsx` wrapping `{children}`.

### `src/components/motion/Reveal.tsx` (client)
Single-element viewport reveal.

Props:
- `as?: keyof JSX.IntrinsicElements` — defaults to `"div"`.
- `delay?: number` — seconds.
- `y?: number` — override distance (defaults to `distance.text`).
- `duration?: number` — override duration (defaults to `duration.text`).
- `className?: string`.
- `children`.

Behavior: fades `opacity 0 → 1`, translates `y → 0`, ease from tokens, plays once at responsive viewport threshold. Under reduced motion, renders children with no transform or transition.

### `src/components/motion/RevealStagger.tsx` (client)
Parent container that orchestrates stagger for direct `<Reveal>` / `<RevealItem>` children.

Props:
- `as?`, `className?`, `children`.
- `gap?: number` — override stagger (defaults to `stagger.text`).
- `delay?: number` — parent delay before stagger starts.
- `amount?: number` — override viewport threshold.

Implementation: uses Motion variants with `staggerChildren` on the parent, `hidden` / `visible` on children.

### `src/components/motion/RevealItem.tsx` (client)
Lightweight child used inside `<RevealStagger>` when a full `<Reveal>` is overkill. Consumes parent variants.

### `src/components/motion/HeroIntro.tsx` (client)
Orchestrates the Hero's page-load timeline. Not scroll-triggered — runs on mount. Exposes named slot components (`HeroIntro.Eyebrow`, `HeroIntro.Headline`, etc.) or a simple index-based `<HeroIntro.Item delay={...}>` child API.


## Choreography

### Page load (0–1400ms, fires once on mount)

| Time   | Element            | Motion                                  |
|--------|--------------------|-----------------------------------------|
| 0ms    | Nav                | slide from `y:-100%` → `0`, 700ms       |
| 200ms  | Hero eyebrow       | fade + rise 24px, 900ms                 |
| 320ms  | Hero headline      | fade + rise 24px, 900ms                 |
| 500ms  | Hero subcopy       | fade + rise 24px, 900ms                 |
| 650ms  | Hero CTA row       | fade + rise 24px, 900ms                 |
| 800ms  | Hero right card    | fade + rise 40px, 1100ms (whole unit)   |

### Scroll-triggered (every section below the fold)

- Section wraps its content in `<RevealStagger>`.
- Text children (headings, paragraphs, list items) use `<RevealItem>` — fade + rise 24px, 900ms, 100ms stagger.
- Cards use `<Reveal y={40} duration={1.1}>` — enter as whole units, no internal stagger.
- Card grids stagger cards 120ms apart via a grid-level `<RevealStagger gap={0.12}>`.
- All scroll reveals: `viewport={{ once: true, amount: useRevealAmount() }}`.

### Hero parallax (one subtle cinematic touch)

- Hero background image translates Y at ~8% of scroll progress, read from Lenis.
- Capped so the image never exposes its edges.
- Disabled under reduced motion.


## File Changes

**New:**
- `src/lib/motion.ts`
- `src/components/motion/SmoothScroll.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/motion/RevealStagger.tsx`
- `src/components/motion/RevealItem.tsx`
- `src/components/motion/HeroIntro.tsx`

**Modified:**
- `src/app/layout.tsx` — wrap `{children}` in `<SmoothScroll>`.
- `src/components/sections/Nav.tsx` — slide-down on mount.
- `src/components/sections/Hero.tsx` — wrap parts in `HeroIntro` timeline + parallax on bg image.
- `src/components/sections/About.tsx` — wrap in `<RevealStagger>` with `<RevealItem>` text + `<Reveal>` visuals.
- `src/components/sections/Properties.tsx` — heading stagger + card grid stagger.
- `src/components/sections/WhyWorkWithUs.tsx` — text stagger + card grid stagger.
- `src/components/sections/Services.tsx` — text stagger + card grid stagger.
- `src/components/sections/Events.tsx` — text stagger + card reveals.
- `src/components/sections/GetToKnow.tsx` — text stagger + visual reveal.
- `src/components/sections/CallBanner.tsx` — text stagger + CTA reveal.
- `src/components/sections/Footer.tsx` — light fade-in only (no stagger — utility section).

**Dependencies to add:**
- `lenis`
- `motion`


## Accessibility

- `prefers-reduced-motion: reduce` → Lenis disabled, all Motion variants short-circuit to `{opacity: 1, y: 0}` with no transition. Elements are simply present.
- No animations block interaction. Nav is clickable from `t=0` even while sliding.
- No content is hidden by default at the CSS level — if JS fails, page renders normally.


## Testing / Validation

- Run `npm run dev`, scroll through the homepage at normal speed — every section should reveal once, unhurried, with no jank.
- Scroll back to top, scroll down again — nothing replays.
- Enable OS-level "reduce motion" — page loads fully static, scroll is native, no transforms.
- Test on mobile viewport (~375×812) — triggers fire earlier (8% threshold), no empty-pixel lag.
- Lighthouse: no CLS regression. Target: CLS < 0.05.
- Verify no hydration mismatch warnings.


## Out of Scope

- Page transitions between routes (homepage only).
- Cursor effects, magnetic buttons, text-split animations.
- Pinned/scrubbed sections (no GSAP ScrollTrigger scrubs).
- Animation on Footer beyond a simple fade.
