import launchParty from "./launch-party/content.mdx"
import townHallMay from "./town-hall-may/content.mdx"
import policyWorkshop from "./policy-workshop/content.mdx"

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
{
    slug: "launch-party",
    title: "Launch Party",
    description: "Introduction to the AWFixer Party platform - Q&A with founding members",
    date: "2025-01-15",
    time: "7:00 PM EST",
    type: "virtual",
    Component: launchParty,
  },
{
    slug: "town-hall-may",
    title: "Town Hall May",
    description: "Review of initial policy proposals - Discussion: Fixing the incentive in healthcare",
    date: "2026-05-20",
    time: "8:00 PM EST",
    url: "https://discord.com/events",
    type: "virtual",
    Component: townHallMay,
  },
{
    slug: "policy-workshop",
    title: "Policy Workshop",
    description: "Government AI mandate (open source, auditable) - Private AI accountability framework",
    date: "2025-02-01",
    time: "6:00 PM EST",
    type: "virtual",
    Component: policyWorkshop,
  }
]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
