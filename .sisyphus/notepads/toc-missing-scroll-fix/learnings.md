
## Task 3: Add id attributes to philosophy headings

- Added 3 missing `id` attributes to headings in `app/philosophy/philosophy-content-new.tsx`:
  1. `america-does-not-have-a-people-problem-it-has-a-structure-problem` (h2, line ~9)
  2. `the-pattern-is-always-the-same` (h3, line ~99)
  3. `on-bipartisanship` (h3, line ~308)
- IDs computed via `github-slugger` — verified exact match
- `bun run typecheck` passes cleanly
- Part of plan `toc-missing-scroll-fix`, Task 3
