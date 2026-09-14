"use client"

import React from "react"
import { Home, User, Briefcase, Layers, Send } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
  const navItems = [
    { name: "Overview", url: "#hero", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Experience", url: "#experience", icon: Briefcase },
    { name: "Projects", url: "#projects", icon: Layers },
    { name: "Contact", url: "#contact", icon: Send },
  ]

  return <NavBar items={navItems} />
}
