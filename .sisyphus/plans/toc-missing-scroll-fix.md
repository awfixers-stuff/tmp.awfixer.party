# Fix TableOfContents: Missing Sidebars & Broken Scroll Navigation

## TL;DR

> **Quick Summary**: Add the TableOfContents sidebar to all pages except bylaws (~12 pages/routes) and fix the scroll-to-anchor behavior that is currently broken on every page due to silent failures in the click handler and potential heading ID mismatches.
>
> **Deliverables**:
> - ToC sidebar present on all non-bylaws pages (4 static content, 2 dynamic routes, 1 home, 6 listing pages)
> - Scroll-to-anchor works reliably on desktop and mobile
> - Philosophy page ToC aligned with its actual rendered content
> - URL hash updates when clicking ToC links
> - Duplicate heading IDs handled in toc generation
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 2 → Tasks 3-10 → Task 11 → F1-F4

---

## Context

### Original Request
The TableOfContents navigation sidebar is missing from pages where it should appear (every page except bylaws), and clicking a ToC header does not scroll to that heading on the page.

### Interview Summary
**Key Discussions**:
- User wants ToC on **every page except bylaws** (including listing/index pages)
- Scroll-to-anchor is **broken on all pages** universally
- Bylaws section correctly uses its own sidebar nav and must not be touched

**Research Findings**:
- `components/toc.tsx` uses `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })` — the `?.` causes **silent failures** when IDs don't match or are missing
- Missing `block: "start"` in `scrollIntoView` call
- **Philosophy page** renders from `philosophy-content-new.tsx` but ToC was generated from old `content.mdx` → IDs don't match at all
- 3 headings in `philosophy-content-new.tsx` have **no `id` attributes** (plain JSX, not MDX)
- `generate-toc.ts` doesn't handle **duplicate heading IDs**
- MDX custom components in `app/mdx-components.tsx` spread `{...props}` which should include `id` from `rehype-slug`
- 4 static content pages have orphaned `toc.tsx` files: `governance/members`, `governance/members/awfixer`, `ideas/world-fairs`, `ideas/gladiator`
- 2 dynamic routes cover 11 content pages without ToC: `events/[slug]` (3 events), `notes/[slug]` (8 notes)
- Homepage has `home-toc.tsx` but doesn't render it
- Listing pages (`events`, `notes`, `plans/*` sub-indices) have no `content.mdx` — need custom ToC

### Metis Review
**Identified Gaps** (addressed in plan):
- **Listing pages ToC**: Defaulting to custom child-links ToC (following existing `PlansTOC`/`PlatformTOC` pattern)
- **Hash update on click**: Defaulting to YES — update `window.location.hash` for shareable URLs
- **Philosophy authority**: Defaulting to regenerating ToC from the actually rendered content
- **rehype-slug verification**: Included as Task 2 — inspect DOM and fix if IDs are missing
- **Keyboard accessibility**: Ensure ToC items use proper `<a href="#id">` elements

---

## Work Objectives

### Core Objective
Ensure the TableOfContents sidebar appears on every page except the bylaws section, and clicking any ToC item reliably scrolls to the corresponding heading with smooth animation and URL hash update.

### Concrete Deliverables
- Updated `components/toc.tsx` and `components/mobile-toc.tsx` with robust scroll handling
- Updated `app/page.tsx` with homepage ToC sidebar
- Updated `app/governance/members/page.tsx` and `app/governance/members/awfixer/page.tsx`
- Updated `app/ideas/world-fairs/page.tsx` and `app/ideas/gladiator/page.tsx`
- Updated `app/events/[slug]/page.tsx` with per-event ToC
- Updated `app/notes/[slug]/page.tsx` with per-note ToC
- Custom ToC components for listing pages (events, notes, plans sub-indices)
- Fixed `app/philosophy/page.tsx` ToC alignment
- Updated `scripts/generate-toc.ts` with duplicate ID handling

### Definition of Done
- [ ] `curl -s http://localhost:3000/{page} | grep -o 'aside.*lg:block'` returns a match for every non-bylaws page
- [ ] `curl -s http://localhost:3000/bylaws/article-1 | grep -o 'TableOfContents'` returns no match
- [ ] Playwright test: clicking any ToC link scrolls to the target heading and updates URL hash

### Must Have
- ToC sidebar on every page route except `/bylaws/*`
- Scroll-to-anchor works on all pages with a ToC
- URL hash updates when clicking ToC links
- Philosophy page ToC matches its rendered content

