import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Backyard Plan | AWFixer Political Party",
  description: "AWFixer Political Party local issues plan.",
}

export default function TheBackyardPlanPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            The Backyard
          </h1>
          <p className="text-lg text-muted-foreground">
            Local issues and community priorities. Coming soon.
          </p>
        </header>
      </main>
    </div>
  )
}
