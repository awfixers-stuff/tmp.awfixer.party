import governance from "./bylaws/governance/content.mdx"
import membership from "./bylaws/membership/content.mdx"
import voting from "./bylaws/voting/content.mdx"
import proxy from "./bylaws/voting/proxy/content.mdx"

import React from "react"

export interface NavItem {
  id: string
  label: string
  href?: string
  popoutDirection?: "right" | "left" | "auto"
  children?: NavItem[]
}

export interface BylawSection {
  slug: string
  title: string
  description: string
  popoutDirection?: "right" | "left" | "auto"
  children?: BylawSection[]
  Component: React.ComponentType
}

export const bylawNavTree: NavItem[] = [
{ id: "governance", label: "Governance Bylaws", href: "/bylaws/governance", popoutDirection: undefined },
{ id: "membership", label: "Membership Bylaws", href: "/bylaws/membership", popoutDirection: undefined },
{ id: "voting", label: "Voting Bylaws", href: "/bylaws/voting", popoutDirection: undefined, children: [{ id: "proxy", label: "Proxy Voting", href: "/bylaws/proxy", popoutDirection: undefined }] }
]

export const bylawSections: BylawSection[] = [
{
        slug: "governance",
        title: "Governance Bylaws",
        description: "Defines the governance structure and leadership roles including Board of Directors, Executive Officers, and Committees.",
        popoutDirection: undefined,
        Component: governance,
      },
{
        slug: "membership",
        title: "Membership Bylaws",
        description: "Outlines membership requirements, tiers, dues, and member rights.",
        popoutDirection: undefined,
        Component: membership,
      },
{
        slug: "voting",
        title: "Voting Bylaws",
        description: "Governs all voting procedures including eligibility, methods, and quorum requirements.",
        popoutDirection: undefined,
        Component: voting,
        children: [{
                  slug: "proxy",
                  title: "Proxy Voting",
                  description: "Procedures for proxy voting in organization elections including authorization and limitations.",
                  popoutDirection: undefined,
                  Component: proxy,
                }]
      }
]

export function getBylaw(slug: string): BylawSection | undefined {
  function findSection(sections: BylawSection[], targetSlug: string): BylawSection | undefined {
    for (const section of sections) {
      if (section.slug === targetSlug) return section
      if (section.children) {
        const found = findSection(section.children, targetSlug)
        if (found) return found
      }
    }
    return undefined
  }
  return findSection(bylawSections, slug)
}
