# Fix Website: TOC, Navigation, Bylaws, and Policy Proposal Template

## TL;DR

> Fix 30+ broken TOC entries caused by ID mismatches between `generate-toc.ts` and `rehype-slug`/`github-slugger`. Wire up missing TOC sidebars on 15+ pages. Perfect the bylaws section and turn it into a reusable template for a policy proposals section with hundreds of MDX pages. All fixes must be GENERIC and run at build time — no hardcoded content, no manual file edits for generated data.
>
> **Deliverables:** Fixed generator scripts, regenerated TOC files, wired sidebars, new bylaws nav dropdown, policy proposal generator + directory structure.
> **Estimated Effort:** Large (30+ tasks across 6 waves)
> **Parallel Execution:** YES — 6 waves with 4-8 parallel tasks per wave
> **Critical Path:** Wave 1 (generators) → Wave 2 (regeneration) → Wave 3 (page wiring) → Wave 4 (navigation) → Wave 6 (verification)

---

## Context

### Original Request
Comprehensive fix for tmp.awfixer.party based on the audit at `.sisyphus/audit/codebase-audit.md`. Focus areas: TOC click bugs, navigation, bylaws perfection, policy proposal template.

### Key Decisions (from user)
1. **Philosophy content source:** JSX (`philosophy-content-new.tsx`) is canonical — do not revert to MDX.
2. **Bylaws placement:** New top-level "Bylaws" dropdown in SiteNav.
3. **BylawMeta:** Add `<BylawMeta>` to all 4 current bylaw MDX files AND set up the pattern for future bylaws.
4. **Build-time principle:** ALL content discovery and generation must happen at build time. No hardcoded content, no manual TOC data.

### Research Findings
- `generate-toc.ts` uses `.replace(/\s+/g, "-")` which COLLAPSES multiple spaces → single hyphen.
- `github-slugger` (used by `rehype-slug`) uses `.replace(/ /g, '-')` which replaces EACH space → hyphen.
- When headings contain ` — ` (em dash with spaces), removing the dash leaves two spaces. Generator produces single hyphen, DOM has double hyphen → `document.getElementById()` returns null → silent failure.
- `github-slugger` handles duplicate headings with `-1`, `-2` suffixes; generator has zero dedup logic.
- `github-slugger` is a transitive dependency (via `rehype-slug`) but NOT in `package.json` — must be made explicit.
- 50 `toc-content.ts` + 50 `toc.tsx` files are auto-generated outputs. 4 bylaw pages have generated TOC files but they are not rendered.

### Metis Review
- Guardrails added: MUST NOT modify content.mdx heading text; MUST NOT change toc-content.ts interface; MUST add explicit github-slugger dependency; MUST preserve trailing-asterisk strip behavior.
- Scope locked: Policy proposal template is IN scope but as a distinct wave (Wave 5). Button→anchor and URL hash updates are OUT of scope (separate enhancements).
- Risk: Philosophy JSX content requires generic .tsx heading extraction in generate-toc.ts — must not be a one-off hack.

---

## Work Objectives

### Core Objective
Fix the root cause of broken TOC navigation (ID generation mismatch) and restore/build missing navigation across the entire site, while creating a reusable policy proposal template system.

### Concrete Deliverables
- Fixed `scripts/generate-toc.ts` using `github-slugger` + generic .tsx support
- Regenerated all 50 `toc-content.ts` files with correct IDs
- Fixed TOC click handlers with error logging and proper scroll behavior
- 3 missing `id` attributes added to `philosophy-content-new.tsx`
- `app/bylaws/types.ts` deleted
- Recursive `findActiveId` in bylaws dynamic route
- `<BylawMeta>` added to all 4 bylaw content.mdx files
- TOC sidebars wired on 7 pages that currently lack them
- New "Bylaws" dropdown in SiteNav with `lib/nav/bylaws.json`
- `generate-navigation.ts` updated to discover bylaws
- Breakpoints harmonized across navigation components
- Policy proposal generator (`scripts/generate-proposals.ts`) + `app/proposals/` structure

### Definition of Done
- [ ] `bun run generate-toc` produces IDs that match `rehype-slug` for all headings (verified by test)
- [ ] `bun run build` completes with zero TypeScript errors
- [ ] Every page with a TOC sidebar can navigate to every heading by clicking the TOC
- [ ] Bylaws section is reachable from SiteNav dropdown
- [ ] Policy proposal directory structure exists and generator script runs successfully

### Must Have
- Generic build-time heading extraction for both .mdx and .tsx content files
- Explicit `github-slugger` dependency in package.json
- All 4 bylaw pages have `<BylawMeta>` with title/description/order
- Recursive navigation tree traversal for bylaws
- TOC sidebars on events, notes, governance/members, ideas pages, and bylaws detail pages
- Bylaws as a top-level SiteNav dropdown

### Must NOT Have (Guardrails)
- **NO** hardcoded heading lists or manual toc-content.ts edits
- **NO** modification of content.mdx heading text to work around ID bugs
- **NO** changes to `toc-content.ts` or `toc.tsx` interface contracts
- **NO** new runtime dependencies beyond `github-slugger`
- **NO** URL hash update or button→anchor conversion (out of scope)
- **NO** removal of the `<BylawMeta>` parser (keep it for future use)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists:** YES — `bun run typecheck` and `bun run build` available
- **Automated tests:** NO — project has no test framework. QA will be agent-executed via Playwright and bash commands.
- **Agent-Executed QA:** MANDATORY for every task. Evidence saved to `.sisyphus/evidence/`.

### QA Policy
Every task MUST include agent-executed QA scenarios:
- **Frontend/UI:** Playwright — navigate, click TOC items, assert scroll position, screenshot
- **Build/CLI:** Bash — run generators, verify output, check for errors
- **API/Backend:** N/A (static site)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 8 parallel generator/content fixes):
├── Task 1: Add github-slugger explicit dependency
├── Task 2: Fix generate-toc.ts (GithubSlugger + generic .tsx support)
├── Task 3: Fix philosophy-content-new.tsx (add 3 missing id attrs)
├── Task 4: Delete app/bylaws/types.ts
├── Task 5: Fix bylaws findActiveId recursive
├── Task 6: Fix DesktopTOC click handler
├── Task 7: Fix MobileTOC click handler
└── Task 8: Add BylawMeta to all 4 bylaw MDX files

Wave 2 (Regeneration — depends: Wave 1):
├── Task 9: Regenerate all TOC files (bun run generate-toc)
├── Task 10: Regenerate bylaws (bun run generate-bylaws)
└── Task 11: Regenerate navigation (bun run generate-navigation)

