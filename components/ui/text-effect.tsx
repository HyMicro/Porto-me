"use client";

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  rotateY?: number;
  scale?: number;
  opacity?: number;
  onAnimationComplete?: () => void;
};

function SamsungHelloVietnameseEffect({
  className,
  speed = 1,
  rotateY = -15,
  scale = 0.7,
  opacity = 0,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity,
    scale,
    rotateY,
  };

  const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  };

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      {...props}
    >
      <title>xin chào - Samsung Bold Tech Style</title>

      {/* x - Angular geometric X shape */}
      <motion.g>
        <motion.path
          d="M40 80L90 130L140 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M140 80L90 130L40 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: {
              duration: 0.5,
              delay: calc(0.2),
              type: "spring",
              stiffness: 200,
            },
          }}
        />
      </motion.g>

      {/* i - Tech vertical line with geometric dot */}
      <motion.g>
        <motion.path
          d="M200 90L200 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.8),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(0.8) },
            scale: { duration: 0.4, delay: calc(0.8) },
          }}
        />
        <motion.rect
          x="192"
          y="60"
          width="16"
          height="16"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, pathLength: 1 }}
          animate={{ ...animateProps, pathLength: 1 }}
          transition={{
            duration: calc(0.3),
            delay: calc(1.2),
            type: "spring",
            stiffness: 400,
            opacity: { duration: 0.2, delay: calc(1.2) },
            scale: { duration: 0.3, delay: calc(1.2) },
          }}
        />
      </motion.g>

      {/* n - Angular tech style with sharp turns */}
      <motion.path
        d="M250 180L250 90L290 90L330 130L330 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(1.5),
          type: "spring",
          stiffness: 180,
          damping: 15,
          opacity: { duration: 0.4, delay: calc(1.5) },
          scale: { duration: 0.6, delay: calc(1.5) },
        }}
      />

      {/* c - Geometric C shape with sharp corners */}
      <motion.path
        d="M430 120L390 90L390 180L430 150"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 220,
          damping: 16,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.5, delay: calc(2.3) },
        }}
      />

      {/* h - Bold Samsung tech H with angular connection */}
      <motion.g>
        <motion.path
          d="M520 60L520 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.0),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.0) },
            scale: { duration: 0.4, delay: calc(3.0) },
          }}
        />
        <motion.path
          d="M520 125L580 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(3.3),
            type: "spring",
            stiffness: 320,
            damping: 20,
            opacity: { duration: 0.25, delay: calc(3.3) },
            scale: { duration: 0.35, delay: calc(3.3) },
          }}
        />
        <motion.path
          d="M580 60L580 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.6),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.6) },
            scale: { duration: 0.4, delay: calc(3.6) },
          }}
        />
      </motion.g>

      {/* à - Geometric A with angular accent */}
      <motion.g>
        <motion.path
          d="M650 180L680 90L710 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.7),
            ease: "easeInOut",
            delay: calc(4.2),
            type: "spring",
            stiffness: 200,
            damping: 16,
            opacity: { duration: 0.35, delay: calc(4.2) },
            scale: { duration: 0.5, delay: calc(4.2) },
          }}
        />
        <motion.path
          d="M665 140L695 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeOut",
            delay: calc(4.6),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.25, delay: calc(4.6) },
            scale: { duration: 0.35, delay: calc(4.6) },
          }}
        />
        {/* Angular accent mark */}
        <motion.path
          className="stroke-blue-400"
          d="M700 50L720 30"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, filter: "blur(3px)" }}
          animate={{ ...animateProps, filter: "blur(0px)" }}
          transition={{
            duration: calc(0.4),
            delay: calc(4.9),
            type: "spring",
            stiffness: 350,
            opacity: { duration: 0.3, delay: calc(4.9) },
            scale: { duration: 0.3, delay: calc(4.9) },
            filter: { duration: 0.6, delay: calc(4.9) },
          }}
        />
      </motion.g>

      {/* o - Geometric diamond-like O */}
      <motion.path
        d="M780 90L820 110L820 160L780 180L760 160L760 110L780 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.9),
          ease: "easeInOut",
          delay: calc(5.3),
          type: "spring",
          stiffness: 160,
          damping: 14,
          opacity: { duration: 0.45, delay: calc(5.3) },
          scale: { duration: 0.65, delay: calc(5.3) },
        }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Futuristic accent lines */}
      <motion.g className="stroke-cyan-400 opacity-60">
        <motion.path
          d="M50 50L1350 50"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M50 220L1350 220"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.2),
            ease: "easeOut",
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

