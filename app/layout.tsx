import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StickyContact } from "@/components/StickyContact";
import WarpField from "@/components/WarpField";

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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased text-foreground h-full selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {/* Layer 1: Warp Field Background */}
        <WarpField />

        {/* Layer 2: Ambient glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none" style={{ zIndex: 2 }} />

        {/* Layer 3: Cinematic Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" style={{ zIndex: 3 }} />

        {/* Layer 10: Content */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 relative" style={{ zIndex: 10 }}>
          {children}
        </div>
        <StickyContact />
      </body>
    </html>
  );
}