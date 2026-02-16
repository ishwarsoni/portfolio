import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
}

export const Section = ({ id, className, children }: SectionProps) => {
    return (
        <section id={id} className={cn("py-12 md:py-20", className)}>
            {children}
        </section>
    );
};