### Must NOT Have (Guardrails)
- **No changes to bylaws section** (`app/bylaws/`, `BylawsLayout`)
- **No modifications to `content.mdx` files**
- **No changes to ToC visual styling** (colors, sizing, fonts)
- **No new dependencies**
- **No refactoring beyond scroll fix and ToC wiring**

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO — no jest/vitest/pytest found in project
- **Automated tests**: None — project has no test framework
- **Primary verification**: Agent-executed QA via Playwright (browser), Bash (curl), and dev server inspection

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Assert HTML contains expected elements
- **DOM inspection**: Use dev server + curl/grep — Verify heading IDs exist

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — shared fixes, all independent):
├── Task 1: Fix scroll-to-anchor handler + hash update [quick]
├── Task 2: Investigate & fix systemic heading ID issue [deep]
├── Task 3: Fix philosophy page ToC/content mismatch [quick]
└── Task 4: Wire up homepage ToC sidebar [quick]

Wave 2 (After Wave 1 — content pages, MAX PARALLEL):
├── Task 5: Add ToC to governance members pages [quick]
├── Task 6: Add ToC to ideas pages [quick]
├── Task 7: Add ToC to events/[slug] dynamic route [unspecified-high]
└── Task 8: Add ToC to notes/[slug] dynamic route [unspecified-high]

