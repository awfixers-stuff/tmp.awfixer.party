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
const BYLAWS_ROOT = join(__dirname, "../app/bylaws")
const BYLAWS_CONTENT_DIR = join(BYLAWS_ROOT, "bylaws")
const OUTPUT_FILE = join(BYLAWS_ROOT, "bylaws.ts")

interface BylawMeta {
  slug?: string
  title?: string
  description?: string
  popoutDirection?: "right" | "left" | "auto"
}

function parseBylawMeta(content: string): BylawMeta {
  const match = content.match(/<BylawMeta([^>]*)\/?>/)
  if (!match) return {}

  const attrs = match[1]
  const result: BylawMeta = {}

  const slugMatch = attrs.match(/slug="([^"]+)"/)
  if (slugMatch) result.slug = slugMatch[1]

  const titleMatch = attrs.match(/title="([^"]+)"/)
  if (titleMatch) result.title = titleMatch[1]

  const descMatch = attrs.match(/description="([^"]+)"/)
  if (descMatch) result.description = descMatch[1]

  const popoutMatch = attrs.match(/popoutDirection="([^"]+)"/)
  if (popoutMatch)
    result.popoutDirection = popoutMatch[1] as "right" | "left" | "auto"

  return result
}

function parseTitle(content: string, slug: string) {
  const match = content.match(/^##\s+(.+)$/m)
  if (match) return match[1].trim()
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

function parseDescription(content: string, fallback: string) {
  const lines = content
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .slice(0, 2)
  const result = lines
    .map((l) => l.replace(/^- /, ""))
    .join(" - ")
    .trim()
  return result || fallback || "Bylaw description."
}

function toComponentName(slug: string) {
  return slug
    .split("-")
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("")
}

function processDirectory(
  dirPath: string,
  parentSlug: string | null
): {
  section: {
    slug: string
    title: string
    description: string
    popoutDirection?: "right" | "left" | "auto"
  } | null
  children: Array<{
    slug: string
    title: string
    description: string
    popoutDirection?: "right" | "left" | "auto"
    import: string
  }>
} {
  const contentPath = join(dirPath, "content.mdx")

  if (!existsSync(contentPath)) {
    return { section: null, children: [] }
  }

  const content = readFileSync(contentPath, "utf-8")
  const meta = parseBylawMeta(content)
  const slug = meta.slug || dirPath.split("/").pop() || "unknown"
  const title = meta.title || parseTitle(content, slug)
  const description = meta.description || parseDescription(content, title)

  const result = {
    section: {
      slug,
      title,
      description,
      popoutDirection: meta.popoutDirection,
    },
    children: [] as Array<{
      slug: string
      title: string
      description: string
      popoutDirection?: "right" | "left" | "auto"
      import: string
    }>,
  }

  const childrenDirs = readdirSync(dirPath).filter((dirName) => {
    const fullPath = join(dirPath, dirName)
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

  for (const childDir of childrenDirs) {
    const childPath = join(dirPath, childDir)
    const childContentPath = join(childPath, "content.mdx")
    if (!existsSync(childContentPath)) continue

    const childContent = readFileSync(childContentPath, "utf-8")
    const childMeta = parseBylawMeta(childContent)
    const childSlug = childMeta.slug || childDir
    const childTitle = childMeta.title || parseTitle(childContent, childSlug)
    const childDescription =
      childMeta.description || parseDescription(childContent, childTitle)

    result.children.push({
      slug: childSlug,
      title: childTitle,
      description: childDescription,
      popoutDirection: childMeta.popoutDirection,
      import: `import ${toComponentName(childSlug)} from "./bylaws/${parentSlug || slug}/${childDir}/content.mdx"`,
    })
  }

  return result
}

function main() {
  if (!existsSync(BYLAWS_CONTENT_DIR)) {
    console.log("Bylaws directory not found, skipping generate-bylaws")
    return
  }

  const topLevelDirs = readdirSync(BYLAWS_CONTENT_DIR).filter((dirName) => {
    const fullPath = join(BYLAWS_CONTENT_DIR, dirName)
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

  if (topLevelDirs.length === 0) {
    console.log("No bylaw directories found, skipping generate-bylaws")
    return
  }

  const allImports: string[] = []
  const navTreeLines: string[] = []
  const sectionsData: string[] = []

  for (const dir of topLevelDirs) {
    const dirPath = join(BYLAWS_CONTENT_DIR, dir)
    const { section, children } = processDirectory(dirPath, dir)

    if (!section) continue

    const importName = toComponentName(section.slug)
    const importLine = `import ${importName} from "./bylaws/${dir}/content.mdx"`
    allImports.push(importLine)

    for (const child of children) {
      allImports.push(child.import)
    }

    const childNavItems =
      children.length > 0
        ? `children: [${children.map((c) => `{ id: "${c.slug}", label: "${c.title}", href: "/bylaws/${c.slug}", popoutDirection: ${c.popoutDirection ? `"${c.popoutDirection}"` : "undefined"} }`).join(", ")}]`
        : ""

    navTreeLines.push(
      `{ id: "${section.slug}", label: "${section.title}", href: "/bylaws/${section.slug}", popoutDirection: ${section.popoutDirection ? `"${section.popoutDirection}"` : "undefined"}${childNavItems ? ", " + childNavItems : ""} }`
    )

    const childSectionItems =
      children.length > 0
        ? `children: [${children
            .map((c, i) => {
              const childComponentName = toComponentName(c.slug)
              return `{
          slug: "${c.slug}",
          title: "${c.title}",
          description: "${c.description}",
          popoutDirection: ${c.popoutDirection ? `"${c.popoutDirection}"` : "undefined"},
          Component: ${childComponentName},
        }`
            })
            .join(", ")}]`
        : ""

    sectionsData.push(
      `{
        slug: "${section.slug}",
        title: "${section.title}",
        description: "${section.description}",
        popoutDirection: ${section.popoutDirection ? `"${section.popoutDirection}"` : "undefined"},
        Component: ${importName},${childSectionItems ? "\n        " + childSectionItems.replace(/\n/g, "\n        ") : ""}
      }`
    )
  }

  const imports = allImports.join("\n")

  const generated = `${imports}

import React from "react"

export interface NavItem {
  id: string
  label: string
  href?: string
  popoutDirection?: "right" | "left" | "auto"
  children?: NavItem[]
}

export interface BylawSection {
  slug: string
  title: string
  description: string
  popoutDirection?: "right" | "left" | "auto"
  children?: BylawSection[]
  Component: React.ComponentType
}

export const bylawNavTree: NavItem[] = [
${navTreeLines.join(",\n")}
]

export const bylawSections: BylawSection[] = [
${sectionsData.join(",\n")}
]

export function getBylaw(slug: string): BylawSection | undefined {
  function findSection(sections: BylawSection[], targetSlug: string): BylawSection | undefined {
    for (const section of sections) {
      if (section.slug === targetSlug) return section
      if (section.children) {
        const found = findSection(section.children, targetSlug)
        if (found) return found
      }
    }
    return undefined
  }
  return findSection(bylawSections, slug)
}
`

  writeFileSync(OUTPUT_FILE, generated)
  console.log(
    `Generated bylaws.ts with ${topLevelDirs.length} top-level sections`
  )
}

main()
