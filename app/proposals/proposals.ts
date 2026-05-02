import climate from "./climate/content.mdx"
import healthcare from "./healthcare/content.mdx"
import reform from "./healthcare/reform/content.mdx"
import education from "./education/content.mdx"
import economy from "./economy/content.mdx"

import React from "react"

export interface NavItem {
  id: string
  label: string
  href?: string
  children?: NavItem[]
}

export interface ProposalSection {
  slug: string
  title: string
  description: string
  children?: ProposalSection[]
  Component: React.ComponentType
}

export const proposalNavTree: NavItem[] = [
  { id: "climate", label: "Climate Proposal", href: "/proposals/climate" }, { id: "healthcare", label: "Healthcare Proposal", href: "/proposals/healthcare", children: [{ id: "reform", label: "Healthcare Reform Details", href: "/proposals/healthcare/reform" }] }, { id: "education", label: "Education Proposal", href: "/proposals/education" }, { id: "economy", label: "Economy Proposal", href: "/proposals/economy" }
]

export const proposalSections: ProposalSection[] = [
  {
        slug: "climate",
        title: "Climate Proposal",
        description: "Placeholder climate proposal for the AWFixer Political Party.",
        Component: climate
      }, {
        slug: "healthcare",
        title: "Healthcare Proposal",
        description: "Placeholder healthcare proposal for the AWFixer Political Party.",
        Component: healthcare,
        children: [{
        slug: "reform",
        title: "Healthcare Reform Details",
        description: "Detailed healthcare reform proposal",
        Component: reform
      }]
      }, {
        slug: "education",
        title: "Education Proposal",
        description: "Placeholder education proposal for the AWFixer Political Party.",
        Component: education
      }, {
        slug: "economy",
        title: "Economy Proposal",
        description: "Placeholder economy proposal for the AWFixer Political Party.",
        Component: economy
      }
]

export function getProposal(slug: string): ProposalSection | undefined {
  function findSection(sections: ProposalSection[], targetSlug: string): ProposalSection | undefined {
    for (const section of sections) {
      if (section.slug === targetSlug) return section
      if (section.children) {
        const found = findSection(section.children, targetSlug)
        if (found) return found
      }
    }
    return undefined
  }
  return findSection(proposalSections, slug)
}