Wave 3 (Page wiring — 7 parallel, depends: Wave 2):
├── Task 12: Wire events/[slug] TOC sidebar
├── Task 13: Wire notes/[slug] TOC sidebar
├── Task 14: Wire governance/members TOC sidebar
├── Task 15: Wire governance/members/awfixer TOC sidebar
├── Task 16: Wire ideas/gladiator TOC sidebar
├── Task 17: Wire ideas/world-fairs TOC sidebar
└── Task 18: Wire bylaws/[slug] TOC sidebar

Wave 4 (Navigation — 4 parallel, depends: Wave 3):
├── Task 19: Add Bylaws dropdown to SiteNav
├── Task 20: Create lib/nav/bylaws.json
├── Task 21: Update generate-navigation.ts for bylaws discovery
└── Task 22: Harmonize breakpoints (768 vs 1024)

Wave 5 (Policy Proposal Template — 3 parallel, depends: Wave 4):
├── Task 23: Create generate-proposals.ts script
├── Task 24: Create app/proposals/ directory structure
└── Task 25: Create proposal nav components + add to SiteNav

Wave 6 (Final Verification — 4 parallel, depends: ALL):
├── Task 26: bun run typecheck
├── Task 27: bun run build
├── Task 28: QA: TOC click verification across all affected pages
└── Task 29: QA: Bylaws navigation + proposal template verification
```

### Dependency Matrix

| Task | Depends On | Blocks |
|---|---|---|
| 1-8 | — | 9-11 |
| 9 | 1, 2 | 12-18 |
| 10 | 8 | — |
| 11 | 1 | 19-22 |
| 12-18 | 9 | 19-22 |
| 19-22 | 11, 12-18 | 23-25 |
| 23-25 | 19-22 | 26-29 |
| 26-29 | ALL | — |

### Agent Dispatch Summary

- **Wave 1:** 8 tasks → `quick` (small file changes, clear scope)
- **Wave 2:** 3 tasks → `quick` (running generators, verifying output)
- **Wave 3:** 7 tasks → `quick` (page wiring, following established pattern)
- **Wave 4:** 4 tasks → `quick`/`visual-engineering` (nav UI changes)
- **Wave 5:** 3 tasks → `unspecified-high`/`deep` (generator adaptation, new structure)
- **Wave 6:** 4 tasks → `quick`/`unspecified-high` (typecheck, build, QA)

---

## TODOs

- [x] 1. **Add github-slugger as explicit dependency**

  **What to do**:
  - Run `bun add github-slugger` to add it to `package.json` dependencies.
  - Verify it appears in `package.json` under `"dependencies"` with a version.
  - Verify `bun.lock` is updated.

  **Must NOT do**:
  - Do NOT add any other dependencies.
  - Do NOT modify `package.json` manually — use `bun add`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-8)
  - **Blocks**: Task 2 (generate-toc.ts needs the import)
  - **Blocked By**: None

  **References**:
  - `package.json` — current dependency list
  - `bun.lock` — lockfile

  **Acceptance Criteria**:
  - [ ] `"github-slugger"` exists in `package.json` dependencies
  - [ ] `bun install` completes without errors

  **QA Scenarios**:
  ```
  Scenario: Dependency installed correctly
    Tool: Bash
    Steps:
      1. cat package.json | grep github-slugger
      2. bun install
    Expected Result: package.json contains github-slugger version; bun install exits 0
    Evidence: .sisyphus/evidence/task-1-dependency-installed.log
  ```

  **Commit**: YES
  - Message: `chore(deps): add explicit github-slugger dependency`
  - Files: `package.json`, `bun.lock`

- [x] 2. **Fix generate-toc.ts — use GithubSlugger + generic .tsx support**

  **What to do**:
  - Import `GithubSlugger` from `github-slugger` at the top of `scripts/generate-toc.ts`.
  - Replace the manual slugging logic with `slugger.slug(text)` where `slugger = new GithubSlugger()`.
  - **Preserve** the existing `text.replace(/\*+$/, "").trim()` step BEFORE slugging — this strips trailing asterisks from raw MDX heading text to match what rehype-slug sees after MDX parsing.
  - **Add generic .tsx content file support**: When the directory walker finds a directory with `content.tsx` (instead of or in addition to `content.mdx`), extract `<h2>` and `<h3>` elements using a regex. Capture `id="..."` attribute and inner text (stripping HTML tags). If a heading lacks an `id`, log a warning and generate a slug from the text.
  - For MDX files: keep existing `##`/`###` regex extraction but use `GithubSlugger` for ID generation.
  - Reset the slugger between files (`slugger.reset()`) so duplicate IDs are scoped per-file, not global.
  - The output interface (`TocItem[]` with `{id, text, level}`) must remain unchanged.

  **Must NOT do**:
  - Do NOT change the `toc-content.ts` output format.
  - Do NOT remove the trailing-asterisk strip step.
  - Do NOT write a one-off parser only for `philosophy-content-new.tsx` — it must work for ANY .tsx content file.
  - Do NOT modify any content.mdx or content.tsx heading text.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-8)
  - **Blocks**: Task 9 (regenerate TOC)
  - **Blocked By**: Task 1 (github-slugger must be installed)

  **References**:
  - `scripts/generate-toc.ts` — current buggy implementation
  - `node_modules/github-slugger/index.js` — library API
  - `app/philosophy/philosophy-content-new.tsx` — example .tsx content file
  - `app/philosophy/content.mdx` — example .mdx content file
  - `.sisyphus/audit/codebase-audit.md` — Bug 1 and Bug 2 details

  **Acceptance Criteria**:
  - [ ] `scripts/generate-toc.ts` imports `GithubSlugger`
  - [ ] MDX heading IDs match `rehype-slug` output (verified by comparing a sample heading with em dash)
  - [ ] Duplicate headings within a file get `-1`, `-2` suffixes
  - [ ] .tsx content files are parsed and generate TOC data
  - [ ] `bun run scripts/generate-toc.ts` runs without errors

  **QA Scenarios**:
  ```
  Scenario: Em dash heading produces matching ID
    Tool: Bash (Node REPL)
    Preconditions: github-slugger installed
    Steps:
      1. node -e "const {GithubSlugger} = require('github-slugger'); const s = new GithubSlugger(); console.log(s.slug('Criminal Justice — Accountability'));"
    Expected Result: Output matches the ID that rehype-slug would generate for this heading
    Evidence: .sisyphus/evidence/task-2-em-dash-id.log

  Scenario: Duplicate headings get unique IDs
    Tool: Bash (Node REPL)
    Steps:
      1. node -e "const {GithubSlugger} = require('github-slugger'); const s = new GithubSlugger(); console.log(s.slug('Foo')); console.log(s.slug('Foo'));"
    Expected Result: First: 'foo', Second: 'foo-1'
    Evidence: .sisyphus/evidence/task-2-duplicate-id.log

  Scenario: .tsx file parsing works
    Tool: Bash
    Steps:
      1. bun run scripts/generate-toc.ts
      2. cat app/philosophy/toc-content.ts | grep -c '"id"'
    Expected Result: Generates TOC entries for philosophy (non-zero count)
    Evidence: .sisyphus/evidence/task-2-tsx-parse.log
  ```

  **Commit**: YES
  - Message: `fix(scripts): use github-slugger in generate-toc, add .tsx support`
  - Files: `scripts/generate-toc.ts`
  - Pre-commit: `bun run scripts/generate-toc.ts` (smoke test)

