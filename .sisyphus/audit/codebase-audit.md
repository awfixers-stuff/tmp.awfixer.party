# Codebase Audit: tmp.awfixer.party

**Date:** 2026-05-01
**Scope:** Full codebase — architecture, bylaws, navigation, TOC system, build pipeline
**Method:** 4 parallel explore agents + direct investigation + librarian verification

---

## 1. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16.2.4 | Framework (Turbopack dev server) |
| React 19 | UI library |
| Bun 1.3.11 | Package manager, script runner, compiler |
| Tailwind CSS v4 | Styling |
| TypeScript (strict) | Type safety |
| MDX | Content authoring (Markdown + JSX) |
| `rehype-slug` | Auto-generates heading IDs via `github-slugger` |
| `remark-gfm` | GitHub Flavored Markdown support |
| `remark-frontmatter` | Frontmatter support in MDX |
| `@/` path alias | Import path resolution |

---

## 2. Build Pipeline

Five generators run in order before `next build`:

```
generate-navigation → generate-toc → generate-events → generate-bylaws → generate-notes → next build
```

All triggered via `bun run build` or individually.

### Generator Details

| Script | Purpose | Output |
|---|---|---|
| `scripts/generate-navigation.ts` | Reads page metadata, generates nav JSON | `lib/nav/{policy,plans,ideas,notes,events,governance}.json` + `index.ts` |
| `scripts/generate-toc.ts` | Parses MDX `##`/`###` headings, generates TOC data | 50 `toc-content.ts` + 50 `toc.tsx` files |
| `scripts/generate-events.ts` | Generates event listing pages | Event index |
| `scripts/generate-bylaws.ts` | Parses bylaws MDX into nav tree + section map | `app/bylaws/bylaws.ts` |
| `scripts/generate-notes.ts` | Generates notes index and metadata | Notes listing |

### Command Reference (from AGENTS.md)

```
bun run dev               # Start dev server
bun run generate-toc      # Generate TOC files
bun run generate-navigation # Generate nav JSON
bun run generate-notes    # Generate notes index
bun run build             # All generators + next build
bun run typecheck         # TypeScript check
```

---

## 3. Page Architecture

### Pattern A: Static MDX Pages (most common — ~40 pages)

Each page lives in its own directory:

```
app/policy/technology/
├── page.tsx              # Page component + metadata
├── content.mdx           # MDX content with ## and ### headings
├── toc.tsx               # AUTO-GENERATED: TOC switcher (Desktop vs Mobile)
└── toc-content.ts        # AUTO-GENERATED: TOC data array
```

**Template (page.tsx):**
```tsx
import Content from "./content.mdx"
import { TableOfContents } from "./toc"

export default function Page() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16">
        <header><h1>Title</h1></header>
        <Separator />
        <div className="prose max-w-none"><Content /></div>
      </main>
      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20"><TableOfContents /></div>
      </aside>
    </div>
  )
}
```

### Pattern B: Dynamic Slug Routes (events, notes)

```
app/events/[slug]/
├── page.tsx              # Dynamic route with generateStaticParams
├── content.mdx           # Per-event MDX content
├── toc.tsx               # AUTO-GENERATED (but NOT imported in page.tsx!)
└── toc-content.ts        # AUTO-GENERATED (but NOT used)
```

**BUG:** These pages do not render the TOC sidebar despite having generated TOC files.

### Pattern C: Recursive Plans Pages

```
app/plans/prime-ministership/reasoning/
├── page.tsx
├── content.mdx
├── toc.tsx
└── toc-content.ts
```

Nested under `app/plans/` with arbitrary depth. Uses same pattern as Pattern A.

### Pattern D: Bylaws (2-Level Tree with Custom Sidebar)

