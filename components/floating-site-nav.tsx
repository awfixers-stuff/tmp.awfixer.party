"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const policyItems = [
  { href: "/policy/competition", label: "Competition" },
  { href: "/policy/tax", label: "Tax & Fiscal" },
  { href: "/policy/energy", label: "Energy" },
  { href: "/policy/fiscal-transparency", label: "Fiscal Transparency" },
  { href: "/policy/foreign-policy", label: "Foreign Policy" },
  { href: "/policy/labor", label: "Labor" },
  { href: "/policy/healthcare", label: "Healthcare" },
  { href: "/policy/infrastructure", label: "Infrastructure" },
  { href: "/policy/governance", label: "Governance" },
  { href: "/policy/criminal-justice", label: "Criminal Justice" },
  { href: "/policy/anti-corruption", label: "Anti-Corruption" },
  { href: "/policy/immigration", label: "Immigration" },
  { href: "/policy/education", label: "Education" },
]

export function FloatingSiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isPhilosophy = pathname === "/philosophy"
  const isPolicyPage = pathname.startsWith("/policy/")

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav
      aria-label="Site"
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 sm:w-auto sm:max-w-none"
    >
      <div
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border border-border",
          "bg-background/70 px-2 py-2 shadow-lg shadow-black/25 backdrop-blur-xl",
          "sm:justify-between sm:gap-3 sm:px-3"
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-heading shrink-0 px-2 text-sm font-semibold tracking-tight text-foreground sm:text-base",
            "rounded-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          AWFixer Party
        </Link>
        <span
          className="hidden h-5 w-px shrink-0 bg-border sm:block"
          aria-hidden
        />
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:flex-initial sm:justify-end sm:gap-2">
          <Button size="sm" className="rounded-full" asChild>
            <a
              href="https://discord.awfixer.party"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </Button>
          <div ref={dropdownRef} className="relative">
            <Button
              size="sm"
              variant={isPolicyPage ? "secondary" : "outline"}
              className="rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              Policy
              <svg
                className={cn(
                  "ml-1 h-3 w-3 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
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
            </Button>
            <div
              className={cn(
                "absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-background shadow-xl",
                "opacity-0 translate-y-[-0.5rem] transition-all duration-200",
                isOpen && "opacity-100 translate-y-0"
              )}
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
            >
              <div className="flex flex-col py-1">
                {policyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm text-foreground/80 transition-colors",
                      "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                      pathname === item.href && "bg-accent text-foreground font-medium"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant={isPhilosophy ? "secondary" : "outline"}
            className="rounded-full"
            asChild
          >
            <Link
              href="/philosophy"
              aria-current={isPhilosophy ? "page" : undefined}
            >
              Philosophy
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}