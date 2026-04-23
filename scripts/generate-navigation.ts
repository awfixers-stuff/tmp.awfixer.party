import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(__dirname, "..")

interface NavItem {
  href: string
  label: string
  slug: string
  description?: string
  category?: string
  date?: string
}

const POLICY_CATEGORIES: Record<string, string> = {
  "competition": "Core Policies",
  "tax": "Core Policies",
  "energy": "Core Policies",
  "fiscal-transparency": "Core Policies",
  "foreign-policy": "Core Policies",
  "labor": "Social Policies",
  "healthcare": "Social Policies",
  "infrastructure": "Social Policies",
  "governance": "Social Policies",
  "criminal-justice": "Social Policies",
  "anti-corruption": "Additional",
  "immigration": "Additional",
  "education": "Additional",
  "technology": "Additional",
  "civil-standard": "Additional",
};

function extractMetadataFromPage(filePath: string) {
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, "utf-8")
  const metadataMatch = content.match(/export const metadata: Metadata = ({[\s\S]*?});/)
  if (!metadataMatch) return null

  const metaStr = metadataMatch[1]
  const titleMatch = metaStr.match(/title:\s*"([^"]*)"/)
  const descMatch = metaStr.match(/description:\s*"([^"]*)"/)

  let title = titleMatch ? titleMatch[1] : ""
  title = title.split(" | ")[0] // Remove suffix

  const description = descMatch ? descMatch[1] : ""

  return { title, description }
}

function formatSlug(slug: string) {
  return slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
}

function extractMetadataFromMDX(filePath: string) {
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, "utf-8")

  const result: any = {}

  // Try frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (fmMatch) {
    const fm = fmMatch[1]
    result.title = fm.match(/title:\s*"([^"]+)"/)?.[1]
    result.description = fm.match(/description:\s*"([^"]+)"/)?.[1]
    result.category = fm.match(/category:\s*"([^"]+)"/)?.[1]
    result.date = fm.match(/date:\s*"([^"]+)"/)?.[1]
  }

  // Try EventMeta
  const eventMatch = content.match(/<EventMeta([^>]*)\/?>/)
  if (eventMatch) {
    const attrs = eventMatch[1]
    result.date = attrs.match(/date="([^"]+)"/)?.[1] || result.date
  }

  // Fallback to first # or ## heading if title not in frontmatter
  if (!result.title) {
    const lines = content.split("\n");
    const skipTitles = [
      "this is a concept",
      "event overview",
      "overview",
      "the vision",
      "topics",
      "what to expect",
      "how it works",
      "the problem",
      "events",
      "how to join",
      "schedule",
      "gallery",
      "after the event",
      "coming soon",
      "the pattern"
    ];

    for (const line of lines) {
      const titleMatch = line.match(/^#{1,2}\s+(.+)$/);
      if (titleMatch) {
        const potentialTitle = titleMatch[1].replace(/\*\*/g, "").replace(/\*/g, "").trim();
        if (skipTitles.some(skip => potentialTitle.toLowerCase().includes(skip))) {
          continue;
        }
        result.title = potentialTitle;
        break;
      }
    }
  }

  return result
}

function getItemsFromDirectories(categoryDir: string, baseUrl: string, mdxNamePattern?: (slug: string) => string) {
  const items: NavItem[] = []
  if (!fs.existsSync(categoryDir)) return items

  const dirs = fs.readdirSync(categoryDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith("[") && !d.name.startsWith("."))

  for (const dir of dirs) {
    const slug = dir.name
    const dirPath = path.join(categoryDir, slug)
    const pagePath = path.join(dirPath, "page.tsx")
    const mdxName = mdxNamePattern ? mdxNamePattern(slug) : `${slug}.mdx`
    const mdxPath = path.join(dirPath, mdxName)

    let title = ""
    let description = ""

    const pageMeta = extractMetadataFromPage(pagePath)
    if (pageMeta) {
      title = pageMeta.title
      description = pageMeta.description
    }

    const mdxMeta = extractMetadataFromMDX(mdxPath)
    if (mdxMeta) {
      title = mdxMeta.title || title
      description = mdxMeta.description || description
    }

    if (!title) {
      title = formatSlug(slug)
    }

    items.push({
      href: `${baseUrl}/${slug}`,
      slug,
      label: title,
      description,
      category: POLICY_CATEGORIES[slug] || undefined
    })
  }

  return items
}

