"use client";

import React from "react";
import Image from "next/image";

export interface LogoItem {
  name: string;
  src: string;
}

export const DEFAULT_TECH_LOGOS: LogoItem[] = [
  { name: "Unreal Engine", src: "/Logo/unreal-engine.svg" },
  { name: "C++", src: "/Logo/c-plus-plus.svg" },
  { name: "C#", src: "/Logo/c-sharp-logo.png" },
  { name: "Unity", src: "/Logo/unity.svg" },
  { name: "Figma", src: "/Logo/Figma-logo.svg" },
  { name: "React", src: "/Logo/logo-react.svg" },
  { name: "Next.js", src: "/Logo/nextjs-icon.svg" },
  { name: "Vite", src: "/Logo/vitejs.svg" },
  { name: "Vue", src: "/Logo/vue.svg" },
  { name: "Lua", src: "/Logo/lua.svg" },
  { name: "Rive", src: "/Logo/Rive.png" },
];

interface LogoMarqueeProps {
  logos?: LogoItem[];
  speedInSeconds?: number;
  className?: string;
  title?: string;
}

export function LogoMarquee({
  logos = DEFAULT_TECH_LOGOS,
  speedInSeconds = 28,
  className = "",
  title = "TECHNOLOGIES & TOOLS",
}: LogoMarqueeProps) {
  // Duplicate array 3 times to ensure 100% seamless infinite looping across any screen width
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={`relative w-full py-12 sm:py-16 overflow-hidden border-y border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-black/60 backdrop-blur-xl ${className}`}>
      {/* Optional Section Micro Header */}
      {title && (
        <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-zinc-600 dark:text-zinc-400 uppercase">
            {title}
          </span>
        </div>
      )}

      {/* Marquee Track with Left & Right Gradient Fade Masks */}
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max items-center gap-12 sm:gap-16 will-change-transform animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: `${speedInSeconds}s`,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3 shrink-0 px-3 py-2 rounded-xl transition-all duration-300 group/item hover:scale-110 cursor-pointer"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center filter dark:invert-0 grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={32}
                  height={32}
                  className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <span className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-950 dark:group-hover/item:text-white transition-colors duration-200 whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </section>
  );
}