```
app/bylaws/
├── page.tsx              # Landing page with full tree
├── [slug]/page.tsx       # Dynamic route for individual bylaw pages
├── bylaws.ts             # AUTO-GENERATED: nav tree + section map
├── types.ts              # DEAD FILE — conflicts with bylaws.ts
└── bylaws/               # Content directories
    ├── governance/content.mdx
    ├── membership/content.mdx
    ├── voting/content.mdx
    └── voting/proxy/content.mdx
```

Uses `components/BylawsNav/` for custom navigation instead of standard TOC.

---

## 4. Navigation System

### Main Navigation (`components/` + `lib/nav/`)

- **SiteNav** — Fixed glass-effect navigation bar with 6 dropdowns:
  1. Core (philosophy, privacy, terms, socials)
  2. Policy (15 policy pages)
  3. Governance (members, AWFixer page)
  4. Events (dynamic listing)
  5. Plans (foreign-policy, prime-ministership)
  6. Ideas (gladiator, world-fairs)

- **ORPHANED:** Bylaws section has NO entry in SiteNav or in `lib/nav/`. Cannot be navigated to from the main menu.

### Table of Contents (`components/toc.tsx`, `components/mobile-toc.tsx`)

**DesktopTOC:**
- Renders in the `<aside>` sidebar (hidden on mobile via `lg:block`)
- Uses `IntersectionObserver` with `rootMargin: "-80px 0px -70% 0px"` to track active heading
- Each item is a `<button>` with `onClick` → `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`

**MobileTOC:**
- Rendered via `createPortal` to `<body>`
- Slide-up panel triggered by floating button
- Same scroll mechanism as DesktopTOC

**Navigation Mechanism (BOTH):**
```ts
const handleClick = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
```

The `?.` optional chaining means **silent failure** when IDs don't match — no console error, no user feedback.

### Bylaws Navigation (`components/BylawsNav/`)

- `BylawsLayout` — Fixed sidebar (desktop) or mobile drawer
- `BylawsNav` — Recursive tree rendering
- `NavItem` — Individual item with active state
- `usePopout` — Responsive breakpoint at 768px

**Breakpoint Inconsistency:** Bylaws uses 768px (`usePopout`), while main TOC uses 1024px (`use-mobile`).

---

## 5. BYLAWS SECTION — DEEP ANALYSIS

### File Inventory

| File | Status | Role |
|---|---|---|
| `app/bylaws/page.tsx` | ACTIVE | Landing page, renders BylawsLayout with full tree |
| `app/bylaws/[slug]/page.tsx` | ACTIVE | Dynamic route: `generateStaticParams`, `generateMetadata`, renders `getBylaw(slug)` |
| `app/bylaws/bylaws.ts` | **AUTO-GENERATED** | Imports all MDX, exports `bylawNavTree[]`, `bylawSections[]`, `getBylaw()` |
| `app/bylaws/types.ts` | **DEAD/STUB** | Duplicate NavItem/BylawSection interfaces, empty arrays — conflicts with bylaws.ts |
| `app/bylaws/bylaws/governance/content.mdx` | ACTIVE | Governance bylaw content |
| `app/bylaws/bylaws/membership/content.mdx` | ACTIVE | Membership bylaw content |
| `app/bylaws/bylaws/voting/content.mdx` | ACTIVE | Voting bylaw content |
| `app/bylaws/bylaws/voting/proxy/content.mdx` | ACTIVE | Proxy voting sub-bylaw |
| `scripts/generate-bylaws.ts` | ACTIVE | Generator script |
| `components/BylawsNav/BylawsLayout.tsx` | ACTIVE | Layout wrapper |
| `components/BylawsNav/BylawsNav.tsx` | ACTIVE | Tree navigation |
| `components/BylawsNav/NavItem.tsx` | ACTIVE | Recursive nav item |
| `components/BylawsNav/usePopout.ts` | ACTIVE | 768px breakpoint hook |

### generate-bylaws.ts Analysis

**What it parses:**
1. `<BylawMeta>` component — searches for `title`, `description`, `order` props
2. `##` headings — used as section titles
3. `- ` bullet items — used as subsection links

