import type { Metadata } from "next"

import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "Terms of Access | AWFixer Political Party",
    description: "AWFixer Political Party terms of access policy.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
