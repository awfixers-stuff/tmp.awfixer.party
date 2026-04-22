import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { TaxContent } from "./tax-content"
import { TableOfContents } from "./toc"

export const metadata: Metadata = {
  title: "Tax Policy | AWFixer Political Party",
  description: "AWFixer Party tax and fiscal policy.",
}

export default function TaxPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <TableOfContents />
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Tax & Fiscal Policy
        </h1>
        <p className="text-lg text-muted-foreground">
          Build a tax base that works
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
        <TaxContent />
      </div>
    </main>
  )
}