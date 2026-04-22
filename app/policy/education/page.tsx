import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { EducationContent } from "./education-content"
import { TableOfContents } from "./toc"

export const metadata: Metadata = {
  title: "Education Policy | AWFixer Political Party",
  description: "AWFixer Party education policy.",
}

export default function EducationPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Education Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Teach what works, fund what matters
          </p>
        </header>
        <Separator className="bg-border/60" />
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <EducationContent />
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