"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "standard" | "wide" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "standard", children, ...props }, ref) => {
    const sizes = {
      narrow: "container-narrow",
      standard: "container-standard",
      wide: "container-wide",
      full: "container-full",
    };

    return (
      <div ref={ref} className={cn(sizes[size], className)} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";