"use client";

import Link from "next/link";
import { certifications } from "@/data/certifications";
import { Container } from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typography";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <Container size="standard">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Typography variant="eyebrow" className="mb-4">
            Certifications & Credentials
          </Typography>
          <Typography variant="h1" className="mb-4 uppercase tracking-[0.05em]" id="certifications-heading">
            Verified Certifications
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
              className="card-base cert-card p-6 border border-[#1A1A20] hover:border-[#C6A15B]/50 transition-all duration-300 bg-[#0B0C0E]"
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

export default Certifications;