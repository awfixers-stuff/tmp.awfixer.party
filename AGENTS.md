# AGENTS.md

## Runtime

- **Bun only** (v1.3.11) — all scripts use `bun run`, never `npm`/`yarn`/`pnpm`
- Scripts use native Bun modules: `import fs from "fs"` and `import path from "path"` — NOT `node:` prefixed imports

## Commands

| Command | Description |
|--------|-------------|
| `bun run dev` | Start dev server with Turbopack |
| `bun run generate-toc` | Generate TOC files from MDX content |
| `bun run generate-navigation` | Generate nav JSON files in `lib/nav/` |
| `bun run generate-notes` | Generate notes index and meta |
| `bun run build` | Runs all generators then `next build` |

Run generators in order: `generate-navigation` → `generate-toc` → `generate-events` → `generate-bylaws` → `generate-notes` → `next build`

## Project Structure

Each page lives in its own directory under `app/` (e.g., `app/plans/prime-ministership/reasoning/`):

```
page-dir/
├── layout.tsx       # Optional layout wrapper
├── page.tsx         # Page component + metadata export
├── content.mdx     # MDX content with ## and ### headings
├── toc.tsx          # Auto-generated: TOC switcher component
└── toc-content.ts  # Auto-generated: TOC data array
```

### Adding a new page

1. Create directory under appropriate section (`app/plans/`, `app/notes/`, `app/events/`, etc.)
2. Add `content.mdx` with headings using `##` (level 2) and `###` (level 3)
3. Run `bun run generate-toc` to generate `toc.tsx` and `toc-content.ts`
4. Create `page.tsx` — imports `Content` from `./content.mdx` and `TableOfContents` from `./toc`

### Page template (page.tsx)

```tsx
import type { Metadata } from "next"
import { Separator } from "@/components/ui/separator"
import Content from "./content.mdx"
import { TableOfContents } from "./toc"

export const metadata: Metadata = {
  title: "Title | Section",
  description: "Description.",
}

export default function PageName() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Page Title
          </h1>
        </header>
        <Separator className="bg-border/60" />
        <div className="prose max-w-none ...">
          <Content />
        </div>
      </main>
      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}
```

## Navigation

Generated to `lib/nav/` by `generate-navigation`:
- `policy.json`, `plans.json`, `ideas.json`, `notes.json`, `events.json`, `governance.json`
- `index.ts` re-exports all as `navigationData`

## TypeScript

- `tsconfig.json`: moduleResolution: `bundler`, strict mode
- Use `@/` path alias for imports
- Run `bun run typecheck` before committing