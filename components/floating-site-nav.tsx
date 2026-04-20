"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingSiteNav() {
  const pathname = usePathname()
  const onPhilosophy = pathname === "/philosophy"

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
          <Button
            size="sm"
            variant={onPhilosophy ? "secondary" : "outline"}
            className="rounded-full"
            asChild
          >
            <Link
              href="/philosophy"
              aria-current={onPhilosophy ? "page" : undefined}
            >
              Philosophy
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
