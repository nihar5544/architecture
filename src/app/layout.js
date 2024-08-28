import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigationbar/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Mcad | Premier Architecture Firm in Australia",
  description:
    "Mcad is a leading architecture firm in Australia, specializing in innovative and sustainable design solutions for residential, commercial, and public spaces.",
  keywords:
    "Mcad, architecture, Australia, sustainable design, residential architecture, commercial architecture, public spaces, architectural services",
  author: "Mcad Architecture Firm",
  robots: "index, follow",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={`${jost.className} max-w-[2100px] mx-auto`}>
        <Header />
        {children}
        <Toaster richColors />
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
