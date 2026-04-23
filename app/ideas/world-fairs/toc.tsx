import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "the-vision",
    "text": "The Vision",
    "level": 2
  },
  {
    "id": "the-problem",
    "text": "The Problem",
    "level": 2
  },
  {
    "id": "events",
    "text": "Events",
    "level": 2
  },
  {
    "id": "how-it-works",
    "text": "How It Works",
    "level": 2
  },
  {
    "id": "gallery",
    "text": "Gallery",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
