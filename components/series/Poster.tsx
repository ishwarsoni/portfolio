"use client";

import { seriesProfile } from "@/data/series";

/**
 * Portrait as a clean, cinematic "key art" poster. The studio-grey background
 * reads as intentional inside a framed card, so no fragile cut-out is needed.
 * Swap public/portrait.png for a transparent cut-out later and it still works.
 */
export default function PortraitPoster({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/12 ${className}`}
      style={{ boxShadow: "0 40px 90px -25px rgba(0,0,0,0.85), 0 0 70px -24px rgba(56,207,232,0.45)" }}
    >
      <img
        src={seriesProfile.portrait.src}
        alt={seriesProfile.portrait.alt}
        className="h-full w-full object-cover object-top [filter:contrast(1.07)_saturate(0.9)_brightness(0.97)]"
      />
      {/* aurora light from the top */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(85% 55% at 50% -5%, rgba(56,207,232,0.22), transparent 60%)" }} />
      {/* violet counter-light from the lower right */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ background: "radial-gradient(60% 50% at 100% 100%, rgba(139,124,246,0.28), transparent 60%)" }} />
      {/* bottom ink scrim so overlaid text / captions stay legible */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5" style={{ background: "linear-gradient(to top, rgba(6,7,11,0.92), transparent)" }} />
      {/* inner hairline ring */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
    </div>
  );
}
