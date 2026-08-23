"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const statementRef = useRef<any>(null);
  const roleRef = useRef<any>(null);
  const ctaRef = useRef<any>(null);
  const scrollIndicatorRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(nameRef.current, { opacity: 0, y: 40, duration: 0.9 })
        .from(statementRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(roleRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.3")
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.2")
        .from(scrollIndicatorRef.current, { opacity: 0, scaleY: 0, duration: 0.8 }, "-=0.1");

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (heroRef.current) {
              (heroRef.current as HTMLElement).style.opacity = `${1 - progress * 0.3}`;
            }
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-vignette z-0" aria-hidden="true" />
      
      <Container size="narrow" className="relative z-10 py-16 md:py-24 text-center">
        <Typography variant="eyebrow" className="mb-6 animate-fade-in-up">
          AI ENGINEER
        </Typography>

        <Typography
          ref={nameRef}
          id="hero-title"
          variant="display"
          className="uppercase tracking-[0.04em] mb-8 animate-fade-in-up"
        >
          {siteData.name}
        </Typography>

        <Typography
          ref={statementRef}
          variant="lead"
          className="mb-6 max-w-2xl mx-auto animate-fade-in-up"
        >
          {siteData.heroStatement}
        </Typography>

        <Typography
          ref={roleRef}
          variant="body-lg"
          className="text-ash mb-12 animate-fade-in-up"
        >
          {siteData.heroSubtext}
        </Typography>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#work">VIEW WORK</a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <a href="#about">ABOUT ME</a>
          </Button>
        </div>

        <Divider variant="gold-thick" className="mx-auto mt-12 md:mt-16 max-w-xs" />

        <div
          ref={scrollIndicatorRef}
          className="mt-8 flex flex-col items-center gap-2 text-ash-dim animate-fade-in-up hidden sm:flex"
          aria-hidden="true"
        >
          <Typography variant="micro" className="tracking-[0.2em] uppercase">
            Scroll
          </Typography>
          <div className="w-[1px] h-16 bg-gradient-to-b from-burnished-bronze/40 to-transparent" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burnished-bronze/60 animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </Container>
    </section>
  );
}

import { useState } from "react";