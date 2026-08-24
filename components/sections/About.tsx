"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/about";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<any>(null);
  const quoteRef = useRef<any>(null);
  const principlesRef = useRef<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEl = sectionRef.current?.querySelector(".section-header");
      if (headerEl) {
        gsap.from(headerEl, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll("li");
        if (items.length > 0) {
          gsap.from(Array.from(items), {
            opacity: 0,
            x: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: principlesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 md:py-32 scroll-mt-20 md:scroll-mt-24"
      aria-labelledby="about-heading"
    >
      <Container size="narrow">
        <header className="text-center max-w-3xl mx-auto mb-8 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            About
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]" id="about-heading">
            Engineering Philosophy
          </Typography>
          <Divider variant="gold" className="mx-auto mt-6 md:mt-8 max-w-xs" />
        </header>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <blockquote ref={quoteRef} className="relative pl-6 md:pl-8 border-l-2 border-burnished-bronze/30">
            <Typography variant="lead" className="text-ivory">
              &ldquo;{aboutData.quote}&rdquo;
            </Typography>
          </blockquote>

          <ul ref={principlesRef} className="space-y-3 md:space-y-4" role="list" aria-label="Engineering principles">
            {aboutData.principles.map((principle, index) => (
              <li key={index} className="flex items-start gap-3 md:gap-4 text-ash font-sans leading-relaxed text-sm md:text-base">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-burnished-bronze shrink-0" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        <Divider variant="gold" className="my-8 md:my-12 max-w-md mx-auto" />

        <Typography variant="body-lg" className="text-center text-ivory-dim max-w-2xl mx-auto">
          {aboutData.currentFocus}
        </Typography>
      </Container>
    </section>
  );
}