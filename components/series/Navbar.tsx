"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sectionMeta, viewerProfiles, seriesProfile, type ProfileId, type SectionId } from "@/data/series";
import { useSmoothScroll } from "./hooks/smoothScroll";
import { EASE } from "./fx";

export default function Navbar({ order, profileId, onSwitch }: { order: SectionId[]; profileId: ProfileId; onSwitch: (id: ProfileId) => void }) {
  const { scrollTo } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = viewerProfiles.find((p) => p.id === profileId)!;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${scrolled ? "series-glass" : ""}`}
      >
        <nav className="gutter flex h-16 items-center justify-between gap-3">
          <button type="button" data-cursor="link" onClick={() => scrollTo(0, { offset: 0 })} className="flex min-w-0 items-center gap-2">
            <span className="truncate font-display text-base tracking-wide text-bone sm:text-xl">
              {seriesProfile.firstName} <span className="text-cyan">{seriesProfile.lastName}</span>
            </span>
            <span className="hidden rounded-full border border-cyan/40 px-2 py-0.5 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-2 md:inline">
              {seriesProfile.role}
            </span>
          </button>

          <div className="hidden items-center gap-6 lg:flex">
            {order.slice(0, 6).map((id) => (
              <button key={id} type="button" data-cursor="link" onClick={() => go(id)} className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-mist transition-colors hover:text-bone">
                {sectionMeta[id].nav}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {viewerProfiles.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  data-cursor="link"
                  onClick={() => onSwitch(p.id)}
                  title={`Watch as ${p.name}`}
                  aria-label={`Watch as ${p.name}`}
                  className="h-6 w-6 rounded-md font-display text-xs text-ink transition-transform hover:scale-110 sm:h-7 sm:w-7"
                  style={{ background: p.color, outline: p.id === profileId ? "2px solid var(--color-bone)" : "none", outlineOffset: "2px" }}
                >
                  {p.name[0]}
                </button>
              ))}
            </div>
            <button type="button" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="flex h-8 w-8 items-center justify-center rounded-md border border-white/25 text-bone sm:h-9 sm:w-9 lg:hidden">
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE-MENU-MARKER */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-start overflow-y-auto bg-ink/95 px-8 pb-10 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-6 font-sans text-[11px] uppercase tracking-[0.3em] text-cyan-2">Watching as {active.name}</p>
            <div className="flex flex-col gap-3">
              {order.map((id) => (
                <button key={id} type="button" onClick={() => go(id)} className="text-left font-display text-3xl tracking-wide text-bone">
                  {sectionMeta[id].nav}
                </button>
              ))}
            </div>
            <div className="mt-10">
              <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.3em] text-cyan-2">Switch profile</p>
              <div className="flex flex-col gap-2">
                {viewerProfiles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSwitch(p.id);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition"
                    style={{
                      borderColor: p.id === profileId ? p.color : "rgba(255,255,255,0.12)",
                      background: p.id === profileId ? `${p.color}1f` : "transparent",
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-display text-sm text-ink" style={{ background: p.color }}>
                      {p.name[0]}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-sans text-sm font-semibold text-bone">{p.name}</span>
                      <span className="font-sans text-[11px] leading-snug text-smoke">{p.blurb}</span>
                    </span>
                    {p.id === profileId && (
                      <span className="ml-auto font-sans text-[10px] uppercase tracking-wide" style={{ color: p.color }}>
                        Watching
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
