export interface NoteMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
}

export const notesMeta: NoteMeta[] = [
  {
    slug: "introduction-to-our-approach",
    title: "Introduction to Our Approach",
    description: "Understanding how incentive structures shape policy outcomes.",
    date: "2025-01-01",
    category: "Foundation",
  },
  {
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "Deep dive into how economic incentives drive behavior in American politics.",
    date: "2025-01-15",
    category: "Economics",
  },
  {
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "Analyzing the structural failures in American healthcare markets.",
    date: "2025-02-01",
    category: "Healthcare",
  },
]