**What it generates (`app/bylaws/bylaws.ts`):**
- Import statements for all MDX files
- `bylawNavTree[]` — hierarchical navigation tree with `{title, slug, children[], order}`
- `bylawSections[]` — flat list with `{slug, title, description, order}`
- `getBylaw(slug)` — lookup function

### Critical Bugs in Bylaws

#### BUG 1: Dual Declaration Conflict (types.ts vs bylaws.ts)
**Files:** `app/bylaws/types.ts` (lines 11-37) and `app/bylaws/bylaws.ts`

Both files define `NavItem` and `BylawSection` interfaces with identical shapes. `types.ts` contains empty arrays and stub exports that conflict with the auto-generated content in `bylaws.ts`.

**Impact:** Type duplication, potential import confusion, dead code.

**Fix:** Delete `app/bylaws/types.ts`. All types should come from `bylaws.ts` (generated).

#### BUG 2: Non-Recursive findActiveId
**File:** `app/bylaws/[slug]/page.tsx`

```ts
function findActiveId(tree: NavItem[], slug: string): string | undefined {
  for (const item of tree) {
    if (item.slug === slug) return item.title
    if (item.children) {
      for (const child of item.children) {
        if (child.slug === slug) return child.title
      }
    }
  }
  return undefined
}
```

Only searches 2 levels (root + 1 child). If the bylaws tree grows to 3+ levels deep (e.g., `governance/committees/ethics`), this function will fail to find the active item.

**Fix:** Make recursive: search children recursively instead of just one level.

#### BUG 3: <BylawMeta> Parser Exists But Unused
**File:** `scripts/generate-bylaws.ts`

The generator searches for `<BylawMeta title="..." description="..." order={...} />` in MDX files, but **no MDX file uses this component**. All metadata falls through to fallback `parseTitle()` and `parseDescription()` (heuristic extraction from first heading and first paragraph).

**Impact:** No way to set explicit metadata for bylaw pages. The fallback heuristics may produce incorrect titles/descriptions.

**Fix:** Either (a) add `<BylawMeta>` to each bylaw content.mdx, or (b) remove the unused parser and rely solely on heuristics.

#### BUG 4: Bylaws Orphaned from Main Navigation
**No link to `/bylaws` exists in `components/` SiteNav. No `bylaws.json` in `lib/nav/`. No entry in any of the 6 dropdown menus.**

**Impact:** Users cannot discover or navigate to the bylaws section from any page.

**Fix:** Add a Bylaws link to SiteNav (possibly under Governance dropdown) and create `lib/nav/bylaws.json`.

#### BUG 5: Missing TOC on Bylaw Detail Pages
**File:** `app/bylaws/[slug]/page.tsx`

Despite `toc.tsx` and `toc-content.ts` being generated for each bylaw page, the page component does NOT import or render `TableOfContents`. No aside sidebar.

**Impact:** Users on individual bylaw pages cannot jump to sections within the page.

#### BUG 6: Inconsistent Breakpoints
- `usePopout` (BylawsNav): 768px breakpoint
- `use-mobile` (main TOC): 1024px breakpoint
- Tailwind `lg:` breakpoint (sidebar visibility): 1024px

The bylaw navigation switches to mobile drawer at 768px while the rest of the site uses 1024px. This creates inconsistent UX.

---

## 6. TOC SYSTEM — BUG ANALYSIS

### Architecture

```
content.mdx  ──[generate-toc.ts]──▶ toc-content.ts + toc.tsx
                                        │
                   ┌────────────────────┘
                   ▼
          TableOfContents()
          ├── mobile  → MobileTOC(items)
          └── desktop → DesktopTOC(items)
                              │
                      IntersectionObserver
                              │
                    button.onClick → handleClick(id)
                              │
              document.getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" })
```

### HEADING ID GENERATION: The Two Algorithms

#### Algorithm A — `scripts/generate-toc.ts` (what TOC data uses)

