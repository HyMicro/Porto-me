"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface CtaProps {
  ctaEnabled?: boolean;
  text?: string;
  link?: string;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
}

export interface CtaComponentProps {
  cta: CtaProps;
  invert?: boolean;
  className?: string;
}

export function Cta({ cta, invert, className }: CtaComponentProps) {
  if (!cta?.ctaEnabled) return null;

  const content = cta.text || "Learn More";
  const href = cta.link || "#";

  return (
    <a href={href} className={cn("inline-block", className)}>
      <Button
        variant={invert ? "solid" : (cta.variant || "default")}
        size={cta.size || "default"}
        className={cn("cursor-pointer", cta.className)}
      >
        {content}
      </Button>
    </a>
  );
}

export default Cta;