- [x] 3. **Fix philosophy-content-new.tsx — add 3 missing id attributes**

  **What to do**:
  - Read `app/philosophy/philosophy-content-new.tsx`.
  - Add `id` attributes to the 3 headings that lack them:
    1. Line ~9: `<h2>` — "America does not have a people problem..." → add `id="america-does-not-have-a-people-problem"`
    2. Line ~99: `<h3>` — "The Pattern Is Always The Same" → add `id="the-pattern-is-always-the-same"`
    3. Line ~308: `<h3>` — "On Bipartisanship" → add `id="on-bipartisanship"`
  - The IDs should be generated using the same `github-slugger` algorithm to match what `generate-toc.ts` will produce. Use `new GithubSlugger().slug(headingText)` to compute them.

  **Must NOT do**:
  - Do NOT change heading text content.
  - Do NOT remove or modify existing `id` attributes.
  - Do NOT add IDs to elements that are not headings.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-2, 4-8)
  - **Blocks**: Task 9 (philosophy TOC regeneration)
  - **Blocked By**: None

  **References**:
  - `app/philosophy/philosophy-content-new.tsx` — source file
  - `node_modules/github-slugger/index.js` — for computing matching IDs

  **Acceptance Criteria**:
  - [ ] All 3 headings have `id` attributes
  - [ ] IDs match github-slugger output for the heading text
  - [ ] `bun run typecheck` passes for this file

  **QA Scenarios**:
  ```
  Scenario: Headings have IDs
    Tool: Bash (grep)
    Steps:
      1. grep -n 'id=' app/philosophy/philosophy-content-new.tsx
    Expected Result: At least 8 lines with id= (5 existing + 3 new)
    Evidence: .sisyphus/evidence/task-3-ids-added.log
  ```

  **Commit**: YES
  - Message: `fix(philosophy): add missing heading ids for TOC navigation`
  - Files: `app/philosophy/philosophy-content-new.tsx`

- [x] 4. **Delete app/bylaws/types.ts (dead code)**

  **What to do**:
  - Delete `app/bylaws/types.ts`.
  - Verify no file imports from it (grep for `from.*bylaws/types` or `bylaws/types.ts`).
  - Verify `bun run typecheck` still passes after deletion.

  **Must NOT do**:
  - Do NOT modify `app/bylaws/bylaws.ts` (generated file — will be regenerated in Task 10).
  - Do NOT create a replacement types file unless typecheck fails.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5-8)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `app/bylaws/types.ts` — file to delete
  - `app/bylaws/bylaws.ts` — generated file that provides the real types

  **Acceptance Criteria**:
  - [ ] `app/bylaws/types.ts` no longer exists
  - [ ] `grep -r "bylaws/types" app/` returns zero results
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Dead file removed
    Tool: Bash
    Steps:
      1. ls app/bylaws/types.ts 2>&1
      2. grep -r "bylaws/types" app/ || true
    Expected Result: File not found; grep returns empty
    Evidence: .sisyphus/evidence/task-4-types-deleted.log
  ```

  **Commit**: YES
  - Message: `chore(bylaws): remove dead types.ts`
  - Files: `app/bylaws/types.ts` (deleted)

- [x] 5. **Fix bylaws findActiveId — make recursive**

  **What to do**:
  - Open `app/bylaws/[slug]/page.tsx`.
  - Replace the non-recursive `findActiveId` function with a recursive version that searches the entire nav tree depth, not just root + 1 level.
  - The function should traverse `item.children` recursively and return `item.title` when `item.slug === slug`.

  **Current (broken):**
  ```typescript
  function findActiveId(tree, slug) {
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

  **Fixed (recursive):**
  ```typescript
  function findActiveId(tree: NavItem[], slug: string): string | undefined {
    for (const item of tree) {
      if (item.slug === slug) return item.title
      if (item.children) {
        const found = findActiveId(item.children, slug)
        if (found) return found
      }
    }
    return undefined
  }
  ```

  **Must NOT do**:
  - Do NOT change the function signature (accepts `NavItem[]` and `string`, returns `string | undefined`).
  - Do NOT change how the return value is used in the page component.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 6-8)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `app/bylaws/[slug]/page.tsx` — current findActiveId implementation
  - `app/bylaws/bylaws.ts` — NavItem interface (generated)

  **Acceptance Criteria**:
  - [ ] `findActiveId` calls itself recursively on `item.children`
  - [ ] `bun run typecheck` passes for this file

  **QA Scenarios**:
  ```
  Scenario: Recursive search works
    Tool: Bash (Node REPL or grep)
    Steps:
      1. grep -A 10 "function findActiveId" app/bylaws/\[slug\]/page.tsx
    Expected Result: Function contains recursive call to findActiveId(item.children, slug)
    Evidence: .sisyphus/evidence/task-5-recursive-find.log
  ```

  **Commit**: YES
  - Message: `fix(bylaws): make findActiveId recursive for deep trees`
  - Files: `app/bylaws/[slug]/page.tsx`

