"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

interface LoadingScreenProps {
  onComplete?: () => void;
  name?: string;
  texts?: string[];
}

export function LoadingScreen({
  onComplete,
  name,
  texts,
}: LoadingScreenProps) {
  const [isDone, setIsDone] = useState(false);
  const [fontSize, setFontSize] = useState("96px");

  const displayTexts =
    texts ||
    (name ? [name] : ["AHYAD IZZUDDIN"]);

  // Calculate responsive font size for canvas particle vaporization
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setFontSize("46px");
      } else if (width < 768) {
        setFontSize("68px");
      } else if (width < 1200) {
        setFontSize("92px");
      } else {
        setFontSize("110px");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Reveal after ~2.8s of particle vaporization
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) {
        onComplete();
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleCycle = (count: number) => {
    if (count >= 1 && !isDone) {
      setTimeout(() => {
        setIsDone(true);
        if (onComplete) {
          onComplete();
        }
      }, 400);
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.08,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto overflow-hidden px-4"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)]"
            aria-hidden="true"
          />

          {/* Scaled Vapour Particle Canvas Effect Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-64 sm:h-80 md:h-96 flex items-center justify-center transform-gpu"
          >
            <VaporizeTextCycle
              texts={displayTexts}
              font={{
                fontFamily: "Inter, var(--font-geist-sans), sans-serif",
                fontSize: fontSize,
                fontWeight: 700,
              }}
              color="rgb(255, 255, 255)"
              spread={6}
              density={7.5}
              animation={{
                vaporizeDuration: 1.8,
                fadeInDuration: 0.8,
                waitDuration: 0.4,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
              onCycleComplete={handleCycle}
            />
          </motion.div>

          {/* Minimalist Hairline Progress Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[1.5px] bg-zinc-900 overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
