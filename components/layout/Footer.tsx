import Link from "next/link";
import { siteData } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle py-10 md:py-14" role="contentinfo">
      <div className="container-standard">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p className="font-serif text-base md:text-lg font-medium tracking-tight text-ivory">
              {siteData.name}
            </p>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-ash">
              {siteData.tagline}
            </p>
          </div>

          <p className="text-sm text-ash-dim text-center md:text-right">
            © {year} {siteData.name} · Built with Next.js + GSAP
          </p>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={siteData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash hover:text-antique-gold transition-colors duration-300 font-mono text-xs md:text-sm"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ash hover:text-antique-gold transition-colors duration-300 font-mono text-xs md:text-sm"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteData.email}`}
              className="text-ash hover:text-antique-gold transition-colors duration-300 font-mono text-xs md:text-sm"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}