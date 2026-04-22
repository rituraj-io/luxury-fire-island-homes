# Luxury Fire Island Homes — Homepage Design System

A reference for the visual language currently in use on the homepage. Keep this in sync with `src/app/globals.css`, `src/lib/motion.ts`, and the section components under `src/components/sections/`.


## 1. Design ethos

A coastal-editorial aesthetic: sun-bleached yellow, deep ocean blues, and sunset orange; sharp-cornered flat cards contrasted with playful tilted photos and hand-lettered script. Layouts are centered and generous, with an emphasis on calm whitespace, deliberate motion, and imagery that "breathes" via subtle parallax and float.


## 2. Color palette

Tokens are declared in `src/app/globals.css` via Tailwind v4's `@theme` block. Use the Tailwind utility (`bg-brand-yellow`, `text-brand-blue`, etc.) — avoid raw hex in JSX.

| Token                          | Hex       | Tailwind utility           | Primary use                                         |
| ------------------------------ | --------- | -------------------------- | --------------------------------------------------- |
| `--color-brand-yellow`         | `#efe29d` | `brand-yellow`             | Nav band, footer, Properties band, badges           |
| `--color-brand-blue`           | `#185b89` | `brand-blue`               | Primary text, h2 headings, link color               |
| `--color-brand-blue-dark`      | `#003f6f` | `brand-blue-dark`          | Hover state, CTA text on light backgrounds          |
| `--color-brand-orange`         | `#d67229` | `brand-orange`             | Primary CTA background, Events section band        |
| `--color-brand-orange-light`   | `#e58454` | `brand-orange-light`       | Secondary CTA (hero "Call Us" button)              |

Supporting (ad-hoc) values — used inline where they're single-purpose:

| Hex       | Where it appears                                      |
| --------- | ----------------------------------------------------- |
| `#f8f4ec` | Cream / parchment — alternating section backgrounds (About, WhyWorkWithUs, GetToKnow, Services card body) |
| `#dbe2ec` | Muted blue-gray — Services section band, inactive tab fill color |
| `#1a5c89` | Near-twin of brand-blue — used in inline `<p>` links, a few specific labels |
| `#25648D` | Near-twin of brand-blue — hero card button borders and arrow icon |
| `#ffffff` | Cards, photo borders, CTA text on dark bands          |

**Section band colors (top → bottom of page):**

1. Nav — yellow (`#efe29d`)
2. Hero — full-bleed beach photo
3. About — cream (`#f8f4ec`)
4. Properties — yellow (`#efe29d`)
5. Why Work With Us — cream (`#f8f4ec`)
6. Services — muted blue-gray (`#dbe2ec`)
7. Events — orange (`#d67229`)
8. Get To Know — cream (`#f8f4ec`)
9. Call Banner — full-bleed docks photo
10. Footer — yellow (`#efe29d`)


## 3. Typography

Four faces are loaded via `next/font` in `src/app/layout.tsx` and exposed as CSS vars / Tailwind utilities.

| Font family          | Source | CSS var            | Tailwind utility | Role                                                      |
| -------------------- | ------ | ------------------ | ---------------- | --------------------------------------------------------- |
| Gopher               | local  | `--font-gopher`    | `font-sans`      | Default body face; all nav, CTAs, h2–h3, small labels    |
| RedondoAve           | local  | `--font-redondo`   | `font-script`    | Hand-lettered accent for flourish phrases                 |
| Sofia Sans Condensed | local  | `--font-sofia`     | `font-display`   | Large outlined display headings (h1, Services tabs)       |
| Inter                | Google | `--font-inter`     | `font-body`      | Long-form paragraph copy                                  |

Body default: `font-sans` (Gopher) at `color: brand-blue`.

### 3.1 Heading scale

