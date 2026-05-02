import type { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Proposals | AWFixer Political Party",
  description: "Explore AWFixer Party proposals across healthcare, climate, economy, and education.",
}

const categories = [
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Proposals to fix the healthcare system and improve access for all Americans.",
  },
  {
    slug: "climate",
    title: "Climate",
    description: "Proposals for environmental action and sustainable energy solutions.",
  },
  {
    slug: "economy",
    title: "Economy",
    description: "Proposals to strengthen the economy and create opportunities for all.",
  },
  {
    slug: "education",
    title: "Education",
    description: "Proposals to improve education and expand access to learning.",
  },
]

export default function ProposalsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
          AWFixer Political Party
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Proposals
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our policy proposals by category
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/proposals/${category.slug}`}>
            <Card className="h-full p-6 transition-colors hover:bg-accent/50">
              <h2 className="font-heading text-xl font-semibold">
                {category.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
