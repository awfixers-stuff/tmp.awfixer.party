import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "our-core-principles",
    "text": "Our Core Principles",
    "level": 2
  },
  {
    "id": "policy-priorities",
    "text": "Policy Priorities",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
