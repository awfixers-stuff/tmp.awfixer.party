"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import type { RefObject } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { plans, type NavItem } from "@/lib/nav"

import { ChevronDown } from "./chevron-down"

interface PlansDropdownProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
  dropdownRef: RefObject<HTMLDivElement | null>
}

export function PlansDropdown({
  isOpen,
  setIsOpen,
  isActive,
  dropdownRef,
}: PlansDropdownProps) {
  const pathname = usePathname()

  const plansSections = useMemo(() => {
    const sections: Record<string, NavItem[]> = {}
    plans.forEach((item) => {
      const cat = item.category || "General"
      if (!sections[cat]) sections[cat] = []
      sections[cat].push(item)
    })
    const order = [
      "Domestic Policy",
      "Local Issues",
      "International Relations",
      "Party Positions",
    ]
    return order
      .map((label) => ({
        label,
        items: sections[label] || [],
      }))
      .filter((s) => s.items.length > 0)
  }, [])

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
        Plans
        <ChevronDown
          className={cn(
            "ml-1 h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute top-full left-1/2 z-50 mt-3 w-52 -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
          "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
          isOpen && "translate-y-0 opacity-100"
        )}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col p-2">
          {plansSections.map((section) => (
            <Link
              key={section.label}
              href={section.items[0]?.href ?? "/plans"}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-foreground focus:bg-accent focus:outline-none",
                section.items.some((i) => pathname === i.href)
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PlansDropdownMobileProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
}

export function PlansDropdownMobile({
  isOpen,
  setIsOpen,
  isActive,
}: PlansDropdownMobileProps) {
  const pathname = usePathname()

  const plansSections = useMemo(() => {
    const sections: Record<string, NavItem[]> = {}
    plans.forEach((item) => {
      const cat = item.category || "General"
      if (!sections[cat]) sections[cat] = []
      sections[cat].push(item)
    })
    const order = [
      "Domestic Policy",
      "Local Issues",
      "International Relations",
      "Party Positions",
    ]
    return order
      .map((label) => ({ label, items: sections[label] || [] }))
      .filter((s) => s.items.length > 0)
  }, [])

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
        <span>Plans</span>
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
          {plansSections.map((section) => (
            <Link
              key={section.label}
              href={section.items[0]?.href ?? "/plans"}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent",
                section.items.some((i) => pathname === i.href)
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
