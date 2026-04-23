import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { plansMeta } from "../plans-meta"

export const metadata: Metadata = {
  title: "Prime Ministership Plan | AWFixer Political Party",
  description: "AWFixer Political Party prime ministership plan.",
}

export default function PrimeMinistershipPlanPage() {
  const primeMinistershipPlans = plansMeta.filter((p) =>
    p.slug.startsWith("prime-ministership/")
  )

  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Prime Ministership
          </h1>
          <p className="text-lg text-muted-foreground">
            Party position on the Prime Ministership.
          </p>
        </header>

        <Separator className="bg-border/60" />

        <div className="grid gap-4 sm:grid-cols-2">
          {primeMinistershipPlans.map((plan) => (
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
    </div>
  )
}
