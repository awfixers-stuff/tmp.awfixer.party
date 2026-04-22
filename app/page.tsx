"use client"

import { useRef, useState, useEffect } from "react"

import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"

import { PageContent } from "./page-content"

const FULL_TITLE = "AWFixer Political Party"

export default function Page() {
  const contentRef = useRef<HTMLElement>(null)
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [showUnderConstruction, setShowUnderConstruction] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const titleDuration = 3500
    const charsPerChunk = Math.ceil(FULL_TITLE.length / (titleDuration / 80))
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex += charsPerChunk
      if (currentIndex >= FULL_TITLE.length) {
        setDisplayedTitle(FULL_TITLE)
        clearInterval(interval)
        setTimeout(() => setShowUnderConstruction(true), 500)
      } else {
        setDisplayedTitle(FULL_TITLE.slice(0, currentIndex))
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showUnderConstruction) {
      const timer = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [showUnderConstruction])

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="flex h-screen flex-col items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl min-h-[1.2em]">
              <span className="typewriter">{displayedTitle}</span>
              <span className="animate-pulse">|</span>
            </h1>
            <p
              className={`mt-2 text-base text-foreground/80 transition-all duration-500 overflow-hidden ${
                showUnderConstruction
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              Under construction
            </p>
          </div>
          <button
            onClick={scrollToContent}
            className={`flex flex-col items-center gap-1 text-sm text-foreground/80 transition-all duration-500 hover:text-foreground ${
              showButton
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span>Read More</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </section>
      <main
        ref={contentRef}
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20"
      >
        <Separator className="bg-border/60" />
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <PageContent />
        </div>
      </main>
    </>
  )
}