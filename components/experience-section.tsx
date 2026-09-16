"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Image as ImageIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  imageUrl: string;
  imageCaption: string;
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
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    imageCaption:
      "Unreal Engine 5 Gameplay Subsystem & Phone Messaging UMG UI Architecture at Bumi Studio",
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
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    imageCaption:
      "Promotional Instagram & TikTok Feed Poster Assets for Informatics Expo & Ghost Runner Events",
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
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    imageCaption:
      "Computer Science Practicum Session Guidance, Software Setup & Technical Mentorship",
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
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    imageCaption:
      "Game Seed 2025 Ministry Incubation Sprint & GGJ 2025 48-Hour Rapid Prototyping Jam",
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
            Studio contributions and technical consulting structured by{" "}
            <span className="text-zinc-200 font-medium">Role &rarr; Contribution &rarr; Outcome</span>.
          </p>
        </motion.div>

        {/* Interactive Accordion for All Experience Cards */}
        <Accordion type="single" collapsible defaultValue="bumi-studio" className="w-full space-y-5">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AccordionItem
                value={exp.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-white/25 transition-all duration-300 px-5 sm:px-8 py-2 overflow-hidden"
              >
                {/* Accordion Trigger (Header Bar) */}
                <AccordionTrigger className="py-4 hover:no-underline flex flex-wrap items-center justify-between text-left gap-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500">@</span>
                      <span className="text-sm sm:text-base font-semibold text-zinc-200">
                        {exp.company}
                      </span>
                    </div>
                    <span className="inline-block text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/10 w-fit">
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-md border border-white/10">
                      {exp.period}
                    </span>
                  </div>
                </AccordionTrigger>

                {/* Accordion Content (Full Card Details + Highlights + Image + Tech Stack) */}
                <AccordionContent className="pt-2 pb-6 space-y-6 text-zinc-300 border-t border-white/10 font-sans">
                  {/* Summary */}
                  <div className="pt-3">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {exp.summary}
                    </p>
                  </div>

                  {/* 3-Column Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
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

                  {/* Visual Image Deliverable Artifact */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                      <ImageIcon className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Technical Deliverables & Visual Artifact Showcase</span>
                    </span>
                    <div className="relative rounded-xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group">
                      <img
                        src={exp.imageUrl}
                        alt={exp.imageCaption}
                        className="w-full h-52 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[11px] font-mono text-zinc-200 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 shadow-md">
                          {exp.imageCaption}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-zinc-500 block mb-2 uppercase tracking-wider">Technologies Used</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/[0.04] border border-white/10 text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
