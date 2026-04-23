import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { PhilosophyContent } from "./philosophy-content-new"
import { TableOfContents } from "./toc-new"

export const metadata: Metadata = {
  title: "Philosophy | AWFixer Political Party",
  description: "Principles and philosophy of the AWFixer Political Party.",
}

export default function PhilosophyPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Philosophy
          </h1>
          <p className="text-muted-foreground italic">
            "Fix the incentive. Change the outcome."
          </p>
        </header>
        <Separator className="bg-border/60" />
        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <PhilosophyContent />
        </div>
      </main>
      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}