```typescript
const headingRegex = /^(#{2,3})\s+(.+)$/gm
const text = match[2].replace(/\*+$/, "").trim()  // remove trailing asterisks
const id = text
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")   // remove chars not in [a-z0-9 space -]
  .replace(/\s+/g, "-")            // COLLAPSE multiple spaces → single hyphen
```

#### Algorithm B — `github-slugger` via `rehype-slug` (what DOM uses)

```javascript
value.toLowerCase()
  .replace(massiveUnicodeExclusionRegex, '')  // remove punctuation, emoji, symbols
  .replace(/ /g, '-')                          // EACH space → hyphen (no collapsing)
```

### BUG 1: Double-Hyphen ID Mismatch from Em Dashes (CRITICAL)

**Root Cause:** When a heading contains ` — ` (space + U+2014 em dash + space):

```
Heading: "Criminal Justice — Accountability, Reform, and the Value of Useful Work"
```

| Step | generate-toc | github-slugger |
|---|---|---|
| Input (lowercased) | `criminal justice — accountability, reform, and the value of useful work` | same |
| Remove non-alnum/special chars | `criminal justice  accountability reform and the value of useful work` | same (both strip `—`) |
| Spaces → hyphens | `\s+` collapses two spaces → `-` | Each space → `-` (two spaces → `--`) |
| Final ID | `criminal-justice-accountability-reform-and-the-value-of-useful-work` | `criminal-justice--accountability-reform-and-the-value-of-useful-work` |

**Result:** `document.getElementById("criminal-justice-accountability-...")` returns `null` because the actual DOM element has ID with double hyphen: `criminal-justice--accountability-...`. The `?.` in the click handler means **silent failure — nothing happens when clicked.**

**Affected Files (7 of 50 = 14%):**

| File | Headings Broken | Count |
|---|---|---|
| `app/philosophy/toc-content.ts` | Most headings with `—` pattern | **20** |
| `app/policy/fiscal-transparency/toc-content.ts` | Headings with `—` | 3 |
| `app/policy/energy/toc-content.ts` | Headings with `—` | 2 |
| `app/policy/foreign-policy/toc-content.ts` | Headings with `—` | 2 |
| `app/policy/anti-corruption/toc-content.ts` | Heading with `—` | 1 |
| `app/policy/criminal-justice/toc-content.ts` | Heading with `—` | 1 |
| `app/policy/labor/toc-content.ts` | Heading with `—` | 1 |

**Total: ~30 broken TOC entries across 7 pages.**

### BUG 2: Duplicate Heading IDs Not Handled (HIGH)

**File:** `app/philosophy/toc-content.ts`

The heading `### The AWFixer Core Argument` appears **3 times** in `app/philosophy/content.mdx` (lines 611, 764, 956) under different pillars.

**generate-toc produces:**
```json
{"id": "the-awfixer-core-argument", "level": 3},  // Pilaren Seven
{"id": "the-awfixer-core-argument", "level": 3},  // Pillar Eight
{"id": "the-awfixer-core-argument", "level": 3},  // Pillar Nine
```

**rehype-slug (via github-slugger) produces:**
```html
<h3 id="the-awfixer-core-argument">...</h3>   <!-- first occurrence -->
<h3 id="the-awfixer-core-argument-1">...</h3> <!-- second occurrence -->
<h3 id="the-awfixer-core-argument-2">...</h3> <!-- third occurrence -->
```

**Result:** The 2nd and 3rd TOC entries will never work. All 3 entries also share the same React key (duplicate), causing React warnings.

### BUG 3: Philosophy Page Content Mismatch (CRITICAL)

**File:** `app/philosophy/page.tsx` — line 5

```tsx
import { PhilosophyContent } from "./philosophy-content-new";
```

The page imports and renders `philosophy-content-new.tsx` (a `"use client"` JSX component), but `toc-content.ts` was generated from `content.mdx` (the old/original MDX file).

