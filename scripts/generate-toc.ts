import fs from "fs"
import path from "path"
import GithubSlugger from "github-slugger"

const CONTENT_DIR = path.join(process.cwd(), "app")

interface TocItem {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []
  const slugger = new GithubSlugger()
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/\*+$/, "").trim()
    const id = slugger.slug(text)

    headings.push({ id, text, level })
  }

  return headings
}

function extractHeadingsFromTsx(filePath: string): TocItem[] {
  const content = fs.readFileSync(filePath, "utf-8")
  const slugger = new GithubSlugger()
  const headings: TocItem[] = []

  const headingRegex = /<h([23])\b([^>]*)>(.*?)<\/h\1>/gs
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const attrs = match[2]
    const innerHtml = match[3]

    const idMatch = attrs.match(/id="([^"]*)"/)

    const text = innerHtml
      .replace(/<[^>]*>/g, "")
      .replace(/\{[^}]*\}/g, "")
      .replace(/\s+/g, " ")
      .trim()

    if (!text) continue

    let id: string
    if (idMatch) {
      id = idMatch[1]
    } else {
      console.warn(
        `Warning: No id found for heading "${text}" in ${filePath}, generating slug`,
      )
      id = slugger.slug(text)
    }

    headings.push({ id, text, level })
  }

  return headings
}

function generateTocFiles(dir: string, headings: TocItem[]) {
  // toc-content.ts — data only, no JSX
  const tocContentPath = path.join(dir, "toc-content.ts")
  const tocContentFile =
    headings.length > 0
      ? `export const toc = ${JSON.stringify(headings, null, 2)} as const\n`
      : `export const toc: { id: string; text: string; level: number }[] = []\n`

  fs.writeFileSync(tocContentPath, tocContentFile)
  console.log(`Generated: ${tocContentPath}`)

  // toc.tsx — switcher component, imports data + both TOC components
  const tocPath = path.join(dir, "toc.tsx")
  const tocFile = `"use client"

import { DesktopTOC } from "@/components/toc"
import { MobileTOC } from "@/components/mobile-toc"
import { useMobile } from "@/hooks/use-mobile"
import { toc } from "./toc-content"

export function TableOfContents() {
  const isMobile = useMobile()
  if (isMobile === undefined) return null
  return isMobile ? <MobileTOC items={[...toc]} /> : <DesktopTOC items={[...toc]} />
}
`

  fs.writeFileSync(tocPath, tocFile)
  console.log(`Generated: ${tocPath}`)
}

function walkDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const tsxEntry = entries.find(
    (e) =>
      !e.isDirectory() &&
      (e.name === "content.tsx" || e.name.endsWith("-content-new.tsx")),
  )

  if (tsxEntry) {
    const tsxPath = path.join(dir, tsxEntry.name)
    const headings = extractHeadingsFromTsx(tsxPath)
    generateTocFiles(dir, headings)
  } else {
    const mdxEntry = entries.find(
      (e) => !e.isDirectory() && e.name === "content.mdx",
    )
    if (mdxEntry) {
      const mdxPath = path.join(dir, mdxEntry.name)
      const content = fs.readFileSync(mdxPath, "utf-8")
      const headings = extractHeadings(content)
      generateTocFiles(dir, headings)
    }
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      walkDir(path.join(dir, entry.name))
    }
  }
}

walkDir(CONTENT_DIR)
