import { ScrollTOC } from "@/components/toc"

export const toc = [
  {
    "id": "labor-immigration-fix-the-incentives-not-the-people",
    "text": "Labor & Immigration — Fix the Incentives, Not the People",
    "level": 2
  },
  {
    "id": "the-awfixer-core-insight",
    "text": "The AWFixer Core Insight",
    "level": 3
  },
  {
    "id": "principle-one-remove-the-incentive-to-hire-foreign-labor",
    "text": "PRINCIPLE ONE: Remove the Incentive to Hire Foreign Labor",
    "level": 3
  },
  {
    "id": "principle-two-reforming-labor-unions",
    "text": "PRINCIPLE TWO: Reforming Labor Unions",
    "level": 3
  },
  {
    "id": "principle-three-civil-standard-of-living-over-minimum-wage",
    "text": "PRINCIPLE THREE: Civil Standard of Living Over Minimum Wage",
    "level": 3
  },
  {
    "id": "labor-immigration-summary",
    "text": "LABOR & IMMIGRATION SUMMARY",
    "level": 2
  }
]

export function TableOfContents() {
  return <ScrollTOC items={toc} />
}
