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
    badge: "CORE DISCIPLINE",
    icon: Gamepad2,
    description: "Gameplay programming, character mechanics, level sequencing, and animation systems in Unreal Engine 5.",
    skills: ["Unreal Engine 5", "Blueprints", "C++", "Gameplay Programming", "Game Mechanics", "Level Sequencing", "Animation Systems"],
  },
  {
    id: "programming",
    title: "Systems & Programming",
    badge: "TECHNICAL SKILLS",
    icon: Terminal,
    description: "Object-oriented code, version control pipelines, and modern web application development.",
    skills: ["C++", "Git", "Git LFS", "Python", "HTML", "CSS", "Vue.js", "React"],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    badge: "HUMAN-CENTERED",
    icon: Layers,
    description: "Interactive experiences, wireframes, component design systems, and high-fidelity Figma prototypes.",
    skills: ["UI/UX Design", "Figma", "UI Implementation", "Interactive Experiences", "User Interfaces"],
  },
  {
    id: "creative-visual",
    title: "Graphic & Creative Design",
    badge: "VISUAL ARTS",
    icon: Eye,
    description: "Brand identity logos, 3D modeling assets, and social media feed poster story design.",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Blender", "Logo Design", "Social Media Feed Design"],
  },
];

export function AboutSkillsSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-8 border-t border-black/10 dark:border-white/10 overflow-hidden">
      {/* Background ambient spotlight */}
      <div
        className="absolute top-1/3 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4 uppercase">
            ABOUT & TECHNICAL SKILLS
          </h2>
          <blockquote className="border-l-2 border-zinc-400 dark:border-white/30 pl-4 py-1 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 italic font-normal leading-relaxed mb-6">
            &ldquo;Hi, I&apos;m Ahyad Izzuddin Syuhaiba, an Informatics student passionate about game development. Passionate Unreal Engine Gameplay Programmer with experience developing gameplay systems, UI mechanics, and interactive experiences. I enjoy building scalable game mechanics and collaborating with multidisciplinary teams to deliver immersive gameplay.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Computer Science graduate with experience in <span className="text-zinc-900 dark:text-zinc-200 font-medium">Unreal Engine development</span>, <span className="text-zinc-900 dark:text-zinc-200 font-medium">UI/UX design</span>, and <span className="text-zinc-900 dark:text-zinc-200 font-medium">graphic design</span>. Skilled in combining technical and creative skills to develop functional, intuitive, and engaging digital experiences.
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
                className="group relative p-6 sm:p-7 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:border-black/20 dark:hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.05] text-zinc-900 dark:text-white">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">{cat.title}</h3>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-zinc-600 dark:text-zinc-400 uppercase px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                      {cat.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mb-5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-300 group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors"
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