- [x] 6. **Fix DesktopTOC click handler — error logging + proper scroll**

  **What to do**:
  - Open `components/toc.tsx`.
  - Replace the `handleClick` function:
    ```typescript
    const handleClick = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
    ```
    With:
    ```typescript
    const handleClick = (id: string) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        console.warn(`[TOC] No element found for id: "${id}"`)
      }
    }
    ```
  - The `block: "start"` ensures the heading scrolls to the top of the viewport.
  - The `console.warn` makes future ID mismatches visible in the browser console instead of silently failing.

  **Must NOT do**:
  - Do NOT add URL hash updates (out of scope).
  - Do NOT change `<button>` to `<a>` (out of scope).
  - Do NOT change the IntersectionObserver logic.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-5, 7-8)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `components/toc.tsx` — current handleClick implementation
  - `components/mobile-toc.tsx` — same bug exists there (Task 7)

  **Acceptance Criteria**:
  - [ ] `handleClick` logs warning when element not found
  - [ ] `scrollIntoView` includes `block: "start"`
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Click handler improved
    Tool: Bash (grep)
    Steps:
      1. grep -A 5 "const handleClick" components/toc.tsx
    Expected Result: Contains console.warn and block: "start"
    Evidence: .sisyphus/evidence/task-6-desktop-toc-fix.log
  ```

  **Commit**: YES
  - Message: `fix(toc): add error logging and block:start to desktop click handler`
  - Files: `components/toc.tsx`

- [x] 7. **Fix MobileTOC click handler — same as DesktopTOC**

  **What to do**:
  - Open `components/mobile-toc.tsx`.
  - Apply the exact same `handleClick` fix as Task 6:
    - Replace `?.scrollIntoView({ behavior: "smooth" })` with explicit null check + `console.warn` + `block: "start"`.

  **Must NOT do**:
  - Same guardrails as Task 6.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-6, 8)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `components/mobile-toc.tsx` — current implementation
  - `components/toc.tsx` — reference for the fix pattern

  **Acceptance Criteria**:
  - [ ] Same criteria as Task 6

  **QA Scenarios**:
  ```
  Scenario: Mobile click handler improved
    Tool: Bash (grep)
    Steps:
      1. grep -A 5 "const handleClick" components/mobile-toc.tsx
    Expected Result: Contains console.warn and block: "start"
    Evidence: .sisyphus/evidence/task-7-mobile-toc-fix.log
  ```

  **Commit**: YES (grouped with Task 6)
  - Message: `fix(toc): add error logging and block:start to mobile click handler`
  - Files: `components/mobile-toc.tsx`

- [x] 8. **Add <BylawMeta> to all 4 bylaw content.mdx files**

  **What to do**:
  - Add `<BylawMeta title="..." description="..." order={N} />` to the top of each bylaw content.mdx file.
  - Derive title from the first `##` heading in each file.
  - Derive description from the first paragraph.
  - Use order: 1, 2, 3, 4 (or existing logical order if discernible from directory structure).
  - Files to update:
    1. `app/bylaws/bylaws/governance/content.mdx`
    2. `app/bylaws/bylaws/membership/content.mdx`
    3. `app/bylaws/bylaws/voting/content.mdx`
    4. `app/bylaws/bylaws/voting/proxy/content.mdx`

  **Must NOT do**:
  - Do NOT change the body content of the MDX files.
  - Do NOT remove existing headings or paragraphs.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-7)
  - **Blocks**: Task 10 (bylaws regeneration needs the metadata)
  - **Blocked By**: None

  **References**:
  - `app/bylaws/bylaws/governance/content.mdx` — example file
  - `scripts/generate-bylaws.ts` — shows expected BylawMeta props

  **Acceptance Criteria**:
  - [ ] All 4 bylaw MDX files have `<BylawMeta>` as the first element
  - [ ] Each has title, description, and order props
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: BylawMeta present in all files
    Tool: Bash (grep)
    Steps:
      1. grep -l "BylawMeta" app/bylaws/bylaws/**/content.mdx
    Expected Result: 4 files listed
    Evidence: .sisyphus/evidence/task-8-bylawmeta-added.log
  ```

  **Commit**: YES
  - Message: `feat(bylaws): add BylawMeta to all bylaw content files`
  - Files: `app/bylaws/bylaws/**/content.mdx` (4 files)

- [x] 9. **Regenerate all TOC files (bun run generate-toc)**

  **What to do**:
  - Run `bun run generate-toc` to regenerate all 50 `toc-content.ts` and 50 `toc.tsx` files.
  - Verify the script completes without errors.
  - Spot-check 3-4 files for correctness:
    - `app/philosophy/toc-content.ts` — should have entries from `philosophy-content-new.tsx` (with correct IDs)
    - `app/policy/criminal-justice/toc-content.ts` — em-dash heading should have double-hyphen ID (matching rehype-slug)
    - `app/policy/fiscal-transparency/toc-content.ts` — verify no single-hyphen IDs for em-dash headings
  - Verify `app/philosophy/toc-content.ts` now contains entries extracted from `.tsx` content, not old `content.mdx`.

  **Must NOT do**:
  - Do NOT manually edit any generated file.
  - Do NOT skip the spot-check verification.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (sequential with Task 10-11, but independent of each other)
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 12-18 (page wiring needs correct TOC files)
  - **Blocked By**: Tasks 1, 2, 3 (dependency installed, generator fixed, philosophy IDs added)

  **References**:
  - `scripts/generate-toc.ts` — fixed generator
  - `app/philosophy/philosophy-content-new.tsx` — source of truth for philosophy TOC
  - `app/policy/criminal-justice/content.mdx` — file with em-dash heading

  **Acceptance Criteria**:
  - [ ] `bun run generate-toc` exits 0
  - [ ] 50 `toc-content.ts` files updated (check git diff count)
  - [ ] Philosophy toc-content.ts references IDs from philosophy-content-new.tsx
  - [ ] Em-dash headings use double-hyphen IDs (matching github-slugger)
  - [ ] `bun run typecheck` passes after regeneration

  **QA Scenarios**:
  ```
  Scenario: Generator runs successfully
    Tool: Bash
    Steps:
      1. bun run generate-toc
      2. git diff --stat | grep toc-content.ts | wc -l
    Expected Result: Exit 0; ~50 files changed
    Evidence: .sisyphus/evidence/task-9-toc-regen.log

  Scenario: Em dash ID corrected
    Tool: Bash
    Steps:
      1. grep -n "criminal-justice" app/policy/criminal-justice/toc-content.ts
    Expected Result: ID contains double hyphen if heading has em dash
    Evidence: .sisyphus/evidence/task-9-em-dash-corrected.log

  Scenario: Philosophy TOC from JSX
    Tool: Bash
    Steps:
      1. grep -c '"id"' app/philosophy/toc-content.ts
    Expected Result: Non-zero count (TOC generated from JSX)
    Evidence: .sisyphus/evidence/task-9-philosophy-toc.log
  ```

  **Commit**: YES
  - Message: `chore: regenerate all TOC files with github-slugger`
  - Files: All `**/toc-content.ts` and `**/toc.tsx`

- [x] 10. **Regenerate bylaws (bun run generate-bylaws)**

  **What to do**:
  - Run `bun run generate-bylaws` to regenerate `app/bylaws/bylaws.ts`.
  - Verify the generated file includes metadata from the new `<BylawMeta>` components (title, description, order).
  - Verify `bun run typecheck` passes.

  **Must NOT do**:
  - Do NOT manually edit the generated file.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 9 and 11)
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 8 (BylawMeta must be in MDX files first)

  **References**:
  - `scripts/generate-bylaws.ts` — generator script
  - `app/bylaws/bylaws.ts` — generated output

  **Acceptance Criteria**:
  - [ ] `bun run generate-bylaws` exits 0
  - [ ] `app/bylaws/bylaws.ts` contains BylawMeta-derived metadata
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Bylaws regenerated
    Tool: Bash
    Steps:
      1. bun run generate-bylaws
      2. grep -c "BylawMeta" app/bylaws/bylaws.ts
    Expected Result: Exit 0; metadata present
    Evidence: .sisyphus/evidence/task-10-bylaws-regen.log
  ```

  **Commit**: YES (grouped with Task 9)
  - Message: `chore: regenerate bylaws with BylawMeta metadata`
  - Files: `app/bylaws/bylaws.ts`

