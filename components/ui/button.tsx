import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 outline-none select-none cursor-pointer overflow-hidden disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Apple Glass Primary
        default:
          "bg-black/10 dark:bg-white/10 text-zinc-950 dark:text-white border border-black/15 dark:border-white/25 backdrop-blur-xl shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.4)] hover:bg-black/20 dark:hover:bg-white/25 hover:border-black/30 dark:hover:border-white/50 hover:scale-[1.02] active:scale-[0.96]",
        
        // Apple Glass Solid Accent
        solid:
          "bg-zinc-950 dark:bg-white text-white dark:text-black font-semibold border border-zinc-800 dark:border-white/40 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.96]",

        // Apple Translucent Glass Outline
        outline:
          "bg-white/80 dark:bg-black/40 text-zinc-900 dark:text-zinc-200 border border-black/15 dark:border-white/15 backdrop-blur-lg hover:bg-black/5 dark:hover:bg-white/15 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/35 hover:scale-[1.02] active:scale-[0.96]",

        // Pure Apple Glass
        glass:
          "bg-black/[0.05] dark:bg-white/[0.07] text-zinc-950 dark:text-white border border-black/15 dark:border-white/20 backdrop-blur-2xl hover:bg-black/10 dark:hover:bg-white/20 hover:border-black/30 dark:hover:border-white/45 hover:scale-[1.02] active:scale-[0.96]",

        secondary:
          "bg-zinc-200/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-300 border border-black/10 dark:border-white/10 hover:bg-zinc-300 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white active:scale-[0.96]",

        ghost:
          "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-sm active:scale-[0.96]",

        link: "text-zinc-950 dark:text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 gap-2",
        xs: "h-7 px-3 text-[10px] rounded-lg gap-1.5",
        sm: "h-9 px-4 text-[11px] rounded-lg gap-1.5",
        lg: "h-13 px-7 text-xs rounded-2xl gap-2.5",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
