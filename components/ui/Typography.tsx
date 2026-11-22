"use client";

import { forwardRef, HTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/utils";

type TypographyVariant = 
  | "display" 
  | "h1" 
  | "h2" 
  | "h3" 
  | "body-lg" 
  | "body" 
  | "small" 
  | "micro" 
  | "eyebrow" 
  | "lead" 
  | "mono";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  display: "font-serif text-[clamp(3.5rem,8vw,6rem)] leading-[1.0] tracking-[0.02em] text-bone",
  h1: "font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-[0.01em] text-bone",
  h2: "font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-bone",
  h3: "font-serif text-xl leading-[1.3] text-bone",
  "body-lg": "font-sans text-[1.125rem] leading-[1.65] text-mist",
  body: "font-sans text-[1rem] leading-[1.65] text-mist",
  small: "font-sans text-[0.875rem] leading-[1.6] text-mist",
  micro: "font-mono text-[0.75rem] leading-[1.5] text-smoke",
  eyebrow: "font-mono text-[0.6875rem] tracking-[0.35em] uppercase text-mist",
  lead: "font-serif text-[1.125rem] leading-[1.7] italic text-mist",
  mono: "font-mono text-[0.875rem] leading-[1.5] text-mist",
};

const elementTags: Record<TypographyVariant, string> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "body-lg": "p",
  body: "p",
  small: "p",
  micro: "span",
  eyebrow: "span",
  lead: "p",
  mono: "span",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as: Component, children, ...props }, ref) => {
    const Tag = (Component || elementTags[variant]) as ElementType;
    
    return (
      <Tag ref={ref} className={cn(variantStyles[variant], className)} {...props}>
        {children}
      </Tag>
    );
  }
);

Typography.displayName = "Typography";