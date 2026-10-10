"use client";

import { seriesProfile } from "@/data/series";

/**
 * Natural, realistic framed portrait — true-to-life colors (no color wash),
 * a clean rounded frame with a soft shadow and a faint aurora glow *around*
 * the card (never tinting the face). Reads as a real professional headshot.
 */
export default function PortraitPoster({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border border-white/10 ${className}`}
      style={{ boxShadow: "0 34px 80px -26px rgba(0,0,0,0.7), 0 0 64px -26px rgba(56,207,232,0.45)" }}
    >
      <img
        src={seriesProfile.portrait.src}
        alt={seriesProfile.portrait.alt}
        className="h-full w-full object-cover object-top [filter:contrast(1.02)]"
      />
      {/* inner hairline ring for crispness; no color tint on the photo itself */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[20px]" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
    </div>
  );
}
