import { ScrollTOC } from "@/components/toc"

export const toc = [
  { id: "who-we-are", text: "Who We Are", level: 2 },
  { id: "the-diagnosis-thirty-years-of-regression", text: "The Diagnosis: Thirty Years of Regression", level: 2 },
  { id: "the-core-philosophy-fix-the-incentive", text: "The Core Philosophy: Fix the Incentive", level: 2 },
  { id: "what-makes-awfixer-different", text: "What Makes AWFixer Different", level: 2 },
  { id: "the-platform-in-brief", text: "The Platform in Brief", level: 2 },
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}