- [x] 11. **Regenerate navigation (bun run generate-navigation)**

  **What to do**:
  - Run `bun run generate-navigation` to regenerate `lib/nav/*.json`.
  - Verify the script completes without errors.
  - Note: This will NOT yet include bylaws (that's Task 21). This is just a smoke test to ensure the generator still works after all changes.

  **Must NOT do**:
  - Do NOT expect bylaws to appear in nav yet.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 9-10)
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `scripts/generate-navigation.ts` — generator script

  **Acceptance Criteria**:
  - [ ] `bun run generate-navigation` exits 0
  - [ ] `lib/nav/*.json` files are updated (git diff)

  **QA Scenarios**:
  ```
  Scenario: Navigation regenerated
    Tool: Bash
    Steps:
      1. bun run generate-navigation
      2. git diff --stat lib/nav/
    Expected Result: Exit 0; nav files updated
    Evidence: .sisyphus/evidence/task-11-nav-regen.log
  ```

  **Commit**: YES (grouped with Tasks 9-10)
  - Message: `chore: regenerate navigation`
  - Files: `lib/nav/*.json`, `lib/nav/index.ts`

- [ ] 12. **Wire events/[slug] TOC sidebar**

  **What to do**:
  - Open `app/events/[slug]/page.tsx`.
  - The page already has `<div className="flex">` wrapper. Add `<aside>` with `<TableOfContents />` following the exact pattern from `app/policy/immigration/page.tsx`.
  - Import `{ TableOfContents } from "./toc"`.
  - Verify the page layout matches the standard 2-column flex pattern.

  **Must NOT do**:
  - Do NOT change the main content area.
  - Do NOT create new TOC files — they already exist (generated by `generate-toc.ts`).

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 13-18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9 (TOC files must be regenerated first)

  **References**:
  - `app/events/[slug]/page.tsx` — page to modify
  - `app/policy/immigration/page.tsx` — reference pattern

  **Acceptance Criteria**:
  - [ ] `app/events/[slug]/page.tsx` imports `TableOfContents`
  - [ ] Page renders `<aside>` with `<TableOfContents />`
  - [ ] Layout matches standard 2-col flex pattern

  **QA Scenarios**:
  ```
  Scenario: Events page has TOC sidebar
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/events/\[slug\]/page.tsx
    Expected Result: Import and JSX usage found
    Evidence: .sisyphus/evidence/task-12-events-toc.log
  ```

  **Commit**: YES
  - Message: `feat(events): add TOC sidebar to event detail pages`
  - Files: `app/events/[slug]/page.tsx`

- [ ] 13. **Wire notes/[slug] TOC sidebar**

  **What to do**:
  - Same as Task 12 but for `app/notes/[slug]/page.tsx`.
  - Import `{ TableOfContents } from "./toc"` and add `<aside>` with `<TableOfContents />`.

  **Must NOT do**:
  - Same guardrails as Task 12.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12, 14-18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `app/notes/[slug]/page.tsx` — page to modify
  - `app/policy/immigration/page.tsx` — reference pattern

  **Acceptance Criteria**:
  - [ ] Same as Task 12

  **QA Scenarios**:
  ```
  Scenario: Notes page has TOC sidebar
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/notes/\[slug\]/page.tsx
    Expected Result: Import and JSX usage found
    Evidence: .sisyphus/evidence/task-13-notes-toc.log
  ```

  **Commit**: YES
  - Message: `feat(notes): add TOC sidebar to note detail pages`
  - Files: `app/notes/[slug]/page.tsx`

- [ ] 14. **Wire governance/members TOC sidebar**

  **What to do**:
  - Open `app/governance/members/page.tsx`.
  - Add the standard 2-column flex wrapper (`<div className="flex">`) around `<main>`.
  - Add `<aside>` with `<TableOfContents />`.
  - Import `{ TableOfContents } from "./toc"`.

  **Must NOT do**:
  - Do NOT change existing `<main>` content.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12-13, 15-18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `app/governance/members/page.tsx` — page to modify
  - `app/policy/immigration/page.tsx` — reference for flex + aside pattern

  **Acceptance Criteria**:
  - [ ] Page uses `<div className="flex">` wrapper
  - [ ] `<aside>` with `<TableOfContents />` present
  - [ ] Import statement added

  **QA Scenarios**:
  ```
  Scenario: Governance members page has TOC
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/governance/members/page.tsx
      2. grep -n "className=\"flex\"" app/governance/members/page.tsx
    Expected Result: Both found
    Evidence: .sisyphus/evidence/task-14-governance-members-toc.log
  ```

  **Commit**: YES
  - Message: `feat(governance): add TOC sidebar to members page`
  - Files: `app/governance/members/page.tsx`

- [ ] 15. **Wire governance/members/awfixer TOC sidebar**

  **What to do**:
  - Same as Task 14 for `app/governance/members/awfixer/page.tsx`.
  - Add flex wrapper, aside, and TableOfContents import.

  **Must NOT do**:
  - Same guardrails as Task 14.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12-14, 16-18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `app/governance/members/awfixer/page.tsx` — page to modify

  **Acceptance Criteria**:
  - [ ] Same as Task 14

  **QA Scenarios**:
  ```
  Scenario: Awfixer page has TOC
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/governance/members/awfixer/page.tsx
    Expected Result: Found
    Evidence: .sisyphus/evidence/task-15-awfixer-toc.log
  ```

  **Commit**: YES
  - Message: `feat(governance): add TOC sidebar to awfixer page`
  - Files: `app/governance/members/awfixer/page.tsx`

