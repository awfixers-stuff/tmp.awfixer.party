import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import Awfixer from "./awfixer.mdx"

export const metadata: Metadata = {
  title: "AWFixer | AWFixer Political Party",
  description: "About AWFixer, founder of the AWFixer Political Party.",
}

export default function AwfixerPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          Leadership
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          AWFixer
        </h1>
        <p className="text-muted-foreground italic">
          Founder & Co-Leader
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0">
        <Awfixer />
      </div>
    </main>
  )
}