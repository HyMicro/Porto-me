"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Gamepad2, Layers } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { MorphingDialog } from "@/components/ui/morphing-dialog";

interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  tagline: string;
  objective: string;
  implementation: string[];
  keyFeatures: string[];
  technologies: string[];
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
}

const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "9-to-fight",
    index: "01",
    title: "9 - TO - FIGHT",
    category: "GAME SEED 2025 INCUBATION",
    role: "Gameplay Programmer & Game Designer",
    tagline: "Top-down 2.5D comedy shooter where corporate grind turns into chaotic office warfare.",
    objective:
      "Indonesia's largest game competition and incubation program organized by the Ministry of Creative Economy (~10 days). Battle coworkers using improvised office supply weapons, sabotage your team, and claw your way to Employee of the Month.",
    implementation: [
      "Programmed top-down 2.5D character controls, combat logic, and weapon collisions in Unreal Engine 5.",
      "Designed chaotic improvised weapon mechanics from everyday office supplies with custom sabotage interactions.",
      "Collaborated in an intensive 10-day incubation workflow organized by the Ministry of Creative Economy.",
    ],
    keyFeatures: ["Top-down 2.5D Shooter", "Improvised Office Weapons", "Team Sabotage Mechanics", "Fast-Paced Comedy Combat"],
    technologies: ["Unreal Engine 5", "Blueprint", "C++", "Gameplay Programming", "Game Design"],
    outcome: "Successfully delivered a playable 2.5D comedy shooter prototype during a 10-day incubation program.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "bubble-cuts",
    index: "02",
    title: "BUBBLE CUTS",
    category: "GLOBAL GAME JAM 2025",
    role: "Gameplay Programmer & Game Designer",
    tagline: "Rhythm action game where Bubi fights monsters using secret bubble breathing techniques.",
    objective:
      "Fought monsters in a 48-hour game jam project created with a dedicated team under the theme 'Bubble'. Players press spacebar in sync to expand bubbles and strike incoming monsters.",
    implementation: [
      "Programmed precise spacebar input timing windows and rhythm feedback mechanisms in Unreal Engine.",
      "Implemented dynamic bubble scaling animations linked to player timing accuracy.",
      "Delivered complete game jam prototype in 48 hours working alongside multidisciplinary teammates.",
    ],
    keyFeatures: ["Rhythm Action Timing", "Bubble Expansion Feedback", "Spacebar Timing System", "Monster Battle Mechanics"],
    technologies: ["Unreal Engine 5", "Blueprint", "Rhythm Mechanics", "Game Jam Workflow", "Game Design"],
    outcome: "Completed and submitted a fully playable rhythm game prototype within 48 hours.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "phone-mechanics",
    index: "03",
    title: "PHONE SUBSYSTEM MECHANICS",
    category: "GAMEPLAY SYSTEM & UI",
    role: "Programmer Unreal Engine @ Bumi Studio",
    tagline: "Simulated smartphone mechanics featuring messaging, inbox panel, and real-time notifications.",
    objective:
      "Develop an interconnected in-game smartphone system handling dynamic incoming character messages, inbox lists, and preview cards within Unreal Engine.",
    implementation: [
      "Designed Message Struct data architecture containing sender, content, timestamp, and read status.",
      "Created dynamic Message List array as the primary data source for real-time UI data binding.",
      "Built 3 interconnected UI modules: Notification Alert, Inbox Panel list view, and Message Preview Card.",
    ],
    keyFeatures: ["Message Struct Architecture", "Notification System", "Interactive Inbox Panel", "Message Content Preview"],
    technologies: ["Unreal Engine 5", "C++", "Blueprint", "UMG / Slate", "Data Structs"],
    outcome: "Integrated into studio project workflow, establishing a reusable, modular in-game smartphone communication framework.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "last-breath-protocol",
    index: "04",
    title: "THE LAST BREATH PROTOCOL",
    category: "SCI-FI SURVIVAL GAME",
    role: "Gameplay Programmer",
    tagline: "Sci-fi survival game focusing on exploration, oxygen management, system repairs, and environmental hazards.",
    objective:
      "As bio-engineered tiger Unit T-47, players awaken from cryosleep on a damaged spaceship after a cosmic catastrophe destroyed their home planet. Survive on limited oxygen while repairing ship systems and avoiding toxic gas leaks.",
    implementation: [
      "Engineered oxygen depletion and survival timer mechanics in Unreal Engine.",
      "Programmed interactive system repair triggers and object grabbing states (E key / G key prompts).",
      "Built toxic gas leak environmental hazards and spaceship system failure events.",
    ],
    keyFeatures: ["Oxygen Survival System", "System Repair Mechanics", "Toxic Gas Hazards", "Object Grabbing & Interaction"],
    technologies: ["Unreal Engine 5", "C++", "Blueprint", "Gameplay Mechanics", "Interaction Systems"],
    outcome: "Implemented scalable sci-fi survival mechanics and environmental hazard interaction logic.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "water-simulation-system",
    index: "05",
    title: "WATER SIMULATION SHADER",
    category: "UNREAL ENGINE TECH ART",
    role: "Technical Artist & Programmer",
    tagline: "Stylised dynamic water material system in Unreal Engine 5 using complex shader techniques.",
    objective:
      "Create an immersive, dynamic visual representation of water using custom flow maps, layered foam, edge highlights, and dynamic depth color.",
    implementation: [
      "Authored custom flow map movement for realistic vector direction surface panning.",
      "Implemented distance-field dynamic foam layers and edge highlight effects against shorelines.",
      "Exposed realtime material parameters for wave speed, distortion scale, and depth color blending.",
    ],
    keyFeatures: ["Custom Flow Map Movement", "Layered Foam System", "Edge Highlight Effect", "Dynamic Depth Coloring", "Realtime Material Customization"],
    technologies: ["Unreal Engine 5", "HLSL / Material Editor", "Flow Maps", "Depth Color", "Technical Art"],
    outcome: "Delivered a visually striking, performance-optimized stylised water material with full runtime parameter customization.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "ui-ux-branding",
    index: "06",
    title: "INTEGRATED LAB & BRAND DESIGN",
    category: "UI/UX & GRAPHIC DESIGN",
    role: "UI/UX & Graphic Designer (Infotech UMM)",
    tagline: "Complete visual identity branding ({/} lab), Instagram/TikTok feed poster designs, and web/mobile UI/UX apps.",
    objective:
      "Create visual branding for Integrated Laboratory System (I-Lab), promotional social media feed posters (Informatics Expo, Ghost Runner), and mobile/web UI/UX apps (Sumba Travel, Kekita Donation).",
    implementation: [
      "Designed complete {/} lab logo identity system for UMM Integrated Laboratory System across dark & light modes.",
      "Created promotional poster feed designs and story content for Instagram and TikTok (@labit.umm).",
      "Prototyped mobile UI/UX flows (Sumba Travel app, Checkout system) and web UI (Kekita donation platform).",
    ],
    keyFeatures: ["Brand Identity Logo ({/} lab)", "Social Media Feed Systems", "Mobile UI/UX (Sumba Travel)", "Web UI/UX (Kekita Donation)"],
    technologies: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "UI/UX Design", "Brand Design"],
    outcome: "Produced complete branding collateral, event social media designs, and high-fidelity UI/UX prototypes.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://www.figma.com/design/1rrZ5Lj4qZKV2WQ7tbrf4a/PORTOFOLIO?node-id=80-2&t=t4ukNK5itt2gZv8j-1",
  },
];

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 80;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-6 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              FEATURED PROJECTS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400 mr-2">
              SWIPE / USE CONTROLS
            </span>
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-white/20 bg-white/[0.08] text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_16px_rgba(0,0,0,0.3)] hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-white/20 bg-white/[0.08] text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_16px_rgba(0,0,0,0.3)] hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Interactive Card Stack Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[560px] sm:min-h-[500px] flex items-center justify-center"
        >
          {CASE_STUDIES.map((project, i) => {
            const offset = (i - currentIndex + CASE_STUDIES.length) % CASE_STUDIES.length;
            if (offset > 2) return null;

            const isTop = offset === 0;

            const scale = 1 - offset * 0.05;
            const yOffset = offset * 16;
            const rotate = offset === 1 ? -1.5 : offset === 2 ? 1.5 : 0;
            const opacity = offset === 0 ? 1 : offset === 1 ? 0.65 : 0.35;
            const zIndex = 10 - offset;

            return (
              <motion.div
                key={project.id}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={isTop ? handleDragEnd : undefined}
                animate={{
                  scale,
                  y: yOffset,
                  rotate,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                whileTap={isTop ? { cursor: "grabbing" } : {}}
                className={`absolute w-full max-w-4xl p-7 sm:p-10 rounded-2xl border border-white/20 bg-zinc-950/95 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.6)] transition-all ${isTop ? "cursor-grab active:cursor-grabbing hover:border-white/40" : "pointer-events-none"
                  }`}
                style={{
                  transformOrigin: "top center",
                }}
              >
                {/* Top Card Meta Row */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      {project.index}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {currentIndex + 1} / {CASE_STUDIES.length}
                  </span>
                </div>

                {/* Project Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      • {project.role}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-mono text-zinc-300">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    <strong className="text-zinc-200">Objective:</strong> {project.objective}
                  </p>
                </div>

                {/* Key Features & Contribution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1.5 font-semibold">
                      MY IMPLEMENTATION
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {project.implementation.slice(0, 2).map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-white font-mono">&rarr;</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1.5 font-semibold">
                      OUTCOME & RESULT
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.06] border border-white/15 text-zinc-200 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl bg-white text-black font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_16px_rgba(0,0,0,0.3)] hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.96] transition-all"
                      onClick={(e) => (isTop ? null : e.preventDefault())}
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl border border-white/20 bg-white/[0.08] text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-[0.96] transition-all"
                      onClick={(e) => (isTop ? null : e.preventDefault())}
                    >
                      <span>GitHub Repo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-16">
          {CASE_STUDIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${currentIndex === idx
                ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              aria-label={`Jump to case study ${idx + 1}`}
            />
          ))}
        </div>

        {/* Interactive Morphing Deep Dive Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 border-t border-white/10 pt-20"
        >
          <div className="text-center mb-12 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              ENGINEERING PHILOSOPHY & DEEP DIVES
            </h3>
            <p className="text-sm font-mono text-zinc-400 max-w-xl mx-auto">
              Click any card below to expand morphing layout dialogs detailing core architecture, optimization pipelines, and UI paradigms.
            </p>
          </div>

          <MorphingDialog />
        </motion.div>
      </div>
    </section>
  );
}
