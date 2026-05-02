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
    slug: "american-pride",
    title: "American Pride",
    description: "Why American pride is our greatest strength and greatest weakness.",
    date: "2026-04-22",
    category: "From AWFixer",
    Component: (await import("./american-pride/content.mdx")).default,
  },
{
    slug: "success-and-failures-of-federalism",
    title: "Success And Failures Of Federalism",
    description: "Analyzing federalism's track record in American governance.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: (await import("./success-and-failures-of-federalism/content.mdx")).default,
  },
{
    slug: "the-absolute-rule-of-oligarchy",
    title: "The Absolute Rule Of Oligarchy",
    description: "Exploring the tendency of power to concentrate in the hands of the few.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: (await import("./the-absolute-rule-of-oligarchy/content.mdx")).default,
  },
{
    slug: "the-role-of-decentralization-in-democracy",
    title: "The Role Of Decentralization In Democracy",
    description: "Examining how decentralization enables democratic participation.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: (await import("./the-role-of-decentralization-in-democracy/content.mdx")).default,
  },
{
    slug: "economic-incentives-analysis",
    title: "Economic Incentives Analysis",
    description: "How economic incentives drive behavior in American politics.",
    date: "2025-01-15",
    category: "Economics",
    Component: (await import("./economic-incentives-analysis/content.mdx")).default,
  },
{
    slug: "the-woes-of-interpositioning",
    title: "The Woes Of Interpositioning",
    description: "Examining the doctrine of interposition and its problems.",
    date: "2026-04-23",
    category: "Political Theory",
    Component: (await import("./the-woes-of-interpositioning/content.mdx")).default,
  },
{
    slug: "introduction-to-our-approach",
    title: "Introduction To Our Approach",
    description: "How incentive structures shape policy outcomes.",
    date: "2025-01-01",
    category: "Foundation",
    Component: (await import("./introduction-to-our-approach/content.mdx")).default,
  },
{
    slug: "healthcare-market-failures",
    title: "Healthcare Market Failures",
    description: "The structural failures in American healthcare markets explained.",
    date: "2025-02-01",
    category: "Healthcare",
    Component: (await import("./healthcare-market-failures/content.mdx")).default,
  }
]

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}
