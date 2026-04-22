import { ScrollTOC } from "@/components/toc"

export const toc = [
  { id: "civil-standard-of-living", text: "Civil Standard of Living", level: 2 },
  { id: "the-problem-with-minimum-wage", text: "The Problem With Minimum Wage", level: 2 },
  { id: "the-csl-index", text: "The CSL Index", level: 2 },
  { id: "policy-mechanisms", text: "Policy Mechanisms", level: 2 },
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}