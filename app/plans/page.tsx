import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import Content from "./content.mdx"
import { plansCategories } from "./plans-categories"
import {
  PlanAccordion,
  PlanAccordionItem,
} from "./plan-accordion"
import { PlansTOC } from "./plans-toc"

export const metadata: Metadata = {
  title: "Plans | AWFixer Political Party",
  description: "AWFixer Political Party international relations plans.",
}

export default function PlansPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            International Plans
          </h1>
          <p className="text-lg text-muted-foreground">
            Our strategic approach to international relations and foreign
            policy.
          </p>
        </header>

        <Separator className="bg-border/60" />

        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <Content />
        </div>

        <Separator className="bg-border/60" />

        <div className="space-y-4">
          {plansCategories.map((category) => (
            <PlanAccordion
              key={category.slug}
              title={category.title}
              description={category.description}
            >
              <div className="space-y-2">
                {category.items.map((item) => (
                  <PlanAccordionItem
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </PlanAccordion>
          ))}
        </div>
      </main>
      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-20">
          <PlansTOC />
        </div>
      </aside>
    </div>
  )
}