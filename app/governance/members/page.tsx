import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import Content from "./content.mdx"
import { TableOfContents } from "./toc"

export const metadata: Metadata = {
  title: "Party Leadership | AWFixer Political Party",
  description: "Meet the leadership of the AWFixer Political Party.",
}

export default function MembersPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Party Leadership
          </h1>
          <p className="text-muted-foreground italic">
            "A party that cannot govern itself has no credibility demanding it of
            others."
          </p>
        </header>
        <Separator className="bg-border/60" />
        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert">
          <Content />
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
