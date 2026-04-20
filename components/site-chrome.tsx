import { FloatingSiteNav } from "@/components/floating-site-nav"
import { SiteFooter } from "@/components/site-footer"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[1] flex flex-col">
      <FloatingSiteNav />
      <div className="flex min-h-svh flex-1 flex-col pt-[4.25rem] sm:pt-20">
        {children}
      </div>
      <SiteFooter />
    </div>
  )
}