function getItemsFromMDXFiles(mdxDir: string, baseUrl: string) {
  const items: NavItem[] = []
  if (!fs.existsSync(mdxDir)) return items

  const files = fs.readdirSync(mdxDir)
    .filter(f => f.endsWith(".mdx") && !f.startsWith("toc"))

  for (const file of files) {
    const slug = file.replace(".mdx", "")
    const filePath = path.join(mdxDir, file)
    const meta = extractMetadataFromMDX(filePath)

    let title = meta?.title
    if (!title) {
      title = formatSlug(slug)
    }

    items.push({
      href: `${baseUrl}/${slug}`,
      slug,
      label: title,
      description: meta?.description,
      category: meta?.category,
      date: meta?.date
    })
  }

  return items
}

function main() {
  const navData: Record<string, any> = {}

  // Policy
  navData.policy = getItemsFromDirectories(path.join(ROOT_DIR, "app/policy"), "/policy")

  // Plans
  navData.plans = getItemsFromDirectories(path.join(ROOT_DIR, "app/plans"), "/plans")

  // Ideas
  navData.ideas = getItemsFromDirectories(path.join(ROOT_DIR, "app/ideas"), "/ideas", () => "content.mdx")

  // Notes
  navData.notes = getItemsFromMDXFiles(path.join(ROOT_DIR, "app/notes/notes"), "/notes")

  // Events
  navData.events = getItemsFromMDXFiles(path.join(ROOT_DIR, "app/events/events"), "/events")

  // Governance — main page + members listing + individual member profiles
  const govPageMeta = extractMetadataFromPage(path.join(ROOT_DIR, "app/governance/page.tsx"))
  const govMdxMeta = extractMetadataFromMDX(path.join(ROOT_DIR, "app/governance/governance.mdx"))
  const membersMeta = extractMetadataFromPage(path.join(ROOT_DIR, "app/governance/members/page.tsx"))

  const governanceItems: NavItem[] = [
    {
      href: "/governance",
      slug: "governance",
      label: govPageMeta?.title || govMdxMeta?.title || "Party Governance",
      description: govPageMeta?.description || govMdxMeta?.description || "",
      category: "Overview"
    },
    {
      href: "/governance/members",
      slug: "members",
      label: membersMeta?.title || "Party Leadership",
      description: membersMeta?.description || "Meet the leadership of the AWFixer Political Party.",
      category: "Leadership"
    }
  ]

  const memberProfiles = getItemsFromDirectories(
    path.join(ROOT_DIR, "app/governance/members"),
    "/governance/members"
  ).map(item => ({ ...item, category: "Leadership" }))

  navData.governance = [...governanceItems, ...memberProfiles]

  // Ensure lib/nav exists
  const outputDir = path.join(ROOT_DIR, "lib/nav")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Write individual JSON files
  for (const [key, data] of Object.entries(navData)) {
    fs.writeFileSync(path.join(outputDir, `${key}.json`), JSON.stringify(data, null, 2))
  }

  // Write index.ts for easy importing
  const indexContent = `// This file is auto-generated. Do not edit manually.
import policy from "./policy.json"
import plans from "./plans.json"
import ideas from "./ideas.json"
import notes from "./notes.json"
import events from "./events.json"
import governance from "./governance.json"

export interface NavItem {
  href: string
  label: string
  slug: string
  description?: string
  category?: string
  date?: string
}

export { policy, plans, ideas, notes, events, governance }

export const navigationData = {
  policy: policy as NavItem[],
  plans: plans as NavItem[],
  ideas: ideas as NavItem[],
  notes: notes as NavItem[],
  events: events as NavItem[],
  governance: governance as NavItem[]
}
`
  fs.writeFileSync(path.join(outputDir, "index.ts"), indexContent)

  console.log("Navigation data generated successfully!")
}

main()
