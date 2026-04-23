"use client"

import { DesktopTOC } from "@/components/toc"
import { MobileTOC } from "@/components/mobile-toc"
import { useMobile } from "@/hooks/use-mobile"
import { toc } from "./toc-content"

export function TableOfContents() {
  const isMobile = useMobile()
  if (isMobile === undefined) return null
  return isMobile ? <MobileTOC items={[...toc]} /> : <DesktopTOC items={[...toc]} />
}