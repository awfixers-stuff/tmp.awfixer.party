"use client"

import { DesktopTOC } from "@/components/toc"
import { MobileTOC } from "@/components/mobile-toc"
import { useMobile } from "@/hooks/use-mobile"
import { plansMeta } from "./plans-meta"

const toc = plansMeta.map((plan) => ({
  id: plan.slug,
  text: plan.title,
  level: 2 as const,
}))

export function PlansTOC() {
  const isMobile = useMobile()
  if (isMobile === undefined) return null
  return isMobile ? <MobileTOC items={toc} /> : <DesktopTOC items={toc} />
}
