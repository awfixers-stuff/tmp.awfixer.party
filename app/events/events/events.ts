import { lazy } from "react"



export interface Event {
  slug: string
  title: string
  description: string
  date: string
  time?: string
  location?: string
  url?: string
  type: "virtual" | "in-person" | "hybrid"
  Component: React.ComponentType
}

export const events: Event[] = [

]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