- [ ] 16. **Wire ideas/gladiator TOC sidebar**

  **What to do**:
  - Same as Task 14 for `app/ideas/gladiator/page.tsx`.
  - Add flex wrapper, aside, and TableOfContents import.

  **Must NOT do**:
  - Same guardrails as Task 14.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12-15, 17-18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `app/ideas/gladiator/page.tsx` — page to modify

  **Acceptance Criteria**:
  - [ ] Same as Task 14

  **QA Scenarios**:
  ```
  Scenario: Gladiator page has TOC
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/ideas/gladiator/page.tsx
    Expected Result: Found
    Evidence: .sisyphus/evidence/task-16-gladiator-toc.log
  ```

  **Commit**: YES
  - Message: `feat(ideas): add TOC sidebar to gladiator page`
  - Files: `app/ideas/gladiator/page.tsx`

- [ ] 17. **Wire ideas/world-fairs TOC sidebar**

  **What to do**:
  - Same as Task 14 for `app/ideas/world-fairs/page.tsx`.
  - Add flex wrapper, aside, and TableOfContents import.

  **Must NOT do**:
  - Same guardrails as Task 14.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12-16, 18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `app/ideas/world-fairs/page.tsx` — page to modify

  **Acceptance Criteria**:
  - [ ] Same as Task 14

  **QA Scenarios**:
  ```
  Scenario: World-fairs page has TOC
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/ideas/world-fairs/page.tsx
    Expected Result: Found
    Evidence: .sisyphus/evidence/task-17-world-fairs-toc.log
  ```

  **Commit**: YES
  - Message: `feat(ideas): add TOC sidebar to world-fairs page`
  - Files: `app/ideas/world-fairs/page.tsx`

- [ ] 18. **Wire bylaws/[slug] TOC sidebar**

  **What to do**:
  - Open `app/bylaws/[slug]/page.tsx`.
  - The page currently uses `BylawsLayout` with a custom sidebar (`BylawsNav`). Add the standard TOC sidebar (`<aside>` with `<TableOfContents />`) in addition to or integrated with the existing layout.
  - Since `BylawsLayout` already provides a sidebar, the simplest approach is to import `TableOfContents` inside the page and render it within the `BylawsLayout` or alongside it. Review `BylawsLayout` props to see if it accepts children for a TOC area.
  - If `BylawsLayout` doesn't support a TOC slot, add the standard `<div className="flex">` + `<aside>` pattern around the `BylawsLayout` or modify `BylawsLayout` to accept a `toc` prop.

  **Must NOT do**:
  - Do NOT remove the existing `BylawsNav` sidebar.
  - Do NOT break the bylaws navigation active state.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 12-17)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Task 9, Task 10 (bylaws regenerated)

  **References**:
  - `app/bylaws/[slug]/page.tsx` — page to modify
  - `components/BylawsNav/BylawsLayout.tsx` — existing layout component
  - `app/policy/immigration/page.tsx` — reference for TOC sidebar pattern

  **Acceptance Criteria**:
  - [ ] Bylaws detail pages render a TOC sidebar
  - [ ] Existing `BylawsNav` sidebar still works
  - [ ] No layout breakage

  **QA Scenarios**:
  ```
  Scenario: Bylaws page has TOC
    Tool: Bash (grep)
    Steps:
      1. grep -n "TableOfContents" app/bylaws/\[slug\]/page.tsx
    Expected Result: Import and usage found
    Evidence: .sisyphus/evidence/task-18-bylaws-toc.log
  ```

  **Commit**: YES
  - Message: `feat(bylaws): add TOC sidebar to bylaw detail pages`
  - Files: `app/bylaws/[slug]/page.tsx`, possibly `components/BylawsNav/BylawsLayout.tsx`

- [ ] 19. **Add Bylaws dropdown to SiteNav**

  **What to do**:
  - Open the SiteNav component (likely `components/SiteNav.tsx` or similar — find the main navigation component).
  - Add a new "Bylaws" dropdown with entries for each bylaw section (Governance, Membership, Voting, Proxy Voting).
  - Follow the exact same pattern as existing dropdowns (Core, Policy, Governance, Events, Plans, Ideas).
  - The dropdown items should link to `/bylaws/governance`, `/bylaws/membership`, `/bylaws/voting`, `/bylaws/voting/proxy`.

  **Must NOT do**:
  - Do NOT hardcode the list of bylaws — import from `lib/nav/bylaws.json` (created in Task 20).
  - Do NOT change existing dropdowns.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 20-22)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: Task 20 (bylaws.json must exist first, or use placeholder)

  **References**:
  - `components/SiteNav.tsx` (or equivalent) — main nav component
  - `lib/nav/governance.json` — example nav data file

  **Acceptance Criteria**:
  - [ ] "Bylaws" dropdown exists in SiteNav
  - [ ] Dropdown contains correct bylaw links
  - [ ] Styling matches existing dropdowns

  **QA Scenarios**:
  ```
  Scenario: Bylaws dropdown visible
    Tool: Bash (grep)
    Steps:
      1. grep -n "Bylaws" components/SiteNav.tsx
    Expected Result: Dropdown label and items found
    Evidence: .sisyphus/evidence/task-19-bylaws-dropdown.log
  ```

  **Commit**: YES
  - Message: `feat(nav): add Bylaws dropdown to SiteNav`
  - Files: `components/SiteNav.tsx` (or equivalent)