**These are COMPLETELY DIFFERENT content sources with different headings and IDs.**

The `toc-content.ts` has 60+ entries referencing IDs from the old `content.mdx`, but the rendered page uses `philosophy-content-new.tsx` which has only 8 headings (5 with IDs, 3 without).

**Impact:** **100% of TOC clicks fail on the philosophy page.** Every `document.getElementById(id)` returns `null`.

### BUG 4: Missing id Attributes on JSX Headings (Philosophy)

**File:** `app/philosophy/philosophy-content-new.tsx`

Three headings lack `id` attributes because they're raw JSX (not processed by MDX pipeline):

| Line | Element | Text |
|---|---|---|
| 9 | `<h2>` | "America does not have a people problem, it has a system problem." |
| 99 | `<h3>` | "The Pattern Is Always The Same" |
| 308 | `<h3>` | "On Bipartisanship" |

Since `rehype-slug` only processes MDX content (not JSX), these headings will **never** have IDs. The TOC can never navigate to them.

### BUG 5: Philosophy TOC IDs Don't Match Current Content

Even when comparing the old `content.mdx` headings (which `toc-content.ts` was generated from) against `philosophy-content-new.tsx` (which is rendered), the 5 headings in `philosophy-content-new.tsx` that DO have IDs use different ID values from what the TOC expects. No IDs match between the TOC data and the actual DOM.

### BUG 6: Orphaned TOC Files (4 Pages)

These pages have generated `toc.tsx` + `toc-content.ts` but do NOT import/render `TableOfContents`:

| Page | Status |
|---|---|
| `app/governance/members/page.tsx` | No `<aside>`, no TOC import |
| `app/governance/members/awfixer/page.tsx` | No `<aside>`, no TOC import |
| `app/ideas/gladiator/page.tsx` | No `<aside>`, no TOC import |
| `app/ideas/world-fairs/page.tsx` | No `<aside>`, no TOC import |

### BUG 7: Missing TOC on Dynamic Routes (11+ Pages)

| Route | Status |
|---|---|
| `app/events/[slug]/page.tsx` | No TOC import, no aside sidebar |
| `app/notes/[slug]/page.tsx` | No TOC import, no aside sidebar |
| `app/page.tsx` (homepage) | No TOC sidebar |

### Additional Systemic Issues

| Issue | File | Details |
|---|---|---|
| **Silent failure** | `components/toc.tsx:43` | `?.` swallows all errors — impossible to debug |
| **Missing `block: "start"`** | `components/toc.tsx:43` | May not scroll heading to top of viewport |
| **No URL hash update** | `components/toc.tsx:42-44` | Can't bookmark/share specific sections |
| **`<button>` not `<a>`** | `components/toc.tsx:64` | No keyboard nav, no right-click, no hash-based scrolling |
| **No dedup in generator** | `scripts/generate-toc.ts` | Duplicate heading IDs produce broken TOC entries |
| **No `scroll-margin-top` respect** | `components/toc.tsx:43` | Sticky header may cover heading after scroll |

---

## 7. FIX RECOMMENDATIONS

### Priority 1: Fix TOC ID Generation (1 file change)

**File:** `scripts/generate-toc.ts`

Replace the naive slugging with `github-slugger` (already installed as transitive dependency):

```typescript
import GithubSlugger from "github-slugger"

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []
  const slugger = new GithubSlugger()
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/\*+$/, "").trim()
    const id = slugger.slug(text)  // Matches rehype-slug exactly
    headings.push({ id, text, level })
  }

  return headings
}
```

This single change:
- Fixes the double-hyphen em-dash mismatch (BUG 1) — 30+ broken TOC entries
- Fixes duplicate heading ID handling (BUG 2) — mismatched TOC entries
- Ensures all future content generates correct IDs

**After change:** Run `bun run generate-toc` to regenerate all 50 TOC data files.

### Priority 2: Fix Philosophy Page

Three required changes:

