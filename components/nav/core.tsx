"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { RefObject } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

interface CoreDropdownProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
  dropdownRef: RefObject<HTMLDivElement | null>
}

export function CoreDropdown({
  isOpen,
  setIsOpen,
  isActive,
  dropdownRef,
}: CoreDropdownProps) {
  const pathname = usePathname()
  const isPhilosophy = pathname === "/philosophy"
  const isPlatform = pathname === "/platform"
  const isNotesPage = pathname.startsWith("/notes")
  const isSocials = pathname === "/socials"

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
        Core
        <ChevronDown
          className={cn(
            "ml-1 h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute top-full left-1/2 z-50 mt-3 w-48 -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
          "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none"
        )}
      >
        <div className="flex flex-col p-2">
          <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
            Core
          </p>
          {[
            { href: "/philosophy", label: "Philosophy" },
            { href: "/platform", label: "Platform" },
            { href: "/notes", label: "Notes" },
            { href: "/socials", label: "Socials" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                "focus-text-foreground hover:bg-accent hover:text-foreground focus:bg-accent",
                pathname === item.href ||
                  (item.href === "/notes" && isNotesPage)
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CoreDropdownMobileProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isActive: boolean
}

export function CoreDropdownMobile({
  isOpen,
  setIsOpen,
  isActive,
}: CoreDropdownMobileProps) {
  const pathname = usePathname()
  const isPhilosophy = pathname === "/philosophy"
  const isPlatform = pathname === "/platform"
  const isNotesPage = pathname.startsWith("/notes")
  const isSocials = pathname === "/socials"

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
        <span>Core</span>
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
          {[
            { href: "/philosophy", label: "Philosophy", active: isPhilosophy },
            { href: "/platform", label: "Platform", active: isPlatform },
            { href: "/notes", label: "Notes", active: isNotesPage },
            { href: "/socials", label: "Socials", active: isSocials },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm transition-colors",
                "hover:bg-accent",
                item.active ? "bg-accent text-foreground" : "text-foreground/70"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