Wave 3 (After Wave 2 — listing pages + generation):
├── Task 9: Add ToC to events & notes listing pages [quick]
├── Task 10: Add ToC to plans sub-listing pages [quick]
└── Task 11: Run generate-toc, fix duplicate ID handling [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high + playwright skill)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: Task 1 → Task 2 → Tasks 3-10 → Task 11 → F1-F4 → user okay
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 1)
```

### Dependency Matrix

| Task | Blocked By | Blocks |
|------|-----------|--------|
| 1 | None | F1-F4 |
| 2 | None | 3, 5-10, F1-F4 |
| 3 | 2 | F1-F4 |
| 4 | None | F1-F4 |
| 5 | 2 | F1-F4 |
| 6 | 2 | F1-F4 |
| 7 | 2 | F1-F4 |
| 8 | 2 | F1-F4 |
| 9 | 2 | F1-F4 |
| 10 | 2 | F1-F4 |
| 11 | 3, 5-10 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 4 tasks → T1 `quick`, T2 `deep`, T3 `quick`, T4 `quick`
- **Wave 2**: 4 tasks → T5 `quick`, T6 `quick`, T7 `unspecified-high`, T8 `unspecified-high`
- **Wave 3**: 3 tasks → T9 `quick`, T10 `quick`, T11 `quick`
- **FINAL**: 4 tasks → F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

- [ ] 1. Fix scroll-to-anchor handler and add URL hash update

  **What to do**:
  - Edit `components/toc.tsx`: update `handleClick` to add `block: "start"` to `scrollIntoView`
  - Update `handleClick` to also set `window.location.hash = id` for shareable URLs
  - Add a non-silent error path: if `document.getElementById(id)` returns null, log a clear console error so future mismatches are debuggable
  - Apply identical fixes to `components/mobile-toc.tsx`
  - Ensure ToC items render as `<a href="#id">` elements (not just `<button>`) for keyboard accessibility and native anchor behavior

  **Must NOT do**:
  - Do not change ToC styling, colors, fonts, or animation
  - Do not refactor the IntersectionObserver or highlighting logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small, focused component changes with clear scope
  - **Skills**: `frontend-ui-ux`
    - `frontend-ui-ux`: Needed for accessibility best practices (proper `<a>` tags, focus states)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Final Verification (F1-F4)
  - **Blocked By**: None

  **References**:
  - `components/toc.tsx:42-44` — Current `handleClick` implementation
  - `components/mobile-toc.tsx` — Mobile ToC with same scroll logic
  - `app/globals.css:131-138` — `scroll-padding-top` and `scroll-margin-top` CSS
  - AGENTS.md — `app/mdx-components.tsx` spreads `{...props}` which should pass `id`

  **Acceptance Criteria**:
  - [ ] `components/toc.tsx` uses `scrollIntoView({ behavior: "smooth", block: "start" })`
  - [ ] Clicking a ToC item updates `window.location.hash` to the heading ID
  - [ ] Missing element logs a clear console error instead of failing silently
  - [ ] ToC items are keyboard-focusable `<a>` elements with `href="#id"`
  - [ ] Same changes applied to `components/mobile-toc.tsx`

  **QA Scenarios**:

  ```
  Scenario: Happy path — click ToC link scrolls to heading
    Tool: Playwright
    Preconditions: Dev server running, navigate to /policy/technology
    Steps:
      1. Wait for page load, take screenshot
      2. Click first ToC link in aside (e.g., "Technology & AI Policy")
      3. Wait 1s for smooth scroll animation
      4. Assert: window.scrollY > 0
      5. Assert: target heading is in viewport (bounding box top < 200)
      6. Assert: window.location.hash matches the heading ID
    Expected Result: Page scrolls to heading, hash updates
    Failure Indicators: scrollY unchanged, hash empty, target not in viewport
    Evidence: .sisyphus/evidence/task-1-scroll-happy.png

  Scenario: Keyboard navigation — Tab to ToC link and press Enter
    Tool: Playwright
    Preconditions: Dev server running, navigate to /policy/technology
    Steps:
      1. Press Tab until focus reaches first ToC link
      2. Press Enter
      3. Assert: page scrolls to target heading
    Expected Result: Keyboard users can navigate via ToC
    Evidence: .sisyphus/evidence/task-1-keyboard.png
  ```

  **Evidence to Capture**:
  - [ ] Screenshot of scrolled page with heading in view
  - [ ] Screenshot showing URL hash in address bar
  - [ ] Browser console showing no errors on valid clicks

  **Commit**: YES
  - Message: `fix(toc): add scroll handler robustness and hash updates`
  - Files: `components/toc.tsx`, `components/mobile-toc.tsx`

- [ ] 2. Investigate and fix systemic heading ID issue

  **What to do**:
  - Start dev server (`bun run dev`), open a working page (e.g., `/policy/technology`) in a browser
  - Inspect the DOM: check if `<h2>` and `<h3>` elements have `id` attributes matching `toc-content.ts` IDs
  - If IDs are missing: trace the MDX pipeline — verify `rehype-slug` is configured in `next.config.mjs`, verify `app/mdx-components.tsx` passes `id` prop through `{...props}`
  - If IDs are present but don't match `toc-content.ts`: identify the mismatch source (different slug algorithms, special characters, encoding)
  - Fix the root cause — could be MDX config, component props, or generate-toc script
  - Verify the fix on 2-3 different pages

  **Must NOT do**:
  - Do not modify any `content.mdx` files
  - Do not change rehype-slug version unless necessary

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires debugging the MDX compilation pipeline and understanding why heading IDs are absent or mismatched
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 3, 5-10, F1-F4
  - **Blocked By**: None

  **References**:
  - `next.config.mjs` — MDX config with `rehype-slug` plugin
  - `app/mdx-components.tsx` — Custom heading components
  - `scripts/generate-toc.ts` — Heading extraction and slug generation
  - `app/policy/technology/toc-content.ts` — Example generated ToC data
  - `app/policy/technology/content.mdx` — Example content to compare

  **Acceptance Criteria**:
  - [ ] Inspected DOM shows `<h2 id="...">` and `<h3 id="...">` on at least 2 pages
  - [ ] DOM IDs match the corresponding `toc-content.ts` IDs
  - [ ] Root cause documented in a brief comment or note

  **QA Scenarios**:

  ```
  Scenario: Verify heading IDs exist in rendered DOM
    Tool: Bash (curl + grep)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. curl -s http://localhost:3000/policy/technology > /tmp/tech.html
      2. grep -oP '<h[23][^>]*id="[^"]*"' /tmp/tech.html | head -5
      3. Assert: output contains at least 3 matches with non-empty IDs
      4. Compare IDs against app/policy/technology/toc-content.ts
      5. Assert: all toc IDs appear in the DOM
    Expected Result: Every toc-content.ts ID has a matching DOM element
    Failure Indicators: grep returns no IDs, or IDs don't match toc-content.ts
    Evidence: .sisyphus/evidence/task-2-dom-ids.txt

  Scenario: Verify heading IDs on second sample page
    Tool: Bash (curl + grep)
    Preconditions: Same as above
    Steps:
      1. curl -s http://localhost:3000/plans/prime-ministership/reasoning > /tmp/reasoning.html
      2. grep -oP '<h[23][^>]*id="[^"]*"' /tmp/reasoning.html | head -5
      3. Compare against app/plans/prime-ministership/reasoning/toc-content.ts
    Expected Result: IDs match
    Evidence: .sisyphus/evidence/task-2-dom-ids-2.txt
  ```

  **Evidence to Capture**:
  - [ ] Terminal output showing DOM IDs found
  - [ ] Diff or comparison showing IDs match toc-content.ts
  - [ ] If root cause found, screenshot or log of the fix applied

  **Commit**: YES (group with Task 1 if same commit cycle)
  - Message: `fix(toc): resolve heading ID generation in MDX pipeline`
  - Files: Depends on root cause (likely `next.config.mjs`, `app/mdx-components.tsx`, or `scripts/generate-toc.ts`)

- [ ] 3. Fix philosophy page ToC/content mismatch

  **What to do**:
  - Read `app/philosophy/page.tsx` — it imports content from `philosophy-content-new.tsx`, not `content.mdx`
  - Read `app/philosophy/philosophy-content-new.tsx` — identify all `##` and `###` headings
  - Add `id` attributes to the 3 headings that currently lack them (plain JSX headings without IDs)
  - Regenerate or manually create `app/philosophy/toc-content.ts` to match the actual rendered headings
  - Ensure `app/philosophy/toc.tsx` imports the updated `toc-content.ts`
  - Verify the ToC sidebar is already rendered in `page.tsx` (it is — this page already has ToC, just with wrong data)

  **Must NOT do**:
  - Do not revert the page to use old `content.mdx`
  - Do not modify the textual content of `philosophy-content-new.tsx`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward alignment of generated ToC with actual content
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (but verify Task 2 first if heading ID issue is systemic)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 11 (generate-toc), F1-F4
  - **Blocked By**: None (or Task 2 if systemic ID issue found)

  **References**:
  - `app/philosophy/page.tsx` — Page component importing `philosophy-content-new.tsx`
  - `app/philosophy/philosophy-content-new.tsx` — Actual rendered content with headings
  - `app/philosophy/toc-content.ts` — Currently generated from old content (mismatched)
  - `app/philosophy/toc.tsx` — ToC component importing toc-content.ts

  **Acceptance Criteria**:
  - [ ] All headings in `philosophy-content-new.tsx` have `id` attributes
  - [ ] `toc-content.ts` IDs match the heading IDs exactly
  - [ ] Clicking any philosophy ToC link scrolls to the correct heading

  **QA Scenarios**:

  ```
  Scenario: Philosophy ToC IDs match rendered headings
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/philosophy > /tmp/phil.html
      2. grep -oP '<h[23][^>]*id="[^"]*"' /tmp/phil.html | sort > /tmp/phil_dom_ids.txt
      3. cat app/philosophy/toc-content.ts | grep -oP '"[a-z0-9-]+"' | tr -d '"' | sort > /tmp/phil_toc_ids.txt
      4. diff /tmp/phil_dom_ids.txt /tmp/phil_toc_ids.txt
    Expected Result: No differences (or only expected differences like # prefix)
    Evidence: .sisyphus/evidence/task-3-philosophy-ids.txt

  Scenario: Click philosophy ToC link scrolls correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to /philosophy
      2. Click the last ToC link
      3. Assert: target heading is in viewport
      4. Assert: URL hash updated
    Expected Result: Scroll works for all ToC items
    Evidence: .sisyphus/evidence/task-3-philosophy-scroll.png
  ```

  **Commit**: YES
  - Message: `fix(toc): align philosophy page ToC with rendered content`
  - Files: `app/philosophy/philosophy-content-new.tsx`, `app/philosophy/toc-content.ts`

