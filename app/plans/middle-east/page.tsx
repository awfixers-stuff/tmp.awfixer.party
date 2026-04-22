import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Middle East Plan | AWFixer Political Party",
  description: "AWFixer Political Party plan for Middle East relations.",
}

export default function MiddleEastPlanPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Middle East
        </h1>
        <p className="text-lg text-muted-foreground">
          Regional approach and alliances.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <h2>Overview</h2>
        <p>The Middle East remains critical to US interests in energy, counterterrorism, and regional stability. AWFixer advocates for balanced alliances and regional integration.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li><strong>Alliances:</strong> Deepen partnerships with Saudi Arabia, UAE, and Israel</li>
          <li><strong>Iran:</strong> Maximum pressure combined with diplomatic off-ramps</li>
          <li><strong>Energy:</strong> Support regional energy production as bridge to clean energy transition</li>
          <li><strong>Drawdown:</strong> End endless military presence—regional partners must lead</li>
        </ul>
      </div>
    </main>
  )
}
