import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { SiteChrome } from "@/components/site-chrome"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "AWFixer Political Party",
  description: "Official temporary site for the AWFixer Political Party.",
  openGraph: {
    images: ["/2.webp"],
  },
  icons: {
    icon: "/1.webp",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-svh bg-background">
        <ThemeProvider>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 overflow-hidden bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(0.35_0.08_280/0.35),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_50%,oklch(0.22_0.06_200/0.2),transparent_50%),radial-gradient(ellipse_70%_40%_at_0%_80%,oklch(0.28_0.05_320/0.15),transparent_50%)]"
          />
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
