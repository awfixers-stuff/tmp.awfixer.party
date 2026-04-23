// This file is auto-generated. Do not edit manually.
import policy from "./policy.json"
import plans from "./plans.json"
import ideas from "./ideas.json"
import notes from "./notes.json"
import events from "./events.json"

export interface NavItem {
  href: string
  label: string
  slug: string
  description?: string
  category?: string
  date?: string
}

export { policy, plans, ideas, notes, events }

export const navigationData = {
  policy: policy as NavItem[],
  plans: plans as NavItem[],
  ideas: ideas as NavItem[],
  notes: notes as NavItem[],
  events: events as NavItem[]
}
