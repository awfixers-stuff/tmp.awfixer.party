"use client"

import {
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
  openId: string | null
  onOpen: (id: string, direction?: "left" | "right" | "auto") => void
  onClose: () => void
  onNavigate?: (item: NavItemType) => void
}

export function NavItem({
  item,
  depth = 0,
  activeId,
  isMobile = false,
  openId,
  onOpen,
  onClose,
  onNavigate,
}: NavItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.id === activeId
  const isExpanded = openId === item.id

  const handleClick = () => {
    if (hasChildren) {
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
    if (e.key === "ArrowRight" && hasChildren) {
      e.preventDefault()
      if (!isExpanded) {
        onOpen(item.id, item.popoutDirection || "right")
      }
    }
    if (e.key === "ArrowLeft" && hasChildren) {
      e.preventDefault()
      if (isExpanded) {
        onClose()
      }
    }
  }

  const handleItemClick = (e: MouseEvent) => {
    if (!hasChildren && item.href) {
      onNavigate?.(item)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div
        role={hasChildren ? "menuitem" : "menuitem"}
        tabIndex={0}
        aria-expanded={hasChildren ? isExpanded : undefined}
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
                depth === 0 && "border-b border-border/50"
              )
            : "px-4 py-2",
          isActive
            ? "bg-primary/10 font-medium text-primary"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          hasChildren && "font-medium"
        )}
        style={
          depth > 0
            ? { paddingLeft: `${16 + depth * 20}px` }
            : undefined
        }
      >
        <span className="flex-1 truncate">{item.label}</span>
        {hasChildren && (
          <span className="ml-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4 opacity-50" />
            )}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
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
                isMobile={false}
                openId={openId}
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