- [ ] 4. Wire up homepage ToC sidebar

  **What to do**:
  - Read `app/page.tsx` — understand current layout (hero + content sections)
  - Read `app/home-toc.tsx` — check if it's up to date with the homepage content
  - Add the standard flex + aside layout pattern to `app/page.tsx`
  - Import `TableOfContents` from `./home-toc` (or create `toc.tsx`/`toc-content.ts` if `home-toc.tsx` is stale)
  - Ensure the `<main>` element and `<aside>` follow the pattern from AGENTS.md template
  - If `home-toc.tsx` doesn't match current content, regenerate or update it

  **Must NOT do**:
  - Do not change the homepage hero section or visual design
  - Do not modify homepage content

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding existing ToC to existing page using established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: F1-F4
  - **Blocked By**: None

  **References**:
  - `app/page.tsx` — Homepage layout
  - `app/home-toc.tsx` — Existing (possibly stale) homepage ToC
  - `app/policy/technology/page.tsx` — Reference for the flex+aside pattern
  - AGENTS.md — Page template with `<div className="flex">`, `<main>`, `<aside>`

  **Acceptance Criteria**:
  - [ ] Homepage renders with ToC sidebar on desktop (hidden on mobile)
  - [ ] `curl -s http://localhost:3000/ | grep -o 'aside.*lg:block'` returns a match
  - [ ] ToC links are clickable and scroll to corresponding homepage sections

  **QA Scenarios**:

  ```
  Scenario: Homepage has ToC sidebar
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ > /tmp/home.html
      2. grep -o 'aside.*lg:block' /tmp/home.html
      3. Assert: grep finds at least one match
    Expected Result: ToC sidebar present in homepage HTML
    Evidence: .sisyphus/evidence/task-4-homepage-toc.txt

  Scenario: Homepage ToC link scrolls
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to /
      2. Click a ToC link
      3. Assert: page scrolls and hash updates
    Expected Result: Scroll navigation works on homepage
    Evidence: .sisyphus/evidence/task-4-homepage-scroll.png
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to homepage`
  - Files: `app/page.tsx`, `app/home-toc.tsx` (if updated)

