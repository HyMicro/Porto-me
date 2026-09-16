import * as React from "react";
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
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between w-full aspect-square max-w-sm cursor-pointer rounded-2xl border border-white/10 bg-zinc-900/90 p-6 sm:p-7 text-zinc-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/30 hover:shadow-xl",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Card Header: Title and Arrow */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1">{title}</h2>
          <ArrowRight className="h-5 w-5 text-zinc-400 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-white shrink-0 ml-2" />
        </div>

        {/* Square Stacked Images */}
        <div className="relative w-full aspect-square max-h-36 sm:max-h-40 overflow-hidden flex items-center justify-center my-auto">
          {images.map((src, index) => (
            <div
              key={index}
              className={cn(
                "absolute aspect-square w-[52%] overflow-hidden rounded-xl border-2 border-zinc-950 shadow-md transition-all duration-300 ease-in-out",
                // On hover, apply transforms using the CSS variables defined in `style`
                "group-hover:translate-x-[var(--tx)] group-hover:rotate-[var(--r)]"
              )}
              style={{
                // Set initial transform for the stacked look
                transform: `translateX(${index * 24}px)`,
                // Define CSS variables for the hover state transforms
                '--tx': `${index * 58}px`,
                '--r': `${index * 6 - 6}deg`,
                zIndex: images.length - index,
              } as React.CSSProperties}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Bottom Metadata Block with Uniform Text Spacing */}
        <div className="space-y-3">
          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-md border border-white/5">
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
