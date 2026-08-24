"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export type ButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, children, href, target, rel, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-none font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-void touch-manipulation cursor-pointer";

    const variants: Record<ButtonVariant, string> = {
      primary: "btn-primary",
      ghost: "btn-ghost",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "px-6 py-3 text-sm tracking-[0.2em] uppercase",
      sm: "px-4 py-2 text-xs tracking-[0.2em] uppercase",
      lg: "px-8 py-4 text-base tracking-[0.15em] uppercase",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ...props,
        ...child.props,
        className: cn(combinedClassName, child.props.className),
        ref,
      });
    }

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={combinedClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";