- [ ] 5. Add ToC sidebar to governance members pages

  **What to do**:
  - Update `app/governance/members/page.tsx`: add `import { TableOfContents } from "./toc"`, wrap `<main>` in `<div className="flex">`, add `<aside>` with `<TableOfContents />`
  - Update `app/governance/members/awfixer/page.tsx`: same pattern
  - Both pages already have generated `toc.tsx` and `toc-content.ts` files that are currently unused
  - Ensure the `<main>` classes match the pattern (remove `max-w-3xl` if it conflicts with the flex layout, use `max-w-2xl` or `flex-1`)

  **Must NOT do**:
  - Do not modify `content.mdx` files in these directories
  - Do not change page metadata or exports

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two identical layout changes following an established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2 (if systemic heading ID issue affects these pages)

  **References**:
  - `app/governance/members/page.tsx` — Current layout without ToC
  - `app/governance/members/toc.tsx` — Generated but unused ToC component
  - `app/governance/members/awfixer/page.tsx` — Current layout without ToC
  - `app/governance/members/awfixer/toc.tsx` — Generated but unused ToC component
  - `app/policy/technology/page.tsx` — Reference for the flex+aside pattern

  **Acceptance Criteria**:
  - [ ] Both pages render ToC sidebar on desktop
  - [ ] `curl` verifies `aside` element present on both pages
  - [ ] ToC links scroll to correct headings

  **QA Scenarios**:

  ```
  Scenario: Governance members page has ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/governance/members | grep -o 'aside.*lg:block'
      2. Assert: finds match
    Expected Result: ToC sidebar present
    Evidence: .sisyphus/evidence/task-5-governance.txt

  Scenario: AWFixer profile page has ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/governance/members/awfixer | grep -o 'aside.*lg:block'
      2. Assert: finds match
    Expected Result: ToC sidebar present
    Evidence: .sisyphus/evidence/task-5-awfixer.txt
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to governance members pages`
  - Files: `app/governance/members/page.tsx`, `app/governance/members/awfixer/page.tsx`

- [ ] 6. Add ToC sidebar to ideas pages

  **What to do**:
  - Update `app/ideas/world-fairs/page.tsx`: add ToC import, flex+aside layout
  - Update `app/ideas/gladiator/page.tsx`: same pattern
  - Both pages have orphaned `toc.tsx` files
  - Note: `ideas/world-fairs/page.tsx` currently uses `max-w-3xl` — adjust to match the standard pattern

  **Must NOT do**:
  - Do not modify content.mdx files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2

  **References**:
  - `app/ideas/world-fairs/page.tsx`
  - `app/ideas/world-fairs/toc.tsx`
  - `app/ideas/gladiator/page.tsx`
  - `app/ideas/gladiator/toc.tsx`
  - `app/policy/technology/page.tsx` — Reference pattern

  **Acceptance Criteria**:
  - [ ] Both ideas pages render ToC sidebar
  - [ ] `curl` verifies `aside` element present
  - [ ] ToC links scroll correctly

  **QA Scenarios**:

  ```
  Scenario: World Fairs page has ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ideas/world-fairs | grep -o 'aside.*lg:block'
      2. Assert: finds match
    Expected Result: ToC sidebar present
    Evidence: .sisyphus/evidence/task-6-world-fairs.txt

  Scenario: Gladiator page has ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ideas/gladiator | grep -o 'aside.*lg:block'
      2. Assert: finds match
    Expected Result: ToC sidebar present
    Evidence: .sisyphus/evidence/task-6-gladiator.txt
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to ideas pages`
  - Files: `app/ideas/world-fairs/page.tsx`, `app/ideas/gladiator/page.tsx`

