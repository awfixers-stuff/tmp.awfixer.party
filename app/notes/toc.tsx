"use client"

import { DesktopTOC } from "@/components/toc"
import { MobileTOC } from "@/components/mobile-toc"
import { useMobile } from "@/hooks/use-mobile"

export const toc = [
  {
    "id": "economic-incentives-analysis",
    "text": "Economic Incentives Analysis",
    "level": 2
  },
  {
    "id": "the-core-insight-incentives-drive-behavior",
    "text": "The Core Insight: Incentives Drive Behavior",
    "level": 2
  },
  {
    "id": "immigration",
    "text": "Immigration",
    "level": 3
  },
  {
    "id": "healthcare",
    "text": "Healthcare",
    "level": 3
  },
  {
    "id": "labor-unions",
    "text": "Labor Unions",
    "level": 3
  },
  {
    "id": "the-pattern",
    "text": "The Pattern",
    "level": 2
  },
  {
    "id": "what-this-means-for-our-platform",
    "text": "What This Means for Our Platform",
    "level": 2
  }
]

export function TableOfContents() {
  const isMobile = useMobile()
  if (isMobile === undefined) return null
  return isMobile ? <MobileTOC items={toc} /> : <DesktopTOC items={toc} />
}
