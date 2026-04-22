import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Russia Plan | AWFixer Political Party",
  description: "AWFixer Political Party plan for US-Russia relations.",
}

export default function RussiaPlanPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Russia
        </h1>
        <p className="text-lg text-muted-foreground">
          Policy toward Russia and Eastern Europe.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <h2>Overview</h2>
        <p>Russia poses a significant but manageable geopolitical challenge. AWFixer advocates for realistic deterrence while seeking areas of potential cooperation.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li><strong>NATO:</strong> Maintain Article 5 commitments while encouraging European burden-sharing</li>
          <li><strong>Sanctions:</strong> Targeted sanctions on oligarchs, not Russian citizens</li>
          <li><strong>Energy:</strong> Accelerate LNG exports to reduce European dependency on Russian gas</li>
          <li><strong>Diplomacy:</strong> Keep communication channels open on arms control and strategic stability</li>
        </ul>
      </div>
    </main>
  )
}
