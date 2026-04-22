import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "china",
    "text": "China",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}