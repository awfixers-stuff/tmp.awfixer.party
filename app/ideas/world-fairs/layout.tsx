import type { Metadata } from "next"
import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "American World Fairs | AWFixer Political Party",
    description: "Reviving the spirit of American World Fairs.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
