import type { Metadata } from "next"

import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "Terms of Use | AWFixer Political Party",
    description: "AWFixer Political Party terms of use.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
