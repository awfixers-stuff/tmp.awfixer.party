export interface EventMeta {
  slug: string
  title: string
  date: string
}

export const eventsMeta: EventMeta[] = [
  {
    slug: "launch-party",
    title: "AWFixer Party Launch",
    date: "2025-01-15",
  },
  {
    slug: "town-hall-january",
    title: "January Town Hall",
    date: "2025-01-20",
  },
  {
    slug: "policy-workshop",
    title: "Policy Workshop: Technology",
    date: "2025-02-01",
  },
]

export const upcomingEventsMeta = eventsMeta
  .filter((e) => new Date(e.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
