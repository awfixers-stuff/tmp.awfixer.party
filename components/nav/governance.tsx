"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import type { RefObject } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { governance, type NavItem } from "@/lib/nav"

import { ChevronDown } from "./chevron-down"

interface GovernanceDropdownProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
  dropdownRef: RefObject<HTMLDivElement | null>
}

export function GovernanceDropdown({
  isOpen,
  setIsOpen,
  isActive,
  dropdownRef,
}: GovernanceDropdownProps) {
  const pathname = usePathname()

  const governanceSections = useMemo(() => {
    const sections: Record<string, NavItem[]> = {}
    governance.forEach((item) => {
      const cat = item.category || "General"
      if (!sections[cat]) sections[cat] = []
      sections[cat].push(item)
    })
    const order = ["Overview", "Leadership", "Members"]
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
        Governance
        <ChevronDown
          className={cn(
            "ml-1 h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute top-full left-1/2 z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
          "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none"
        )}
      >
        <div className="flex flex-col p-2">
          {governanceSections.map((section, i) => (
            <div key={section.label}>
              {i > 0 && <div className="my-1.5 h-px bg-border" />}
              <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                {section.label}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    "focus-text-foreground hover:bg-accent hover:text-foreground focus:bg-accent",
                    pathname === item.href
                      ? "bg-accent text-foreground"
                      : "text-foreground/70"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface GovernanceDropdownMobileProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
}

export function GovernanceDropdownMobile({
  isOpen,
  setIsOpen,
  isActive,
}: GovernanceDropdownMobileProps) {
  const pathname = usePathname()

  const governanceSections = useMemo(() => {
    const sections: Record<string, NavItem[]> = {}
    governance.forEach((item) => {
      const cat = item.category || "General"
      if (!sections[cat]) sections[cat] = []
      sections[cat].push(item)
    })
    const order = ["Overview", "Leadership", "Members"]
    return order
      .map((label) => ({
        label,
        items: sections[label] || [],
      }))
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
        <span>Governance</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mt-1 flex flex-col">
          {governanceSections.map((section, i) => (
            <div key={section.label}>
              {i > 0 && <div className="my-1.5 h-px bg-border" />}
              <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                {section.label}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent",
                    pathname === item.href
                      ? "bg-accent text-foreground"
                      : "text-foreground/70"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
