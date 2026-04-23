"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { RefObject } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ideas } from "@/lib/nav"

import { ChevronDown } from "./chevron-down"

interface IdeasDropdownProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
  dropdownRef: RefObject<HTMLDivElement | null>
}

export function IdeasDropdown({
  isOpen,
  setIsOpen,
  isActive,
  dropdownRef,
}: IdeasDropdownProps) {
  const pathname = usePathname()

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        size="sm"
        variant={isActive ? "secondary" : "ghost"}
        className="rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Ideas
        <ChevronDown
          className={cn(
            "ml-1 h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute top-full left-0 z-50 mt-3 w-56 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
          "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
          isOpen && "translate-y-0 opacity-100"
        )}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col p-2">
          <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
            Concepts
          </p>
          {ideas.map((idea) => (
            <Link
              key={idea.slug}
              href={idea.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "focus-text-foreground hover:bg-accent hover:text-foreground focus:bg-accent",
                pathname === idea.href
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {idea.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

interface IdeasDropdownMobileProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
}

export function IdeasDropdownMobile({
  isOpen,
  setIsOpen,
  isActive,
}: IdeasDropdownMobileProps) {
  const pathname = usePathname()

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
          "hover:bg-accent",
          isActive ? "bg-accent text-foreground" : "text-foreground/70"
        )}
      >
        <span>Ideas</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mt-1 flex flex-col gap-1 pl-2">
          {ideas.map((idea) => (
            <Link
              key={idea.slug}
              href={idea.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm transition-colors",
                "hover:bg-accent",
                pathname === idea.href
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {idea.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
