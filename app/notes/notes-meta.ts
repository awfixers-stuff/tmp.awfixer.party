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
    description: "Note description.",
    date: "",
    category: "",
  },
  {
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "Focus: How many people are coming? How to stop them? - Policy: Border walls, raids, deportations",
    date: "2025-01-15",
    category: "Economics",
  },
  {
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "You don't choose when you need care - You can't easily compare prices",
    date: "2025-02-01",
    category: "Healthcare",
  },
  {
    slug: "introduction-to-our-approach",
    title: "Introduction To Our Approach",
    description: "Minimum wage laws don't raise wages — market dynamics do - Antitrust laws don't create competition — profitable opportunities do",
    date: "2025-01-01",
    category: "Foundation",
  }
]
