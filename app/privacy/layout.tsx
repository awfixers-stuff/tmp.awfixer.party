import type { Metadata } from "next"

import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "Privacy Policy | AWFixer Political Party",
    description: "AWFixer Political Party privacy policy.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
