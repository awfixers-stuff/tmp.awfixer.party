import { ScrollTOC } from "@/components/toc"

export const toc: { id: string; text: string; level: number }[] = []

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
