"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
  "Architecture Design",
  "Interior Design",
  "3D Visualization",
  "Retail Design",
  "Commercial Spaces",
  "Residential Projects",
];

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <footer
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "clamp(4rem, 6vw, 8rem)",
        paddingBottom: "clamp(2rem, 4vw, 4rem)",
      }}
    >
      <div className="site-container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: "1.25rem" }}>
              <Image
                src="/images/Logo.webp"
                alt="MCAD Architecture"
                width={110}
                height={44}
                style={{
                  objectFit: "contain",
                  height: "36px",
                  width: "auto",
                  filter: "brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(105%)",
                }}
              />
            </Link>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "280px" }}>
              Premier architecture and interior design studio crafting award-winning spaces across India since 2000.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-muted)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-muted)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-faint)",
                marginBottom: "1.25rem",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", transition: "color 0.2s" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-faint)",
                marginBottom: "1.25rem",
              }}
            >
              Navigate
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", transition: "color 0.2s" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-faint)",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <a
                href="mailto:studio@mcad.in"
                style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}
              >
                studio@mcad.in
              </a>
              <a
                href="tel:+917966190000"
                style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}
              >
                +91 79 6619 0000
              </a>
              <address
                style={{
                  fontStyle: "normal",
                  color: "var(--color-text-muted)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                Ahmedabad, Gujarat<br />India 380 001
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "var(--color-text-faint)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} MCAD Architecture. All rights reserved.
          </p>
          <p style={{ color: "var(--color-text-faint)", fontSize: "0.8rem" }}>
            Sculpted spaces, precisely crafted.
          </p>
        </div>
      </div>
    </footer>
  );
}