| Level / role                                   | Font        | Size                                         | Weight | Tracking         | Transform    | Notes                                          |
| ---------------------------------------------- | ----------- | -------------------------------------------- | ------ | ---------------- | ------------ | ---------------------------------------------- |
| **h1** — Hero headline                         | `display`   | `text-5xl` → `sm:text-6xl` → `md:text-7xl` (48 → 60 → 72 px) | 400    | `tracking-[0.06em]` | UPPERCASE    | Outlined via `-webkit-text-stroke: 2px white`, `color: transparent`. Line-height `1.05`. |
| Hero eyebrow ("Welcome to")                    | `script`    | `text-5xl md:text-6xl` (48 → 60 px)          | 400    | natural          | natural      | White with drop-shadow                         |
| **h2** — Section heading                       | `sans`      | `text-xl md:text-2xl` (20 → 24 px)           | 500    | `tracking-wider` | UPPERCASE    | Color: `brand-blue`                            |
| Script accent inline in h2 ("Fire Island", "Us?", "Help You", "Don't Worry", "Upcoming") | `script` | `text-[52px]` (Get To Know mobile: `text-[44px]` → md: `text-[56px]`) | 400 | `tracking-normal` | natural case | Leading `none`; inline-block                   |
| **h3** — Sub heading / footer column           | `sans`      | `text-xl md:text-2xl` (About CTA row: `text-xl md:text-2xl`; footer: `text-[22px]` script) | 500 | `tracking-wider` | UPPERCASE    | Footer headings use `script` instead of sans  |
| Services tab label (desktop outline)           | `display`   | `text-[40px] md:text-[48px]`                 | 400    | `tracking-[0.06em]` | UPPERCASE    | `-webkit-text-stroke: 3px brand-blue`, fill toggles between `brand-yellow` (active) and `#dbe2ec` (inactive) |
| Call-banner script                             | `script`    | `text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px]` | 400 | natural    | natural case | Tilted `-rotate-3`, color `brand-yellow`       |
| Call-banner phone number                       | `sans`      | `text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px]` | 400 | `tracking-[0.08em]` | natural   | Color `brand-yellow`                           |

### 3.2 Body & small text

| Role                                    | Font     | Size          | Weight | Notes                                             |
| --------------------------------------- | -------- | ------------- | ------ | ------------------------------------------------- |
| Long-form paragraph                     | `body`   | `text-[16px]` | 400    | `leading-relaxed`; `space-y-5` between paragraphs |
| GetToKnow italic pull-quote             | `body`   | `text-[17px] md:text-[19px]` | 600 (semibold, italic) | Color `#1a5c89`                   |
| Property card title                     | `sans`   | `text-[15px]` | 500    | Color black                                       |
| Property card location                  | `sans`   | `text-[14px]` | 400    | Color `black/70`                                  |
| Property stat value                     | `sans`   | `text-lg`     | 500    | Centered                                          |
| Property stat label                     | `sans`   | `text-[11px]` | 400    | `tracking-wider`, color `black/60`                |
| Event card title                        | `sans`   | `text-[16px]` | 500    | Color `brand-blue`                                |
| Event date badge — month                | `sans`   | `text-[11px]` | 500    | `tracking-wider`, color `brand-blue`              |
| Event date badge — day                  | `sans`   | `text-xl`     | 500    | Color `brand-blue`                                |
| Nav links                               | `sans`   | `text-sm`     | 500    | `tracking-widest`, UPPERCASE, color `brand-blue`  |
| Footer link                             | `sans`   | `text-[16px]` | 500    | `tracking-[0.08em]`, UPPERCASE                    |
| Footer address line                     | `sans`   | `text-[14px]` | 400    | Color `brand-blue`                                |
| Footer script heading                   | `script` | `text-[22px]` | 400    | natural case                                      |
| CTA button label                        | `sans`   | `text-[16px]` | 500    | `tracking-wider`, UPPERCASE (mostly)              |

### 3.3 Inline links in paragraphs

Styled globally in `globals.css`:

- Color `#1a5c89`, italic, semibold, no underline
- Underline on hover


## 4. Layout

### 4.1 Container & breakpoints

- Site container: `max-w-site` (1200px), defined as `--container-site`.
- Wider content zones use custom max widths (`max-w-[1280px]` for WhyWorkWithUs collage, `max-w-[1000px]` for Hero content, `max-w-[900px]` for pull quotes).
- Horizontal padding: `px-4 md:px-8` (footer uses `px-6 md:px-10`).

Breakpoints (Tailwind defaults plus one custom):

