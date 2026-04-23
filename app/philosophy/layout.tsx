import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  return {
    title: "Philosophy | AWFixer Political Party",
    description: "Principles and philosophy of the AWFixer Political Party.",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
