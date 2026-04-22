import IntroductionToOurApproach from "./introduction-to-our-approach.mdx"
import EconomicIncentivesAnalysis from "./economic-incentives-analysis.mdx"
import HealthcareMarketFailures from "./healthcare-market-failures.mdx"

export interface Note {
  slug: string
  title: string
  description: string
  date: string
  category: string
  Component: React.ComponentType
}

export const notes: Note[] = [
  {
    slug: "introduction-to-our-approach",
    title: "Introduction to Our Approach",
    description: "Understanding how incentive structures shape policy outcomes.",
    date: "2025-01-01",
    category: "Foundation",
    Component: IntroductionToOurApproach,
  },
  {
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "Deep dive into how economic incentives drive behavior in American politics.",
    date: "2025-01-15",
    category: "Economics",
    Component: EconomicIncentivesAnalysis,
  },
  {
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "Analyzing the structural failures in American healthcare markets.",
    date: "2025-02-01",
    category: "Healthcare",
    Component: HealthcareMarketFailures,
  },
]

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}
