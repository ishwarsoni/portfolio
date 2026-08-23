"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navigation, siteData } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-all duration-500",
        scrolled
          ? "bg-midnight/90 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav className="container-standard" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="#main"
            className="flex flex-col justify-center leading-tight group text-left"
            aria-label="Ishwar Soni — Home"
          >
            <span className="font-serif text-lg md:text-xl font-medium tracking-tight text-ivory group-hover:text-antique-gold transition-colors duration-300">
              ISHWAR SONI
            </span>
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.22em] text-antique-gold uppercase -mt-0.5">
              AI ENGINEER
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <ul className="flex items-center gap-3 lg:gap-6" role="menubar">
              {navigation.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className="font-mono text-[11px] lg:text-xs tracking-[0.15em] uppercase text-ash hover:text-ivory transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-antique-gold after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center pl-3 lg:pl-5 border-l border-[#1A1A20]">
              <Link
                href={siteData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2 text-xs tracking-[0.2em] uppercase font-mono"
              >
                Resume
              </Link>
            </div>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-ivory"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={cn(
                "h-px w-5 bg-current transition-all duration-300",
                mobileOpen && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-current transition-all duration-300",
                mobileOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>

        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            "lg:hidden overflow-hidden bg-midnight/95 backdrop-blur-xl border-b border-border-subtle transition-all duration-300",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-2 py-6 px-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 font-serif text-base tracking-[0.15em] uppercase transition-colors text-ash hover:text-ivory"
                >
                  <span className="font-mono text-xs text-ash-dim">{navigation.indexOf(item) + 1}.</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 px-3 border-t border-border-subtle">
              <Link
                href={siteData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center px-4 py-3 text-xs tracking-[0.2em] uppercase font-mono"
              >
                Resume
              </Link>
            </li>
            <li className="pt-4 px-3 flex flex-wrap gap-3">
              <a
                href={siteData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash hover:text-ivory transition-colors font-mono text-sm"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href={siteData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash hover:text-ivory transition-colors font-mono text-sm"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="text-ash hover:text-ivory transition-colors font-mono text-sm"
                aria-label="Email"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}