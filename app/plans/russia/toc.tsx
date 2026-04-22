import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "russia",
    "text": "Russia",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}