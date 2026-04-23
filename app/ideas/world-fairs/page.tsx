import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import Content from "./content.mdx"

export const metadata: Metadata = {
  title: "American World Fairs | AWFixer Political Party",
  description:
    "Reviving the spirit of American World Fairs that built monuments to pride and innovation.",
}

export default function WorldFairsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          American World Fairs
        </h1>
        <p className="text-lg text-muted-foreground">
          Reviving the spirit of American World Fairs that built monuments to
          pride and innovation.
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-heading prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2 prose-img:rounded-xl prose-img:shadow-lg">
        <Content />
      </div>
    </main>
  )
}
