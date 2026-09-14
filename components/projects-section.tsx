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
    id: "project-valiance",
    index: "01",
    title: "PROJECT VALIANCE",
    category: "UNREAL ENGINE 5.6 GAMEPLAY",
    role: "Lead Gameplay Programmer & Systems Designer",
    tagline: "Third-person dynamic combat system and fluid interaction state machines.",
    objective:
      "Design and engineer a high-responsiveness melee and ranged combat controller with directional hit-reactions and procedural locomotion.",
    implementation: [
      "Engineered modular Combat Component handling combos, weapon collision traces, and stamina calculations in C++ and Blueprint.",
      "Implemented Animation Montages with dynamic motion warping, notify states, and blend spaces.",
      "Built custom camera shake and hit-stop time dilation mechanisms to deliver punchy tactile game feel.",
    ],
    keyFeatures: ["Combo Branching", "Motion Warping", "Directional Hit Detection", "Custom AI Behavior Trees"],
    technologies: ["Unreal Engine 5.6", "C++", "Blueprint", "Niagara FX", "Animation Logic"],
    outcome: "Achieved deterministic sub-16ms combat input latency and smooth 60FPS physics execution.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "chrono-strata-ui",
    index: "02",
    title: "CHRONO STRATA INTERFACE",
    category: "DIEGETIC GAME UI/UX",
    role: "Game UI/UX Designer & UMG Programmer",
    tagline: "Immersive diegetic game user interface and contextual HUD system.",
    objective:
      "Design and integrate an unobtrusive, futuristic HUD that seamlessly feeds real-time game telemetry without breaking world immersion.",
    implementation: [
      "Prototyped complete UX flows, holographic menus, and status gauges in Figma.",
      "Developed custom Slate widgets and UMG dynamic materials reacting to player vital stats and environmental damage.",
      "Integrated audio feedback cues and controller haptic triggers for tactile menu navigation.",
    ],
    keyFeatures: ["Diegetic 3D World HUD", "Dynamic Radial Wheels", "Slate Optimization", "Responsive Accessibility"],
    technologies: ["Unreal Engine 5", "UMG / Slate", "Figma", "Interaction Design", "Blueprint"],
    outcome: "Increased player reaction speed by 28% in playtests while preserving pure cinematic immersion.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "bumi-engine-toolkit",
    index: "03",
    title: "BUMI ENGINE TOOLKIT",
    category: "STUDIO GAMEPLAY PIPELINE",
    role: "Gameplay Systems & Tools Programmer",
    tagline: "Modular blueprint library and automated level sequencer triggers.",
    objective:
      "Build developer utility nodes and cinematic sequencing tools to speed up mission development across studio team members.",
    implementation: [
      "Authored custom C++ Blueprint Function Libraries for mathematical vector interpolation and raycasting.",
      "Created automated trigger volumes interfacing directly with Unreal Engine Level Sequencers.",
      "Conducted extensive bug hunting, profiling memory allocations, and optimizing tick rates.",
    ],
    keyFeatures: ["Custom Blueprint Nodes", "Cinematic Triggers", "Memory Profiling", "Level Designer SDK"],
    technologies: ["Unreal Engine 5", "C++", "Python Automation", "Profiling Tools", "Git"],
    outcome: "Reduced level design setup time by over 40% across mission scripting workflows.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "aether-spatial-os",
    index: "04",
    title: "AETHER SPATIAL ENVIRONMENT",
    category: "INTERACTIVE DIGITAL EXPERIENCE",
    role: "Creative Technologist & UI Engineer",
    tagline: "Browser-based spatial computing interface with interactive window manager.",
    objective:
      "Explore the intersection of game-inspired spatial interactions and modern web architecture directly inside the browser.",
    implementation: [
      "Constructed multi-window orchestration system with virtual drag, drop, minimize, and dock behaviors.",
      "Rendered real-time hardware-accelerated canvas audio-reactive particle visualizers.",
      "Implemented client-side virtual filesystem using modern browser storage primitives.",
    ],
    keyFeatures: ["Spatial Window Engine", "Audio-Reactive Shaders", "Virtual Filesystem", "Fluid Touch Gestures"],
    technologies: ["TypeScript", "WebGL / Canvas", "React", "Zustand", "Tailwind CSS"],
    outcome: "Delivered a lightning-fast 60FPS spatial web application showcasing creative technology capabilities.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
  },
  {
    id: "monolith-design-system",
    index: "05",
    title: "MONOLITH DESIGN ARCHITECTURE",
    category: "UI/UX & DESIGN SYSTEMS",
    role: "Lead Product Designer & Frontend Architect",
    tagline: "High-contrast monochrome design system with 60+ modular primitives.",
    objective:
      "Establish an uncompromising, utilitarian design language combining optical typography, strict micro-whitespace, and sub-pixel alignment.",
    implementation: [
      "Formulated 3-layer token hierarchy (Primitive → Semantic → Component) in Figma and CSS variables.",
      "Engineered accessible, keyboard-navigable components with Framer Motion physics.",
      "Published living documentation and component playground.",
    ],
    keyFeatures: ["3-Tier Token Scalability", "Zero-Dependency Micro-UI", "Keyboard Accessibility", "Dark-First Theming"],
    technologies: ["Figma", "UI/UX Design", "React", "Framer Motion", "Tailwind CSS"],
    outcome: "Adopted as the foundational visual standard across multiple client web products.",
    githubUrl: "https://github.com/HyMicro",
    liveUrl: "https://github.com/HyMicro",
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-xl mb-4 text-[11px] font-mono tracking-widest text-zinc-300 uppercase shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
              <Gamepad2 size={13} className="text-white" />
              <span>CASE STUDIES & WORKS</span>
            </div>
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
                className={`absolute w-full max-w-4xl p-7 sm:p-10 rounded-2xl border border-white/20 bg-zinc-950/95 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_50px_rgba(0,0,0,0.6)] transition-all ${
                  isTop ? "cursor-grab active:cursor-grabbing hover:border-white/40" : "pointer-events-none"
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
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                currentIndex === idx
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-xl text-[11px] font-mono tracking-widest text-zinc-300 uppercase shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
              <Layers size={13} className="text-white" />
              <span>INTERACTIVE SYSTEM ARCHITECTURE</span>
            </div>
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
