import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Philosophy | AWFixer Political Party",
  description: "Principles and philosophy of the AWFixer Political Party.",
}

export default function PhilosophyPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 pb-16 sm:px-6 sm:pb-20">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Party philosophy
        </h1>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          Replace the placeholder below with your platform and values.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="space-y-4 text-[0.9375rem] leading-relaxed text-foreground/90">
        <p>
          This section is ready for you to edit. Summarize the principles,
          priorities, and commitments that define the AWFixer Political Party.
        </p>
        <p className="text-muted-foreground">
          Tip: update the content in{" "}
          <span className="font-mono text-foreground/90">
            app/philosophy/page.tsx
          </span>{" "}
          in the repository.
        </p>
      </div>
    </main>
  )
}
