import type { Metadata } from "next"

import { SiteChrome } from "@/components/site-chrome"

export function generateMetadata(): Metadata {
  return {
    title: "Party Governance | AWFixer Political Party",
    description:
      "How the AWFixer Party governs itself — transparency, accountability, and member democracy.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
