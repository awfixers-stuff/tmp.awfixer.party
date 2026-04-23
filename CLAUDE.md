# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Package manager is Bun (v1.3.11) — never use npm or yarn.**

```bash
bun run dev          # Start dev server (Turbopack)
bun run build        # generate-events then next build (uses Webpack, not Turbopack)
bun run lint         # ESLint
bun run format       # Prettier (writes in place)
bun run typecheck    # tsc --noEmit
bun run generate-events  # Regenerate app/events/events.ts from MDX files
```

## Architecture

Next.js 16 App Router. Dark mode is **forced** — `html` gets `class="dark"` in `app/layout.tsx` and the site ships dark-only.

**Shell**: `SiteChrome` (`components/site-chrome.tsx`) wraps all children in the floating nav + footer. `FloatingSiteNav` imports `*-meta.ts` files to populate its dropdowns — update those files when adding new sections.

**Background**: A fixed radial gradient layer sits in the layout behind `SiteChrome` (`z-[1]`). The home page hero additionally has the flag gif as an absolutely-positioned background inside `<section>` (not fixed), so it scrolls away naturally.

## Content Sections

Each content section follows a consistent pattern: a `page.tsx`, a `*-content.tsx` (wraps the MDX import), a `*.mdx` (the actual prose), and a `toc.tsx`.

| Section | Route pattern | Meta file |
|---|---|---|
| Policy | `/policy/[topic]` | nav items hardcoded in `floating-site-nav.tsx` |
| Plans | `/plans/[slug]` | `app/plans/plans-meta.ts` |
| Ideas | `/ideas/[slug]` | `app/ideas/ideas-meta.ts` |
| Notes | `/notes/[slug]` | `app/notes/notes-meta.ts` |
| Events | `/events/[slug]` | `app/events/events-meta.ts` + generated `events.ts` |

## Adding New Content

**New policy page**: Create `app/policy/[topic]/` with `page.tsx`, `[topic]-content.tsx`, `[topic].mdx`, `toc.tsx`. Add an entry to `policyItems` in `components/floating-site-nav.tsx`.

**New plan/idea/note**: Mirror an existing sibling directory. Add an entry to the corresponding `*-meta.ts` file.

**New event**: Add an MDX file to `app/events/events/`. Run `bun run generate-events` to regenerate `app/events/events.ts`. Add to `app/events/events-meta.ts` for nav dropdown visibility.

## Event MDX Format

Events use a `<EventMeta>` tag inside the MDX that the generate script extracts via regex:

```mdx
<EventMeta>
  date: "2025-06-01"
  time: "7:00 PM EST"
  type: "virtual"
</EventMeta>
```

Valid `type` values: `"virtual"`, `"in-person"`, `"hybrid"`.

## MDX Components

Available globally in all `.mdx` files (defined in `app/mdx-components.tsx`):

`Callout` (variants: `default`, `pillar`, `warning`, `insight`), `StatCard`, `Quote`, `PillarCard`, `Commitment`, `Fact`, `Insight`, `AnimatedSection`, `EventMeta`

## Styling Conventions

- **Brand color**: `purple-600` throughout — headings, borders, accents
- **Tailwind v4**: uses `@import "tailwindcss"` syntax, not `@tailwind base/components/utilities`
- **Custom animations** in `app/globals.css`: `animate-fade-up` (with delay variants `1`–`8`), `animate-on-scroll` (add `is-visible` via JS), `animate-flag-fade-in`
- **Glass panel**: `.glass-panel` utility class for frosted card surfaces
- Path alias `@/` maps to the repo root
