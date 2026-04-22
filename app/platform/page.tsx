import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { PlatformTOC } from "./toc"

export const metadata: Metadata = {
  title: "Platform | AWFixer Political Party",
  description: "AWFixer Political Party platform and policy positions.",
}

const policyItems = [
  {
    href: "/policy/competition",
    label: "Competition & Markets",
    description: "Real deregulation means breaking monopolies",
  },
  {
    href: "/policy/foreign-policy",
    label: "Foreign Policy",
    description: "Diplomacy first, military when necessary",
  },
  {
    href: "/policy/labor",
    label: "Labor & Immigration",
    description: "Fix the incentive, not the people",
  },
  {
    href: "/policy/energy",
    label: "Energy & Nuclear",
    description: "Nuclear is the honest clean energy answer",
  },
  {
    href: "/policy/fiscal-transparency",
    label: "Fiscal Transparency",
    description: "Every dollar on a public ledger",
  },
  {
    href: "/policy/criminal-justice",
    label: "Criminal Justice",
    description: "Real consequences, real rehabilitation",
  },
  {
    href: "/policy/anti-corruption",
    label: "Anti-Corruption",
    description: "Every branch, every level, every uniform",
  },
  {
    href: "/policy/technology",
    label: "Technology & AI",
    description: "Open source, accountable, contestable",
  },
  {
    href: "/policy/tax",
    label: "Tax & Business",
    description: "Build a tax base that works",
  },
  {
    href: "/policy/civil-standard",
    label: "Civil Standard of Living",
    description: "Replace minimum wage with dignity",
  },
]

export default function PlatformPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3" id="platform">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Ten pillars. One commitment: fix the incentive, change the outcome.
          </p>
        </header>

        <Separator className="bg-border/60" />

        <PlatformTOC />

        <div className="grid gap-4 sm:grid-cols-2">
          {policyItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
            >
              <h3 className="font-heading text-lg font-semibold">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </a>
          ))}
        </div>

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-4 sm:flex-row" id="join-the-movement">
          <a
            href="https://discord.awfixer.party"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            Join the Movement
          </a>
          <a
            href="mailto:volapply@awfixer.party"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            id="volunteer"
          >
            Volunteer
          </a>
        </div>
      </main>
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="sticky top-20">
          <PlatformTOC />
        </div>
      </aside>
    </div>
  )
}