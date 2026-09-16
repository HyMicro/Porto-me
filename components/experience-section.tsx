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
    role: "Junior Game Programmer",
    company: "Bumi Studio",
    period: "Jan 2026 - Jun 2026",
    location: "Malang, Indonesia",
    type: "Game Studio Intern",
    summary:
      "Collaborated as an Unreal Engine Programmer Intern for 6 months. Developed gameplay mechanics, implemented UI features, built in-game messaging systems, and fixed system bugs.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Implemented UI features and gameplay-related functionality using Unreal Engine 5.",
          "Identified and fixed bugs to improve gameplay functionality and project stability.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Developed a messaging mechanic system and integrated it into the main project workflow.",
          "Collaborated closely with designers and programmers in a team development environment.",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Optimized gameplay interactions and enhanced overall project performance and stability.",
          "Strengthened team communication, workflow integration, and technical problem-solving.",
        ],
      },
    ],
    technologies: ["Unreal Engine 5", "Blueprints", "C++", "Gameplay Programming", "UI Implementation", "Git LFS"],
  },
  {
    id: "social-media-coordinator",
    role: "Social Media Coordinator",
    company: "Infotech UMM",
    period: "Jan 2025 - Mar 2026",
    location: "Malang, Indonesia",
    type: "Laboratory Role",
    summary:
      "Directed and created poster feed designs, Instagram stories, and TikTok media content for Informatics Laboratory events.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Designed promotional posters and social media feed content for Instagram and TikTok.",
          "Created consistent feed poster story design assets for informatics event campaigns.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Produced event design feeds for Informatics Expo, Ghost Runner, and Upgrading UI/UX Event.",
          "Maintained brand identity standards across laboratory social media channels.",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Increased social media reach and student participation for informatics events.",
          "Delivered professional graphic design portfolios for departmental marketing.",
        ],
      },
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Graphic Design", "Social Media"],
  },
  {
    id: "laboratory-assistant",
    role: "Laboratory Assistant",
    company: "Infotech UMM",
    period: "Aug 2023 - Present",
    location: "Malang, Indonesia",
    type: "Full Time Academic",
    summary:
      "Assisted lecturers in practicum activities across multiple computer science courses, provided technical troubleshooting support to students, and evaluated performance.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Assisted lecturers during laboratory sessions across multiple computer science courses.",
          "Provided technical guidance and troubleshooting support to students during practicum sessions.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Guided students through complex technical problem-solving and software setup issues.",
          "Evaluated student performance and provided constructive feedback to enhance learning outcomes.",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Enhanced overall student learning outcomes and practicum session efficiency.",
          "Built strong communication, mentorship, and technical problem-solving skills.",
        ],
      },
    ],
    technologies: ["Computer Science", "Technical Guidance", "Troubleshooting", "Evaluation", "Mentorship"],
  },
  {
    id: "game-jams-incubation",
    role: "Programmer & Game Design",
    company: "Global Game Jam & Game Seed",
    period: "Jan 2025 & July 2025",
    location: "Indonesia",
    type: "Game Competitions",
    summary:
      "Designed core gameplay mechanics and implemented gameplay systems in Unreal Engine during a 48-hour game jam and a 10-day Ministry of Creative Economy incubation program.",
    highlights: [
      {
        label: "RESPONSIBILITIES",
        points: [
          "Programmed core gameplay mechanics in UE5 for Bubble Cuts (GGJ 2025) and 9-to-Fight (Game Seed 2025).",
          "Collaborated with multidisciplinary teams to design game mechanics and deliver playable prototypes.",
        ],
      },
      {
        label: "CONTRIBUTIONS",
        points: [
          "Implemented rhythm action mechanics and top-down comedy shooter interactions.",
          "Iterated rapidly under strict game jam time limits (48 hours & 10 days).",
        ],
      },
      {
        label: "KEY OUTCOMES",
        points: [
          "Successfully delivered playable game prototypes during competitive incubation events.",
          "Demonstrated rapid prototyping ability and cross-functional team collaboration.",
        ],
      },
    ],
    technologies: ["Unreal Engine 5", "Blueprint", "C++", "Game Jam Workflow", "Game Design"],
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
