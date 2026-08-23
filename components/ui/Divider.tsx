"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DividerVariant = "bronze" | "gold" | "gold-thick" | "crimson";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: DividerVariant;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant = "bronze", ...props }, ref) => {
    const variants = {
      bronze: "bronze-rule",
      gold: "gold-rule",
      "gold-thick": "gold-rule-thick",
      crimson: "h-px w-full bg-gradient-to-r from-transparent via-crimson/30 to-transparent",
    };

    return (
      <hr ref={ref} className={cn(variants[variant], className)} {...props} aria-hidden="true" />
    );
  }
);

Divider.displayName = "Divider";