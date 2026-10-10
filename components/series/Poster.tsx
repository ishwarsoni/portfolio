"use client";

import { seriesProfile } from "@/data/series";

/**
 * Cinematic portrait that blends into the dark UI like the reference site —
 * full-bleed with soft ink gradients melting every edge into the background,
 * but with the photo's own natural colors (no color wash / no AI-looking tint).
 * The caller sizes/positions the container.
 */
export default function PortraitPoster({ className = "" }: { className?: string }) {
  const ink = "#06070b";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={seriesProfile.portrait.src}
        alt={seriesProfile.portrait.alt}
        className="h-full w-full object-cover object-top [filter:contrast(1.03)_saturate(1.02)]"
      />
      {/* ink edge fades — melt into the dark UI (reference style), true colors kept */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]" style={{ background: `linear-gradient(to top, ${ink}, ${ink}aa 32%, transparent)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[14%]" style={{ background: `linear-gradient(to bottom, ${ink}, transparent)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[20%]" style={{ background: `linear-gradient(to right, ${ink}, transparent)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[20%]" style={{ background: `linear-gradient(to left, ${ink}, transparent)` }} />
    </div>
  );
}
