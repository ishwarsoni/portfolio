"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DividerVariant = "subtle" | "accent" | "accent-thick" | "violet";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: DividerVariant;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant = "subtle", ...props }, ref) => {
    const variants = {
      subtle: "accent-rule-subtle",
      accent: "accent-rule",
      "accent-thick": "accent-rule-thick",
      violet: "h-px w-full bg-gradient-to-r from-transparent via-violet/30 to-transparent",
    };

    return (
      <hr ref={ref} className={cn(variants[variant], className)} {...props} aria-hidden="true" />
    );
  }
);

Divider.displayName = "Divider";