- [ ] 7. Add ToC sidebar to events/[slug] dynamic route

  **What to do**:
  - Read `app/events/[slug]/page.tsx` — understand how it loads event content
  - Check if per-event `toc.tsx` files exist in subdirectories (e.g., `app/events/launch-party/toc.tsx`)
  - Modify the dynamic route to import and render the correct ToC based on the slug
  - Option A: Dynamically import `./toc` from the slug directory (if Next.js supports this)
  - Option B: Pass ToC data through the event metadata object and render `DesktopTOC`/`MobileTOC` directly
  - Option C: Create a wrapper that resolves the toc import at build time
  - Ensure the flex+aside layout is added to the dynamic route's JSX

  **Must NOT do**:
  - Do not change the event data structure unless necessary
  - Do not create new page directories

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Dynamic import resolution requires understanding Next.js App Router patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2

  **References**:
  - `app/events/[slug]/page.tsx` — Dynamic route component
  - `app/events/launch-party/toc.tsx` — Example per-event ToC (generated)
  - `app/events/launch-party/toc-content.ts` — Example per-event ToC data
  - `components/toc.tsx` — `DesktopTOC` component for direct use
  - `components/mobile-toc.tsx` — `MobileTOC` component

  **Acceptance Criteria**:
  - [ ] All 3 event pages (`/events/launch-party`, `/events/town-hall-may`, `/events/policy-workshop`) render ToC sidebar
  - [ ] Each event's ToC matches its own content headings
  - [ ] `curl` verifies `aside` element on sample event page

  **QA Scenarios**:

  ```
  Scenario: Event page has per-event ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/events/launch-party | grep -o 'aside.*lg:block'
      2. Assert: finds match
      3. curl -s http://localhost:3000/events/town-hall-may | grep -o 'aside.*lg:block'
      4. Assert: finds match
    Expected Result: ToC sidebar present on event pages
    Evidence: .sisyphus/evidence/task-7-events.txt

  Scenario: Event ToC links scroll correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to /events/launch-party
      2. Click first ToC link
      3. Assert: scrolls to heading, hash updates
    Expected Result: Scroll navigation works
    Evidence: .sisyphus/evidence/task-7-event-scroll.png
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to event pages`
  - Files: `app/events/[slug]/page.tsx`

- [ ] 8. Add ToC sidebar to notes/[slug] dynamic route

  **What to do**:
  - Read `app/notes/[slug]/page.tsx` — understand how it loads note content
  - Apply the same approach as events (Task 7) — dynamically resolve the correct ToC per note slug
  - 8 note pages are covered by this single dynamic route
  - Add flex+aside layout to the dynamic route

  **Must NOT do**:
  - Do not change note data structure unless necessary

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Same dynamic import challenge as events
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2

  **References**:
  - `app/notes/[slug]/page.tsx` — Dynamic route component
  - `app/notes/healthcare-market-failures/toc.tsx` — Example per-note ToC
  - `app/notes/healthcare-market-failures/toc-content.ts` — Example per-note ToC data
  - `components/toc.tsx`, `components/mobile-toc.tsx` — For direct rendering if needed

  **Acceptance Criteria**:
  - [ ] All 8 note pages render ToC sidebar
  - [ ] Each note's ToC matches its own content headings
  - [ ] Sample 2-3 notes via `curl` to verify `aside` element

  **QA Scenarios**:

  ```
  Scenario: Note pages have per-note ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/notes/healthcare-market-failures | grep -o 'aside.*lg:block'
      2. Assert: finds match
      3. curl -s http://localhost:3000/notes/economic-incentives-analysis | grep -o 'aside.*lg:block'
      4. Assert: finds match
    Expected Result: ToC sidebar present on note pages
    Evidence: .sisyphus/evidence/task-8-notes.txt

  Scenario: Note ToC links scroll correctly
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to /notes/healthcare-market-failures
      2. Click first ToC link
      3. Assert: scrolls to heading, hash updates
    Expected Result: Scroll navigation works
    Evidence: .sisyphus/evidence/task-8-note-scroll.png
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to note pages`
  - Files: `app/notes/[slug]/page.tsx`