| Name             | Min width  | Primary use                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| `sm`             | 640px      | Two-column CTA grids                                  |
| `md`             | 768px      | Typography bumps, Properties 2-up carousel            |
| `lg`             | 1024px     | Nav desktop layout, footer 5-column grid              |
| `min-[992px]`    | 992px      | Custom desktop breakpoint for About, WhyWorkWithUs, Services, carousel 3-up |

### 4.2 Section vertical rhythm

- Standard: `py-16 md:py-20` (or `md:py-24` for content-heavy About).
- Services is tighter: `py-10 md:py-14`.
- Nav height: `h-32` (128 px) plus a 16 px blue pattern strip ⇒ content should clear 144 px from the top.
- Hero reserves notch space via `pt-[calc(144px+env(safe-area-inset-top))]`; the whole site respects `env(safe-area-inset-top)` via the Nav wrapper.


## 5. Corner radius & borders

The design is overwhelmingly **flat and sharp-cornered**. Rounded corners are reserved for intentional soft accents.

| Element                                | Radius                                |
| -------------------------------------- | ------------------------------------- |
| Hero "How can we help you?" card       | `rounded-[0.5rem]` (8 px)            |
| Circular logo seal badges              | `rounded-full`                        |
| Photo cards (tilted)                   | `border-4 border-white`, no radius    |
| Property & event carousel cards        | Flat white cards, no radius           |
| All CTA buttons                        | Flat, no radius                       |
| Hero card inner buttons                | `border-2 border-[#25648D]`, no radius|
| Nav pattern strip, Footer pattern strip| Flat, no radius                       |

Divider pattern inside property cards: `divide-x divide-black/10 border-t border-black/10`.


## 6. Shadows & elevation

| Where                                   | Shadow             |
| --------------------------------------- | ------------------ |
| Tilted photo cards (About, Why Work With Us) | `shadow-xl`  |
| Hero help card                          | `shadow-xl`        |
| Hero headline text                      | `drop-shadow-lg`   |
| Circular logo seal badges               | `shadow-lg`        |
| Property carousel cards                 | `shadow-sm`        |
| Event date badge on photo               | `shadow`           |
| Call banner text                        | `[text-shadow:0_2px_8px_rgba(0,0,0,0.5)]` |


## 7. Buttons & CTAs

All buttons are sharp-cornered and use `transition hover:brightness-95` (or `brightness-110` on dark fills).

| Variant                         | Classes                                                                                                        | Used in                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Primary orange                  | `bg-brand-orange px-6 py-3 font-medium tracking-widest text-white`                                             | Nav "CONTACT"                        |
| Primary orange (wider)          | `bg-[#d67229] px-8 py-3 font-sans text-[16px] font-medium tracking-wider text-white`                           | WhyWorkWithUs, Footer "Submit"       |
| About CTA tile                  | `bg-[#d67229] px-5 py-5 text-center font-sans text-[16px] font-medium leading-snug text-white min-h-[110px]`   | About — 4-up tile grid               |
| Dark blue                       | `bg-brand-blue px-5 py-3 font-sans text-[16px] font-medium tracking-wider text-white`                          | Services "BROWSE OUR LISTINGS"       |
| Yellow (on orange band)         | `bg-brand-yellow px-5 py-3 font-sans text-[16px] font-medium tracking-wider text-[#1a5c89]`                    | Events "SEE ALL EVENTS"              |
| Hero card outlined blue         | `border-2 border-[#25648D] px-5 py-3 font-medium text-brand-blue-dark`                                         | Hero — "I'm Buying/Selling/Renting"  |
| Hero card outlined orange-light | `border-2 border-[#25648D] bg-brand-orange-light px-5 py-3 font-medium text-brand-blue-dark`                   | Hero — "Call Us …"                   |

Label convention: `font-medium`, UPPERCASE, `tracking-wider` (or `tracking-widest` for nav). Sentence-case is used only inside the hero help card and on the "Call Us" button.


## 8. Imagery conventions

