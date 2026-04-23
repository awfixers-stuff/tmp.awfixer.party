"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import type { NavItem as NavItemType } from "@/app/bylaws/bylaws"

interface UsePopoutOptions {
  delay?: number
  edgeThreshold?: number
}

export function usePopout(options: UsePopoutOptions = {}) {
  const { delay = 150, edgeThreshold = 200 } = options
  const [openId, setOpenId] = useState<string | null>(null)
  const [popoutDirection, setPopoutDirection] = useState<"left" | "right">(
    "right"
  )
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const itemRef = useRef<HTMLElement | null>(null)

  const open = useCallback(
    (id: string, direction?: "left" | "right" | "auto") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      const resolvedDirection =
        direction === "auto" || direction === undefined ? "right" : direction

      if (direction === "auto" && itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const distanceToRight = viewportWidth - rect.right

        if (distanceToRight < edgeThreshold) {
          setPopoutDirection("left")
        } else {
          setPopoutDirection("right")
        }
      } else {
        setPopoutDirection(resolvedDirection === "left" ? "left" : "right")
      }

      setOpenId(id)
    },
    [edgeThreshold]
  )

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setOpenId(null)
    }, delay)
  }, [delay])

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const setRef = useCallback((el: HTMLElement | null) => {
    itemRef.current = el
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    openId,
    popoutDirection,
    open,
    close,
    cancelClose,
    setRef,
    isOpen: openId !== null,
  }
}

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
