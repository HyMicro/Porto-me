"use client"

import React, { useEffect, useState } from "react"
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

  // Synchronize active tab with section currently visible in viewport
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedItem = items.find(
            (item) => item.url === `#${entry.target.id}`
          )
          if (matchedItem) {
            setActiveTab(matchedItem.name)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.1,
    })

    items.forEach((item) => {
      if (item.url.startsWith("#")) {
        const id = item.url.replace("#", "")
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleTabClick = (item: NavItem) => {
    setActiveTab(item.name)
    if (item.url.startsWith("#")) {
      const id = item.url.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 sm:pt-6 pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 bg-black/75 border border-white/15 backdrop-blur-xl py-1 px-1.5 rounded-full shadow-2xl pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => handleTabClick(item)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors focus:outline-none",
                "text-zinc-400 hover:text-white",
                isActive && "bg-white/10 text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    duration: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full shadow-[0_0_14px_rgba(255,255,255,0.8)]">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
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
