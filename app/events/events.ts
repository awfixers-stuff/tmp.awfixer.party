import launchParty from "./events/launch-party.mdx"
import policyWorkshop from "./events/policy-workshop.mdx"
import townHallMay from "./events/town-hall-may.mdx"

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
    date: "",
    type: "virtual",
    Component: launchParty,
  },
  {
    slug: "policy-workshop",
    title: "Policy Workshop",
    description: "Government AI mandate (open source, auditable) - Private AI accountability framework",
    date: "",
    type: "virtual",
    Component: policyWorkshop,
  },
  {
    slug: "town-hall-may",
    title: "Town Hall May",
    description: "Review of initial policy proposals - Discussion: Fixing the incentive in healthcare",
    date: "",
    type: "virtual",
    Component: townHallMay,
  }
]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
