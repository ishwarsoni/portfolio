"use client";

import { seriesProfile } from "@/data/series";

/**
 * Cinematic portrait that bleeds into the dark UI — like a streaming billboard
 * still, not a framed card. The subject's own dark studio background melts into
 * the ink via gradient scrims; a faint aurora tint keeps it on-brand.
 * The caller sizes/positions the container; `edges` picks which sides fade out.
 */
export default function PortraitPoster({
  className = "",
  edges = "bottom",
}: {
  className?: string;
  edges?: "bottom" | "all";
}) {
  const ink = "#06070b";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={seriesProfile.portrait.src}
        alt={seriesProfile.portrait.alt}
        className="h-full w-full object-cover object-top [filter:contrast(1.04)_saturate(1.02)]"
      />
      {/* aurora grade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: "linear-gradient(150deg, rgba(56,207,232,0.35), transparent 45%, rgba(139,124,246,0.35))" }}
      />
      {/* bottom fade into ink */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]" style={{ background: `linear-gradient(to top, ${ink}, ${ink}cc 22%, transparent)` }} />
      {/* top fade */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22%]" style={{ background: `linear-gradient(to bottom, ${ink}, transparent)` }} />
      {edges === "all" && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[28%]" style={{ background: `linear-gradient(to right, ${ink}, transparent)` }} />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[28%]" style={{ background: `linear-gradient(to left, ${ink}, transparent)` }} />
        </>
      )}
    </div>
  );
}