- **Source**: all images live in `public/assets/images/`. Render with `next/image`.
- **Format**: WebP for raster photography; SVG for icons, patterns, and the logo/seal.
- **Photo collage treatment**: `border-4 border-white` + `shadow-xl` + small rotation (`-rotate-[3deg]` to `rotate-[8deg]`). Paired with a yellow circular seal overlay (`bg-brand-yellow`, `rounded-full`, slight counter-rotation).
- **Carousel card photo**: `aspect-[4/3]`, `object-cover`, fallback `bg-neutral-200`.
- **Hero background**: `fill` + `object-cover`, `priority`, sized at `100vw`. Parallaxes via a wrapping motion div.
- **Blue SVG pattern strip**: `bg-image: url('/assets/images/pattern-blue.svg'); repeat-x; size: auto 125%`. Appears below the Nav and above the Footer (both 16 px tall).


## 9. Icons

- Stored as SVGs in `public/assets/images/`.
- Tinted via CSS mask (`mask-image` + `WebkitMaskImage`) so the fill color matches surrounding text. Used for: arrow-right in hero card, plus icon on Services tabs, and carousel angle chevrons (rendered directly, not masked).


## 10. Motion

Tokens live in `src/lib/motion.ts`. Two Tailwind-independent vocabularies:

### 10.1 Easing & timing

- **Ease**: `EASE = [0.16, 1, 0.3, 1]` — slow-out editorial curve, no overshoot.
- **Duration (s)**: `nav: 0.7`, `text: 0.9`, `card: 1.1`.
- **Distance (px)**: `text: 24`, `card: 40` — vertical rise on reveal.
- **Stagger (s)**: `text: 0.1`, `card: 0.12` — children in a stagger group.

### 10.2 Reveal system

`Reveal`, `RevealStagger`, `RevealItem` components (in `src/components/motion/`) wrap content for scroll-triggered fade + rise-up. Threshold tuned by viewport:

- `VIEWPORT.desktop: 0.15` / `VIEWPORT.mobile: 0.08`
- `VIEWPORT.once: true` — each element reveals once.

### 10.3 Parallax

Applied to Hero background and Call Banner photo. Gated by `useFinePointer` (disabled on touch) and `useReducedMotion`. Background wrapper is pre-scaled (1.14–1.18×) so translation never exposes edges.

### 10.4 Bob (float)

Decorative tilted photos drift vertically by 3–4 px over 2.6–3.4 s with staggered delays, giving collages a gentle "breathing" feel. See `Bob.tsx`.

### 10.5 Hero intro cascade

Eyebrow → headline → subcopy → CTA → card, each delayed along a shared timeline defined in `HeroIntro.tsx`.

### 10.6 Smooth scroll

Wraps the app via `SmoothScroll.tsx` in `layout.tsx`.


## 11. Carousels (Properties, Events)

- Show 3 cards on `min-[992px]`, 2 on `md` (768+), 1 below.
- Layout is JS-computed: card width = `(viewport - (visible - 1) * 20) / visible`, fixed 20 px gap.
- Seamless wrap: the data is duplicated, index advances linearly, and on transition end the strip snaps back by `total` with `animate: false`.
- Arrow buttons sit in horizontal padding outside the viewport (`px-12 md:px-16`).


## 12. Footer layout

- Yellow band with top blue-pattern strip.
- `lg`+ grid: `[1fr_1fr_auto_1fr_1fr]` — two link columns, centered oval badge, socials column, subscribe form column.
- Below `lg`: 2-column then 1-column collapse; badge becomes full-width centered.
- Address lines sit under each link group as small sans text.


## 13. Accessibility & semantics

- Respect `prefers-reduced-motion`: parallax, bob, and reveal animations disable or run neutrally.
- `aria-label` on icon-only buttons (carousel arrows, mobile menu toggle).
- `aria-expanded` on Services accordion and mobile nav.
- Decorative images use `aria-hidden` or empty `alt`; meaningful images use descriptive alt text.
- `env(safe-area-inset-top)` is applied on the fixed Nav and Hero so iOS standalone/PWA modes respect the notch.


## 14. Conventions recap (code side)

- Tailwind v4 only. No inline `style` except for CSS mask, text-stroke, and runtime transforms. All tokens via `@theme` in `globals.css`.
- One section = one file in `src/components/sections/`; `page.tsx` composes only.
- Server components by default. `"use client"` only where interactivity is needed (Nav, Hero, Properties, Events, Services, CallBanner).
- Two blank lines between top-level blocks (imports, types, data, component, subcomponents).
- Short header comment at top of each section file; no narration of what JSX does.
- `@/` alias for imports from `src/`.
