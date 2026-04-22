import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "middle-east",
    "text": "Middle East",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}