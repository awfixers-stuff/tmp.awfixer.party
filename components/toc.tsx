"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  text: string
  level: number
}

interface DesktopTOCProps {
  items: TocItem[]
}

export function DesktopTOC({ items }: DesktopTOCProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      console.warn(`[TOC] No element found for id: "${id}"`)
    }
  }

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "max-h-[calc(100vh-10rem)] w-full overflow-y-auto",
        "rounded-3xl border border-border/50 bg-card/30 p-4 shadow-sm backdrop-blur-md",
        "mr-4"
      )}
    >
      <h4 className="mb-4 text-sm font-semibold tracking-wider text-purple-600/80 uppercase">
        On this page
      </h4>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "0.75rem" : "0" }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "w-full rounded-lg px-2 py-1.5 text-left text-[13px] leading-snug transition-colors",
                activeId === item.id
                  ? "bg-accent/60 font-medium text-purple-600"
                  : "text-foreground/70 hover:bg-accent/40 hover:text-foreground"
              )}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
