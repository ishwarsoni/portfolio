import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Vignette } from "@/components/layout/Vignette";
import { IntroLoader } from "@/components/layout/IntroLoader";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ishwar Soni — AI Engineer | Applied AI, LLMs & RAG",
  description: "Ishwar Soni is an AI Engineer building practical AI systems with LLMs, RAG, machine learning and data-focused engineering, with professional experience in computer vision and motion processing.",
  keywords: [
    "AI Engineer",
    "Applied AI",
    "LLM",
    "RAG",
    "Machine Learning",
    "ML Engineering",
    "Data Engineering",
    "Computer Vision",
    "Motion Processing",
    "SMPL",
    "SMPL-H",
  ],
  authors: [{ name: "Ishwar Soni" }],
  creator: "Ishwar Soni",
  publisher: "Ishwar Soni",
  robots: "index, follow",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://ishwarsoni.dev",
    siteName: "Ishwar Soni — AI Engineer",
    title: "Ishwar Soni — AI Engineer | Applied AI, LLMs & RAG",
    description: "AI Engineer building practical AI systems with LLMs, RAG, machine learning and data-focused engineering, with professional experience in computer vision and motion processing.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Ishwar Soni — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishwar Soni — AI Engineer",
    description: "AI Engineer building practical AI systems with LLMs, RAG, and machine learning, with professional experience in computer vision and motion processing.",
    images: ["/og-image.svg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className="min-h-screen bg-void text-ivory antialiased">
        <IntroLoader />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Vignette />
        <ScrollProgress />
        <Header />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}