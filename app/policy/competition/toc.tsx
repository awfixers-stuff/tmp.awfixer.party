import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "competition-antitrust-policy",
    "text": "Competition & Antitrust Policy",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
