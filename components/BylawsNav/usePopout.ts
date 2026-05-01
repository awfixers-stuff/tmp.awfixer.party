"use client"

import { useState, useEffect } from "react"

interface UseBreakpointOptions {
  breakpoint?: number
}

export function useBreakpoint(options: UseBreakpointOptions = {}) {
  const { breakpoint = 768 } = options
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mql.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [breakpoint])

  return isMobile
}
