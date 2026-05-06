import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CursorFollower from "@/components/ui/CursorFollower";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "MCAD | Premier Architecture Firm — Ahmedabad, India",
    template: "%s | MCAD Architecture",
  },
  description:
    "MCAD is Ahmedabad's leading architecture and interior design firm, crafting award-winning residential, commercial, and retail spaces since 2000.",
  keywords: [
    "MCAD", "architecture", "interior design", "Ahmedabad", "India",
    "residential", "commercial", "retail design", "3D visualization",
  ],
  authors: [{ name: "MCAD Architecture" }],
  creator: "MCAD Architecture",
  metadataBase: new URL("https://mcad.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mcad.in",
    siteName: "MCAD Architecture",
    title: "MCAD | Premier Architecture Firm — Ahmedabad, India",
    description:
      "Award-winning architecture and interior design. Residential · Commercial · Retail · 3D Visualization.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "MCAD Architecture — Sculpted Spaces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCAD Architecture",
    description: "Sculpted spaces, precisely crafted.",
    images: ["/images/og-image.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('mcad-theme');
      if (t === 'light') document.documentElement.classList.add('light');
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        {/* Anti-FOUC: apply saved theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain-overlay">
        <ThemeProvider>
          <SmoothScroll>
            <CursorFollower />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <Toaster
            theme="system"
            toastOptions={{
              style: {
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
