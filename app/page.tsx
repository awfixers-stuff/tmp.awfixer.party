"use client"

import { useRef } from "react"

import { PageContent } from "./page-content"

export default function Page() {
  const contentRef = useRef<HTMLElement>(null)

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="flex h-[70vh] min-h-[500px] flex-col items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-red-500 animate-fade-up">
              AWFixer Political Party
            </p>
            <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-balance sm:text-7xl animate-fade-up animate-fade-up-delay-1">
              Fix the <span className="text-red-500">System.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up animate-fade-up-delay-2">
              Not the left. Not the right. The AWFixer Party exists because the existing political establishment has had thirty years to fix America's foundational problems and has instead made most of them worse.
            </p>
          </div>
          <button
            onClick={scrollToContent}
            className="mt-4 flex flex-col items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground animate-fade-up animate-fade-up-delay-3"
          >
            <span>Read More</span>
            <svg className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>
      <main
        ref={contentRef}
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20"
      >
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <PageContent />
        </div>
      </main>
    </>
  )
}