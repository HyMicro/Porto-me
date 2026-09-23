"use client";

import { motion } from "framer-motion";
import GsapFlipCard, { GsapFlipCardItem } from "@/components/ui/gsap-card-flip";
import { MorphingDialog } from "@/components/ui/morphing-dialog";

const CASE_STUDIES: GsapFlipCardItem[] = [
  {
    id: "9-to-fight",
    index: "01",
    image: "/PNG/Game Seed25.png",
    alt: "9 - TO - FIGHT Game Seed 2025 Incubation",
    title: "9 - TO - FIGHT",
    category: "GAME SEED 2025 INCUBATION",
    role: "Gameplay Programmer & Game Designer",
    caption: "Top-down 2.5D comedy shooter where corporate grind turns into chaotic office warfare. Battle coworkers using office supply weapons.",
    tagline: "Top-down 2.5D comedy shooter created during a 10-day incubation program by Ministry of Creative Economy. Improvised supply weapons & office sabotage.",
  },
  {
    id: "bubble-cuts",
    index: "02",
    image: "/PNG/bubble1.png",
    alt: "BUBBLE CUTS Global Game Jam 2025",
    title: "BUBBLE CUTS",
    category: "GLOBAL GAME JAM 2025",
    role: "Gameplay Programmer & Game Designer",
    caption: "Rhythm action game where Bubi fights monsters using secret bubble breathing techniques.",
    tagline: "Press spacebar in sync to expand bubbles and strike incoming monsters. Built in 48 hours for Global Game Jam.",
  },
  {
    id: "phone-mechanics",
    index: "03",
    image: "/PNG/13ball1.png",
    alt: "13th Ball: The Nightmare Shift",
    title: "13TH BALL: THE NIGHTMARE SHIFT",
    category: "GAMEPLAY SYSTEM & UI",
    role: "Programmer Unreal Engine @ Bumi Studio",
    caption: "Simulated smartphone subsystem engineered for horror game '13th Ball: The Nightmare Shift' on Steam.",
    tagline: "Interconnected in-game smartphone handling dynamic character messages, inbox lists, and preview cards in Unreal Engine 5.",
  },
  {
    id: "last-breath-protocol",
    index: "04",
    image: "/PNG/gamejam26.png",
    alt: "The Last Breath Protocol Sci-Fi Survival Game",
    title: "THE LAST BREATH PROTOCOL",
    category: "SCI-FI SURVIVAL GAME",
    role: "Gameplay Programmer",
    caption: "Sci-fi survival game focusing on exploration, oxygen management, system repairs, and hazards.",
    tagline: "Survive on limited oxygen while repairing spaceship systems and avoiding toxic gas leaks as bio-engineered tiger Unit T-47.",
  },
  {
    id: "water-simulation-system",
    index: "05",
    image: "/PNG/water.png",
    alt: "Unreal Engine 5 Water Simulation Shader",
    title: "WATER SIMULATION SHADER",
    category: "UNREAL ENGINE TECH ART",
    role: "Technical Artist & Programmer",
    caption: "Stylised dynamic water material system in Unreal Engine 5 using complex shader techniques.",
    tagline: "Custom flow map surface movement, distance-field dynamic foam layers, edge highlights, and realtime depth coloring.",
  },
  {
    id: "ui-ux-branding",
    index: "06",
    image: "/PNG/image 31.png",
    alt: "Integrated Lab & Brand Design UI/UX",
    title: "INTEGRATED LAB & BRAND DESIGN",
    category: "UI/UX & GRAPHIC DESIGN",
    role: "UI/UX & Graphic Designer (Infotech UMM)",
    caption: "Complete visual identity branding ({/} lab), Instagram/TikTok feed poster designs, and web/mobile UI/UX apps.",
    tagline: "Branding for UMM Integrated Laboratory System (I-Lab), promotional social media poster feeds, and mobile UI/UX apps.",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 px-6 sm:px-8 border-t border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Background ambient spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              CLICK CARD TO FAN OUT • TAP THUMBNAILS TO SWAP HERO
            </span>
          </div>
        </motion.div>

        {/* Hyperiux GSAP Flip Card Component Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <GsapFlipCard
            items={CASE_STUDIES}
            title="FEATURED PROJECTS"
            meta="GAMEPLAY PROGRAMMING & DESIGN"
            description="A pile of case studies that fans into a hero preview and rail. Tap any frame to swap it in."
            backgroundColor="transparent"
            textColor="currentColor"
            mutedColor="currentColor"
            rounded={16}
            stackRotation={3}
          />
        </motion.div>

        {/* Interactive Morphing Deep Dive Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 border-t border-black/10 dark:border-white/10 pt-20"
        >
          <div className="text-center mb-12 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              ENGINEERING PHILOSOPHY & DEEP DIVES
            </h3>
            <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              Click any card below to expand morphing layout dialogs detailing core architecture, optimization pipelines, and UI paradigms.
            </p>
          </div>

          <MorphingDialog />
        </motion.div>
      </div>
    </section>
  );
}

