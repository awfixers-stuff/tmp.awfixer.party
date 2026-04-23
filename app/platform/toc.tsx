"use client"

import { DesktopTOC } from "@/components/toc"
import { MobileTOC } from "@/components/mobile-toc"
import { useMobile } from "@/hooks/use-mobile"

const toc = [
  { id: "platform", text: "Platform", level: 2 },
  { id: "join-the-movement", text: "Join the Movement", level: 2 },
  { id: "volunteer", text: "Volunteer", level: 2 },
]

export function PlatformTOC() {
  const isMobile = useMobile()
  if (isMobile === undefined) return null
  return isMobile ? <MobileTOC items={toc} /> : <DesktopTOC items={toc} />
}
