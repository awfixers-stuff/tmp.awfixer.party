import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "tax-fiscal-policy",
    "text": "Tax & Fiscal Policy",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
