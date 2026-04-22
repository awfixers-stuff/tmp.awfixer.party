import { notFound } from "next/navigation"

import { Separator } from "@/components/ui/separator"

import { events, getEvent } from "../events"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const event = getEvent(slug)
  
  if (!event) {
    return {
      title: "Event Not Found | AWFixer Political Party",
    }
  }

  return {
    title: `${event.title} | AWFixer Political Party`,
    description: event.description,
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = getEvent(slug)

  if (!event) {
    notFound()
  }

  const EventContent = event.Component

  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-600">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {event.time && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            )}
          </div>
        </header>

        <Separator className="bg-border/60" />

        <div className="prose prose-neutral dark:prose-invert max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-headings:scroll-mt-24 prose-h1:mb-8 prose-h1:mt-0 prose-h2:mb-5 prose-h2:mt-12 prose-p:mb-6 prose-p:mt-0 prose-ul:my-6 prose-ol:my-6 prose-li:my-2">
          <EventContent />
        </div>

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://discord.awfixer.party"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            RSVP on Discord
          </a>
          <a
            href="/events"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            All Events
          </a>
        </div>
      </main>
    </div>
  )
}
