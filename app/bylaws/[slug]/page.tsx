import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { bylawNavTree, getBylaw } from "../bylaws"
import { BylawsLayout } from "@/components/BylawsNav"

function findActiveId(
  items: {
    id: string
    href?: string
    children?: { id: string; href?: string; children?: any[] }[]
  }[],
  slug: string
): string | undefined {
  for (const item of items) {
    if (item.id === slug) return item.id
    if (item.children) {
      for (const child of item.children) {
        if (child.id === slug) return child.id
      }
    }
  }
  return undefined
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs: string[] = []

  for (const item of bylawNavTree) {
    slugs.push(item.id)
    if (item.children) {
      for (const child of item.children) {
        slugs.push(child.id)
      }
    }
  }

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const bylaw = getBylaw(slug)

  if (!bylaw) {
    return {
      title: "Bylaw Not Found | AWFixer Political Party",
    }
  }

  return {
    title: `${bylaw.title} | AWFixer Political Party`,
    description: bylaw.description,
  }
}

export default async function BylawPage({ params }: Props) {
  const { slug } = await params
  const bylaw = getBylaw(slug)
  const activeId = findActiveId(bylawNavTree, slug)

  if (!bylaw) {
    notFound()
  }

  const BylawContent = bylaw.Component

  return (
    <BylawsLayout navItems={bylawNavTree} activeId={activeId}>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {bylaw.title}
          </h1>
        </header>

        <Separator className="bg-border/60" />

        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <BylawContent />
        </div>
      </main>
    </BylawsLayout>
  )
}
