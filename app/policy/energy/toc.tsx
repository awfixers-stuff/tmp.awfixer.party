import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "energy-policy-nuclear-deregulation-and-the-honest-environmental-argument",
    "text": "Energy Policy — Nuclear Deregulation and the Honest Environmental Argument",
    "level": 2
  },
  {
    "id": "the-awfixer-energy-doctrine",
    "text": "The AWFixer Energy Doctrine",
    "level": 3
  },
  {
    "id": "the-historical-failure-revisiting-project-independence",
    "text": "The Historical Failure — Revisiting Project Independence",
    "level": 3
  },
  {
    "id": "the-honest-environmental-argument",
    "text": "The Honest Environmental Argument",
    "level": 3
  },
  {
    "id": "the-safety-argument",
    "text": "The Safety Argument",
    "level": 3
  },
  {
    "id": "the-awfixer-nuclear-deregulation-program",
    "text": "The AWFixer Nuclear Deregulation Program",
    "level": 3
  },
  {
    "id": "why-this-is-the-environmentally-serious-position",
    "text": "Why This Is the Environmentally Serious Position",
    "level": 3
  },
  {
    "id": "energy-policy-summary",
    "text": "ENERGY POLICY SUMMARY",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
