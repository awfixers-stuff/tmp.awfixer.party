import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { PhilosophyContent } from "./philosophy-content"

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
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <PhilosophyContent />
      </div>
    </main>
  )
}
