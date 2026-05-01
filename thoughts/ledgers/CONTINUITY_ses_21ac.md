---
session: ses_21ac
updated: 2026-05-01T21:36:24.094Z
---

# Session Summary

## Goal
Execute the `fix-website` plan: fix 30+ broken TOC entries, wire up 15+ missing TOC sidebars, perfect the bylaws section with nav dropdown, and create a policy proposal template — all via generic build-time generators.

## Constraints & Preferences
- ALL fixes must be GENERIC generator changes, not manual content-specific edits
- Philosophy content source: JSX (`philosophy-content-new.tsx`) is canonical
- Bylaws placement: New top-level "Bylaws" dropdown in SiteNav
- `<BylawMeta>` must be added to all 4 bylaw MDX files
- `github-slugger` must be explicit dependency (not transitive)
- Preserve trailing asterisk strip in `generate-toc.ts`
- Do NOT change heading text in content files
- Do NOT change `toc-content.ts`/`toc.tsx` interface contracts

## Progress
### Done
- [x] Wave 1 Tasks 1-8 completed in parallel:
  - Task 1: `github-slugger` added as explicit dependency (`bun add github-slugger`)
  - Task 2: `scripts/generate-toc.ts` fixed — uses `GithubSlugger` for ID generation + added `.tsx` content file support
  - Task 3: 3 missing `id` attributes added to `app/philosophy/philosophy-content-new.tsx`
  - Task 4: `app/bylaws/types.ts` deleted (dead code)
  - Task 5: `findActiveId` in `app/bylaws/[slug]/page.tsx` made recursive
  - Task 6: DesktopTOC click handler fixed (added error logging + `block: "start"`)
  - Task 7: MobileTOC click handler fixed (same fix)
  - Task 8: `<BylawMeta>` added to all 4 bylaw MDX files (governance, membership, voting, voting/proxy)
- [x] Plan file read and todos registered for all 29 tasks

### In Progress
- [ ] Marking Wave 1 checkboxes in plan file (completion gate)
- [ ] Wave 2: Regenerate all TOC files, bylaws, and navigation
- [ ] Wave 3: Wire TOC sidebars on 7 pages (events, notes, governance, ideas, bylaws)
- [ ] Wave 4: Add Bylaws dropdown to SiteNav, create `lib/nav/bylaws.json`, update `generate-navigation.ts`, harmonize breakpoints
- [ ] Wave 5: Create policy proposal generator + directory structure + nav
- [ ] Wave 6: TypeScript check, build check, QA verification

### Blocked
- (none)

## Key Decisions
- **Parallel Wave 1 execution**: All 8 Wave 1 tasks are independent and were dispatched simultaneously to maximize throughput
- **`github-slugger` for ID parity**: Using the same library as `rehype-slug` guarantees 100% ID match, fixing the em-dash double-hyphen root cause
- **`.tsx` support in generate-toc.ts**: Generic parser for heading extraction from JSX content files, not a one-off for philosophy page
- **Recursive `findActiveId`**: Supports unlimited nav tree depth for future bylaws expansion

## Next Steps
1. Mark Wave 1 checkboxes (Tasks 1-8) as `[x]` in `.sisyphus/plans/fix-website.md`
2. Run Wave 2: `bun run generate-toc` → `bun run generate-bylaws` → `bun run generate-navigation` to regenerate all auto-generated files
3. Verify regenerated TOC files have correct IDs (check em-dash cases like `criminal-justice--accountability`)
4. Begin Wave 3: Wire TOC sidebars on pages missing them (events/[slug], notes/[slug], governance/members, governance/members/awfixer, ideas/gladiator, ideas/world-fairs, bylaws/[slug])
5. Wave 4: Create `lib/nav/bylaws.json`, update `generate-navigation.ts`, add Bylaws dropdown to `components/nav/nav.tsx`, harmonize breakpoints (768px vs 1024px)
6. Wave 5: Create `scripts/generate-proposals.ts`, `app/proposals/` directory structure, proposal nav components
7. Wave 6: `bun run typecheck`, `bun run build`, Playwright QA for TOC clicks

## Critical Context
- **Root cause of TOC bugs**: `generate-toc.ts` used `.replace(/\s+/g, "-")` (collapses spaces) while `github-slugger` uses `.replace(/ /g, "-")` (each space → hyphen). Em dash `—` with surrounding spaces creates double-hyphen mismatch in DOM vs TOC.
- **7 files affected by em-dash bug**: philosophy (20 broken), criminal-justice (1), energy (2), fiscal-transparency (3), foreign-policy (2), labor (1), anti-corruption (1)
- **Philosophy page**: 100% TOC broken — rendered from `philosophy-content-new.tsx` but TOC generated from old `content.mdx`. Now fixed with `id` attrs + `.tsx` generator support.
- **Page patterns for TOC wiring**:
  - Pages WITH `<div className="flex">` wrapper (just add `<aside>`): `events/[slug]`, `notes/[slug]`
  - Pages WITHOUT flex wrapper (add wrapper + aside): `governance/members`, `governance/members/awfixer`, `ideas/gladiator`, `ideas/world-fairs`
  - Bylaws pages: Use `BylawsLayout` which has its own sidebar — may need TOC slot or wrap differently
- **Nav component pattern**: `components/nav/nav.tsx` has `SiteNav` with 6 dropdowns (Core, Policy, Governance, Events, Plans, Ideas). Each dropdown has desktop + mobile variants in separate files (e.g., `governance.tsx`).
- **`generate-navigation.ts`**: Reads `lib/nav/*.json` files, extracts metadata from page files, generates nav data. Needs update to discover bylaws.
- **Breakpoint inconsistency**: `useBreakpoint` (BylawsNav) uses 768px, `useMobile` (TOC) uses 1024px. Need to harmonize.
- **`boulder.json`** active at `/home/awfixer/Projects/tmp.awfixer.party/.sisyphus/boulder.json`

## File Operations
### Read
- `/home/awfixer/Projects/tmp.awfixer.party/.sisyphus/plans/fix-website.md`
- `/home/awfixer/Projects/tmp.awfixer.party/.sisyphus/boulder.json`
- `/home/awfixer/Projects/tmp.awfixer.party/scripts/generate-toc.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/scripts/generate-bylaws.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/scripts/generate-navigation.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/app/philosophy/philosophy-content-new.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/bylaws/[slug]/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/bylaws/bylaws/governance/content.mdx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/bylaws/bylaws/membership/content.mdx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/bylaws/bylaws/voting/content.mdx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/bylaws/bylaws/voting/proxy/content.mdx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/toc.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/mobile-toc.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/nav/nav.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/nav/governance.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/BylawsNav/BylawsLayout.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/components/BylawsNav/usePopout.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/hooks/use-mobile.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/lib/nav/governance.json`
- `/home/awfixer/Projects/tmp.awfixer.party/lib/nav/index.ts`
- `/home/awfixer/Projects/tmp.awfixer.party/app/policy/immigration/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/events/[slug]/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/notes/[slug]/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/governance/members/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/governance/members/awfixer/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/ideas/gladiator/page.tsx`
- `/home/awfixer/Projects/tmp.awfixer.party/app/ideas/world-fairs/page.tsx`

### Modified
- (none — Wave 1 tasks modified files but plan checkboxes not yet marked)
