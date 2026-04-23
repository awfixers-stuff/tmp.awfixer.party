import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const EVENTS_ROOT = join(__dirname, "../app/events")
const OUTPUT_FILE = join(__dirname, "../app/events/events.ts")

interface EventMetadata {
  date?: string
  time?: string
  location?: string
  url?: string
  type?: string
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
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

function parseDescription(content: string) {
  const lines = content
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .slice(0, 2)
  return (
    lines
      .map((l) => l.replace(/^- /, ""))
      .join(" - ")
      .trim() || "Event description."
  )
}

function toComponentName(slug: string) {
  return slug
    .split("-")
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("")
}

function main() {
  if (!existsSync(EVENTS_ROOT)) {
    console.log("Events directory not found, skipping generate-events")
    return
  }

  const eventDirs = readdirSync(EVENTS_ROOT).filter((dirName) => {
    const fullPath = join(EVENTS_ROOT, dirName)
    try {
      return (
        statSync(fullPath).isDirectory() &&
        existsSync(join(fullPath, "content.mdx")) &&
        !dirName.startsWith("[") &&
        !dirName.startsWith(".")
      )
    } catch {
      return false
    }
  })

  if (eventDirs.length === 0) {
    console.log("No event directories found, skipping generate-events")
    return
  }

  const eventsData = eventDirs
    .map((dir) => {
      const contentPath = join(EVENTS_ROOT, dir, "content.mdx")
      if (!existsSync(contentPath)) return null

      const content = readFileSync(contentPath, "utf-8")
      const meta = parseEventMeta(content)
      const title = parseTitle(content, dir)
      const description = parseDescription(content)
      const name = toComponentName(dir)

      const extras: string[] = []
      if (meta.time) extras.push(`    time: "${meta.time}",`)
      if (meta.location) extras.push(`    location: "${meta.location}",`)
      if (meta.url) extras.push(`    url: "${meta.url}",`)

      return `{
    slug: "${dir}",
    title: "${title}",
    description: "${description}",
    date: "${meta.date || ""}",${extras.length > 0 ? "\n" + extras.join("\n") : ""}
    type: "${meta.type || "virtual"}",
    Component: ${name},
  }`
    })
    .filter(Boolean)

  const imports = eventDirs
    .map((dir) => {
      const name = toComponentName(dir)
      return `import ${name} from "./${dir}/content.mdx"`
    })
    .join("\n")

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
${eventsData.join(",\n")}
]

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug)
}
`

  writeFileSync(OUTPUT_FILE, generated)
  console.log(`Generated events.ts with ${eventDirs.length} events`)
}

main()
