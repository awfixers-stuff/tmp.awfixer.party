"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

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
  { href: "/policy/technology", label: "Technology & AI" },
  { href: "/policy/civil-standard", label: "Civil Standard of Living" },
]

export function FloatingSiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isPhilosophy = pathname === "/philosophy"
  const isPlatform = pathname === "/platform"
  const isPolicyPage = pathname.startsWith("/policy/")

  useEffect(() => {
    setMobileOpen(false)
    setPolicyOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPolicyOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <nav
        aria-label="Site"
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 sm:w-auto sm:max-w-none"
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-full border border-border",
            "bg-background/70 px-2 py-2 shadow-lg shadow-black/25 backdrop-blur-xl",
            "sm:gap-3 sm:px-3"
          )}
        >
          <Link
            href="/"
            className={cn(
              "shrink-0 px-2 font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base",
              "rounded-full py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            AWFixer Party
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-5 w-px shrink-0 bg-border" aria-hidden />
            <Button size="sm" className="rounded-full" asChild>
              <a
                href="https://mee6.gg/awfixerpolitics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </Button>
            <Button
              size="sm"
              variant={isPlatform ? "secondary" : "outline"}
              className="rounded-full"
              asChild
            >
              <Link
                href="/platform"
                aria-current={isPlatform ? "page" : undefined}
              >
                Platform
              </Link>
            </Button>
            <div ref={dropdownRef} className="relative">
              <Button
                size="sm"
                variant={isPolicyPage ? "secondary" : "outline"}
                className="rounded-full"
                onClick={() => setPolicyOpen(!policyOpen)}
                aria-expanded={policyOpen}
                aria-haspopup="true"
              >
                Policy
                <svg
                  className={cn(
                    "ml-1 h-3 w-3 transition-transform duration-200",
                    policyOpen && "rotate-180"
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
                  "absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                  "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                  policyOpen && "translate-y-0 opacity-100"
                )}
                style={{ pointerEvents: policyOpen ? "auto" : "none" }}
              >
                <div className="flex flex-col p-2">
                  <p className="mb-1 px-2 text-[10px] font-semibold tracking-widest text-foreground/40 uppercase">
                    Policy
                  </p>
                  {policyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                        pathname === item.href
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

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-full p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-foreground sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden",
          "transition-opacity duration-200",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* Mobile sheet — anchored below nav bar, stops bottom-4 from bottom */}
      <div
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 sm:hidden",
          "w-[calc(100%-1.5rem)] max-w-md",
          "top-[4.5rem] bottom-4",
          "flex flex-col overflow-hidden",
          "rounded-3xl border border-border bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-xl",
          "transition-all duration-200 ease-out",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        {/* Scrollable nav items */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="mb-1.5 px-2 text-[10px] font-semibold tracking-widest text-foreground/40 uppercase">
            Policy
          </p>
          {policyItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-accent",
                pathname === item.href
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="my-3 h-px bg-border" />

          <Link
            href="/platform"
            aria-current={isPlatform ? "page" : undefined}
            className={cn(
              "block rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
              "hover:bg-accent",
              isPlatform ? "bg-accent text-foreground" : "text-foreground/70"
            )}
          >
            Platform
          </Link>

          <Link
            href="/philosophy"
            aria-current={isPhilosophy ? "page" : undefined}
            className={cn(
              "block rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
              "hover:bg-accent",
              isPhilosophy ? "bg-accent text-foreground" : "text-foreground/70"
            )}
          >
            Philosophy
          </Link>
        </div>

        {/* Discord CTA — prominent at the bottom */}
        <div className="p-3">
          <Button
            size="lg"
            className="w-full rounded-2xl text-base font-semibold"
            asChild
          >
            <a
              href="https://mee6.gg/awfixerpolitics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
