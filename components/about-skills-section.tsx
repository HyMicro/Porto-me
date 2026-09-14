"use client";

import { motion } from "framer-motion";
import { Eye, Gamepad2, Layers, Terminal, UserCheck } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "game-dev",
    title: "Game Development",
    badge: "PRIMARY FOCUS",
    icon: Gamepad2,
    description: "Gameplay programming, combat mechanics, and diegetic UI architecture in Unreal Engine 5.",
    skills: ["Unreal Engine 5.6", "Gameplay Programming", "Blueprint & C++", "Combat Systems", "Game UI (UMG/Slate)"],
  },
  {
    id: "programming",
    title: "Systems & Programming",
    badge: "ENGINEERING",
    icon: Terminal,
    description: "Low-level logic, tool automation, and modular software architectures.",
    skills: ["C++ Architecture", "Blueprint Scripting", "Python Automation", "TypeScript / Next.js", "Git & Debugging"],
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    badge: "HUMAN-CENTERED",
    icon: Layers,
    description: "Design systems, wireframes, and high-fidelity interactive prototypes.",
    skills: ["UI/UX Design", "Figma Prototyping", "Design Systems", "Visual Hierarchy", "Micro-Interactions"],
  },
  {
    id: "creative-visual",
    title: "Visual & Technical Art",
    badge: "AESTHETICS",
    icon: Eye,
    description: "Brand identity, motion graphics, and technical art integration.",
    skills: ["Graphic Design", "Brand Systems", "Motion Design", "Visual Direction", "Technical Art"],
  },
];

export function AboutSkillsSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background ambient spotlight */}
      <div
        className="absolute top-1/3 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            BRIDGING CODE & VISUAL CRAFT
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Computer Science background focused on <span className="text-zinc-200 font-medium">Unreal Engine gameplay programming</span> and <span className="text-zinc-200 font-medium">UI/UX design systems</span>. Building cohesive digital experiences where systems logic and interface aesthetics operate in harmony.
          </p>
        </motion.div>

        {/* Minimalist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 sm:p-7 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-white/15 bg-white/[0.05] text-white">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{cat.title}</h3>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                      {cat.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono mb-5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.04] border border-white/10 text-zinc-300 group-hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
