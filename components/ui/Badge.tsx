"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "flagship" | "gold" | "crimson";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      default: "tech-tag",
      flagship: "px-2.5 py-1 rounded-sm border border-antique-gold/40 bg-antique-gold/10 text-antique-gold text-[10px] font-mono tracking-[0.3em] uppercase",
      gold: "px-2.5 py-1 rounded-sm border border-antique-gold/40 bg-antique-gold/10 text-antique-gold text-xs font-mono",
      crimson: "px-2.5 py-1 rounded-sm border border-crimson/40 bg-crimson/10 text-crimson text-xs font-mono",
    };

    return (
      <span ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";