# Bylaws Navigation Desktop Fix

## TL;DR
> Replace the desktop bylaws navigation's hover-triggered popout sidebar with a hidden-by-default slide-in drawer toggled by a floating hamburger button at the bottom-right. Desktop nav items will use the same click-to-expand inline accordion ("dropdown wrapped dropdown") that mobile already uses. Mobile behavior remains completely unchanged.
>
> **Deliverables**:
> - `components/BylawsNav/NavItem.tsx` — unified accordion behavior (desktop + mobile)
> - `components/BylawsNav/BylawsNav.tsx` — simplified state (no hover popout timers)
> - `components/BylawsNav/BylawsLayout.tsx` — floating hamburger button, desktop drawer, overlay, Escape/click-outside close
> - `app/globals.css` — cleanup of dead popout animation keyframes
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES — 2 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → F1-F4

---

## Context

### Original Request
User reported that desktop bylaws navigation has a "weird trapped setup" — hover-triggered popout submenus in a fixed left sidebar that feel sticky and hard to navigate. Mobile uses a perfect "dropdown wrapped dropdown" inline accordion. User wants desktop to match mobile's accordion pattern, with a hamburger menu button fixed ~0.5 inch from the bottom-right corner on desktop only.

### Interview Summary
**Key Discussions**:
- Desktop sidebar: **Hidden by default**, toggled by floating hamburger button
- When toggled: **Slide-in drawer from the left** (same animation as mobile)
- Button: **Hamburger icon** (same as mobile), fixed at bottom-right on desktop only
- Hover popouts: **Removed entirely** — desktop uses same inline accordion as mobile
- Mobile behavior and button positioning: **Completely unchanged**

**Research Findings**:
- `BylawsLayout.tsx` renders a `fixed top-24 left-0 w-64` aside on desktop and a slide-in drawer on mobile
- `NavItem.tsx` has two render branches: `showPopout` (desktop hover absolute panel) and `isExpanded` (mobile inline accordion)
- `usePopout.ts` manages `openId` with a 150ms delay-based close via `setTimeout`
- Site-level nav uses click-based dropdowns, confirming hover popouts are an outlier

### Metis Review
**Identified Gaps** (addressed in plan):
- Missing acceptance criteria: drawer closes on navigation, Escape key, overlay click; accordion toggle behavior; active highlighting; responsive resize cleanup
- Edge cases: SSR/hydration `undefined` state, rapid clicking, resize during open drawer, focus management
- Guardrails: preserve mobile behavior exactly, don't change `BylawsLayout` prop API, don't touch site nav or data files
- Assumptions validated: `animate-slide-in` exists and works; content area should be full-width (`ml-0`)

---

## Work Objectives

### Core Objective
Unify desktop and mobile bylaws navigation to use the same click-based inline accordion, replacing the desktop hover-popout sidebar with a toggleable slide-in drawer activated by a floating hamburger button.

### Concrete Deliverables
- `components/BylawsNav/NavItem.tsx` — remove popout branch, unify accordion for all viewports
- `components/BylawsNav/BylawsNav.tsx` — replace `usePopout()` with simple `useState` for `openId`
- `components/BylawsNav/BylawsLayout.tsx` — add floating desktop hamburger button, drawer toggle, overlay, Escape/click-outside/close-on-nav
- `app/globals.css` — remove dead `animate-popout-slide-right`, `animate-popout-slide-left` keyframes

### Definition of Done
- [ ] Desktop: clicking hamburger button opens slide-in drawer from left with inline accordion nav
- [ ] Desktop: clicking nav item with children expands/collapses inline accordion
- [ ] Desktop: clicking nav item without children navigates and closes drawer
- [ ] Desktop: clicking overlay or pressing Escape closes drawer, focus returns to button
- [ ] Desktop: no hover-triggered popout behavior of any kind
- [ ] Mobile: behavior identical to production (hamburger at `top-28 left-4`, same drawer, same accordion)
- [ ] Active page highlighting works in both desktop drawer and mobile drawer
- [ ] Content area is full-width on desktop (no `ml-64` margin when drawer is closed)
- [ ] Build passes (`bun run typecheck`)

### Must Have
- Inline accordion on desktop (same as mobile)
- Floating hamburger button at bottom-right on desktop only
- Slide-in drawer animation (`animate-slide-in`)
- Overlay click and Escape key to close drawer
- Drawer closes on navigation
- Active page highlighting preserved
- Full-width content area when drawer is closed

