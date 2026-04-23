export interface NavItem {
  id: string
  label: string
  href?: string
  popoutDirection?: "right" | "left" | "auto"
  children?: NavItem[]
}

export interface BylawSection {
  slug: string
  title: string
  description: string
  popoutDirection?: "right" | "left" | "auto"
  children?: BylawSection[]
  Component: React.ComponentType
}

export const bylawSections: BylawSection[] = []
export const bylawNavTree: NavItem[] = []

export function getBylaw(slug: string): BylawSection | undefined {
  function findSection(
    sections: BylawSection[],
    targetSlug: string
  ): BylawSection | undefined {
    for (const section of sections) {
      if (section.slug === targetSlug) return section
      if (section.children) {
        const found = findSection(section.children, targetSlug)
        if (found) return found
      }
    }
    return undefined
  }
  return findSection(bylawSections, slug)
}
