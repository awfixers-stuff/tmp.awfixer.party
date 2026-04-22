import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "immigration-policy",
    "text": "Immigration Policy",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
