import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { MembersContent } from "./members-content"

export const metadata: Metadata = {
  title: "Party Leadership | AWFixer Political Party",
  description: "Meet the leadership of the AWFixer Political Party.",
}

export default function MembersPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Party Leadership
        </h1>
        <p className="text-muted-foreground italic">
          "A party that cannot govern itself has no credibility demanding it of others."
        </p>
      </header>
      <Separator className="bg-border/60" />
      <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90">
        <MembersContent />
      </div>
    </main>
  )
}