"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: {
    label: string;
    points: string[];
  }[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bumi-studio",
    role: "Unreal Engine Programmer",
    company: "Bumi Studio",
    period: "Studio Role",
    location: "Indonesia",
    type: "Game Studio",
    summary:
      "Engineered gameplay mechanics, character controllers, and diegetic UMG/Slate interfaces in Unreal Engine 5 for studio game projects.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Developed core gameplay mechanics & character controls (C++ & Blueprint).",
          "Collaborated with 3D animators & designers on level sequences & interactions.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Built modular combat & interaction frameworks for rapid level iteration.",
          "Integrated dynamic UMG/Slate interfaces synchronized with gameplay states.",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Delivered stable 60fps gameplay builds with optimized logic subsystems.",
          "Accelerated studio production pipeline between art assets and technical logic.",
        ],
      },
    ],
    technologies: ["Unreal Engine 5", "C++", "Blueprint", "UMG / Slate", "Gameplay Logic", "Git"],
  },
  {
    id: "consulting",
    role: "UI/UX & Creative Technologist",
    company: "Select Client Projects",
    period: "Freelance & Consulting",
    location: "Remote",
    type: "Digital Systems",
    summary:
      "Architected interactive web apps, modular design systems, and high-fidelity Figma prototypes for creative digital products.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Translated product requirements into accessible design systems.",
          "Engineered high-performance React/Next.js interfaces with micro-animations.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Designed 60+ modular component tokens and layout architectures in Figma.",
          "Built custom WebGL/Canvas interactive elements for product showcases.",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Delivered responsive, production-ready frontend codebases with high usability.",
          "Unified brand visual identity across digital touchpoints.",
        ],
      },
    ],
    technologies: ["Figma", "UI/UX Systems", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background spotlight */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"
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
            EXPERIENCE & TIMELINE
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Studio contributions and technical consulting structured by <span className="text-zinc-200 font-medium">Role &rarr; Contribution &rarr; Outcome</span>.
          </p>
        </motion.div>

        {/* Streamlined Cards */}
        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-white/25 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-5 gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                    <span className="text-xs font-mono text-zinc-500">@</span>
                    <span className="text-sm sm:text-base font-semibold text-zinc-200">{exp.company}</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {exp.location} • {exp.type}
                  </p>
                </div>

                <div className="self-start sm:self-auto px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[11px] font-mono text-zinc-300">
                  {exp.period}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6">
                {exp.summary}
              </p>

              {/* 3-Column Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
                {exp.highlights.map((hl, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-4 rounded-lg border border-white/5 bg-white/[0.015] flex flex-col"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold mb-2.5">
                      {hl.label}
                    </span>
                    <ul className="space-y-2 text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
                      {hl.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-zinc-500 font-mono mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.04] border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
