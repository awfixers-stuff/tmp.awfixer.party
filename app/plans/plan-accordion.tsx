"use client"

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
  return (
    <div className="rounded-lg border">
      <button
        type="button"
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-accent"
        onClick={(e) => {
          const content = e.currentTarget.nextElementSibling
          if (content) {
            const isHidden = content.classList.contains("hidden")
            if (isHidden) {
              content.classList.remove("hidden")
              e.currentTarget
                .querySelector('[data-chevron]')
                ?.classList.add("rotate-180")
            } else {
              content.classList.add("hidden")
              e.currentTarget
                .querySelector('[data-chevron]')
                ?.classList.remove("rotate-180")
            }
          }
        }}
        aria-expanded={defaultOpen}
      >
        <div>
          <h3 className="font-heading text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronDown
          data-chevron
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            defaultOpen ? "rotate-180" : ""
          )}
        />
      </button>
      <div className={cn("border-t px-5 py-4", defaultOpen ? "" : "hidden")}>
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
    <a
      href={`/plans/${slug}`}
      className="block rounded-md py-2 pr-4 transition-colors hover:bg-accent"
    >
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  )
}