function SamsungHelloEnglishEffect({
  className,
  speed = 1,
  rotateY = -15,
  scale = 0.7,
  opacity = 0,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity,
    scale,
    rotateY,
  };

  const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  };

  return (
    <motion.svg
      className={cn("h-28", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
      {...props}
    >
      <title>hello - Samsung Bold Tech Style</title>

      {/* h - Bold angular H with tech styling */}
      <motion.g>
        <motion.path
          d="M40 60L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
          }}
        />
        <motion.path
          d="M40 125L100 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(0.3),
            type: "spring",
            stiffness: 320,
            damping: 22,
            opacity: { duration: 0.25, delay: calc(0.3) },
            scale: { duration: 0.35, delay: calc(0.3) },
          }}
        />
        <motion.path
          d="M100 60L100 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.6),
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.6) },
            scale: { duration: 0.4, delay: calc(0.6) },
          }}
        />
      </motion.g>

      {/* e - Geometric E with sharp edges */}
      <motion.g>
        <motion.path
          d="M150 60L150 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(1.0),
            type: "spring",
            stiffness: 260,
            damping: 19,
            opacity: { duration: 0.3, delay: calc(1.0) },
            scale: { duration: 0.4, delay: calc(1.0) },
          }}
        />
        <motion.path
          d="M150 60L210 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.3),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.3) },
            scale: { duration: 0.35, delay: calc(1.3) },
          }}
        />
        <motion.path
          d="M150 125L190 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.6),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.6) },
            scale: { duration: 0.35, delay: calc(1.6) },
          }}
        />
        <motion.path
          d="M150 190L210 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.9),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.9) },
            scale: { duration: 0.35, delay: calc(1.9) },
          }}
        />
      </motion.g>

      {/* l - Tech vertical line */}
      <motion.path
        d="M260 60L260 190L300 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.45, delay: calc(2.3) },
        }}
      />

      {/* l - Second tech vertical line */}
      <motion.path
        d="M340 60L340 190L380 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.8),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.8) },
          scale: { duration: 0.45, delay: calc(2.8) },
        }}
      />

      {/* o - Geometric diamond-style O */}
      <motion.path
        d="M450 90L490 110L490 170L450 190L420 170L420 110L450 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(3.3),
          type: "spring",
          stiffness: 180,
          damping: 16,
          opacity: { duration: 0.4, delay: calc(3.3) },
          scale: { duration: 0.6, delay: calc(3.3) },
        }}
      />

      {/* Tech accent elements */}
      <motion.g className="stroke-blue-500 opacity-70">
        {/* Corner brackets for tech aesthetic */}
        <motion.path
          d="M20 40L20 20L40 20"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 40L520 20L520 40"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.2),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M20 210L20 230L40 230"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.4),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 210L520 230L520 210"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.6),
            ease: "easeOut",
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}

/**
 * Samsung Bold Tech Effect for Custom Text / Name ("AHYAD IZZUDDIN S")
 */
function SamsungTechNameEffect({
  name = "AHYAD IZZUDDIN S",
  className,
  speed = 0.5,
  onAnimationComplete,
  ...props
}: Props & { name?: string }) {
  const calc = (x: number) => x * speed;

  return (
    <motion.div
      className={cn("relative flex flex-col items-center justify-center text-center", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        className="w-full max-w-4xl h-36 sm:h-44 md:h-52 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 240"
        fill="none"
        stroke="currentColor"
      >
        {/* Futuristic Corner Brackets */}
        <motion.g className="stroke-blue-400 opacity-80" strokeWidth="4">
          <motion.path
            d="M 40 40 L 40 10 L 100 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: calc(0.8), ease: "easeOut" }}
          />
          <motion.path
            d="M 1160 40 L 1160 10 L 1100 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: calc(0.8), delay: calc(0.2), ease: "easeOut" }}
          />
          <motion.path
            d="M 40 200 L 40 230 L 100 230"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: calc(0.8), delay: calc(0.4), ease: "easeOut" }}
          />
          <motion.path
            d="M 1160 200 L 1160 230 L 1100 230"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: calc(0.8), delay: calc(0.6), ease: "easeOut" }}
          />
        </motion.g>

        {/* Top & Bottom Accent Laser Lines */}
        <motion.path
          d="M 120 18 L 1080 18"
          stroke="#38bdf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(1.4), delay: calc(0.3), ease: "easeInOut" }}
        />
        <motion.path
          d="M 120 222 L 1080 222"
          stroke="#38bdf8"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(1.4), delay: calc(0.5), ease: "easeInOut" }}
        />

        {/* SVG Animated Text Stroke & Fill */}
        <motion.text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="font-mono text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase font-extrabold fill-white"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ strokeDasharray: 400, strokeDashoffset: 400, opacity: 0, scale: 0.85 }}
          animate={{ strokeDashoffset: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: calc(1.8),
            delay: calc(0.2),
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={onAnimationComplete}
        >
          {name}
        </motion.text>
      </svg>
    </motion.div>
  );
}

export { SamsungHelloEnglishEffect, SamsungHelloVietnameseEffect, SamsungTechNameEffect };

export default SamsungHelloVietnameseEffect;
