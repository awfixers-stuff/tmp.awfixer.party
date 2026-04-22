"use client"

import LaunchParty from "./launch-party.mdx"
import TownHallJanuary from "./town-hall-january.mdx"
import PolicyWorkshop from "./policy-workshop.mdx"

export interface Event {
  slug: string
  title: string
  description: string
  date: string
  time?: string
  location?: string
  type: "virtual" | "in-person" | "hybrid"
  Component: React.ComponentType
}

export const events: Event[] = [
  {
    slug: "launch-party",
    title: "AWFixer Party Launch",
    description: "Join us for the official launch of the AWFixer Political Party.",
    date: "2025-01-15",
    time: "7:00 PM EST",
    type: "virtual",
    Component: LaunchParty,
  },
  {
    slug: "town-hall-january",
    title: "January Town Hall",
    description: "Monthly town hall to discuss party platform and answer questions.",
    date: "2025-01-20",
    time: "8:00 PM EST",
    type: "virtual",
    Component: TownHallJanuary,
  },
  {
    slug: "policy-workshop",
    title: "Policy Workshop: Technology",
    description: "Deep dive into our Technology & AI policy proposals.",
    date: "2025-02-01",
    time: "6:00 PM EST",
    type: "virtual",
    Component: PolicyWorkshop,
  },
]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
