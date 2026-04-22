"use client"

import { ScrollTOC } from "@/components/toc"

const toc = [
  { id: "fix-the-system", text: "Fix the System", level: 2 },
  { id: "our-core-statement", text: "Our Core Statement", level: 2 },
  { id: "our-platform-ten-pillars", text: "Our Platform — Ten Pillars", level: 2 },
]

export function HomeTOC() {
  return <ScrollTOC items={toc} />
}