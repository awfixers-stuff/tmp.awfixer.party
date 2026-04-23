export interface NoteMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
}

export const notesMeta: NoteMeta[] = [
{
    slug: "american-pride",
    title: "American Pride",
    description: "Why American pride is our greatest strength and greatest weakness.",
    date: "2026-04-22",
    category: "From AWFixer",
  },
{
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "How economic incentives drive behavior in American politics.",
    date: "2025-01-15",
    category: "Economics",
  },
{
    slug: "introduction-to-our-approach",
    title: "Introduction To Our Approach",
    description: "How incentive structures shape policy outcomes.",
    date: "2025-01-01",
    category: "Foundation",
  },
{
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "The structural failures in American healthcare markets explained.",
    date: "2025-02-01",
    category: "Healthcare",
  }
]
