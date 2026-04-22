import { ScrollTOC } from "@/components/toc"

export const toc = [
  { id: "technology-and-ai-policy", text: "Technology & AI Policy", level: 2 },
  { id: "government-ai-requirements", text: "Government AI Requirements", level: 2 },
  { id: "private-ai-accountability", text: "Private AI Accountability", level: 2 },
  { id: "computer-fraud-and-abuse-act-reform", text: "Computer Fraud and Abuse Act Reform", level: 2 },
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}