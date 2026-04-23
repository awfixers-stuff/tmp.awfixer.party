import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { ScrollTOC } from "@/components/toc"
import { PlansContent } from "./plans-content"
import { plansMeta } from "./plans-meta"

export const metadata: Metadata = {
  title: "Plans | AWFixer Political Party",
  description: "AWFixer Political Party international relations plans.",
}

const toc = plansMeta.map((plan) => ({
  id: plan.slug,
  text: plan.title,
  level: 2,
}))

export default function PlansPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            International Plans
          </h1>
          <p className="text-lg text-muted-foreground">
            Our strategic approach to international relations and foreign
            policy.
          </p>
        </header>

        <Separator className="bg-border/60" />

        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <PlansContent />
        </div>

        <Separator className="bg-border/60" />

        <div className="grid gap-4 sm:grid-cols-2">
          {plansMeta.map((plan) => (
            <a
              key={plan.slug}
              href={`/plans/${plan.slug}`}
              className="block rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
            >
              <h3 className="font-heading text-lg font-semibold">
                {plan.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </a>
          ))}
        </div>
      </main>
      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20">
          <ScrollTOC items={toc} />
        </div>
      </aside>
    </div>
  )
}