1. **Add `id` attributes** to 3 headings in `philosophy-content-new.tsx` (lines 9, 99, 308)
2. **Regenerate TOC** from `philosophy-content-new.tsx` instead of old `content.mdx` — OR convert `philosophy-content-new.tsx` back to MDX
3. **Delete or archive** the old `content.mdx` to prevent confusion

### Priority 3: Wire Up Missing TOC Sidebars

Add the standard `<aside>` + `<TableOfContents>` pattern to:
- `app/events/[slug]/page.tsx`
- `app/notes/[slug]/page.tsx`
- `app/governance/members/page.tsx`
- `app/governance/members/awfixer/page.tsx`
- `app/ideas/gladiator/page.tsx`
- `app/ideas/world-fairs/page.tsx`

### Priority 4: Fix Bylaws Bugs

1. **Delete** `app/bylaws/types.ts` (dead code, conflicts with generated bylaws.ts)
2. **Make `findActiveId` recursive** in `app/bylaws/[slug]/page.tsx`
3. **Add Bylaws link** to SiteNav (under Governance dropdown)
4. **Either** add `<BylawMeta>` to each bylaw MDX, or remove the unused parser
5. **Harmonize breakpoints** — choose one (768px or 1024px) for all responsive nav components
6. **Wire up TOC** in `app/bylaws/[slug]/page.tsx`

### Priority 5: Improve TOC Click Handler

In `components/toc.tsx` and `components/mobile-toc.tsx`:

```tsx
// Current (silent failure):
document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

// Improved:
const element = document.getElementById(id)
if (element) {
  element.scrollIntoView({ behavior: "smooth", block: "start" })
  window.history.replaceState(null, "", `#${id}`)
} else {
  console.warn(`TOC: No element found for id "${id}"`)
}
```

---

## 8. BYLAWS AS TEMPLATE FOR POLICY PROPOSAL SECTION

### What Works Well (Reusable Patterns)

1. **`scripts/generate-bylaws.ts`** — Generator that parses MDX directories into a nav tree and section map. Directly adaptable for policy proposals.

2. **`app/bylaws/bylaws.ts`** — Auto-generated file pattern: imports all MDX, exports typed data structures.

3. **`components/BylawsNav/`** — Custom sidebar navigation with recursive tree rendering and responsive drawer. Suitable for deep content hierarchies.

4. **`app/bylaws/[slug]/page.tsx`** — Dynamic route with `generateStaticParams` for content-driven pages.

### What Needs Fixing Before Templatization

| Issue | Why It Matters for Template |
|---|---|
| `<BylawMeta>` parser unused | Policy proposals need explicit metadata (sponsor, date, status, category) |
| Non-recursive `findActiveId` | Policy sections will be deeper than 2 levels |
| Missing TOC integration | Individual proposal pages need section-level navigation |
| types.ts dead code | Template should have clean, single-source type definitions |
| No SiteNav integration | Policy proposals must be discoverable from main navigation |
| Breakpoint inconsistency | Template should follow single responsive standard |

### Recommended Template Structure

```
scripts/generate-proposals.ts     # Adapted from generate-bylaws.ts
app/proposals/
├── page.tsx                       # Landing with full tree (adapted from bylaws/page.tsx)
├── [slug]/page.tsx               # Dynamic detail (adapted from bylaws/[slug]/page.tsx)
├── proposals.ts                   # AUTO-GENERATED (like bylaws.ts)
└── proposals/                     # Content directories (mirrors bylaws structure)
    ├── economics/
    │   └── content.mdx
    ├── healthcare/
    │   └── content.mdx
    ├── foreign-policy/
    │   ├── content.mdx
    │   └── nato/
    │       └── content.mdx
    └── ...
