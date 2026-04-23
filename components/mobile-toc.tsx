"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronDown, Menu } from "lucide-react"

import { cn } from "@/lib/utils"

import type { TocItem } from "@/components/toc"

interface MobileTOCProps {
  items: TocItem[]
}

export function MobileTOC({ items }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || items.length === 0) return null

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return createPortal(
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Slide-up panel */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40",
          "flex flex-col",
          "rounded-t-3xl border-t border-border bg-background shadow-2xl shadow-black/30",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ maxHeight: "60dvh" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm font-semibold">On this page</span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable list with its own viewport */}
        <ul className="flex-1 space-y-1 overflow-y-auto px-4 pb-8 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="w-full rounded-xl px-3 py-2.5 text-left text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Fixed trigger button — bottom-right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        <Menu className="h-4 w-4" />
        <span>On this page</span>
      </button>
    </>,
    document.body
  )
}
