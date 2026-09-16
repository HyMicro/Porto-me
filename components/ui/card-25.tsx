import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Prop types remain the same
export interface Stat {
  icon: React.ReactNode;
  label: string;
}

export interface AnimatedHikeCardProps {
  title: string;
  images: string[];
  stats: Stat[];
  description: string;
  href?: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

export const AnimatedHikeCard = React.forwardRef<
  HTMLAnchorElement,
  AnimatedHikeCardProps
>(({ title, images, stats, description, href = "#", className, onClick }, ref) => {
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between w-full min-h-[460px] sm:min-h-[480px] max-w-sm cursor-pointer rounded-2xl border border-white/10 bg-zinc-900/90 p-6 text-zinc-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/30 hover:shadow-xl overflow-hidden",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        {/* Card Header: Title and Arrow */}
        <div className="flex items-center justify-between pb-1 z-20">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1">{title}</h2>
          <ArrowRight className="h-5 w-5 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-white shrink-0 ml-2" />
        </div>

        {/* Floating Poker Card Deck Stack Container */}
        <div className="relative w-full h-52 sm:h-56 flex items-center justify-center my-1">
          {images.map((src, index) => {
            // Poker deck relative depth (0 = top/front, 1 = right/back, 2 = left/back)
            const depth = (index - activeCardIndex + images.length) % images.length;
            const isTop = depth === 0;
            const isRight = depth === 1;
            const isLeft = depth === 2;

            let xOffset = isTop ? 0 : isRight ? 34 : -34;
            let rotateAngle = isTop ? 0 : isRight ? 9 : -9;
            let scaleVal = isTop ? 1 : isRight ? 0.92 : 0.86;
            let opacityVal = isTop ? 1 : isRight ? 0.88 : 0.72;

            // Hover fan-out expansion
            if (isHovered) {
              if (isRight) {
                xOffset = 52;
                rotateAngle = 13;
              } else if (isLeft) {
                xOffset = -52;
                rotateAngle = -13;
              }
            }

            return (
              <motion.div
                key={src}
                animate={{
                  x: xOffset,
                  rotate: rotateAngle,
                  scale: scaleVal,
                  opacity: opacityVal,
                  zIndex: 10 - depth,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                }}
                className="absolute aspect-[4/3] w-[68%] sm:w-[72%] overflow-hidden rounded-xl border-2 border-zinc-950 shadow-[0_12px_32px_rgba(0,0,0,0.8)] pointer-events-none bg-zinc-950"
              >
                <img
                  src={src}
                  alt={`${title} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Metadata Block with Clear Separation */}
        <div className="space-y-3 pt-1 z-20">
          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-300">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-1 bg-zinc-950/80 px-2.5 py-1 rounded-md border border-white/10 text-[11px] font-mono shadow-sm">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-sans line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
});

AnimatedHikeCard.displayName = "AnimatedHikeCard";
