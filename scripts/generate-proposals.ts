import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROPOSALS_ROOT = join(__dirname, "../app/proposals")
const OUTPUT_FILE = join(PROPOSALS_ROOT, "proposals.ts")

interface ProposalMeta {
  slug?: string
  title?: string
  description?: string
  category?: string
  order?: number
}

function parseProposalMeta(content: string): ProposalMeta {
  const match = content.match(/<ProposalMeta([^>]*)\/?>/)
  if (!match) return {}

  const attrs = match[1]
  const result: ProposalMeta = {}

  const slugMatch = attrs.match(/slug="([^"]+)"/)
  if (slugMatch) result.slug = slugMatch[1]

  const titleMatch = attrs.match(/title="([^"]+)"/)
  if (titleMatch) result.title = titleMatch[1]

  const descMatch = attrs.match(/description="([^"]+)"/)
  if (descMatch) result.description = descMatch[1]

  const categoryMatch = attrs.match(/category="([^"]+)"/)
  if (categoryMatch) result.category = categoryMatch[1]

  const orderMatch = attrs.match(/order={(\d+)}/)
  if (orderMatch) result.order = parseInt(orderMatch[1])

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
  return result || fallback || "Proposal description."
}

function toComponentName(slug: string) {
  return slug
    .split("-")
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("")
}

interface ProposalNode {
  slug: string
  title: string
  description: string
  href: string
  importPath: string
  children: ProposalNode[]
}

function walkDirectory(dirPath: string): ProposalNode | null {
  const contentPath = join(dirPath, "content.mdx")
  if (!existsSync(contentPath)) return null

  const content = readFileSync(contentPath, "utf-8")
  const meta = parseProposalMeta(content)
  const dirName = dirPath.split("/").pop() || "unknown"
  const slug = meta.slug || dirName
  const title = meta.title || parseTitle(content, slug)
  const description = meta.description || parseDescription(content, title)

  const relativePath = relative(PROPOSALS_ROOT, dirPath)
  const href = `/proposals/${relativePath}`

  const node: ProposalNode = {
    slug,
    title,
    description,
    href,
    importPath: relativePath,
    children: [],
  }

  const entries = readdirSync(dirPath)
  for (const entry of entries) {
    const fullPath = join(dirPath, entry)
    try {
      if (
        statSync(fullPath).isDirectory() &&
        !entry.startsWith("[") &&
        !entry.startsWith(".")
      ) {
        const childNode = walkDirectory(fullPath)
        if (childNode) {
          node.children.push(childNode)
        }
      }
    } catch {
      continue
    }
  }

  return node
}

function generateNavTree(nodes: ProposalNode[]): string {
  const items = nodes.map((node) => {
    const children =
      node.children.length > 0
        ? `, children: [${generateNavTree(node.children)}]`
        : ""
    return `{ id: "${node.slug}", label: "${node.title}", href: "${node.href}"${children} }`
  })
  return items.join(", ")
}

function generateSections(nodes: ProposalNode[], allImports: string[]): string {
  const sections = nodes.map((node) => {
    const componentName = toComponentName(node.slug)
    allImports.push(
      `import ${componentName} from "./${node.importPath}/content.mdx"`
    )

    const children =
      node.children.length > 0
        ? `,\n        children: [${generateSections(node.children, allImports)}]`
        : ""

    return `{
        slug: "${node.slug}",
        title: "${node.title}",
        description: "${node.description}",
        Component: ${componentName}${children}
      }`
  })
  return sections.join(", ")
}

function main() {
  if (!existsSync(PROPOSALS_ROOT)) {
    console.log("Proposals directory not found, skipping generate-proposals")
    return
  }

  const entries = readdirSync(PROPOSALS_ROOT)
  const topLevelNodes: ProposalNode[] = []

  for (const entry of entries) {
    const fullPath = join(PROPOSALS_ROOT, entry)
    try {
      if (
        statSync(fullPath).isDirectory() &&
        !entry.startsWith("[") &&
        !entry.startsWith(".") &&
        existsSync(join(fullPath, "content.mdx"))
      ) {
        const node = walkDirectory(fullPath)
        if (node) topLevelNodes.push(node)
      }
    } catch {
      continue
    }
  }

  if (topLevelNodes.length === 0) {
    console.log("No proposal directories found, skipping generate-proposals")
    return
  }

  const allImports: string[] = []
  const navTree = generateNavTree(topLevelNodes)
  const sections = generateSections(topLevelNodes, allImports)

  const imports = allImports.join("\n")

  const generated = `${imports}

import React from "react"

export interface NavItem {
  id: string
  label: string
  href?: string
  children?: NavItem[]
}

export interface ProposalSection {
  slug: string
  title: string
  description: string
  children?: ProposalSection[]
  Component: React.ComponentType
}

export const proposalNavTree: NavItem[] = [
  ${navTree}
]

export const proposalSections: ProposalSection[] = [
  ${sections}
]

export function getProposal(slug: string): ProposalSection | undefined {
  function findSection(sections: ProposalSection[], targetSlug: string): ProposalSection | undefined {
    for (const section of sections) {
      if (section.slug === targetSlug) return section
      if (section.children) {
        const found = findSection(section.children, targetSlug)
        if (found) return found
      }
    }
    return undefined
  }
  return findSection(proposalSections, slug)
}
`

  writeFileSync(OUTPUT_FILE, generated)
  console.log(
    `Generated proposals.ts with ${topLevelNodes.length} top-level sections`
  )
}

main()