- [ ] 20. **Create lib/nav/bylaws.json**

  **What to do**:
  - Create `lib/nav/bylaws.json` with the bylaw navigation structure.
  - Follow the exact schema of existing `lib/nav/*.json` files (array of `{title, href}` objects or whatever the existing schema is).
  - Include entries for: Governance, Membership, Voting, Proxy Voting.

  **Must NOT do**:
  - Do NOT invent a new schema — match existing nav JSON files exactly.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 19, 21-22)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 19 (SiteNav imports this file)
  - **Blocked By**: None

  **References**:
  - `lib/nav/governance.json` — schema reference
  - `app/bylaws/bylaws.ts` — generated bylaw data (for titles)

  **Acceptance Criteria**:
  - [ ] `lib/nav/bylaws.json` exists
  - [ ] Schema matches other `lib/nav/*.json` files
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Bylaws nav JSON valid
    Tool: Bash (node)
    Steps:
      1. node -e "const nav = require('./lib/nav/bylaws.json'); console.log(JSON.stringify(nav, null, 2));"
    Expected Result: Valid JSON array with bylaw entries
    Evidence: .sisyphus/evidence/task-20-bylaws-json.log
  ```

  **Commit**: YES
  - Message: `feat(nav): create bylaws navigation data`
  - Files: `lib/nav/bylaws.json`

- [ ] 21. **Update generate-navigation.ts to discover bylaws**

  **What to do**:
  - Open `scripts/generate-navigation.ts`.
  - Add a new section that discovers bylaw pages from `app/bylaws/bylaws.ts` or from the bylaw MDX files directly.
  - Generate `lib/nav/bylaws.json` automatically at build time.
  - Follow the existing pattern used for policy, plans, ideas, etc.

  **Must NOT do**:
  - Do NOT hardcode bylaw entries — discover them dynamically.
  - Do NOT break existing nav generation.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 19-20, 22)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `scripts/generate-navigation.ts` — generator to modify
  - `app/bylaws/bylaws.ts` — generated bylaw data

  **Acceptance Criteria**:
  - [ ] `bun run generate-navigation` produces `lib/nav/bylaws.json`
  - [ ] Generated JSON matches schema of other nav files
  - [ ] Existing nav files still generated correctly

  **QA Scenarios**:
  ```
  Scenario: Navigation generator includes bylaws
    Tool: Bash
    Steps:
      1. bun run generate-navigation
      2. cat lib/nav/bylaws.json
    Expected Result: Bylaws JSON generated with correct entries
    Evidence: .sisyphus/evidence/task-21-nav-generator-bylaws.log
  ```

  **Commit**: YES
  - Message: `feat(scripts): add bylaws discovery to generate-navigation`
  - Files: `scripts/generate-navigation.ts`

- [ ] 22. **Harmonize breakpoints (768px vs 1024px)**

  **What to do**:
  - Find all breakpoint usages across nav/TOC components.
  - `components/BylawsNav/usePopout.ts` uses 768px.
  - `hooks/use-mobile.ts` uses 1024px.
  - Decide on a single breakpoint (recommend 1024px to match `use-mobile` since it's more widely used).
  - Update `usePopout.ts` to use 1024px instead of 768px, OR update `use-mobile.ts` to use 768px.
  - Document the chosen breakpoint in a comment.

  **Must NOT do**:
  - Do NOT change Tailwind config breakpoints.
  - Do NOT change CSS media queries unless they are in the components being fixed.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 19-21)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `components/BylawsNav/usePopout.ts` — 768px breakpoint
  - `hooks/use-mobile.ts` — 1024px breakpoint

  **Acceptance Criteria**:
  - [ ] All nav/TOC components use the same breakpoint
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Breakpoints harmonized
    Tool: Bash (grep)
    Steps:
      1. grep -r "768" components/BylawsNav/
      2. grep -r "1024" hooks/
    Expected Result: Only one breakpoint value present across both
    Evidence: .sisyphus/evidence/task-22-breakpoints.log
  ```

  **Commit**: YES
  - Message: `fix(nav): harmonize breakpoints across navigation components`
  - Files: `components/BylawsNav/usePopout.ts` or `hooks/use-mobile.ts`

- [ ] 23. **Create generate-proposals.ts script**

  **What to do**:
  - Copy `scripts/generate-bylaws.ts` to `scripts/generate-proposals.ts`.
  - Adapt it for policy proposals:
    - Source directory: `app/proposals/` (to be created in Task 24).
    - Output file: `app/proposals/proposals.ts`.
    - Parse `<ProposalMeta title="..." description="..." category="..." />` from MDX files (or reuse BylawMeta pattern if preferred).
    - Generate a navigation tree and section list.
    - Support deeply nested directories (e.g., `app/proposals/healthcare/reform/content.mdx`).
  - The script must be generic — work for any number of proposal MDX files.

  **Must NOT do**:
  - Do NOT hardcode proposal categories or titles.
  - Do NOT modify the original `generate-bylaws.ts`.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 24-25)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: Task 2 (understanding of generator patterns)

  **References**:
  - `scripts/generate-bylaws.ts` — template to adapt
  - `scripts/generate-toc.ts` — for nested directory walking pattern
  - `app/bylaws/bylaws.ts` — example generated output

  **Acceptance Criteria**:
  - [ ] `scripts/generate-proposals.ts` exists and runs without errors
  - [ ] Script discovers all `content.mdx` files under `app/proposals/`
  - [ ] Script generates `app/proposals/proposals.ts` with nav tree and sections
  - [ ] `bun run generate-proposals` added to package.json scripts

  **QA Scenarios**:
  ```
  Scenario: Proposal generator runs
    Tool: Bash
    Steps:
      1. bun run generate-proposals
      2. ls app/proposals/proposals.ts
    Expected Result: Exit 0; file exists
    Evidence: .sisyphus/evidence/task-23-proposal-generator.log
  ```

  **Commit**: YES
  - Message: `feat(scripts): add policy proposal generator`
  - Files: `scripts/generate-proposals.ts`

- [ ] 24. **Create app/proposals/ directory structure**

  **What to do**:
  - Create `app/proposals/` directory.
  - Create subdirectories for initial proposal categories (suggested: `healthcare/`, `climate/`, `economy/`, `education/` — or whatever matches the user's policy areas).
  - Each category directory should contain:
    - `content.mdx` — a placeholder MDX file with a `##` heading and `<ProposalMeta>`.
    - `page.tsx` — following the standard pattern (imports Content, TableOfContents, metadata).
    - `layout.tsx` (optional) — if needed.
  - Create `app/proposals/page.tsx` — landing page listing all proposals.
  - The structure should mirror `app/bylaws/` and `app/policy/`.

  **Must NOT do**:
  - Do NOT create hundreds of pages now — just the directory structure and a few placeholder examples.
  - Do NOT hardcode proposal content — use placeholder text.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 23, 25)
  - **Parallel Group**: Wave 5
  - **Blocks**: Task 23 (generator needs source directory)
  - **Blocked By**: None

  **References**:
  - `app/bylaws/page.tsx` — landing page pattern
  - `app/policy/immigration/page.tsx` — detail page pattern
  - `app/bylaws/[slug]/page.tsx` — dynamic route pattern

  **Acceptance Criteria**:
  - [ ] `app/proposals/` directory exists with category subdirectories
  - [ ] Each category has `content.mdx` and `page.tsx`
  - [ ] Proposal landing page (`app/proposals/page.tsx`) lists categories
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:
  ```
  Scenario: Proposal structure created
    Tool: Bash
    Steps:
      1. find app/proposals -type f | sort
    Expected Result: Directory tree with page.tsx, content.mdx files
    Evidence: .sisyphus/evidence/task-24-proposal-structure.log
  ```

  **Commit**: YES
  - Message: `feat(proposals): create policy proposal directory structure`
  - Files: `app/proposals/**`

