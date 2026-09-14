"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface StaggeredLetterMenuItemProps {
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function StaggeredLetterMenuItem({
  label,
  isActive = false,
  className = "",
  onClick,
}: StaggeredLetterMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = label.split("");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative inline-block overflow-hidden cursor-pointer select-none py-1 px-1.5 ${className}`}
    >
      {/* 1. Base Layer Letters (Exits downward when hovered) */}
      <div className="flex items-center" aria-hidden={isHovered}>
        {letters.map((char, i) => (
          <motion.span
            key={`base-${i}`}
            initial={false}
            animate={
              isHovered
                ? {
                    y: "120%",
                    opacity: 0,
                    rotate: i % 2 === 0 ? -10 : 10,
                    filter: "blur(2px)",
                  }
                : {
                    y: "0%",
                    opacity: isActive ? 1 : 0.75,
                    rotate: 0,
                    filter: "blur(0px)",
                  }
            }
            transition={{
              duration: 0.25,
              delay: i * 0.02,
              ease: [0.32, 0, 0.67, 0],
            }}
            className={`inline-block font-mono tracking-wider transition-colors duration-200 ${
              isActive ? "text-white font-medium" : "text-zinc-400 group-hover:text-white"
            } ${char === " " ? "w-2" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* 2. Top Animated Layer Letters (Drops in from above with scatter & settle physics) */}
      <div className="absolute inset-0 flex items-center px-1.5 pointer-events-none" aria-hidden={!isHovered}>
        {letters.map((char, i) => {
          // Subtle organic scatter offset per letter index
          const scatterX = (i % 2 === 0 ? -6 : 6) * Math.sin((i + 1) * 1.3);
          const scatterRotate = (i % 2 === 0 ? 14 : -14) * Math.cos((i + 1) * 0.9);

          return (
            <motion.span
              key={`drop-${i}`}
              initial={false}
              animate={
                isHovered
                  ? {
                      y: "0%",
                      x: 0,
                      opacity: 1,
                      rotate: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }
                  : {
                      y: "-130%",
                      x: scatterX,
                      opacity: 0,
                      rotate: scatterRotate,
                      filter: "blur(4px)",
                      scale: 1.15,
                    }
              }
              transition={{
                duration: 0.42,
                delay: isHovered ? i * 0.038 : 0,
                ease: [0.175, 0.885, 0.32, 1.25], // Custom overshoot spring curve
              }}
              className={`inline-block font-mono font-semibold tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] ${
                char === " " ? "w-2" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
