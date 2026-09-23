"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const isManualScrolling = useRef(false)
  const manualScrollTimer = useRef<NodeJS.Timeout | null>(null)

  // Calculate current active section based on scroll position
  const updateActiveSection = useCallback(() => {
    if (isManualScrolling.current) return

    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // 1. Top of page check -> Hero/Overview
    if (scrollPosition < 150) {
      setActiveTab(items[0].name)
      return
    }

    // 2. Bottom of page check -> Contact
    if (windowHeight + scrollPosition >= documentHeight - 100) {
      const lastItem = items[items.length - 1]
      setActiveTab(lastItem.name)
      return
    }

    // 3. Viewport center-line matching
    const viewportCenter = scrollPosition + windowHeight * 0.35
    let currentActive = items[0].name

    for (const item of items) {
      if (item.url.startsWith("#")) {
        const id = item.url.replace("#", "")
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (viewportCenter >= top && viewportCenter < top + height) {
            currentActive = item.name
            break
          }
        }
      }
    }

    setActiveTab(currentActive)
  }, [items])

  useEffect(() => {
    // Initial calculation & scroll listener
    updateActiveSection()

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current)
    }
  }, [updateActiveSection])

  const handleTabClick = (item: NavItem) => {
    setActiveTab(item.name)
    isManualScrolling.current = true

    if (manualScrollTimer.current) {
      clearTimeout(manualScrollTimer.current)
    }

    if (item.url.startsWith("#")) {
      const id = item.url.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        // Calculate offset to account for fixed navbar padding
        const offset = 60
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = el.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }

    // Lock automatic scroll spy for 850ms to allow smooth scroll animation to finish
    manualScrollTimer.current = setTimeout(() => {
      isManualScrolling.current = false
    }, 850)
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 dark:bg-zinc-950/85 border border-black/10 dark:border-white/20 backdrop-blur-2xl py-1.5 px-2 rounded-full shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-auto transition-colors duration-300">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => handleTabClick(item)}
              aria-label={`Navigate to ${item.name}`}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-2 rounded-full transition-all duration-300 focus:outline-none flex items-center gap-2",
                isActive
                  ? "text-zinc-950 dark:text-white font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5",
              )}
            >
              <Icon size={16} className={cn("transition-transform duration-300", isActive ? "scale-110 text-zinc-950 dark:text-white" : "text-zinc-500 dark:text-zinc-400")} />
              <span className="hidden sm:inline font-sans">{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="active-lamp-pill"
                  className="absolute inset-0 w-full h-full bg-black/10 dark:bg-white/15 rounded-full border border-black/15 dark:border-white/25 shadow-[0_0_16px_rgba(0,0,0,0.1)] dark:shadow-[0_0_16px_rgba(255,255,255,0.3)] -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                >
                  {/* Top Tubelight Glow Ray */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-900 dark:bg-white rounded-t-full shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_12px_rgba(255,255,255,0.9)]">
                    <div className="absolute w-12 h-4 bg-zinc-900/30 dark:bg-white/30 rounded-full blur-md -top-1 -left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

