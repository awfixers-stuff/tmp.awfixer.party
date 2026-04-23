import { SiteNav } from "@/components/nav/nav"
import { SiteFooter } from "@/components/site-footer"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[1] flex flex-col">
      <SiteNav />
      <div className="flex min-h-svh flex-1 flex-col pt-24 sm:pt-28">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}
