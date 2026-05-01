"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { NavItem } from "./NavItem"
import { useBreakpoint } from "./usePopout"
import type { NavItem as NavItemType } from "@/app/bylaws/bylaws"

export interface BylawsNavProps {
  navItems: NavItemType[]
  activeId?: string
  mobileBreakpoint?: number
  onNavigate?: (item: NavItemType) => void
  className?: string
}

export function BylawsNav({
  navItems,
  activeId,
  mobileBreakpoint = 768,
  onNavigate,
  className,
}: BylawsNavProps) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const isMobile = useBreakpoint({ breakpoint: mobileBreakpoint })

  const handleOpen = useCallback((id: string) => setOpenId(id), [])
  const handleClose = useCallback(() => setOpenId(null), [])

  const handleNavigate = useCallback(
    (item: NavItemType) => {
      if (item.href) {
        router.push(item.href)
        setMobileOpen(false)
        onNavigate?.(item)
      }
    },
    [router, onNavigate]
  )

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  return (
    <nav
      className={cn("flex flex-col", className)}
      role="navigation"
      aria-label="Bylaws navigation"
    >
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          type="button"
          onClick={toggleMobile}
          className={cn(
            "flex items-center justify-between",
            "w-full px-4 py-3",
            "border-b border-border/50",
            "transition-colors hover:bg-muted/50",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          )}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          <span className="font-medium">Bylaws</span>
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      )}

      {/* Navigation content */}
      {(isMobile === false || mobileOpen) && (
        <div
          id={isMobile ? "mobile-nav-menu" : undefined}
          className={cn(
            isMobile
              ? "animate-accordion-height"
              : "flex w-64 shrink-0 flex-col border-r border-border/50"
          )}
        >
          <div role="menu" className={cn(isMobile ? "py-2" : "px-2 py-4")}>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                activeId={activeId}
                isMobile={isMobile ?? false}
                openId={openId}
                onOpen={handleOpen}
                onClose={handleClose}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
