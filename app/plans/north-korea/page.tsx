import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "North Korea Plan | AWFixer Political Party",
  description: "AWFixer Political Party plan for North Korea.",
}

export default function NorthKoreaPlanPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          North Korea
        </h1>
        <p className="text-lg text-muted-foreground">
          Engagement and deterrence strategy.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <h2>Overview</h2>
        <p>The coming leadership transition in North Korea presents a rare diplomatic window. AWFixer advocates for proactive engagement while maintaining strong deterrence.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li><strong>Engagement:</strong> Pursue direct talks without preconditions</li>
          <li><strong>Denuclearization:</strong> Incremental approach—relief for verified steps</li>
          <li><strong>Alliances:</strong> Coordinate with South Korea and Japan</li>
          <li><strong>Human Rights:</strong> Maintain pressure on humanitarian issues separate from nuclear talks</li>
        </ul>
      </div>
    </main>
  )
}
