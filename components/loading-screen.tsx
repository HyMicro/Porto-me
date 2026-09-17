"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UniqueLoading from "@/components/ui/morph-loading";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) {
        onComplete();
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.05,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto overflow-hidden px-4"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]"
            aria-hidden="true"
          />

          {/* Morph Loading Animation Container */}
          <div className="relative flex items-center justify-center">
            <UniqueLoading variant="morph" size="lg" className="w-28 h-28" />
          </div>

          {/* Minimalist Hairline Progress Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-[1.5px] bg-zinc-900 overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
