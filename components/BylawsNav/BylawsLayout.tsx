"use client"

import { useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { BylawsNav, type BylawsNavProps } from "./BylawsNav"
import { useBreakpoint } from "./usePopout"

interface BylawsLayoutProps {
  navItems: BylawsNavProps["navItems"]
  activeId?: string
  children: ReactNode
  onNavigate?: BylawsNavProps["onNavigate"]
  className?: string
}

export function BylawsLayout({
  navItems,
  activeId,
  children,
  onNavigate,
  className,
}: BylawsLayoutProps) {
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isMobile = useBreakpoint({ breakpoint: 768 })

  const handleNavigate = useCallback(
    (item: Parameters<NonNullable<BylawsNavProps["onNavigate"]>>[0]) => {
      if (item.href) {
        router.push(item.href)
        setMobileNavOpen(false)
        onNavigate?.(item)
      }
    },
    [router, onNavigate]
  )

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev)
  }, [])

  return (
    <div className={cn("flex min-h-screen", isMobile && "flex-col", className)}>
      {/* Desktop navigation rail */}
      {isMobile === false && (
        <aside className="fixed top-0 left-0 z-40 h-screen w-64 shrink-0 border-r border-border/50 bg-background">
          <div className="h-full overflow-y-auto">
            <BylawsNav
              navItems={navItems}
              activeId={activeId}
              onNavigate={handleNavigate}
            />
          </div>
        </aside>
      )}

      {/* Mobile navigation drawer */}
      {isMobile && mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="animate-slide-in fixed inset-y-0 left-0 z-50 w-72 border-r border-border/50 bg-background">
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <span className="font-semibold">Bylaws</span>
              <button
                type="button"
                onClick={toggleMobileNav}
                className="rounded-md p-2 transition-colors hover:bg-muted/50"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <BylawsNav
                navItems={navItems}
                activeId={activeId}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </>
      )}

      {/* Mobile hamburger toggle */}
      {isMobile && (
        <button
          type="button"
          onClick={toggleMobileNav}
          className={cn(
            "fixed top-4 left-4 z-30",
            "rounded-md border border-border bg-background p-2",
            "transition-colors hover:bg-muted/50",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          )}
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Main content area */}
      <main
        className={cn("flex-1 overflow-y-auto", isMobile ? "pt-16" : "ml-64")}
      >
        <div className={cn("min-h-screen", isMobile ? "p-4" : "p-8")}>
          {children}
        </div>
      </main>
    </div>
  )
}
