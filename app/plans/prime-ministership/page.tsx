import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prime Ministership Plan | AWFixer Political Party",
  description: "AWFixer Political Party prime ministership plan.",
}

export default function PrimeMinistershipPlanPage() {
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
            Party position on the Prime Ministership. Coming soon.
          </p>
        </header>
      </main>
    </div>
  )
}
