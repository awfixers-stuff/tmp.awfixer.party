"use client"

import { useEffect, useRef, type ReactNode } from "react"

type CalloutVariant = "default" | "pillar" | "warning" | "insight"

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  title?: string
}

export function Callout({ children, variant = "default", title }: CalloutProps) {
  const variantClasses: Record<CalloutVariant, string> = {
    default: "border-l-purple-500",
    pillar: "border-l-purple-500 bg-purple-600 text-white [&>p]:text-white/80",
    warning: "border-l-amber-500 bg-amber-500/10",
    insight: "border-l-blue-500 bg-blue-500/10",
  }

  return (
    <div
      className={`my-6 rounded-lg border bg-card p-4 border-l-4 ${variantClasses[variant]}`}
    >
      {title && (
        <h4 className="font-heading text-lg font-bold">{title}</h4>
      )}
      <div className="[&>p]:mt-2 [&>p]:text-sm [&>p]:text-muted-foreground">{children}</div>
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
        <span className="font-heading text-6xl font-bold text-white/20">{value}</span>
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
    <blockquote className="my-6 border-l-4 border-purple-500 pl-4 italic">
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
    <div className="rounded-lg border bg-card p-4 border-l-4 border-l-purple-500">
      <span className="text-xs font-mono text-purple-500">{number}</span>
      <h4 className="mt-2 font-mono text-sm font-semibold uppercase">{title}</h4>
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
    <div className="my-4 rounded-lg border border-dashed border-purple-500/30 bg-purple-500/5 p-4">
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
    <div className="my-6 rounded-lg border border-l-4 border-l-purple-500 bg-card p-4">
      {title && (
        <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-purple-500">
          {title}
        </h4>
      )}
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.animationDelay = `${delay * 0.1}s`
            el.classList.add("animate-fade-up")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
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
}

export default components