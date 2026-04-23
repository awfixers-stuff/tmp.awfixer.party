import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  statSync,
} from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const NOTES_ROOT = join(__dirname, "../app/notes")
const OUTPUT_FILE = join(__dirname, "../app/notes/notes.ts")
const META_OUTPUT_FILE = join(__dirname, "../app/notes/notes-meta.ts")

interface NoteMetadata {
  date?: string
  category?: string
  description?: string
}

function parseFrontmatter(content: string): NoteMetadata {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const props = match[1]
  const result: NoteMetadata = {}

  const dateMatch = props.match(/date:\s*"([^"]+)"/)
  if (dateMatch) result.date = dateMatch[1]

  const categoryMatch = props.match(/category:\s*"([^"]+)"/)
  if (categoryMatch) result.category = categoryMatch[1]

  const descriptionMatch = props.match(/description:\s*"([^"]+)"/)
  if (descriptionMatch) result.description = descriptionMatch[1]

  return result
}

function parseTitle(content: string, slug: string) {
  const match = content.replace(/^---[\s\S]*?---\n*/, "").match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

function parseDescription(content: string) {
  const lines = content
    .replace(/^---[\s\S]*?---\n*/, "")
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .slice(0, 2)
  return (
    lines
      .map((l) => l.replace(/^- /, ""))
      .join(" - ")
      .trim() || "Note description."
  )
}

function toComponentName(slug: string) {
  return slug
    .split("-")
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("")
}

function main() {
  if (!existsSync(NOTES_ROOT)) {
    console.log("Notes directory not found, skipping generate-notes")
    return
  }

  const noteDirs = readdirSync(NOTES_ROOT).filter((dirName) => {
    const fullPath = join(NOTES_ROOT, dirName)
    try {
      return (
        statSync(fullPath).isDirectory() &&
        !dirName.startsWith("[") &&
        !dirName.startsWith(".")
      )
    } catch {
      return false
    }
  })

  if (noteDirs.length === 0) {
    console.log("No note directories found, skipping generate-notes")
    return
  }

  const notesData = noteDirs
    .map((slug) => {
      const contentPath = join(NOTES_ROOT, slug, "content.mdx")
      if (!existsSync(contentPath)) return null

      const content = readFileSync(contentPath, "utf-8")
      const meta = parseFrontmatter(content)
      const title = parseTitle(content, slug)
      const description = meta.description || parseDescription(content)

      return { slug, title, description, ...meta }
    })
    .filter(Boolean)

  const imports = noteDirs
    .map((slug) => {
      const name = toComponentName(slug)
      return `import ${name} from "./${slug}/content.mdx"`
    })
    .join("\n")

  const noteEntries = notesData
    .filter((n): n is NonNullable<typeof n> => n !== null)
    .map((n) => {
      const name = toComponentName(n.slug)
      return `{
    slug: "${n.slug}",
    title: "${n.title}",
    description: "${n.description}",
    date: "${n.date || ""}",
    category: "${n.category || ""}",
    Component: ${name},
  }`
    })
    .join(",\n")

  const generated = `${imports}

export interface Note {
  slug: string
  title: string
  description: string
  date: string
  category: string
  Component: React.ComponentType
}

export const notes: Note[] = [
${noteEntries}
]

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug)
}
`

  const metaEntries = notesData
    .filter((n): n is NonNullable<typeof n> => n !== null)
    .map((n) => {
      return `{
    slug: "${n.slug}",
    title: "${n.title}",
    description: "${n.description}",
    date: "${n.date || ""}",
    category: "${n.category || ""}",
  }`
    })
    .join(",\n")

  const metaGenerated = `export interface NoteMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
}

export const notesMeta: NoteMeta[] = [
${metaEntries}
]
`

  writeFileSync(OUTPUT_FILE, generated)
  writeFileSync(META_OUTPUT_FILE, metaGenerated)
  console.log(
    `Generated notes.ts and notes-meta.ts with ${noteDirs.length} notes`
  )
}

main()
