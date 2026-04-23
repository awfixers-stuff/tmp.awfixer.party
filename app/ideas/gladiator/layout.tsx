import type { Metadata } from "next"
import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "American Gladiator Games | AWFixer Political Party",
    description:
      "Channel America's competitive spirit through organized gladiator events.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
