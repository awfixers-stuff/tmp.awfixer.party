import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "china",
    "text": "China",
    "level": 2
  },
  {
    "id": "a-background",
    "text": "A Background",
    "level": 3
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