- [ ] 9. Add ToC sidebar to events and notes listing pages

  **What to do**:
  - Update `app/events/page.tsx`: add flex+aside layout with a custom ToC listing the 3 events as links
  - Update `app/notes/page.tsx`: add flex+aside layout with a custom ToC listing the 8 notes as links
  - Follow the `PlansTOC`/`PlatformTOC` pattern — create inline or imported custom ToC components
  - The ToC should list child pages (event/note titles) as links to those pages, not anchor links within the same page
  - Ensure the layout follows the standard pattern

  **Must NOT do**:
  - Do not change the event/note listing data or rendering logic
  - Do not add headings to these pages just for the ToC

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Creating custom link-list ToCs following established pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2

  **References**:
  - `app/events/page.tsx` — Event listing page
  - `app/notes/page.tsx` — Notes listing page
  - `app/plans/page.tsx` — Uses `PlansTOC` custom component
  - `app/platform/page.tsx` — Uses `PlatformTOC` custom component
  - AGENTS.md — Flex+aside layout pattern

  **Acceptance Criteria**:
  - [ ] Events listing page has ToC sidebar with links to individual events
  - [ ] Notes listing page has ToC sidebar with links to individual notes
  - [ ] `curl` verifies `aside` element on both pages

  **QA Scenarios**:

  ```
  Scenario: Events listing page has custom ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/events | grep -o 'aside.*lg:block'
      2. Assert: finds match
      3. curl -s http://localhost:3000/events | grep -o 'href="/events/[^"]*"'
      4. Assert: finds links to event pages
    Expected Result: ToC sidebar with event links present
    Evidence: .sisyphus/evidence/task-9-events-listing.txt

  Scenario: Notes listing page has custom ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/notes | grep -o 'aside.*lg:block'
      2. Assert: finds match
      3. curl -s http://localhost:3000/notes | grep -o 'href="/notes/[^"]*"'
      4. Assert: finds links to note pages
    Expected Result: ToC sidebar with note links present
    Evidence: .sisyphus/evidence/task-9-notes-listing.txt
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to events and notes listing pages`
  - Files: `app/events/page.tsx`, `app/notes/page.tsx`

