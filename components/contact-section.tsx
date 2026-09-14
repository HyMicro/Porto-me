"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MessageSquareCode } from "lucide-react";

// Clean, precise SVG primitives for social icons
function GithubIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function DribbbleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  username: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    name: "Email",
    url: "mailto:izzaahyad03@gmail.com",
    icon: Mail,
    username: "izzaahyad03@gmail.com",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/HyMicro",
    icon: GithubIcon,
    username: "@HyMicro",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ahyad/",
    icon: LinkedinIcon,
    username: "in/ahyad",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/izzaaahyad",
    icon: InstagramIcon,
    username: "@izzaaahyad",
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com",
    icon: DribbbleIcon,
    username: "ahyad",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 py-28 sm:py-36 px-6 sm:px-8 border-t border-white/10 overflow-hidden bg-black text-white"
    >
      {/* Background Connecting Ambient Light Beam */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-64 bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,rgba(255,255,255,0.09)_0%,transparent_70%)] blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Ambient center beam */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10 pointer-events-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Get in Touch
        </motion.h2>

        {/* Concise Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-12"
        >
          Open for Unreal Engine programming roles, game studio collaborations, UI/UX systems design, and creative engineering partnerships worldwide.
        </motion.p>

        {/* Circular Social Media Icon Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative z-40 pointer-events-auto"
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            const isMailto = link.url.startsWith("mailto:");
            return (
              <a
                key={link.id}
                href={link.url}
                target={isMailto ? undefined : "_blank"}
                rel={isMailto ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                className="group relative z-40 pointer-events-auto flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/[0.08] text-zinc-200 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-110 hover:shadow-[0_12px_28px_rgba(255,255,255,0.3)] active:scale-95 active:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />

                {/* Hover Tooltip */}
                <span className="pointer-events-none absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono tracking-widest text-zinc-400 whitespace-nowrap uppercase">
                  {link.name}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* Direct Email Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 pt-8 border-t border-white/10 w-full max-w-sm relative z-30 pointer-events-auto"
        >
          <a
            href="mailto:izzaahyad03@gmail.com"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer relative z-30 pointer-events-auto p-2"
          >
            <span>izzaahyad03@gmail.com</span>
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
