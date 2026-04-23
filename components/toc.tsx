"use client"

import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface ScrollTOCProps {
  items: TocItem[]
}

export function ScrollTOC({ items }: ScrollTOCProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile trigger — fixed bottom-right, above the safe area */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg lg:hidden"
      >
        <Menu className="h-4 w-4" />
        <span>On this page</span>
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile panel — slides in from the right, starts below the nav bar */}
      <nav
        aria-label="On this page"
        className={cn(
          /* Mobile: fixed panel that starts below the nav bar (4.5rem) and respects bottom spacing */
          "fixed right-3 z-40 w-72 overflow-hidden",
          "top-[4.5rem] max-h-[calc(100dvh-4.5rem-1rem)]",
          "flex flex-col",
          /* Heavy rounded corners for the pop-out */
          "rounded-3xl",
          "border border-border bg-background shadow-2xl shadow-black/20",
          "transform transition-transform duration-200",
          isOpen ? "translate-x-0" : "translate-x-[calc(100%+0.75rem)]",
          /* Desktop: anchored sidebar with enforced gap via internal padding */
          "lg:static lg:max-h-[calc(100vh-10rem)] lg:w-full lg:translate-x-0 lg:transform-none lg:overflow-y-auto",
          "lg:rounded-3xl lg:border lg:border-border/50 lg:bg-card/30 lg:p-4 lg:shadow-sm lg:backdrop-blur-md",
          "lg:mr-4"
        )}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <span className="text-sm font-semibold">On this page</span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden lg:block">
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-purple-600/80 uppercase">
            On this page
          </h4>
        </div>

        {/* Scrollable list — ensures all items are reachable */}
        <ul className="flex-1 space-y-1 overflow-y-auto px-4 pb-4 text-sm lg:px-0 lg:pb-0">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "0.75rem" : "0" }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="w-full rounded-xl px-2 py-1.5 text-left text-foreground/70 transition-colors hover:bg-accent hover:text-foreground lg:rounded-lg lg:px-2 lg:py-1.5 lg:text-[13px] lg:leading-snug lg:hover:bg-accent/40 lg:hover:no-underline"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
