import type { Metadata } from "next";
import { Inter, Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cleoverly.dev"),
  title: {
    default: "CLEOVERLY — Full-Stack Developer",
    template: "%s | CLEOVERLY",
  },
  description:
    "Full-Stack Developer crafting fast, precise web products — from first sketch to production. React, Next.js, TypeScript.",
  keywords: ["portfolio", "full-stack", "developer", "react", "next.js", "typescript", "web"],
  authors: [{ name: "CLEOVERLY" }],
  creator: "CLEOVERLY",
  openGraph: {
    title: "CLEOVERLY — Full-Stack Developer",
    description: "Crafting fast, precise web products — from first sketch to production.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLEOVERLY — Full-Stack Developer",
    description: "Crafting fast, precise web products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import GlobalEffects from "@/components/layout/GlobalEffects";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jost.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased relative">
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
