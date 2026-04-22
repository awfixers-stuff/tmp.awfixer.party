import { notFound } from "next/navigation"

import { Separator } from "@/components/ui/separator"

import { notes, getNote } from "../notes"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const note = getNote(slug)

  if (!note) {
    return {
      title: "Note Not Found | AWFixer Political Party",
    }
  }

  return {
    title: `${note.title} | AWFixer Political Party`,
    description: note.description,
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = getNote(slug)

  if (!note) {
    notFound()
  }

  const NoteContent = note.Component

  return (
    <div className="flex">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pb-16 sm:gap-14 sm:px-6 sm:pb-20">
        <header className="space-y-3">
          <p className="font-mono text-xs tracking-widest text-purple-600 uppercase">
            AWFixer Political Party
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {note.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(note.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="rounded-full bg-purple-600/10 px-2 py-0.5 text-xs font-medium text-purple-600">
              {note.category}
            </span>
          </div>
        </header>

        <Separator className="bg-border/60" />

        <div className="prose max-w-none text-[0.9375rem] leading-relaxed text-foreground/90 prose-neutral dark:prose-invert prose-headings:scroll-mt-24 prose-h1:mt-0 prose-h1:mb-8 prose-h2:mt-12 prose-h2:mb-5 prose-p:mt-0 prose-p:mb-6 prose-ol:my-6 prose-ul:my-6 prose-li:my-2">
          <NoteContent />
        </div>

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/notes"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            All Notes
          </a>
        </div>
      </main>
    </div>
  )
}