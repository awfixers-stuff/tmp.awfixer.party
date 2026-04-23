import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const EVENTS_DIR = join(__dirname, "../app/events/events")
const OUTPUT_FILE = join(__dirname, "../app/events/events.ts")

interface EventMetadata {
  date?: string
  time?: string
  location?: string
  url?: string
  type?: string
}

interface RawEvent extends EventMetadata {
  slug: string
  title: string
  description: string
}

function parseEventMeta(content: string): EventMetadata {
  const match = content.match(/<EventMeta([^>]*)\/?>/)
  if (!match) return {}

  const attrs = match[1]
  const result: EventMetadata = {}

  const dateMatch = attrs.match(/date="([^"]+)"/)
  if (dateMatch) result.date = dateMatch[1]

  const timeMatch = attrs.match(/time="([^"]+)"/)
  if (timeMatch) result.time = timeMatch[1]

  const locationMatch = attrs.match(/location="([^"]+)"/)
  if (locationMatch) result.location = locationMatch[1]

  const urlMatch = attrs.match(/url="([^"]+)"/)
  if (urlMatch) result.url = urlMatch[1]

  const typeMatch = attrs.match(/type="([^"]+)"/)
  if (typeMatch) result.type = typeMatch[1]

  return result
}

function parseTitle(content: string, slug: string) {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  return slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
}

function parseDescription(content: string) {
  const lines = content.split("\n").filter(l => l.startsWith("- ")).slice(0, 2)
  return lines.map(l => l.replace(/^- /, "")).join(" - ").trim() || "Event description."
}

function toComponentName(slug: string) {
  return slug.split("-").map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join("")
}

function main() {
  const mdxFiles = readdirSync(EVENTS_DIR)
    .filter(f => f.endsWith(".mdx"))
    .sort()

  const events: RawEvent[] = mdxFiles.map((file: string) => {
    const slug = file.replace(".mdx", "")
    const content = readFileSync(join(EVENTS_DIR, file), "utf-8")
    const meta = parseEventMeta(content)
    const title = parseTitle(content, slug)
    const description = parseDescription(content)

    return { slug, title, description, ...meta }
  })

  const imports = events.map(e => `import ${toComponentName(e.slug)} from "./events/${e.slug}.mdx"`).join("\n")

  const eventEntries = events.map(e => {
    const name = toComponentName(e.slug)
    const extras = [
      e.time ? `    time: "${e.time}",` : "",
      e.location ? `    location: "${e.location}",` : "",
      e.url ? `    url: "${e.url}",` : "",
    ].filter(Boolean).join("\n")
    return `  {
    slug: "${e.slug}",
    title: "${e.title}",
    description: "${e.description}",
    date: "${e.date || ""}",${extras ? "\n" + extras : ""}
    type: "${e.type || "virtual"}",
    Component: ${name},
  }`
  }).join(",\n")

  const generated = `${imports}

export interface Event {
  slug: string
  title: string
  description: string
  date: string
  time?: string
  location?: string
  url?: string
  type: "virtual" | "in-person" | "hybrid"
  Component: React.ComponentType
}

export const events: Event[] = [
${eventEntries}
]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
`

  writeFileSync(OUTPUT_FILE, generated)
  console.log(`Generated events.ts with ${events.length} events`)
}

main()
