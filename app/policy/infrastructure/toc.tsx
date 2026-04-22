import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "infrastructure-policy",
    "text": "Infrastructure Policy",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
