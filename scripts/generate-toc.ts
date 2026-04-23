import fs from "fs"
import path from "path"

const CONTENT_DIR = path.join(process.cwd(), "app")

interface TocItem {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/\*+$/, "").trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")

    headings.push({ id, text, level })
  }

  return headings
}

function generateTocFiles(mdxPath: string) {
  const content = fs.readFileSync(mdxPath, "utf-8")
  const headings = extractHeadings(content)

  const dir = path.dirname(mdxPath)

  // toc-content.ts — data only, no JSX
  const tocContentPath = path.join(dir, "toc-content.ts")
  const tocContentFile = headings.length > 0
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

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.name.endsWith(".mdx")) {
      generateTocFiles(fullPath)
    }
  }
}

walkDir(CONTENT_DIR)
