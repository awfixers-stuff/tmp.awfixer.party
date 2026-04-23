"use client"

import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type KeyboardEvent,
} from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { NavItem as NavItemType } from "@/app/bylaws/bylaws"

interface NavItemProps {
  item: NavItemType
  depth?: number
  activeId?: string
  isMobile?: boolean
  isOpen: boolean
  openId: string | null
  popoutDirection: "left" | "right"
  onOpen: (id: string, direction?: "left" | "right" | "auto") => void
  onClose: () => void
  onNavigate?: (item: NavItemType) => void
}

export function NavItem({
  item,
  depth = 0,
  activeId,
  isMobile = false,
  isOpen,
  openId,
  popoutDirection,
  onOpen,
  onClose,
  onNavigate,
}: NavItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.id === activeId
  const isExpanded = isMobile && openId === item.id
  const showPopout = !isMobile && isOpen && openId === item.id

  const handleMouseEnter = () => {
    if (!isMobile && hasChildren) {
      onOpen(item.id, item.popoutDirection || "auto")
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      onClose()
    }
  }

  const handleClick = () => {
    if (isMobile && hasChildren) {
      if (openId === item.id) {
        onClose()
      } else {
        onOpen(item.id, item.popoutDirection || "right")
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
    if (e.key === "ArrowRight" && hasChildren && !isMobile) {
      e.preventDefault()
      onOpen(item.id, item.popoutDirection || "auto")
    }
    if (e.key === "ArrowLeft" && hasChildren && !isMobile) {
      e.preventDefault()
      onClose()
    }
  }

  const handleItemClick = (e: MouseEvent) => {
    if (!hasChildren && item.href) {
      onNavigate?.(item)
    }
  }

  return (
    <div
      className={cn("relative", isMobile && "overflow-hidden")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        role={hasChildren ? "menuitem" : "menuitem"}
        tabIndex={0}
        aria-expanded={isMobile ? isExpanded : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={hasChildren ? handleClick : handleItemClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex cursor-pointer items-center justify-between",
          "transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
          isMobile
            ? cn(
                "px-4 py-3",
                depth === 0 && "border-b border-border/50",
                depth > 0 && `pl-[${8 + depth * 20}px]`
              )
            : "px-4 py-2",
          isActive
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          hasChildren && "font-medium"
        )}
        style={
          isMobile && depth > 0
            ? { paddingLeft: `${16 + depth * 20}px` }
            : undefined
        }
      >
        <span className="flex-1 truncate">{item.label}</span>
        {hasChildren && (
          <span className="ml-2">
            {isMobile ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50" />
            )}
          </span>
        )}
      </div>

      {hasChildren && showPopout && (
        <div
          role="menu"
          className={cn(
            "absolute top-0 z-50 max-w-[280px] min-w-[200px]",
            "rounded-md border border-border bg-background shadow-lg",
            "overflow-hidden",
            popoutDirection === "right" ? "left-full ml-2" : "right-full mr-2",
            popoutDirection === "right"
              ? "animate-popout-slide-right"
              : "animate-popout-slide-left"
          )}
          onMouseEnter={() => onOpen(item.id, item.popoutDirection || "auto")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2">
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                isMobile={false}
                isOpen={openId === child.id}
                openId={openId}
                popoutDirection={
                  child.popoutDirection === "left"
                    ? "left"
                    : child.popoutDirection === "right"
                      ? "right"
                      : "right"
                }
                onOpen={onOpen}
                onClose={onClose}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}

      {hasChildren && isMobile && isExpanded && (
        <div
          role="menu"
          className="animate-accordion-height"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                isMobile={true}
                isOpen={openId === child.id}
                openId={openId}
                popoutDirection="right"
                onOpen={onOpen}
                onClose={onClose}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
