import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StickyContact } from "@/components/StickyContact";
import { NeuralBackground } from "@/components/neural/NeuralBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishwar Soni | AI Engineer Building Systems That Work",
  description: "AI Engineer specializing in human motion pipeline, ML engineering, and production systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground h-full selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <div className="fixed inset-0 -z-20 bg-zinc-950 pointer-events-none" />
        <div className="fixed inset-0 -z-10 opacity-100 pointer-events-none">
          <NeuralBackground />
        </div>

        {/* Cinematic Vignette - On top of background but behind content */}
        <div className="fixed inset-0 -z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="bg-noise fixed inset-0 z-50 opacity-[0.03] pointer-events-none" />

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 relative z-10">
          {children}
        </div>
        <StickyContact />
      </body>
    </html>
  );
}
