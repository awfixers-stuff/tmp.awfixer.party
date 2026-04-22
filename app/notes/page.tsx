import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

import { notes } from "./notes"

export const metadata: Metadata = {
  title: "Notes | AWFixer Political Party",
  description: "In-depth analysis and research from the AWFixer Political Party.",
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Foundation: "bg-blue-600/10 text-blue-600",
    Economics: "bg-green-600/10 text-green-600",
    Healthcare: "bg-red-600/10 text-red-600",
    Energy: "bg-yellow-600/10 text-yellow-600",
    Foreign: "bg-purple-600/10 text-purple-600",
    Governance: "bg-orange-600/10 text-orange-600",
  }

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[category] || "bg-gray-600/10 text-gray-600"}`}
    >
      {category}
    </span>
  )
}

export default function NotesPage() {
  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Notes
          </h1>
          <p className="text-lg text-muted-foreground">
            In-depth analysis and research on the incentive structures that shape
            American politics.
          </p>
        </header>

        <Separator className="bg-border/60" />

        <div className="grid gap-4">
          {notes.map((note) => (
            <a
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group block rounded-lg border bg-card p-5 transition-colors hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={note.category} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold group-hover:text-purple-700">
                    {note.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {note.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm font-semibold text-purple-600">
                    {new Date(note.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {notes.length === 0 && (
          <p className="text-center text-muted-foreground">
            No notes available at this time.
          </p>
        )}
      </main>
    </div>
  )
}
