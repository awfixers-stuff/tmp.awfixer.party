import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "north-korea",
    "text": "North Korea",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}