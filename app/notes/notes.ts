import type { TocItem } from "@/components/toc"

import americanPride from "./american-pride/content.mdx"
import successAndFailuresOfFederalism from "./success-and-failures-of-federalism/content.mdx"
import theAbsoluteRuleOfOligarchy from "./the-absolute-rule-of-oligarchy/content.mdx"
import theRoleOfDecentralizationInDemocracy from "./the-role-of-decentralization-in-democracy/content.mdx"
import economicIncentivesAnalysis from "./economic-incentives-analysis/content.mdx"
import theWoesOfInterpositioning from "./the-woes-of-interpositioning/content.mdx"
import introductionToOurApproach from "./introduction-to-our-approach/content.mdx"
import healthcareMarketFailures from "./healthcare-market-failures/content.mdx"

import { toc as americanPrideToc } from "./american-pride/toc-content"
import { toc as successAndFailuresOfFederalismToc } from "./success-and-failures-of-federalism/toc-content"
import { toc as theAbsoluteRuleOfOligarchyToc } from "./the-absolute-rule-of-oligarchy/toc-content"
import { toc as theRoleOfDecentralizationInDemocracyToc } from "./the-role-of-decentralization-in-democracy/toc-content"
import { toc as economicIncentivesAnalysisToc } from "./economic-incentives-analysis/toc-content"
import { toc as theWoesOfInterpositioningToc } from "./the-woes-of-interpositioning/toc-content"
import { toc as introductionToOurApproachToc } from "./introduction-to-our-approach/toc-content"
import { toc as healthcareMarketFailuresToc } from "./healthcare-market-failures/toc-content"

export interface Note {
  slug: string
  title: string
  description: string
  date: string
  category: string
  Component: React.ComponentType
  toc: readonly TocItem[]
}

export const notes: Note[] = [
{
    slug: "american-pride",
    title: "American Pride",
    description: "Why American pride is our greatest strength and greatest weakness.",
    date: "2026-04-22",
    category: "From AWFixer",
    Component: americanPride,
    toc: americanPrideToc,
  },
{
    slug: "success-and-failures-of-federalism",
    title: "Success And Failures Of Federalism",
    description: "Analyzing federalism's track record in American governance.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: successAndFailuresOfFederalism,
    toc: successAndFailuresOfFederalismToc,
  },
{
    slug: "the-absolute-rule-of-oligarchy",
    title: "The Absolute Rule Of Oligarchy",
    description: "Exploring the tendency of power to concentrate in the hands of the few.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: theAbsoluteRuleOfOligarchy,
    toc: theAbsoluteRuleOfOligarchyToc,
  },
{
    slug: "the-role-of-decentralization-in-democracy",
    title: "The Role Of Decentralization In Democracy",
    description: "Examining how decentralization enables democratic participation.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: theRoleOfDecentralizationInDemocracy,
    toc: theRoleOfDecentralizationInDemocracyToc,
  },
{
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "How economic incentives drive behavior in American politics.",
    date: "2025-01-15",
    category: "Economics",
    Component: economicIncentivesAnalysis,
    toc: economicIncentivesAnalysisToc,
  },
{
    slug: "the-woes-of-interpositioning",
    title: "The Woes Of Interpositioning",
    description: "Examining the doctrine of interposition and its problems.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: theWoesOfInterpositioning,
    toc: theWoesOfInterpositioningToc,
  },
{
    slug: "introduction-to-our-approach",
    title: "Introduction To Our Approach",
    description: "How incentive structures shape policy outcomes.",
    date: "2025-01-01",
    category: "Foundation",
    Component: introductionToOurApproach,
    toc: introductionToOurApproachToc,
  },
{
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "The structural failures in American healthcare markets explained.",
    date: "2025-02-01",
    category: "Healthcare",
    Component: healthcareMarketFailures,
    toc: healthcareMarketFailuresToc,
  }
]

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}
