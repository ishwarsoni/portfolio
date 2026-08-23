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

export function Contact() {
  const sectionRef = useRef<any>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<any>(null);

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

      if (emailRef.current) {
        gsap.from(emailRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("button");
        if (buttons.length > 0) {
          gsap.from(Array.from(buttons), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
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
      id="contact"
      className="py-24 md:py-40"
      aria-labelledby="contact-heading"
    >
      <Container size="narrow">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            Contact
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]">
            Direct Inquiry
          </Typography>
          <Typography variant="lead" className="text-antique-gold max-w-xl mx-auto">
            Every system begins with a conversation.
          </Typography>
          <Divider variant="gold" className="mx-auto mt-8 max-w-xs" />
        </header>

        <div className="text-center space-y-10">
          <a
            ref={emailRef}
            href={`mailto:${siteData.email}`}
            className="block contact-email"
            aria-label="Email Ishwar Soni"
          >
            <span className="contact-email-text">{siteData.email}</span>
          </a>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href={`mailto:${siteData.email}`}>
                EMAIL ME DIRECTLY
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href={siteData.github} target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer">
                LINKEDIN
              </a>
            </Button>
          </div>

          <Typography variant="micro" className="text-ash-dim tracking-[0.2em] uppercase">
            Based in {siteData.location} · Responds within 24–48 hours
          </Typography>
        </div>
      </Container>
    </section>
  );
}