- [ ] 25. **Create proposal nav components + add to SiteNav**

  **What to do**:
  - Create proposal navigation components (adapted from `components/BylawsNav/`):
    - `components/ProposalsNav/ProposalsLayout.tsx`
    - `components/ProposalsNav/ProposalsNav.tsx`
    - `components/ProposalsNav/NavItem.tsx` (can reuse or adapt BylawsNav/NavItem)
  - The nav should display proposal categories and sub-items from `app/proposals/proposals.ts`.
  - Add "Proposals" to SiteNav dropdowns.
  - Update `generate-navigation.ts` (Task 21) to also discover proposals.

  **Must NOT do**:
  - Do NOT hardcode proposal categories in the nav components.
  - Do NOT duplicate BylawsNav code if it can be reused generically.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 23-24)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: Task 23 (proposals.ts must be generated)

  **References**:
  - `components/BylawsNav/` — pattern to adapt
  - `components/SiteNav.tsx` — where to add "Proposals" dropdown

  **Acceptance Criteria**:
  - [ ] Proposal nav components exist and render correctly
  - [ ] "Proposals" dropdown in SiteNav links to proposal categories
  - [ ] Proposal landing page accessible from nav

  **QA Scenarios**:
  ```
  Scenario: Proposals nav works
    Tool: Bash (grep)
    Steps:
      1. grep -rn "Proposals" components/SiteNav.tsx
      2. ls components/ProposalsNav/
    Expected Result: Dropdown label found; nav components exist
    Evidence: .sisyphus/evidence/task-25-proposals-nav.log
  ```

  **Commit**: YES
  - Message: `feat(proposals): add proposal navigation components and SiteNav entry`
  - Files: `components/ProposalsNav/**`, `components/SiteNav.tsx`

---

## Final Verification Wave

### Wave 6 (After ALL implementation tasks)

- [ ] 26. **TypeScript Check**

  **What to do**:
  - Run `bun run typecheck`.
  - If any errors exist, fix them (may require small adjustments to any of the changed files).
  - Re-run until zero errors.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 27-29)
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: ALL previous tasks

  **Acceptance Criteria**:
  - [ ] `bun run typecheck` exits 0

  **QA Scenarios**:
  ```
  Scenario: TypeScript clean
    Tool: Bash
    Steps:
      1. bun run typecheck
    Expected Result: Exit code 0, no errors
    Evidence: .sisyphus/evidence/task-26-typecheck.log
  ```

  **Commit**: YES (if fixes needed)
  - Message: `fix: resolve TypeScript errors`

- [ ] 27. **Full Build**

  **What to do**:
  - Run `bun run build`.
  - This runs all generators in order: generate-navigation → generate-toc → generate-events → generate-bylaws → generate-notes → next build.
  - Must complete with zero errors.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 26, 28-29)
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: ALL previous tasks

  **Acceptance Criteria**:
  - [ ] `bun run build` exits 0

  **QA Scenarios**:
  ```
  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. bun run build
    Expected Result: Exit code 0
    Evidence: .sisyphus/evidence/task-27-build.log
  ```

  **Commit**: NO (build artifacts are ephemeral)

- [ ] 28. **TOC Click QA**

  **What to do**:
  - Start dev server (`bun run dev`).
  - Use Playwright to visit each affected page and click TOC entries.
  - Verify smooth scroll to correct heading (check element position in viewport).
  - Pages to test: philosophy, policy/criminal-justice, policy/energy, policy/fiscal-transparency, policy/foreign-policy, policy/labor, policy/anti-corruption, events/*, notes/*, governance/members, ideas/gladiator, ideas/world-fairs, bylaws/*.
  - For each page, test at least one heading with an em dash (if applicable) and one normal heading.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 26-27, 29)
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: ALL previous tasks

  **Acceptance Criteria**:
  - [ ] All tested TOC entries scroll to correct heading
  - [ ] No console warnings about missing elements

  **QA Scenarios**:
  ```
  Scenario: Philosophy TOC clicks work
    Tool: Playwright
    Steps:
      1. Navigate to /philosophy
      2. Click "The Core Philosophy: Fix the Incentive" in TOC
      3. Assert heading is in viewport
    Expected Result: Page scrolls to heading; no console warning
    Evidence: .sisyphus/evidence/task-28-philosophy-toc.png

  Scenario: Em dash heading click works
    Tool: Playwright
    Steps:
      1. Navigate to /policy/criminal-justice
      2. Click "Criminal Justice — Accountability, Reform, and the Value of Useful Work" in TOC
      3. Assert heading is in viewport
    Expected Result: Page scrolls to heading; no console warning
    Evidence: .sisyphus/evidence/task-28-em-dash-toc.png
  ```

  **Commit**: NO

- [ ] 29. **Navigation + Template QA**

  **What to do**:
  - Verify Bylaws dropdown in SiteNav has correct entries and links work.
  - Verify policy proposals directory structure exists.
  - Verify `bun run generate-proposals` runs successfully.
  - Verify breakpoints are consistent (check `usePopout.ts` and `use-mobile.ts`).

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 26-28)
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: ALL previous tasks

  **Acceptance Criteria**:
  - [ ] Bylaws dropdown visible and functional
  - [ ] Proposals generator runs
  - [ ] Breakpoints consistent

  **QA Scenarios**:
  ```
  Scenario: Bylaws nav works
    Tool: Bash (grep)
    Steps:
      1. grep -r "Bylaws" components/SiteNav.tsx
      2. bun run generate-proposals
    Expected Result: Dropdown found; generator exits 0
    Evidence: .sisyphus/evidence/task-29-nav-template.log
  ```

  **Commit**: NO

---

## Commit Strategy

- **Wave 1 commits:** Grouped by concern (generators, components, content, bylaws)
- **Wave 2 commits:** Single commit: "regenerate all TOC and bylaws files"
- **Wave 3 commits:** One per page wiring task
- **Wave 4 commits:** "add bylaws navigation" (single commit)
- **Wave 5 commits:** "add policy proposal template system"
- **Wave 6 commits:** "fix build errors" (if any)

---

## Success Criteria

### Verification Commands
```bash
bun run typecheck        # Expected: 0 errors
bun run build            # Expected: success exit code
```

### Final Checklist
- [ ] All "Must Have" items implemented
- [ ] All "Must NOT Have" guardrails respected
- [ ] `bun run generate-toc` produces correct IDs for .mdx AND .tsx content
- [ ] All pages with TOC can navigate to every heading
- [ ] Bylaws reachable from SiteNav
- [ ] Policy proposal generator runs successfully
- [ ] Zero TypeScript errors
- [ ] `bun run build` completes successfully
