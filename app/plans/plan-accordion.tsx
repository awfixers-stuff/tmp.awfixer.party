"use client"

import Link from "next/link"
import { useState } from "react"

import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface PlanAccordionProps {
  title: string
  description: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function PlanAccordion({
  title,
  description,
  children,
  defaultOpen = false,
}: PlanAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg border">
      <button
        type="button"
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-accent"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div>
          <h3 className="font-heading text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      <div className={cn("border-t px-5 py-4", !open && "hidden")}>
        {children}
      </div>
    </div>
  )
}

interface PlanAccordionItemProps {
  slug: string
  title: string
  description: string
}

export function PlanAccordionItem({
  slug,
  title,
  description,
}: PlanAccordionItemProps) {
  return (
    <Link
      href={`/plans/${slug}`}
      className="block rounded-md py-2 pr-4 transition-colors hover:bg-accent"
    >
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
