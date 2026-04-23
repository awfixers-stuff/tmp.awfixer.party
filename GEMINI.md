# AWFixer Political Party Project Context

This is a Next.js 16 application for the AWFixer Political Party, built with a focus on MDX-driven content management and modern styling.

## Project Overview

- **Core Stack:** Next.js 16.2 (App Router), React 19, TypeScript 6, Bun 1.3.11.
- **Styling:** Tailwind CSS 4, `@tailwindcss/typography`, `radix-ui`, `lucide-react`.
- **Content:** Driven by MDX files located in `app/content/`, `app/events/`, `app/policy/`, etc.
- **Key Architectures:**
  - **SiteChrome:** The main layout wrapper (`components/site-chrome.tsx`).
  - **FloatingSiteNav:** The primary navigation component.
  - **Events System:** Events are defined as MDX files in `app/events/events/`. A codegen script aggregates them into a central registry.

## Building and Running

Bun is the required package manager and runtime.

```bash
bun install          # Install dependencies
bun run dev          # Start development server (with Turbopack)
bun run build        # Build for production (includes event generation)
bun run start        # Run production server
bun run generate-events # Manually run event metadata codegen
bun run lint         # Run ESLint
bun run typecheck    # Run TypeScript type checking
bun run format       # Format code with Prettier
```

**Crucial Note:** The build process (`bun run build`) automatically executes `scripts/generate-events.ts`. This script parses MDX files in `app/events/events/` and generates `app/events/events.ts`. **Do not edit `app/events/events.ts` manually.**

## Development Conventions

- **Component Utilities:** Use the `cn` utility (from `lib/utils.ts`) for conditional class merging.
- **Styling:** Adhere to Tailwind CSS 4 conventions. Note that `prettier-plugin-tailwindcss` is used for automatic class sorting.
- **MDX Usage:** Content is largely managed via MDX. Custom components for MDX are defined in `mdx-components.tsx`.
- **Event Metadata:** When adding new events, create an MDX file in `app/events/events/` and use the `<EventMeta>` tag to define properties like `date`, `time`, `location`, etc. The codegen script will handle the rest.
- **Icons:** Use `lucide-react` for iconography.
- **Formatting:** Prettier is configured to sort Tailwind classes.

## Key Directories

- `app/`: Next.js App Router pages and layouts.
  - `app/events/events/`: Source MDX files for events.
  - `app/policy/`: Policy-specific pages and content.
  - `app/notes/`: Thought pieces and supplemental content.
- `components/`: Reusable UI components.
  - `components/ui/`: Atomic UI components (Shadcn-like).
- `scripts/`: Build-time utility scripts.
- `public/`: Static assets (images, gifs, flags).
