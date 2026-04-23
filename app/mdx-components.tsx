import type { ReactNode } from "react"
import { AnimatedSection } from "@/app/components/animated-section"
import { StaticImage, Gif, Figure, Youtube } from "@/app/components/mdx-images"

type CalloutVariant = "default" | "pillar" | "warning" | "insight"

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  title?: string
}

export function Callout({
  children,
  variant = "default",
  title,
}: CalloutProps) {
  const variantClasses: Record<CalloutVariant, string> = {
    default: "border-l-purple-600",
    pillar: "border-l-purple-600 bg-purple-600 text-white [&>p]:text-white/80",
    warning: "border-l-amber-500 bg-amber-500/10",
    insight: "border-l-blue-500 bg-blue-500/10",
  }

  return (
    <div
      className={`my-6 rounded-lg border border-l-4 bg-card p-4 ${variantClasses[variant]}`}
    >
      {title && <h4 className="font-heading text-lg font-bold">{title}</h4>}
      <div className="[&>p]:mt-2 [&>p]:text-sm [&>p]:text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
  description: string
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="my-6 rounded-lg bg-purple-600 p-6 text-white">
      <div className="flex items-start gap-4">
        <span className="font-heading text-6xl font-bold text-white/20">
          {value}
        </span>
        <div>
          <h4 className="font-heading text-xl font-bold">{label}</h4>
          <p className="mt-2 text-sm text-white/80">{description}</p>
        </div>
      </div>
    </div>
  )
}

interface QuoteProps {
  children: ReactNode
  author?: string
}

export function Quote({ children, author }: QuoteProps) {
  return (
    <blockquote className="my-6 border-l-4 border-purple-600 pl-4 italic">
      {children}
      {author && (
        <cite className="mt-2 block text-sm text-muted-foreground not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  )
}

interface PillarCardProps {
  number: string
  title: string
  description: string
}

export function PillarCard({ number, title, description }: PillarCardProps) {
  return (
    <div className="rounded-lg border border-l-4 border-l-purple-600 bg-card p-4">
      <span className="font-mono text-xs text-purple-600">{number}</span>
      <h4 className="mt-2 font-mono text-sm font-semibold uppercase">
        {title}
      </h4>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

interface CommitmentProps {
  children: ReactNode
}

export function Commitment({ children }: CommitmentProps) {
  return (
    <div className="my-6 rounded-lg bg-card p-6">
      <h4 className="font-heading text-lg font-bold">The Commitment</h4>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

interface FactProps {
  children: ReactNode
  cite?: string
}

export function Fact({ children, cite }: FactProps) {
  return (
    <div className="my-4 rounded-lg border border-dashed border-purple-600/30 bg-purple-600/5 p-4">
      <div className="text-sm [&>p]:mt-0">{children}</div>
      {cite && (
        <p className="mt-2 text-xs text-muted-foreground">Source: {cite}</p>
      )}
    </div>
  )
}

interface InsightProps {
  children: ReactNode
  title?: string
}

export function Insight({ children, title }: InsightProps) {
  return (
    <div className="my-6 rounded-lg border border-l-4 border-l-purple-600 bg-card p-4">
      {title && (
        <h4 className="font-heading text-sm font-semibold tracking-wide text-purple-600 uppercase">
          {title}
        </h4>
      )}
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

interface EventMetaProps {
  date: string
  time?: string
  location?: string
  type: "virtual" | "in-person" | "hybrid"
}

export function EventMeta({ date, time, location, type }: EventMetaProps) {
  const typeLabels = {
    virtual: "Virtual Event",
    "in-person": "In-Person Event",
    hybrid: "Hybrid Event",
  }

  return (
    <div className="my-6 flex flex-wrap gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-medium">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      {time && (
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>
      )}
      {location && (
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>
      )}
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${type === "virtual" ? "bg-purple-600/10 text-purple-600" : type === "in-person" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
      >
        {typeLabels[type]}
      </span>
    </div>
  )
}

const components = {
  Callout,
  StatCard,
  Quote,
  PillarCard,
  Commitment,
  Fact,
  Insight,
  AnimatedSection,
  EventMeta,
  StaticImage,
  Gif,
  Figure,
  Youtube,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b bg-purple-600/5" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b transition-colors hover:bg-purple-600/5"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-purple-600"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/90" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-6 leading-relaxed text-foreground/90" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-purple-600 underline underline-offset-4 hover:text-purple-700"
      {...props}
    />
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 mb-6 font-heading text-3xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-4 font-heading text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 font-heading text-xl font-semibold" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-6 mb-2 font-heading text-lg font-semibold" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-purple-600 pl-4 italic"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
}

export default components
