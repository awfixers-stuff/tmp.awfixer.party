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

function generateTocFile(mdxPath: string) {
  const content = fs.readFileSync(mdxPath, "utf-8")
  const headings = extractHeadings(content)

  const dir = path.dirname(mdxPath)
  const tocPath = path.join(dir, "toc.tsx")

  const tocContent = `import { ScrollTOC } from "@/components/toc"

${headings.length > 0 ? `export const toc = ${JSON.stringify(headings, null, 2)}` : "export const toc: { id: string; text: string; level: number }[] = []"}

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
`

  fs.writeFileSync(tocPath, tocContent)
  console.log(`Generated: ${tocPath}`)
}

function walkDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.name.endsWith(".mdx")) {
      generateTocFile(fullPath)
    }
  }
}

walkDir(CONTENT_DIR)
