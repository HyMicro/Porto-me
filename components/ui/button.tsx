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
          "bg-white/10 text-white border border-white/25 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.4)] hover:bg-white/25 hover:border-white/50 hover:scale-[1.02] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_12px_28px_rgba(255,255,255,0.15)] active:scale-[0.96] active:bg-white/35 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
        
        // Apple Glass Solid Accent (White frosted)
        solid:
          "bg-white text-black font-semibold border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_20px_rgba(0,0,0,0.4)] hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(255,255,255,0.25)] active:scale-[0.96] active:bg-zinc-300",

        // Apple Translucent Glass Outline
        outline:
          "bg-black/40 text-zinc-200 border border-white/15 backdrop-blur-lg shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] hover:bg-white/15 hover:text-white hover:border-white/35 hover:scale-[1.02] hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),0_8px_24px_rgba(0,0,0,0.5)] active:scale-[0.96] active:bg-white/25",

        // Pure Apple Glass
        glass:
          "bg-white/[0.07] text-white border border-white/20 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/20 hover:border-white/45 hover:scale-[1.02] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_16px_36px_rgba(255,255,255,0.18)] active:scale-[0.96] active:bg-white/30",

        secondary:
          "bg-zinc-900/80 text-zinc-300 border border-white/10 hover:bg-white/10 hover:text-white active:scale-[0.96]",

        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/10 backdrop-blur-sm active:scale-[0.96]",

        link: "text-white underline-offset-4 hover:underline",
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
