"use client"

import { useRef } from "react"

import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"

import { PageContent } from "./page-content"

export default function Page() {
  const contentRef = useRef<HTMLElement>(null)

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="flex h-screen flex-col items-center justify-center px-4 sm:px-6">
        <div className="max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            AWFixer Political Party
          </h1>
          <p className="mt-4 text-base text-foreground/80">Under construction</p>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground/80"
        >
          <span>Read More</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>
      <main
        ref={contentRef}
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 pt-24 sm:gap-14 sm:px-6 sm:pb-20"
      >
        <header className="space-y-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            AWFixer Political Party
          </h1>
        </header>
        <Separator className="bg-border/60" />
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <PageContent />
        </div>
      </main>
    </>
  )
}