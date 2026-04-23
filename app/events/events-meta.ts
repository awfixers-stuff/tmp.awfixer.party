import { events } from "./events"

export interface EventMeta {
  slug: string
  title: string
  date: string
  url?: string
}

export const upcomingEventsMeta = events
  .filter((e) => new Date(e.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .map((e) => ({
    slug: e.slug,
    title: e.title,
    date: e.date,
    url: e.url,
  }))
