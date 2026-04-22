"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { upcomingEventsMeta } from "@/app/events/events-meta"
import { plansMeta } from "@/app/plans/plans-meta"
import { notesMeta } from "@/app/notes/notes-meta"
import { ideasMeta } from "@/app/ideas/ideas-meta"

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

const policySections = [
  { label: "Core Policies", items: policyItems.slice(0, 5) },
  { label: "Social Policies", items: policyItems.slice(5, 10) },
  { label: "Additional", items: policyItems.slice(10) },
]

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
  const [policyOpen, setPolicyOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [plansOpen, setPlansOpen] = useState(false)
  const [ideasOpen, setIdeasOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const eventsDropdownRef = useRef<HTMLDivElement>(null)
  const plansDropdownRef = useRef<HTMLDivElement>(null)
  const ideasDropdownRef = useRef<HTMLDivElement>(null)

  const isPhilosophy = pathname === "/philosophy"
  const isPlatform = pathname === "/platform"
  const isPolicyPage = pathname.startsWith("/policy/")
  const isEventsPage = pathname.startsWith("/events")
  const isGladiatorPage = pathname.startsWith("/ideas")
  const isPlansPage = pathname.startsWith("/plans")
  const isNotesPage = pathname.startsWith("/notes")

  useEffect(() => {
    setMobileOpen(false)
    setPolicyOpen(false)
    setEventsOpen(false)
    setPlansOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPolicyOpen(false)
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

            {/* Group 1: Philosophy & Platform */}
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant={isPhilosophy ? "secondary" : "ghost"}
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
              <Button
                size="sm"
                variant={isPlatform ? "secondary" : "ghost"}
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
            </div>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Group 1.5: Notes */}
            <Button
              size="sm"
              variant={isNotesPage ? "secondary" : "ghost"}
              className="rounded-full"
              asChild
            >
              <Link
                href="/notes"
                aria-current={isNotesPage ? "page" : undefined}
              >
                Notes
              </Link>
            </Button>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            {/* Group 2: Policy dropdown */}
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
                  "absolute top-full left-0 z-50 mt-3 w-72 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                  "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                  policyOpen && "translate-y-0 opacity-100"
                )}
                style={{ pointerEvents: policyOpen ? "auto" : "none" }}
              >
                <div className="flex flex-col p-2">
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

            {/* Group 3: Events, Plans, Ideas */}
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
                    {upcomingEventsMeta.map((event) => (
                      <Link
                        key={event.slug}
                        href={`/events/${event.slug}`}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                          pathname === `/events/${event.slug}`
                            ? "bg-accent text-foreground"
                            : "text-foreground/70"
                        )}
                      >
                        {event.title}
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
                    "absolute top-full left-0 z-50 mt-3 w-52 rounded-2xl border border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl",
                    "translate-y-[-0.5rem] opacity-0 transition-all duration-200",
                    plansOpen && "translate-y-0 opacity-100"
                  )}
                  style={{ pointerEvents: plansOpen ? "auto" : "none" }}
                >
                  <div className="flex flex-col p-2">
                    <p className="mb-1 px-3 pt-1.5 text-[10px] font-semibold tracking-widest text-purple-600 uppercase">
                      Our Plans
                    </p>
                    {plansMeta.map((plan) => (
                      <Link
                        key={plan.slug}
                        href={`/plans/${plan.slug}`}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                          pathname === `/plans/${plan.slug}`
                            ? "bg-accent text-foreground"
                            : "text-foreground/70"
                        )}
                      >
                        {plan.title}
                      </Link>
                    ))}
                    <div className="my-1.5 h-px bg-border" />
                    <Link
                      href="/plans"
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
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

              <div ref={ideasDropdownRef} className="relative">
                <Button
                  size="sm"
                  variant={isGladiatorPage ? "secondary" : "ghost"}
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
                    {ideasMeta.map((idea) => (
                      <Link
                        key={idea.slug}
                        href={`/ideas/${idea.slug}`}
                        className={cn(
                          "block rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground",
                          pathname === `/ideas/${idea.slug}`
                            ? "bg-accent text-foreground"
                            : "text-foreground/70"
                        )}
                      >
                        {idea.title}
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

      {/* Mobile sheet — anchored below nav bar, stops bottom-4 from bottom */}
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
        {/* Scrollable nav items */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Policy dropdown - collapsible on mobile */}
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
                "overflow-hidden transition-all duration-200",
                policyOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
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

          <Link
            href="/notes"
            aria-current={isNotesPage ? "page" : undefined}
            className={cn(
              "block rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
              "hover:bg-accent",
              isNotesPage ? "bg-accent text-foreground" : "text-foreground/70"
            )}
          >
            Notes
          </Link>

          <div className="my-2 h-px bg-border" />

          {/* Events dropdown - collapsible on mobile */}
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
                {upcomingEventsMeta.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/events/${event.slug}`}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      pathname === `/events/${event.slug}`
                        ? "bg-accent text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {event.title}
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

          {/* Ideas dropdown - collapsible on mobile */}
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
                isGladiatorPage
                  ? "bg-accent text-foreground"
                  : "text-foreground/70"
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
                {ideasMeta.map((idea) => (
                  <Link
                    key={idea.slug}
                    href={`/ideas/${idea.slug}`}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      pathname === `/ideas/${idea.slug}`
                        ? "bg-accent text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {idea.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Plans dropdown - collapsible on mobile */}
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
                {plansMeta.map((plan) => (
                  <Link
                    key={plan.slug}
                    href={`/plans/${plan.slug}`}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent",
                      pathname === `/plans/${plan.slug}`
                        ? "bg-accent text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {plan.title}
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
