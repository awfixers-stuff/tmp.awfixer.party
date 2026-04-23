"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect, useMemo } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  policy,
  plans,
  ideas,
  notes,
  events,
  governance,
  NavItem,
} from "@/lib/nav"

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

export function FloatingSiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [coreOpen, setCoreOpen] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [governanceOpen, setGovernanceOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [plansOpen, setPlansOpen] = useState(false)
  const [ideasOpen, setIdeasOpen] = useState(false)
  const coreDropdownRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const governanceDropdownRef = useRef<HTMLDivElement>(null)
  const eventsDropdownRef = useRef<HTMLDivElement>(null)
  const plansDropdownRef = useRef<HTMLDivElement>(null)
  const ideasDropdownRef = useRef<HTMLDivElement>(null)

  const isPhilosophy = pathname === "/philosophy"
  const isPlatform = pathname === "/platform"
  const isNotesPage = pathname.startsWith("/notes")
  const isCorePage = isPhilosophy || isPlatform || isNotesPage
  const isPolicyPage = pathname.startsWith("/policy/")
  const isGovernancePage = pathname.startsWith("/governance")
  const isEventsPage = pathname.startsWith("/events")
  const isIdeasPage = pathname.startsWith("/ideas")
  const isPlansPage = pathname.startsWith("/plans")

  const policySections = useMemo(() => {
    const sections: Record<string, NavItem[]> = {}
    policy.forEach((item) => {
      const cat = item.category || "General"
      if (!sections[cat]) sections[cat] = []
      sections[cat].push(item)
    })
    const order = ["Core Policies", "Social Policies", "Additional"]
    return order
      .map((label) => ({
        label,
        items: sections[label] || [],
      }))
      .filter((s) => s.items.length > 0)
  }, [])

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

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.date && new Date(e.date) >= new Date())
      .sort(
        (a, b) => new Date(a!.date!).getTime() - new Date(b!.date!).getTime()
      )
      .slice(0, 5)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCoreOpen(false)
    setPolicyOpen(false)
    setGovernanceOpen(false)
    setEventsOpen(false)
    setPlansOpen(false)
    setIdeasOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        coreDropdownRef.current &&
        !coreDropdownRef.current.contains(event.target as Node)
      ) {
        setCoreOpen(false)
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPolicyOpen(false)
      }
      if (
        governanceDropdownRef.current &&
        !governanceDropdownRef.current.contains(event.target as Node)
      ) {
        setGovernanceOpen(false)
      }
      if (
        eventsDropdownRef.current &&
        !eventsDropdownRef.current.contains(event.target as Node)
      ) {
        setEventsOpen(false)
      }
      if (
        plansDropdownRef.current &&
        !plansDropdownRef.current.contains(event.target as Node)
      ) {
        setPlansOpen(false)
      }
      if (
        ideasDropdownRef.current &&
        !ideasDropdownRef.current.contains(event.target as Node)
      ) {
        setIdeasOpen(false)
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
            "sm:gap-0 sm:px-3"
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
          <div className="hidden items-center sm:flex">
            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Core dropdown: Philosophy, Platform, Notes */}
            <div ref={coreDropdownRef} className="relative">
              <Button
                size="sm"
                variant={isCorePage ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setCoreOpen(!coreOpen)}
                aria-expanded={coreOpen}
                aria-haspopup="true"
              >
                Core
                <ChevronDown
                  className={cn(
                    "ml-1 h-3 w-3 transition-transform duration-200",
                    coreOpen && "rotate-180"
                  )}
                />
              </Button>
              <div
                className={cn(
                  "absolute top-full left-1/2 z-50 mt-3 w-48 -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                  "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                  coreOpen ? "translate-y-0 opacity-100" : "pointer-events-none"
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
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
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

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Policy dropdown */}
            <div ref={dropdownRef} className="relative">
              <Button
                size="sm"
                variant={isPolicyPage ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setPolicyOpen(!policyOpen)}
                aria-expanded={policyOpen}
                aria-haspopup="true"
              >
                Policy
                <ChevronDown
                  className={cn(
                    "ml-1 h-3 w-3 transition-transform duration-200",
                    policyOpen && "rotate-180"
                  )}
                />
              </Button>
              <div
                className={cn(
                  "absolute top-full left-1/2 z-50 mt-3 w-[640px] -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                  "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                  policyOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none"
                )}
              >
                <div className="grid grid-cols-3 gap-2 p-3">
                  {policySections.map((section) => (
                    <div key={section.label} className="flex flex-col">
                      <p className="mb-2 px-3 pt-1 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                        {section.label}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "block rounded-xl px-3 py-1.5 text-sm font-medium transition-colors",
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
                  ))}
                </div>
              </div>
            </div>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Governance dropdown */}
            <div ref={governanceDropdownRef} className="relative">
              <Button
                size="sm"
                variant={isGovernancePage ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setGovernanceOpen(!governanceOpen)}
                aria-expanded={governanceOpen}
                aria-haspopup="true"
              >
                Governance
                <ChevronDown
                  className={cn(
                    "ml-1 h-3 w-3 transition-transform duration-200",
                    governanceOpen && "rotate-180"
                  )}
                />
              </Button>
              <div
                className={cn(
                  "absolute top-full left-1/2 z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                  "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                  governanceOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none"
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
                  ))}
                </div>
              </div>
            </div>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Events, Plans, Ideas */}
            <div className="flex items-center gap-1">
              <div ref={eventsDropdownRef} className="relative">
                <Button
                  size="sm"
                  variant={isEventsPage ? "secondary" : "ghost"}
                  className="rounded-full"
                  onClick={() => setEventsOpen(!eventsOpen)}
                  aria-expanded={eventsOpen}
                  aria-haspopup="true"
                >
                  Events
                  <ChevronDown
                    className={cn(
                      "ml-1 h-3 w-3 transition-transform duration-200",
                      eventsOpen && "rotate-180"
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    "absolute top-full left-0 z-50 mt-3 w-56 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                    "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                    eventsOpen && "translate-y-0 opacity-100"
                  )}
                  style={{ pointerEvents: eventsOpen ? "auto" : "none" }}
                >
                  <div className="flex flex-col p-2">
                    <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                      Upcoming Events
                    </p>
                    {upcomingEvents.map((event) => (
                      <Link
                        key={event.slug}
                        href={event.href}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                          pathname === event.href
                            ? "bg-accent text-foreground"
                            : "text-foreground/70"
                        )}
                      >
                        {event.label}
                      </Link>
                    ))}
                    <div className="my-1.5 h-px bg-border" />
                    <Link
                      href="/events"
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                        pathname === "/events"
                          ? "bg-accent text-foreground"
                          : "text-purple-600"
                      )}
                    >
                      View All Events
                    </Link>
                  </div>
                </div>
              </div>

              <div ref={plansDropdownRef} className="relative">
                <Button
                  size="sm"
                  variant={isPlansPage ? "secondary" : "ghost"}
                  className="rounded-full"
                  onClick={() => setPlansOpen(!plansOpen)}
                  aria-expanded={plansOpen}
                  aria-haspopup="true"
                >
                  Plans
                  <ChevronDown
                    className={cn(
                      "ml-1 h-3 w-3 transition-transform duration-200",
                      plansOpen && "rotate-180"
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    "absolute top-full left-1/2 z-50 mt-3 w-[640px] -translate-x-1/2 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                    "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                    plansOpen && "translate-y-0 opacity-100"
                  )}
                  style={{ pointerEvents: plansOpen ? "auto" : "none" }}
                >
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {plansSections.map((section) => (
                      <div key={section.label} className="flex flex-col">
                        <p className="mb-2 px-3 pt-1 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                          {section.label}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "block rounded-xl px-3 py-1.5 text-sm font-medium transition-colors",
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
                    ))}
                  </div>
                </div>
              </div>

              <div ref={ideasDropdownRef} className="relative">
                <Button
                  size="sm"
                  variant={isIdeasPage ? "secondary" : "ghost"}
                  className="rounded-full"
                  onClick={() => setIdeasOpen(!ideasOpen)}
                  aria-expanded={ideasOpen}
                  aria-haspopup="true"
                >
                  Ideas
                  <ChevronDown
                    className={cn(
                      "ml-1 h-3 w-3 transition-transform duration-200",
                      ideasOpen && "rotate-180"
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    "absolute top-full left-0 z-50 mt-3 w-56 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                    "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                    ideasOpen && "translate-y-0 opacity-100"
                  )}
                  style={{ pointerEvents: ideasOpen ? "auto" : "none" }}
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
                          "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
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
            </div>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Discord CTA */}
            <Button size="sm" className="rounded-full" asChild>
              <a
                href="https://mee6.gg/awfixerpolitics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
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

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 sm:hidden",
          "w-[calc(100%-1.5rem)] max-w-md",
          "top-[4.5rem] bottom-4",
          "flex flex-col",
          "rounded-3xl border border-border bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-xl",
          "transition-all duration-200 ease-out",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        <div className="flex-1 overflow-y-auto p-3">
          {/* Core dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCoreOpen(!coreOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isCorePage ? "bg-accent text-foreground" : "text-foreground/70"
              )}
            >
              <span>Core</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  coreOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                coreOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="mt-1 flex flex-col">
                {[
                  {
                    href: "/philosophy",
                    label: "Philosophy",
                    active: isPhilosophy,
                  },
                  { href: "/platform", label: "Platform", active: isPlatform },
                  { href: "/notes", label: "Notes", active: isNotesPage },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      item.active
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

          <div className="my-2 h-px bg-border" />

          {/* Policy dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPolicyOpen(!policyOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isPolicyPage
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              <span>Policy</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  policyOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                policyOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="mt-1 flex flex-col">
                {policySections.map((section, i) => (
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

          <div className="my-2 h-px bg-border" />

          {/* Governance dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setGovernanceOpen(!governanceOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isGovernancePage
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              <span>Governance</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  governanceOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                governanceOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
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

          <div className="my-2 h-px bg-border" />

          {/* Events dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setEventsOpen(!eventsOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isEventsPage
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
              )}
            >
              <span>Events</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  eventsOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                eventsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="mt-1 flex flex-col gap-1 pl-2">
                {upcomingEvents.map((event) => (
                  <Link
                    key={event.slug}
                    href={event.href}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      pathname === event.href
                        ? "bg-accent text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {event.label}
                  </Link>
                ))}
                <Link
                  href="/events"
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent",
                    pathname === "/events"
                      ? "bg-accent text-foreground"
                      : "text-purple-600"
                  )}
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>

          {/* Ideas dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIdeasOpen(!ideasOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isIdeasPage ? "bg-accent text-foreground" : "text-foreground/70"
              )}
            >
              <span>Ideas</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  ideasOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                ideasOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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

          {/* Plans dropdown */}
          <div className="mb-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setPlansOpen(!plansOpen)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent",
                isPlansPage ? "bg-accent text-foreground" : "text-foreground/70"
              )}
            >
              <span>Plans</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  plansOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                plansOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="mt-1 flex flex-col gap-1 pl-2">
                {plans.map((plan) => (
                  <Link
                    key={plan.slug}
                    href={plan.href}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      pathname === plan.href
                        ? "bg-accent text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {plan.label}
                  </Link>
                ))}
                <Link
                  href="/plans"
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm transition-colors",
                    "hover:bg-accent",
                    pathname === "/plans"
                      ? "bg-accent text-foreground"
                      : "text-purple-600"
                  )}
                >
                  All Plans
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Discord CTA */}
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
