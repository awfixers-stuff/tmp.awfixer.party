import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { AntiCorruptionContent } from "./anti-corruption-content"
import { TableOfContents } from "./toc"

export const metadata: Metadata = {
  title: "Anti-Corruption | AWFixer Political Party",
  description: "AWFixer Party anti-corruption and government ethics policy.",
}

export default function AntiCorruptionPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
<header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-500">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Anti-Corruption
        </h1>
        <p className="text-lg text-muted-foreground">
          Every branch, every level, every uniform
        </p>
      </header>
        <Separator className="bg-border/60" />
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <AntiCorruptionContent />
        </div>
      </main>
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}