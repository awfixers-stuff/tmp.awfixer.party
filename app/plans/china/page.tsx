import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "China Plan | AWFixer Political Party",
  description: "AWFixer Political Party plan for US-China relations.",
}

export default function ChinaPlanPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          China
        </h1>
        <p className="text-lg text-muted-foreground">
          Strategic approach to US-China relations.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <h2>Overview</h2>
        <p>China represents both our greatest economic competitor and our most significant geopolitical challenge. AWFixer approaches US-China relations with clear eyes: competition where necessary, cooperation where possible.</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li><strong>Decoupling:</strong> Reduce critical supply chain dependencies in semiconductors, rare earth minerals, and pharmaceutical ingredients</li>
          <li><strong>Alliances:</strong> Strengthen QUAD and NATO ties in the Indo-Pacific</li>
          <li><strong>Trade:</strong> Maintain tariffs as leverage while pursuing targeted trade deals</li>
          <li><strong>Technology:</strong> Prevent Chinese AI and semiconductor technology from threatening US military advantages</li>
        </ul>

        <h2>Diplomatic Engagement</h2>
        <p>Direct engagement with Beijing on climate, nuclear proliferation, and trade. No Cold War rhetoric—pragmatic competition is more effective than ideological confrontation.</p>
      </div>
    </main>
  )
}