- [ ] 10. Add ToC sidebar to plans sub-listing pages

  **What to do**:
  - Update `app/plans/prime-ministership/page.tsx`: add flex+aside with custom ToC listing sub-pages (use, plans, reasoning, background)
  - Update `app/plans/foreign-policy/page.tsx`: add flex+aside with custom ToC listing country pages (north-korea, middle-east, russia, china)
  - Update `app/plans/the-backyard/page.tsx`: add flex+aside (may be minimal since it's a placeholder)
  - Update `app/plans/criminal-justice/page.tsx`: add flex+aside (placeholder)
  - Follow the custom ToC pattern from `PlansTOC`
  - For placeholder pages, the ToC can simply list the sibling/child pages or be minimal

  **Must NOT do**:
  - Do not add content.mdx to placeholder pages
  - Do not change the existing plans listing logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Task 2

  **References**:
  - `app/plans/prime-ministership/page.tsx`
  - `app/plans/foreign-policy/page.tsx`
  - `app/plans/the-backyard/page.tsx`
  - `app/plans/criminal-justice/page.tsx`
  - `app/plans/page.tsx` — `PlansTOC` pattern
  - AGENTS.md — Layout pattern

  **Acceptance Criteria**:
  - [ ] All 4 plans sub-listing pages have ToC sidebar
  - [ ] `curl` verifies `aside` element on each
  - [ ] ToC contains relevant navigation links

  **QA Scenarios**:

  ```
  Scenario: Plans sub-listing pages have ToC
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/plans/prime-ministership | grep -o 'aside.*lg:block'
      2. Assert: finds match
      3. curl -s http://localhost:3000/plans/foreign-policy | grep -o 'aside.*lg:block'
      4. Assert: finds match
      5. curl -s http://localhost:3000/plans/the-backyard | grep -o 'aside.*lg:block'
      6. Assert: finds match
    Expected Result: ToC sidebar present on plans sub-listings
    Evidence: .sisyphus/evidence/task-10-plans-sub.txt
  ```

  **Commit**: YES
  - Message: `feat(toc): add sidebar to plans sub-listing pages`
  - Files: `app/plans/prime-ministership/page.tsx`, `app/plans/foreign-policy/page.tsx`, `app/plans/the-backyard/page.tsx`, `app/plans/criminal-justice/page.tsx`

- [ ] 11. Run generate-toc and fix duplicate heading ID handling

  **What to do**:
  - Run `bun run generate-toc` to regenerate all `toc.tsx` and `toc-content.ts` files
  - Verify the script completes without errors
  - Read `scripts/generate-toc.ts` — find the slug generation logic
  - Add duplicate detection: track seen IDs in a `Map<string, number>`, append `-1`, `-2`, etc. for duplicates (matching `github-slugger` behavior)
  - Verify the fix by checking a page with duplicate headings (if any exist)
  - Run `bun run typecheck` to ensure generated files are type-safe

  **Must NOT do**:
  - Do not change the slug algorithm (must remain compatible with `rehype-slug`)
  - Do not delete any existing toc files manually

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Script fix with clear algorithmic change
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (but best after Tasks 3, 5-10 to avoid conflicts)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 3, 5-10 (to avoid overwriting manual changes)

  **References**:
  - `scripts/generate-toc.ts` — TOC generation script
  - `github-slugger` docs (via npm) — Reference for duplicate handling
  - `app/philosophy/toc-content.ts` — Likely has duplicate IDs to test against

  **Acceptance Criteria**:
  - [ ] `bun run generate-toc` runs successfully
  - [ ] No duplicate IDs in any generated `toc-content.ts`
  - [ ] Generated IDs still match `rehype-slug` output for non-duplicate headings
  - [ ] `bun run typecheck` passes after regeneration

  **QA Scenarios**:

  ```
  Scenario: generate-toc runs without errors
    Tool: Bash
    Preconditions: None
    Steps:
      1. bun run generate-toc
      2. Assert: exit code 0
    Expected Result: Script completes successfully
    Evidence: .sisyphus/evidence/task-11-generate.txt

  Scenario: No duplicate IDs in generated files
    Tool: Bash
    Preconditions: generate-toc completed
    Steps:
      1. find app -name 'toc-content.ts' -exec grep -h '"id"' {} \; | sort | uniq -d
      2. Assert: no output (no duplicate id values)
    Expected Result: All IDs are unique within each toc-content.ts
    Evidence: .sisyphus/evidence/task-11-duplicates.txt
  ```

  **Commit**: YES
  - Message: `fix(toc): handle duplicate heading IDs in generator`
  - Files: `scripts/generate-toc.ts`, `app/**/toc-content.ts`, `app/**/toc.tsx`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**

- [ ] F1. **Plan Compliance Audit** — `oracle`

  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.

  **Verification checklist**:
  - [ ] ToC sidebar present on: governance/members, governance/members/awfixer, ideas/world-fairs, ideas/gladiator, events/[slug] (3 slugs), notes/[slug] (8 slugs), homepage, events listing, notes listing, plans sub-listings (4 pages)
  - [ ] ToC sidebar ABSENT on: all bylaws pages
  - [ ] Scroll-to-anchor works on sample of 5+ pages
  - [ ] URL hash updates on ToC click
  - [ ] Philosophy page ToC IDs match rendered headings
  - [ ] No duplicate IDs in generated toc files
  - [ ] All evidence files exist in `.sisyphus/evidence/`

  **Output**: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`

  Run `bun run typecheck` + linter + build. Review all changed files for: `as any`/`@ts-ignore`, empty catches, `console.log` in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.

  **Output**: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Typecheck [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)

  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-page integration: navigate from listing page → content page → click ToC → verify scroll. Test edge cases: empty state, invalid hash in URL, rapid ToC clicks. Save to `.sisyphus/evidence/final-qa/`.

  **Output**: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`

  For each task: read "What to do", read actual diff (`git diff`). Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Detect cross-task contamination. Flag unaccounted changes.

  **Output**: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `fix(toc): add scroll handler robustness and hash updates`
- **2**: `fix(toc): resolve heading IDs and philosophy page mismatch`
- **3**: `feat(toc): add sidebar to governance, ideas, home pages`
- **4**: `feat(toc): add sidebar to events and notes dynamic routes`
- **5**: `feat(toc): add sidebar to listing pages`
- **6**: `fix(toc): handle duplicate heading IDs in generator`

## Success Criteria

### Verification Commands
```bash
# ToC presence on sample pages
curl -s http://localhost:3000/governance/members | grep -o 'aside.*lg:block' | head -1
curl -s http://localhost:3000/ideas/world-fairs | grep -o 'aside.*lg:block' | head -1
curl -s http://localhost:3000/events/launch-party | grep -o 'aside.*lg:block' | head -1
curl -s http://localhost:3000/notes/healthcare-market-failures | grep -o 'aside.*lg:block' | head -1
curl -s http://localhost:3000/events | grep -o 'aside.*lg:block' | head -1
curl -s http://localhost:3000/plans/prime-ministership | grep -o 'aside.*lg:block' | head -1

# ToC absence on bylaws
curl -s http://localhost:3000/bylaws/article-1 | grep -o 'TableOfContents'
# Expected: NO MATCH

# Type check
bun run typecheck
```

### Final Checklist
- [ ] All non-bylaws pages have ToC sidebar (verified via curl)
- [ ] Bylaws pages have NO TableOfContents (verified via curl)
- [ ] Clicking ToC link scrolls to heading and updates hash (Playwright)
- [ ] Philosophy page ToC IDs match rendered headings
- [ ] No duplicate IDs in generated toc-content.ts files
- [ ] `bun run typecheck` passes
