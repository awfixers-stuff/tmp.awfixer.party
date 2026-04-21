"use client"

import { useState } from "react"
import { ChevronRight, Menu } from "lucide-react"

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg md:hidden"
      >
        <Menu className="h-4 w-4" />
        <span>On this page</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`
          fixed right-0 top-0 z-40 h-auto w-64 transform overflow-y-auto bg-background px-4 py-6 shadow-lg transition-transform duration-200
          md:relative md:h-auto md:w-64 md:transform-none md:bg-transparent md:px-0 md:py-0 md:shadow-none
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="text-sm font-semibold">On this page</span>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden md:block">
          <h4 className="mb-4 text-sm font-semibold">On this page</h4>
        </div>

        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="text-left text-foreground/70 transition-colors hover:text-foreground hover:underline"
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
