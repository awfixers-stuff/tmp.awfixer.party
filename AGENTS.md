# AGENTS.md

High-signal context for OpenCode sessions in this Next.js 16 / MDX repo.

## Primary Docs

- **CLAUDE.md** has comprehensive guidance on architecture, component patterns, and content management.
- **GEMINI.md** has project overview and dependencies.

## Commands

```bash
bun run dev          # Dev server (Turbopack)
bun run build        # Runs generate-events + Next.js build
bun run generate-events  # Regenerate app/events/events.ts
bun run lint         # ESLint
bun run typecheck    # tsc --noEmit
bun run format      # Prettier (writes in place)
```

**Order matters:** `lint → typecheck → build` before submitting.

## Critical

- **Bun only** — never npm/yarn
- **Events are auto-generated** — don't edit `app/events/events.ts` directly. Add MDX to `app/events/events/`, run `bun run generate-events`
- **Dark mode is forced** — no light mode
- **Tailwind v4** — uses `@import "tailwindcss"` (not `@tailwind` directives)
