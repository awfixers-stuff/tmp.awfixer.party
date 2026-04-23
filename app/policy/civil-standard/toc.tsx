import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "civil-standard-of-living",
    "text": "Civil Standard of Living",
    "level": 2
  },
  {
    "id": "the-problem-with-minimum-wage",
    "text": "The Problem With Minimum Wage",
    "level": 3
  },
  {
    "id": "the-civil-standard-of-living-csl",
    "text": "The Civil Standard of Living (CSL)",
    "level": 3
  },
  {
    "id": "policy-mechanisms",
    "text": "Policy Mechanisms",
    "level": 3
  },
  {
    "id": "summary",
    "text": "Summary",
    "level": 3
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
