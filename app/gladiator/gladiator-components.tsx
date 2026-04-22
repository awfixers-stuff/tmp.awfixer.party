"use client"

import Image from "next/image"
import { useEffect, useRef, type ReactNode } from "react"

interface GladiatorEventProps {
  name: string
  description: string
  image?: string
  imageAlt?: string
  dangerLevel: number
  participants: string
}

export function GladiatorEvent({ name, description, image, imageAlt, dangerLevel, participants }: GladiatorEventProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-purple-600/20 bg-card">
      {image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image 
            src={image} 
            alt={imageAlt || name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-heading text-2xl font-bold text-white">{name}</h3>
          </div>
        </div>
      )}
      <div className="p-6">
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-purple-600">Danger Level:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < dangerLevel ? "text-red-500" : "text-gray-300"}>★</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-600">Participants:</span>
            <span className="font-medium">{participants}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ArenaSectionProps {
  title: string
  children: ReactNode
}

export function ArenaSection({ title, children }: ArenaSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("animate-fade-up")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="opacity-0 my-12">
      <h2 className="font-heading text-2xl font-bold tracking-tight mb-6">{title}</h2>
      {children}
    </div>
  )
}

interface StatBoxProps {
  value: string
  label: string
}

export function StatBox({ value, label }: StatBoxProps) {
  return (
    <div className="rounded-xl bg-purple-600 p-6 text-center text-white">
      <div className="font-heading text-4xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  )
}

interface InlineImageProps {
  src: string
  alt: string
  caption?: string
}

export function InlineImage({ src, alt, caption }: InlineImageProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image 
          src={src} 
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface QuoteBoxProps {
  children: ReactNode
  author?: string
}

export function QuoteBox({ children, author }: QuoteBoxProps) {
  return (
    <blockquote className="my-8 border-l-4 border-purple-600 pl-6 py-2">
      <p className="text-lg italic text-foreground/90">{children}</p>
      {author && (
        <cite className="mt-2 block text-sm text-purple-600 not-italic">— {author}</cite>
      )}
    </blockquote>
  )
}

interface CalloutBoxProps {
  children: ReactNode
  title?: string
  variant?: "default" | "warning" | "highlight"
}

export function CalloutBox({ children, title, variant = "default" }: CalloutBoxProps) {
  const variantStyles = {
    default: "border-l-purple-600 bg-purple-600/5",
    warning: "border-l-amber-500 bg-amber-500/5",
    highlight: "border-l-pink-500 bg-pink-500/5",
  }

  return (
    <div className={`my-6 rounded-lg border border-l-4 p-5 ${variantStyles[variant]}`}>
      {title && (
        <h4 className="font-heading text-lg font-bold mb-2">{title}</h4>
      )}
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

interface EventCardProps {
  name: string
  description: string
  icon?: string
}

export function EventCard({ name, description, icon }: EventCardProps) {
  return (
    <div className="rounded-xl border border-purple-600/20 bg-card p-5 hover:border-purple-600/40 transition-colors">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <h4 className="font-heading font-bold">{name}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

interface ScheduleEvent {
  date: string
  event: string
  location: string
  status: "upcoming" | "open" | "full"
}

interface ScheduleGridProps {
  events: ScheduleEvent[]
}

export function ScheduleGrid({ events }: ScheduleGridProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-purple-600/20">
      <div className="grid grid-cols-4 gap-4 bg-purple-600/10 p-4 text-sm font-bold">
        <div>Date</div>
        <div>Event</div>
        <div>Location</div>
        <div>Status</div>
      </div>
      {events.map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 border-t border-purple-600/10 p-4 text-sm">
          <div className="font-medium">{item.date}</div>
          <div>{item.event}</div>
          <div>{item.location}</div>
          <div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              item.status === "open" ? "bg-green-500/20 text-green-600" :
              item.status === "full" ? "bg-red-500/20 text-red-600" :
              "bg-gray-500/20 text-gray-600"
            }`}>
              {item.status === "open" ? "Open" : item.status === "full" ? "Full" : "Upcoming"}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

interface HeroImageProps {
  src: string
  alt: string
}

export { ScheduleGrid }

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl my-8">
      <Image 
        src={src} 
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
        <div className="p-8">
          <h2 className="font-heading text-3xl font-bold text-white max-w-lg">
            Channel Your Competitive Spirit
          </h2>
        </div>
      </div>
    </div>
  )
}
