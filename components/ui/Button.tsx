"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps extends BaseButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, children, href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-none font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-void";

    const variants: Record<ButtonVariant, string> = {
      primary: "btn-primary",
      ghost: "btn-ghost",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "px-6 py-3 text-sm tracking-[0.2em] uppercase",
      sm: "px-4 py-2 text-xs tracking-[0.2em] uppercase",
      lg: "px-8 py-4 text-base tracking-[0.15em] uppercase",
    };

    const isLink = asChild && href;
    const Comp = isLink ? "a" : "button";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buttonProps: any = {
      ref,
      className: cn(baseStyles, variants[variant], sizes[size], className),
      ...props,
    };

    if (isLink) {
      buttonProps.href = href;
    }

    return (
      <Comp {...buttonProps}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";