```

---

## 9. FILE INVENTORY SUMMARY

### Auto-Generated Files (50 toc-content.ts + 50 toc.tsx + bylaws.ts + nav JSON)

| Type | Count | Location Pattern |
|---|---|---|
| `toc-content.ts` | 50 | `app/**/toc-content.ts` |
| `toc.tsx` | 50 | `app/**/toc.tsx` |
| `bylaws.ts` | 1 | `app/bylaws/bylaws.ts` |
| Nav JSON | 6 | `lib/nav/{policy,plans,ideas,notes,events,governance}.json` |
| Nav index | 1 | `lib/nav/index.ts` |

### Source Files (MDX content)

| Section | Count | Location |
|---|---|---|
| Policy | 15 | `app/policy/{slug}/content.mdx` |
| Plans | 12 | `app/plans/**/content.mdx` |
| Notes | 8 | `app/notes/**/content.mdx` |
| Events | 3 | `app/events/**/content.mdx` |
| Bylaws | 4 | `app/bylaws/bylaws/**/content.mdx` |
| Governance | 2 | `app/governance/**/content.mdx` |
| Ideas | 2 | `app/ideas/**/content.mdx` |
| Root pages | 5 | `app/{philosophy,privacy,terms-of-access,terms-of-use,socials}/content.mdx` |

### Key Components

| Component | File | Purpose |
|---|---|---|
| `SiteNav` | `components/site-nav.tsx` | Main navigation bar |
| `DesktopTOC` | `components/toc.tsx` | Desktop table of contents sidebar |
| `MobileTOC` | `components/mobile-toc.tsx` | Mobile TOC slide-up panel |
| `BylawsLayout` | `components/BylawsNav/BylawsLayout.tsx` | Bylaws page layout |
| `BylawsNav` | `components/BylawsNav/BylawsNav.tsx` | Bylaws tree navigation |
| `NavItem` | `components/BylawsNav/NavItem.tsx` | Recursive nav item |
| `usePopout` | `components/BylawsNav/usePopout.ts` | 768px breakpoint hook |
| `useMobile` | `hooks/use-mobile.ts` | 1024px breakpoint hook |

### Scripts

| Script | Purpose |
|---|---|
| `scripts/generate-toc.ts` | **BUGGY** — generates TOC data with incorrect IDs |
| `scripts/generate-navigation.ts` | Generates nav JSON |
| `scripts/generate-bylaws.ts` | Generates bylaws nav tree + section map |
| `scripts/generate-events.ts` | Generates event listing |
| `scripts/generate-notes.ts` | Generates notes index |

---

## 10. BUG SEVERITY MATRIX

| # | Bug | Severity | Pages Affected | User-Visible? |
|---|---|---|---|---|
| 1 | Em-dash double-hyphen ID mismatch | **CRITICAL** | 7 pages, 30+ entries | Yes — TOC clicks broken |
| 2 | Philosophy page content mismatch | **CRITICAL** | 1 page (philosophy) | Yes — ALL TOC broken |
| 3 | Philosophy JSX missing id attrs | **HIGH** | 1 page (philosophy) | Yes — 3 headings unreachable |
| 4 | Duplicate heading IDs in TOC | **HIGH** | 1 page (philosophy) | Yes — wrong scroll target |
| 5 | Silent `?.` failure in click handler | **HIGH** | ALL pages with TOC | No — but prevents debugging |
| 6 | Missing TOC on 11+ pages | **HIGH** | events/notes/gov/ideas | Yes — no section nav |
| 7 | Bylaws types.ts dead code | MEDIUM | 1 file | No — dev confusion |
| 8 | Non-recursive findActiveId | MEDIUM | Bylaws [slug] pages | Yes — when tree >2 deep |
| 9 | Bylaws orphaned from SiteNav | MEDIUM | All bylaws pages | Yes — undiscoverable |
| 10 | BylawMeta parser unused | LOW | 0 | No |
| 11 | Inconsistent breakpoints | LOW | Bylaws pages | Minor UX |

---

*Generated by Sisyphus on 2026-05-01 using 4 parallel explore agents + librarian verification + direct codebase investigation.*
