"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "flagship" | "accent" | "violet";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      default: "tech-tag",
      flagship: "px-2.5 py-1 rounded-sm border border-cyan/40 bg-cyan/10 text-cyan text-[10px] font-mono tracking-[0.3em] uppercase",
      accent: "px-2.5 py-1 rounded-sm border border-cyan/40 bg-cyan/10 text-cyan text-xs font-mono",
      violet: "px-2.5 py-1 rounded-sm border border-violet/40 bg-violet/10 text-violet text-xs font-mono",
    };

    return (
      <span ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";