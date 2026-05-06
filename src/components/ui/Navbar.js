"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/ui/ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function LogoImage() {
  const { theme } = useTheme();
  return (
    <Image
      src="/images/Logo.webp"
      alt="MCAD Architecture"
      width={120}
      height={48}
      priority
      style={{
        objectFit: "contain",
        height: "40px",
        width: "auto",
        filter: theme === "dark"
          ? "brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(105%)"
          : "brightness(0) saturate(100%) invert(38%) sepia(30%) saturate(700%) hue-rotate(5deg) brightness(90%)",
        transition: "filter 0.3s ease",
      }}
    />
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-muted)",
        cursor: "pointer",
        transition: "border-color 0.2s, color 0.2s",
        flexShrink: 0,
      }}
    >
      {isDark ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHidden =
    pathname.startsWith("/admin") || pathname === "/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (isHidden) return null;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "var(--color-navbar-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div
          className="site-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "64px" : "80px",
            transition: "height 0.4s ease",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <LogoImage />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: pathname === href ? "var(--color-primary)" : "var(--color-text-muted)",
                  transition: "color 0.2s",
                  position: "relative",
                }}
              >
                {label}
                {pathname === href && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--color-primary)",
                    }}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/contact"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-bg)",
                background: "var(--color-primary)",
                padding: "0.5rem 1.25rem",
                transition: "background 0.2s",
              }}
            >
              Enquire
            </Link>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden" style={{ alignItems: "center", gap: "0.75rem" }}>
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "var(--color-text)",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "var(--color-text)",
                  transition: "opacity 0.3s",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "var(--color-text)",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "5%",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(2.5rem, 8vw, 4rem)",
                      color: pathname === href ? "var(--color-primary)" : "var(--color-text)",
                      display: "block",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: "3rem", color: "var(--color-text-muted)", fontSize: "0.8rem" }}
            >
              Ahmedabad, India — Since 2000
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