### Must NOT Have (Guardrails)
- No hover-triggered popouts or timers on desktop
- No changes to mobile hamburger position, drawer behavior, or accordion
- No changes to `BylawsLayout` prop API (`navItems`, `activeId`, `children`, `onNavigate`, `className`)
- No changes to site-level navigation (`components/nav/*`)
- No changes to bylaws data (`app/bylaws/bylaws.ts`, `scripts/generate-bylaws.ts`)
- No new animation keyframes or spring physics
- No refactoring of `BylawsNav`'s internal mobile "Bylaws" header toggle (existing behavior, out of scope)
- No cleanup of `popoutDirection` from data model (out of scope)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO dedicated test suite for bylaws nav (no existing test files found)
- **Automated tests**: None — verification via Agent-Executed QA Scenarios using Playwright
- **Framework**: Playwright (via `/playwright` skill) for cross-viewport UI verification
- **Type check**: `bun run typecheck` before and after changes

### QA Policy
Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.png`.

- **Frontend/UI**: Playwright — open browser, set viewport, click elements, assert DOM/visibility, screenshot
- **Build**: `bun run typecheck` — must pass with zero errors

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Core Refactor — NavItem + BylawsNav):
├── Task 1: Unify NavItem accordion (remove popout, unify click handlers)
└── Task 2: Simplify BylawsNav state (replace usePopout with useState)

Wave 2 (Layout + Polish — BylawsLayout + CSS):
├── Task 3: Add desktop drawer + floating button (BylawsLayout)
└── Task 4: CSS cleanup (remove dead popout keyframes)

Wave FINAL (Verification):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high + playwright skill)
└── F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Dependency Matrix
- **Task 1**: None → Blocks: Task 2 (interface clarity)
- **Task 2**: Task 1 (shared state interface) → Blocks: Task 3
- **Task 3**: Task 2 → Blocks: F1-F4
- **Task 4**: None → Blocks: F2

### Agent Dispatch Summary
- **Wave 1**: Task 1 → `unspecified-high`, Task 2 → `quick`
- **Wave 2**: Task 3 → `unspecified-high`, Task 4 → `quick`
- **FINAL**: F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Unify NavItem accordion behavior (remove popout, unify click handlers)

  **What to do**:
  - In `components/BylawsNav/NavItem.tsx`, remove the `showPopout` rendering branch entirely (the `absolute top-0 z-50 ... left-full` popout panel)
  - Remove `handleMouseEnter` and `handleMouseLeave` functions and all `onMouseEnter`/`onMouseLeave` props from the JSX
  - Change the `isExpanded` condition from `isMobile && openId === item.id` to `openId === item.id` (unified for all viewports)
  - Change `handleClick` to remove the `if (isMobile && hasChildren)` guard — make it `if (hasChildren)` so desktop parent items also toggle accordion on click
  - Update `aria-expanded` to always be set: `aria-expanded={hasChildren ? isExpanded : undefined}` (remove the `isMobile` ternary)
  - Update the chevron icon logic so desktop also shows `ChevronDown` when expanded (currently desktop always shows `ChevronRight`)
  - Remove the `isOpen` prop from the component interface — it becomes dead code after popout removal
  - Remove the `popoutDirection` prop from the component interface — it becomes dead code after popout removal
  - Ensure the `paddingLeft` indentation (`${16 + depth * 20}px`) still applies correctly for both mobile and desktop
  - Ensure `overflow-hidden` is applied to the accordion container for both viewports
  - Verify the `role="menuitem"` and `role="menu"` structure is preserved for accessibility

  **Must NOT do**:
  - Do NOT remove the `isMobile` prop entirely — it still controls padding/indentation styles
  - Do NOT change the mobile rendering path (it should continue working exactly as before)
  - Do NOT touch `BylawsNav.tsx` in this task

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires careful JSX refactoring with multiple conditional branches and accessibility attributes
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, but coordinate on interface changes)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 2 (clarity on prop interface), Task 3
  - **Blocked By**: None

  **References**:
  - `components/BylawsNav/NavItem.tsx` — The file to modify. Look at lines ~44 (`showPopout` definition), ~58-65 (`handleClick` with `isMobile` guard), ~90-120 (chevron and click handlers), ~141-183 (popout branch), ~185-212 (accordion branch)
  - `components/BylawsNav/usePopout.ts` — Understand what `openId`, `onOpen`, `onClose` do so you know how `NavItem` consumes them
  - `app/globals.css` lines 313-370 — Animation classes (`animate-accordion-height`, `animate-popout-slide-right`, `animate-popout-slide-left`)

  **Acceptance Criteria**:
  - [ ] `NavItem.tsx` no longer contains `showPopout`, `handleMouseEnter`, `handleMouseLeave`, or any `onMouseEnter`/`onMouseLeave` JSX props
  - [ ] `NavItem.tsx` no longer imports `usePopout` or references popout animations
  - [ ] `isExpanded` condition is `openId === item.id` (no `isMobile` guard)
  - [ ] `handleClick` toggles accordion for `hasChildren` on BOTH mobile and desktop
  - [ ] `aria-expanded` is set for all parent items (not just mobile)
  - [ ] Chevron toggles between `ChevronRight` and `ChevronDown` for both mobile and desktop
  - [ ] `isOpen` and `popoutDirection` props removed from interface
  - [ ] `bun run typecheck` passes after changes

  **QA Scenarios**:

  ```
  Scenario: Desktop nav item expands inline on click (happy path)
    Tool: Playwright
    Preconditions: Start dev server (`bun run dev`), viewport 1280×720
    Steps:
      1. Navigate to `http://localhost:3000/bylaws`
      2. Click the floating hamburger button (selector: `button[aria-label="Open navigation"]`) at bottom-right
      3. Wait for drawer to slide in (selector: `.animate-slide-in` visible)
      4. Click "Voting Bylaws" menu item (selector: `[role="menuitem"]:has-text("Voting Bylaws")`)
      5. Assert "Proxy Voting" child item is visible inline below "Voting Bylaws"
      6. Assert "Voting Bylaws" chevron is now `ChevronDown` (check class or aria-expanded="true")
    Expected Result: Accordion expands inline showing "Proxy Voting"; no popout panel appears
    Failure Indicators: Popout panel appears; child item not visible; chevron doesn't rotate
    Evidence: .sisyphus/evidence/task-1-desktop-accordion-expand.png

  Scenario: Desktop nav item collapses on second click
    Tool: Playwright
    Preconditions: Same as above, "Voting Bylaws" is expanded
    Steps:
      1. Click "Voting Bylaws" again
      2. Assert "Proxy Voting" is no longer visible
      3. Assert "Voting Bylaws" has `aria-expanded="false"`
    Expected Result: Accordion collapses
    Evidence: .sisyphus/evidence/task-1-desktop-accordion-collapse.png

  Scenario: No hover popout behavior on desktop
    Tool: Playwright
    Preconditions: Drawer is open, viewport 1280×720
    Steps:
      1. Hover over "Voting Bylaws" (do NOT click)
      2. Wait 500ms
      3. Assert NO absolutely positioned popout panel exists (query for elements with `animate-popout-slide-right` or `animate-popout-slide-left` — should be 0)
    Expected Result: Nothing happens on hover; no popout appears
    Failure Indicators: Popout panel appears; any element with `left-full` or `right-full` positioning visible
    Evidence: .sisyphus/evidence/task-1-no-hover-popout.png
  ```

  **Evidence to Capture**:
  - [ ] Screenshots for each scenario showing drawer state and accordion behavior

  **Commit**: YES (groups with Task 2)
    - Message: `fix(bylaws-nav): unify accordion behavior and simplify state`
    - Files: `components/BylawsNav/NavItem.tsx`
    - Pre-commit: `bun run typecheck`

- [x] 2. Simplify BylawsNav state management (replace usePopout with useState)

  **What to do**:
  - In `components/BylawsNav/BylawsNav.tsx`, remove the `usePopout()` hook call and replace it with a simple `useState<string | null>(null)` for `openId`
  - Replace `usePopout` import with `useState` from React
  - Replace `const { openId, popoutDirection, onOpen, onClose } = usePopout()` with `const [openId, setOpenId] = useState<string | null>(null)`
  - Update `handleToggle` to directly call `setOpenId(nextId)` instead of `onOpen(id)` / `onClose()`
  - Remove `popoutDirection` from the destructuring and from the `NavItem` prop mapping (since NavItem no longer accepts it after Task 1)
  - Remove `isOpen` from the `NavItem` prop mapping (since NavItem no longer accepts it after Task 1)
  - Verify `useBreakpoint` is still imported (it may still be in `usePopout.ts` or you may need to import it separately if you split the file)
  - If `usePopout.ts` only exports `usePopout` and `useBreakpoint`, consider keeping the file but replacing `usePopout` with a simple implementation, OR splitting `useBreakpoint` into its own file and removing `usePopout.ts`
  - The simplest safe approach: keep `usePopout.ts`, replace `usePopout` body with `return { openId: useState<string | null>(null)[0], ... }` — but it's cleaner to inline `useState` in `BylawsNav.tsx` and update `usePopout.ts` to only export `useBreakpoint`

  **Must NOT do**:
  - Do NOT remove `useBreakpoint` — it's still used by `BylawsLayout` and `BylawsNav`
  - Do NOT change the `useBreakpoint` implementation
  - Do NOT touch `NavItem.tsx` in this task (Task 1 handles that)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward hook replacement with minimal logic changes
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1, but coordinate on removed props)
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `components/BylawsNav/BylawsNav.tsx` — Replace `usePopout()` call and update prop passing to `NavItem`
  - `components/BylawsNav/usePopout.ts` — Decide whether to keep as `useBreakpoint` export only, or split
  - `components/BylawsNav/index.ts` — Check exports; `usePopout` is exported here

  **Acceptance Criteria**:
  - [ ] `BylawsNav.tsx` uses `useState` instead of `usePopout()`
  - [ ] `BylawsNav.tsx` no longer passes `isOpen` or `popoutDirection` to `NavItem`
  - [ ] `BylawsNav.tsx` no longer imports `usePopout`
  - [ ] `useBreakpoint` is still available (either in `usePopout.ts` or a separate file)
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:

  ```
  Scenario: Accordion toggle state managed correctly
    Tool: Playwright
    Preconditions: Dev server running, viewport 1280×720
    Steps:
      1. Navigate to `http://localhost:3000/bylaws`
      2. Open drawer via hamburger button
      3. Click "Voting Bylaws" → expands
      4. Click "Governance Bylaws" → navigates to `/bylaws/governance`
      5. Open drawer again
      6. Assert "Voting Bylaws" is collapsed (no "Proxy Voting" visible)
    Expected Result: Opening one parent doesn't leave others expanded; navigation resets state appropriately
    Evidence: .sisyphus/evidence/task-2-state-management.png
  ```

  **Evidence to Capture**:
  - [ ] Screenshot showing accordion state after navigation

  **Commit**: YES (groups with Task 1)
    - Message: `fix(bylaws-nav): unify accordion behavior and simplify state`
    - Files: `components/BylawsNav/BylawsNav.tsx`, `components/BylawsNav/usePopout.ts` (or new `useBreakpoint.ts`)
    - Pre-commit: `bun run typecheck`

- [ ] 3. Add desktop drawer with floating hamburger button (BylawsLayout)

  **What to do**:
  - In `components/BylawsNav/BylawsLayout.tsx`:
    - Add a new state `const [desktopNavOpen, setDesktopNavOpen] = useState(false)`
    - Replace the `{isMobile === false && ...}` fixed sidebar block with a conditional drawer that renders when `desktopNavOpen === true` AND `isMobile === false`
    - The drawer should use the same structure as the mobile drawer: `<div className="fixed inset-0 z-30 ...">` with overlay + `<aside className="animate-slide-in ...">`
    - Use `w-72` for the drawer width (consistent with mobile drawer, not the old `w-64` sidebar)
    - Include the same "Bylaws" header with X button that mobile has (for consistency)
    - Add `onClick` to the overlay div to close the drawer: `onClick={() => setDesktopNavOpen(false)}`
    - Add an `Escape` key listener via `useEffect`: when `desktopNavOpen` is true, listen for `keydown` and close on Escape; return focus to the hamburger button on close
    - Add `onNavigate` wrapper that closes the drawer after navigation: `const handleNavigate = useCallback((id: string) => { setDesktopNavOpen(false); onNavigate?.(id); }, [onNavigate]);` — pass this to `BylawsNav` only when desktop drawer is open; for mobile, continue using the existing `handleNavigate` that sets `mobileNavOpen`
    - Add a floating hamburger button that ONLY renders when `isMobile === false`:
      ```tsx
      {isMobile === false && (
        <button
          onClick={() => setDesktopNavOpen(true)}
          className="fixed bottom-12 right-12 z-30 ..."
          aria-label="Open navigation"
        >
          <MenuIcon />
        </button>
      )}
      ```
      Use `bottom-12 right-12` (≈48px from edges, matching "half an inch" request). Style with `rounded-full bg-primary text-primary-foreground p-3 shadow-lg hover:bg-primary/90` or similar prominent FAB style.
    - Update the content area wrapper: remove `ml-64` from the desktop branch. The content should use full width (`ml-0` or simply no margin) when the drawer is closed. Since the drawer is `fixed` (overlay), content stays full-width even when open.
    - Ensure `isMobile === undefined` (SSR/hydration) doesn't flash the hamburger button or drawer. Keep the same pattern as before: use `isMobile === false` for desktop-specific rendering.
    - Add a `useEffect` that watches `isMobile` and resets `desktopNavOpen` to `false` when the viewport crosses the breakpoint (to handle resize from desktop to mobile while drawer is open)
    - Similarly, reset `mobileNavOpen` to `false` when `isMobile` becomes `false`

  **Must NOT do**:
  - Do NOT change the mobile drawer structure or hamburger button position (`fixed top-28 left-4`)
  - Do NOT change `BylawsLayout` prop interface (`navItems`, `activeId`, `children`, `onNavigate`, `className`)
  - Do NOT add new animation keyframes — reuse existing `animate-slide-in`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex JSX restructuring with multiple state machines, event listeners, and responsive guards
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — depends on Tasks 1-2 for accordion to work inside drawer
  - **Parallel Group**: Wave 2
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `components/BylawsNav/BylawsLayout.tsx` — The file to modify. Study the mobile drawer implementation (lines ~56-77) and replicate it for desktop
  - `components/BylawsNav/BylawsNav.tsx` — Understand what props `BylawsNav` needs and how `onNavigate` flows
  - `app/globals.css` line 368 — `animate-slide-in` animation definition
  - Mobile hamburger button in `BylawsLayout.tsx` line 56 — copy styling patterns but position at `bottom-12 right-12`

  **Acceptance Criteria**:
  - [ ] Desktop sidebar is hidden by default (no fixed left sidebar visible)
  - [ ] Floating hamburger button renders at bottom-right on desktop (`bottom-12 right-12`)
  - [ ] Clicking hamburger opens slide-in drawer from left with `animate-slide-in`
  - [ ] Drawer has overlay that closes on click
  - [ ] Drawer closes on Escape key
  - [ ] Drawer closes when navigating to a page
  - [ ] Focus returns to hamburger button after drawer closes
  - [ ] Content area has no left margin on desktop (`ml-0` or no margin class)
  - [ ] Mobile hamburger button position unchanged (`top-28 left-4`)
  - [ ] Mobile drawer behavior unchanged
  - [ ] `bun run typecheck` passes

  **QA Scenarios**:

  ```
  Scenario: Desktop drawer opens via floating hamburger button
    Tool: Playwright
    Preconditions: Dev server running, viewport 1280×720
    Steps:
      1. Navigate to `http://localhost:3000/bylaws`
      2. Assert NO fixed left sidebar is visible (no element with `fixed top-24 left-0`)
      3. Assert floating hamburger button is visible at bottom-right (selector: `button[aria-label="Open navigation"]`)
      4. Click the floating hamburger button
      5. Assert drawer slides in from left with `animate-slide-in` class
      6. Assert overlay div with `bg-background/80` is visible behind drawer
      7. Screenshot
    Expected Result: Drawer opens with animation; overlay visible; no sidebar was visible before clicking
    Failure Indicators: Sidebar always visible; button not at bottom-right; no animation
    Evidence: .sisyphus/evidence/task-3-desktop-drawer-open.png

  Scenario: Desktop drawer closes on overlay click
    Tool: Playwright
    Preconditions: Drawer is open
    Steps:
      1. Click the dark overlay behind the drawer (selector: `div.fixed.inset-0` or similar)
      2. Assert drawer is no longer visible
      3. Assert focus is on the hamburger button
    Expected Result: Drawer closes; focus returns to trigger
    Evidence: .sisyphus/evidence/task-3-overlay-close.png

  Scenario: Desktop drawer closes on Escape key
    Tool: Playwright
    Preconditions: Drawer is open
    Steps:
      1. Press Escape key
      2. Assert drawer is no longer visible
    Expected Result: Drawer closes
    Evidence: .sisyphus/evidence/task-3-escape-close.png

  Scenario: Desktop drawer closes on navigation
    Tool: Playwright
    Preconditions: Drawer is open on `/bylaws`
    Steps:
      1. Click "Governance Bylaws" in the drawer
      2. Assert URL changes to `/bylaws/governance`
      3. Assert drawer is closed
    Expected Result: Navigation happens and drawer closes automatically
    Evidence: .sisyphus/evidence/task-3-nav-close.png

  Scenario: Mobile behavior unchanged
    Tool: Playwright
    Preconditions: Dev server running, viewport 375×812
    Steps:
      1. Navigate to `http://localhost:3000/bylaws`
      2. Assert hamburger button is at `top-28 left-4` (not bottom-right)
      3. Click mobile hamburger
      4. Assert drawer slides in with same animation as before
      5. Assert accordion works (click "Voting Bylaws" → "Proxy Voting" expands)
      6. Click overlay → drawer closes
    Expected Result: Identical to production mobile behavior
    Evidence: .sisyphus/evidence/task-3-mobile-unchanged.png
  ```

  **Evidence to Capture**:
  - [ ] Screenshots for open, close (overlay, Escape, nav), mobile unchanged

  **Commit**: YES
    - Message: `fix(bylaws-nav): add desktop drawer with floating toggle button`
    - Files: `components/BylawsNav/BylawsLayout.tsx`
    - Pre-commit: `bun run typecheck`

- [ ] 4. CSS cleanup — remove dead popout animation keyframes

  **What to do**:
  - In `app/globals.css`, remove the `.animate-popout-slide-right` and `.animate-popout-slide-left` utility classes
  - Remove the `@keyframes popout-slide-right` and `@keyframes popout-slide-left` definitions
  - Leave `animate-slide-in` and `animate-accordion-height` untouched (they're still used)
  - Verify no other files reference the removed classes (grep for `animate-popout-slide`)

  **Must NOT do**:
  - Do NOT remove `animate-slide-in` or `animate-accordion-height`
  - Do NOT add new animations
  - Do NOT touch any other CSS

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple CSS deletion with grep verification
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3, but safer after Task 1 confirms popouts are fully gone)
  - **Parallel Group**: Wave 2
  - **Blocks**: F2
  - **Blocked By**: Task 1

  **References**:
  - `app/globals.css` lines ~313-370 — Animation definitions

  **Acceptance Criteria**:
  - [ ] `animate-popout-slide-right` and `animate-popout-slide-left` classes removed
  - [ ] `@keyframes popout-slide-right` and `@keyframes popout-slide-left` removed
  - [ ] Grep for `animate-popout-slide` returns zero matches in codebase
  - [ ] `bun run typecheck` passes (CSS changes don't affect TS, but run anyway)

  **QA Scenarios**:

  ```
  Scenario: No dead popout CSS classes remain
    Tool: Bash (grep)
    Steps:
      1. Run `grep -r "animate-popout-slide" --include="*.css" --include="*.tsx" --include="*.ts" .`
      2. Assert output is empty
    Expected Result: Zero references to popout animation classes
    Evidence: .sisyphus/evidence/task-4-css-cleanup.txt
  ```

  **Evidence to Capture**:
  - [ ] Grep output saved as text file

  **Commit**: YES (groups with Task 3)
    - Message: `fix(bylaws-nav): add desktop drawer with floating toggle button`
    - Files: `app/globals.css`
    - Pre-commit: `bun run typecheck`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `bun run typecheck` + linter. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `TypeCheck [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (desktop drawer + accordion working together). Test edge cases: Escape close, overlay click, resize. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `fix(bylaws-nav): unify accordion behavior and simplify state` — `components/BylawsNav/NavItem.tsx`, `components/BylawsNav/BylawsNav.tsx`
- **Wave 2**: `fix(bylaws-nav): add desktop drawer with floating toggle button` — `components/BylawsNav/BylawsLayout.tsx`, `app/globals.css`

---

## Success Criteria

### Verification Commands
```bash
# Type check must pass
bun run typecheck

# Dev server smoke test
bun run dev &
curl -s http://localhost:3000/bylaws | head -n 5
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] `bun run typecheck` passes
- [ ] Desktop drawer opens via bottom-right hamburger
- [ ] Desktop accordion expands/collapses on click
- [ ] Desktop drawer closes on nav, overlay click, Escape
- [ ] Mobile behavior identical to before changes
- [ ] Active page highlighting works
- [ ] Content area full-width on desktop when drawer closed
