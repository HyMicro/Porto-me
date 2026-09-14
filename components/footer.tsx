"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black py-12 px-6 sm:px-8 overflow-hidden">
      {/* Connecting Top Ambient Light Glow from Contact Section */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-28 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.08)_0%,transparent_75%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left copyright and credits */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            © {new Date().getFullYear()} AHYAD IZZUDDIN SYUHAIBA
          </span>
          <span className="hidden sm:inline text-zinc-700 font-mono">•</span>
          <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
            GAME DEV • PROGRAMMING • UI/UX DESIGN
          </span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-950/60 hover:bg-white hover:text-black hover:border-white text-zinc-400 transition-all text-xs font-mono tracking-wider uppercase cursor-pointer"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
