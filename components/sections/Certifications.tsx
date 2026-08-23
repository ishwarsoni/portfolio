"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

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

      const cards = sectionRef.current?.querySelectorAll(".cert-card");
      if (cards && cards.length > 0) {
        gsap.from(Array.from(cards), {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-20 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <Container size="standard">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16 section-header">
          <Typography variant="eyebrow" className="mb-4">
            Certifications
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]">
            Verified Credentials
          </Typography>
          <Typography variant="body-lg" className="text-ash">
            Industry-recognized certifications in RAG architectures and generative AI applications.
          </Typography>
          <Divider variant="gold" className="mx-auto mt-8 max-w-xs" />
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <article
              key={cert.title}
              className="card-base cert-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={index === 0 ? "gold" : "crimson"}>
                  {cert.type}
                </Badge>
              </div>

              <Typography variant="h3" className="mb-2 text-ivory">
                {cert.title}
              </Typography>

              <Typography variant="body" className="text-ash mb-4">
                {cert.issuer} · {cert.date}
              </Typography>

              {cert.description && (
                <Typography variant="small" className="text-ash-dim mb-4 leading-relaxed">
                  {cert.description}
                </Typography>
              )}

              <Divider variant="bronze" className="mb-4" />

              <Link
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono tracking-wider uppercase text-ash hover:text-antique-gold transition-colors duration-300 inline-flex items-center gap-1"
                aria-label={`Verify ${cert.title} certification`}
              >
                VERIFY CREDENTIAL
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}