import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { events } from "./events"

export const metadata: Metadata = {
  title: "Events | AWFixer Political Party",
  description: "Upcoming events and meetings for the AWFixer Political Party.",
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function EventTypeBadge({ type }: { type: string }) {
  const colors = {
    virtual: "bg-purple-600/10 text-purple-600",
    "in-person": "bg-green-500/10 text-green-500",
    hybrid: "bg-blue-500/10 text-blue-500",
  }
  const labels = {
    virtual: "Virtual",
    "in-person": "In Person",
    hybrid: "Hybrid",
  }
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[type as keyof typeof colors]}`}
    >
      {labels[type as keyof typeof labels]}
    </span>
  )
}

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date())
  const pastEvents = events.filter((e) => new Date(e.date) < new Date())

  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Events
          </h1>
          <p className="text-lg text-muted-foreground">
            Join us at our events to learn about and help shape the AWFixer
            platform.
          </p>
        </header>

        <Separator className="bg-border/60" />

        {upcomingEvents.length > 0 && (
          <>
            <h2 className="font-heading text-xl font-semibold">
              Upcoming Events
            </h2>
            <div className="grid gap-4">
              {upcomingEvents.map((event) => (
                <a
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <EventTypeBadge type={event.type} />
                      </div>
                      <h3 className="font-heading text-lg font-semibold group-hover:text-purple-700">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-sm font-semibold text-purple-600">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      {event.time && (
                        <p className="text-xs text-muted-foreground">
                          {event.time}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {pastEvents.length > 0 && (
          <>
            <Separator className="bg-border/60" />
            <h2 className="font-heading text-xl font-semibold text-muted-foreground">
              Past Events
            </h2>
            <div className="grid gap-4 opacity-60">
              {pastEvents.map((event) => (
                <a
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <EventTypeBadge type={event.type} />
                      </div>
                      <h3 className="font-heading text-lg font-semibold">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {events.length === 0 && (
          <p className="text-center text-muted-foreground">
            No events scheduled at this time. Check back soon!
          </p>
        )}

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://mee6.gg/awfixerpolitics"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            Join Discord
          </a>
          <a
            href="mailto:events@awfixer.party"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Host an Event
          </a>
        </div>
      </main>
    </div>
  )
}
