"use client"

import { ScrollTOC } from "@/components/toc"

export const toc = [
  { id: "platform", text: "Platform", level: 2 },
  { id: "join-the-movement", text: "Join the Movement", level: 2 },
  { id: "volunteer", text: "Volunteer", level: 2 },
]

export function PlatformTOC() {
  return <ScrollTOC items={toc} />
}