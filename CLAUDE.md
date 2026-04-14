@AGENTS.md


# Homepage conventions

- **Styling**: Tailwind v4 only. No inline `style`, no CSS modules, no extra CSS libraries. Design tokens live in `src/app/globals.css` via `@theme`.
- **Structure**: One section = one component file in `src/components/sections/`. `src/app/page.tsx` only composes sections.
- **DRY**: Extract repeated UI into `src/components/ui/`. Extract repeated data into `src/lib/` (or colocate a `.data.ts` next to the section if it's section-specific).
- **Formatting**: Separate top-level blocks inside a file (imports, types, data, component, subcomponents) with **two blank lines**.
- **Comments**: Add a short header comment at the top of each section file describing what it is. Inside code, comment only non-obvious *why*. No narration of what the JSX does.
- **Naming**: Section components are `PascalCase` named after the section (e.g. `Hero`, `Features`, `Testimonials`). File name matches component name.
- **Imports**: Use the `@/` alias (already configured) for anything under `src/`.
- **Assets**: Put images in `public/`. Use `next/image`.
- **Client vs Server**: Default to Server Components. Add `"use client"` only when a section needs interactivity (state, effects, event handlers).

# Workflow

- User provides screenshots section by section. For each screenshot:
  1. Create/replace the matching file under `src/components/sections/`.
  2. Import and mount it in `src/app/page.tsx` in visual order.
  3. Keep output Tailwind-only and responsive.
