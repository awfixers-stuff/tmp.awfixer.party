"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/nav"

import { CoreDropdown, CoreDropdownMobile } from "./core"
import { PolicyDropdown, PolicyDropdownMobile } from "./policy"
import { GovernanceDropdown, GovernanceDropdownMobile } from "./governance"
import { EventsDropdown, EventsDropdownMobile } from "./events"
import { PlansDropdown, PlansDropdownMobile } from "./plans"
import { IdeasDropdown, IdeasDropdownMobile } from "./ideas"

export function SiteNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [coreOpen, setCoreOpen] = useState(false)
  const [policyOpen, setPolicyOpen] = useState(false)
  const [governanceOpen, setGovernanceOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [plansOpen, setPlansOpen] = useState(false)
  const [ideasOpen, setIdeasOpen] = useState(false)
  const coreDropdownRef = useRef<HTMLDivElement>(null)
  const policyDropdownRef = useRef<HTMLDivElement>(null)
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
        policyDropdownRef.current &&
        !policyDropdownRef.current.contains(event.target as Node)
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

          <div className="hidden items-center sm:flex">
            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            <CoreDropdown
              isOpen={coreOpen}
              setIsOpen={setCoreOpen}
              isActive={isCorePage}
              dropdownRef={coreDropdownRef}
            />

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            <PolicyDropdown
              isOpen={policyOpen}
              setIsOpen={setPolicyOpen}
              isActive={isPolicyPage}
              dropdownRef={policyDropdownRef}
            />

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            <GovernanceDropdown
              isOpen={governanceOpen}
              setIsOpen={setGovernanceOpen}
              isActive={isGovernancePage}
              dropdownRef={governanceDropdownRef}
            />

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

            <div className="flex items-center gap-1">
              <EventsDropdown
                isOpen={eventsOpen}
                setIsOpen={setEventsOpen}
                isActive={isEventsPage}
                dropdownRef={eventsDropdownRef}
              />

              <PlansDropdown
                isOpen={plansOpen}
                setIsOpen={setPlansOpen}
                isActive={isPlansPage}
                dropdownRef={plansDropdownRef}
              />

              <IdeasDropdown
                isOpen={ideasOpen}
                setIsOpen={setIdeasOpen}
                isActive={isIdeasPage}
                dropdownRef={ideasDropdownRef}
              />
            </div>

            <span className="mx-2 h-5 w-px shrink-0 bg-border" aria-hidden />

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
          <CoreDropdownMobile
            isOpen={coreOpen}
            setIsOpen={setCoreOpen}
            isActive={isCorePage}
          />

          <div className="my-2 h-px bg-border" />

          <PolicyDropdownMobile
            isOpen={policyOpen}
            setIsOpen={setPolicyOpen}
            isActive={isPolicyPage}
          />

          <div className="my-2 h-px bg-border" />

          <GovernanceDropdownMobile
            isOpen={governanceOpen}
            setIsOpen={setGovernanceOpen}
            isActive={isGovernancePage}
          />

          <div className="my-2 h-px bg-border" />

          <EventsDropdownMobile
            isOpen={eventsOpen}
            setIsOpen={setEventsOpen}
            isActive={isEventsPage}
          />

          <div className="my-2 h-px bg-border" />

          <IdeasDropdownMobile
            isOpen={ideasOpen}
            setIsOpen={setIdeasOpen}
            isActive={isIdeasPage}
          />

          <div className="my-2 h-px bg-border" />

          <PlansDropdownMobile
            isOpen={plansOpen}
            setIsOpen={setPlansOpen}
            isActive={isPlansPage}
          />
        </div>

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
