"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import StatsCounter from "@/components/ui/StatsCounter";
import CTABanner from "@/components/ui/CTABanner";
import ProjectCard from "@/components/ui/ProjectCard";

const ServiceScene = dynamic(() => import("@/components/three/ServiceScene"), {
  ssr: false,
  loading: () => null,
});

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const TICKER_ITEMS = [
  "Architecture",
  "Interior Design",
  "3D Visualization",
  "Commercial Spaces",
  "Residential Projects",
  "Retail Design",
  "Award-Winning Studio",
  "Ahmedabad, India",
];

const SERVICES = [
  {
    num: "01",
    title: "Architecture",
    desc: "From concept to completion, we design buildings that stand as testaments to craft and vision.",
    scene: "architecture",
  },
  {
    num: "02",
    title: "Interior Design",
    desc: "Spaces that breathe — curated material palettes, bespoke furniture, and immersive atmospheres.",
    scene: "interior",
  },
  {
    num: "03",
    title: "3D Visualization",
    desc: "Photorealistic renders and walkthroughs that communicate design intent before a single brick is laid.",
    scene: "visualization",
  },
  {
    num: "04",
    title: "Retail Design",
    desc: "Environments that convert — retail environments crafted for flow, emotion, and brand identity.",
    scene: "retail",
  },
];

const PROCESS = [
  { step: "01", title: "Discover", desc: "Deep-dive workshops to understand your vision, constraints, and aspirations." },
  { step: "02", title: "Concept", desc: "Spatial narratives translated into bold schematic designs and material stories." },
  { step: "03", title: "Develop", desc: "Technical detailing, coordination, and refined documentation." },
  { step: "04", title: "Deliver", desc: "On-site supervision through to handover — every detail accounted for." },
];

const DEFAULT_STATS = [
  { value: 24, suffix: "+", label: "Years of Practice" },
  { value: 340, suffix: "+", label: "Projects Completed" },
  { value: 18, suffix: "", label: "Design Awards" },
  { value: 12, suffix: "", label: "Cities Across India" },
];

const DEFAULT_HERO = {
  eyebrow: "Architecture & Interior Design",
  title: "We sculpt\nspace into\nnarrative.",
  sub: "Award-winning architecture firm based in Ahmedabad, crafting residential, commercial, and retail environments since 2000.",
};

export default function HomePage() {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/cms/home").then((r) => {
      const c = r.data?.data;
      if (!c) return;
      if (c.hero) setHero((prev) => ({ ...prev, ...c.hero }));
      if (c.stats?.length) {
        setStats(c.stats.map((s, i) => ({
          ...DEFAULT_STATS[i],
          ...s,
          value: Number(s.value) || DEFAULT_STATS[i]?.value || 0,
        })));
      }
    }).catch(() => {});

    axios.get("/api/projectDetails").then((r) => {
      if (r.data?.data) setProjects(r.data.data.slice(0, 6));
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "var(--color-bg)",
        }}
      >
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <HeroScene />
        </div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, var(--color-bg) 40%, transparent 100%)",
            zIndex: 1,
          }}
        />

        <div
          className="site-container"
          style={{ position: "relative", zIndex: 2, paddingTop: "7rem", paddingBottom: "5rem" }}
        >
          <p
            className="text-micro"
            style={{
              color: "var(--color-primary)",
              marginBottom: "1.5rem",
              animation: "fadeInUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {hero.eyebrow}
          </p>
          <h1
            className="font-cormorant text-hero"
            style={{
              color: "var(--color-text)",
              maxWidth: "10ch",
              whiteSpace: "pre-line",
              animation: "fadeInUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {hero.title}
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              maxWidth: "460px",
              marginTop: "1.5rem",
              fontSize: "1rem",
              lineHeight: 1.7,
              animation: "fadeInUp 0.7s 0.35s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {hero.sub}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
              animation: "fadeInUp 0.7s 0.5s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-bg)",
                background: "var(--color-primary)",
                padding: "0.875rem 2rem",
              }}
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                padding: "0.875rem 2rem",
              }}
            >
              Get in Touch
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "4rem",
              animation: "fadeInUp 0.7s 0.8s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "var(--color-primary)",
              }}
            />
            <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── 2. Marquee ── */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1rem 0",
          background: "var(--color-surface)",
        }}
      >
        <MarqueeTicker items={TICKER_ITEMS} />
      </div>

      {/* ── 3. About / Stats ── */}
      <section className="section-padding" style={{ background: "var(--color-bg)" }}>
        <div className="site-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
                About MCAD
              </p>
              <h2 className="font-cormorant text-h2" style={{ color: "var(--color-text)", marginBottom: "1.5rem" }}>
                Architecture rooted in<br />
                <em>intention.</em>
              </h2>
              <div style={{ color: "var(--color-text-muted)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p>
                  For over two decades, MCAD has shaped the built environment of western India — from landmark commercial towers to intimate private residences.
                </p>
                <p>
                  Every project begins with rigorous listening. We immerse ourselves in your world before we draw a single line.
                </p>
              </div>
              <Link
                href="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  borderBottom: "1px solid var(--color-primary)",
                  paddingBottom: "2px",
                }}
              >
                Explore our portfolio
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
              }}
            >
              {stats.map((s) => (
                <StatsCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Services ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="site-container">
          <div style={{ marginBottom: "4rem" }}>
            <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
              What We Do
            </p>
            <h2 className="font-cormorant text-h2" style={{ color: "var(--color-text)" }}>
              Our disciplines
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              border: "1px solid var(--color-border)",
            }}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
                style={{
                  borderRight: i < SERVICES.length - 1 ? "1px solid var(--color-border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 3D scene */}
                <div
                  style={{
                    height: "200px",
                    position: "relative",
                    borderBottom: "1px solid var(--color-border)",
                    overflow: "hidden",
                    background: "var(--color-bg)",
                  }}
                >
                  <ServiceScene type={svc.scene} />
                  {/* subtle radial glow behind canvas */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at 50% 60%, rgba(200,169,110,0.06) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Text */}
                <div style={{ padding: "2rem" }}>
                  <span
                    className="font-mono-custom"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-primary)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {svc.num}
                  </span>
                  <h3
                    className="font-cormorant"
                    style={{
                      fontSize: "clamp(1.3rem, 1.8vw, 1.8rem)",
                      color: "var(--color-text)",
                      fontWeight: 400,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Featured Projects ── */}
      {projects.length > 0 && (
        <section className="section-padding" style={{ background: "var(--color-bg)" }}>
          <div className="site-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>
                  Selected Work
                </p>
                <h2 className="font-cormorant text-h2" style={{ color: "var(--color-text)" }}>
                  Featured projects
                </h2>
              </div>
              <Link
                href="/projects"
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  borderBottom: "1px solid var(--color-border)",
                  paddingBottom: "2px",
                }}
              >
                All Projects →
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {projects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Process ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="site-container">
          <div style={{ marginBottom: "4rem" }}>
            <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>
              How We Work
            </p>
            <h2 className="font-cormorant text-h2" style={{ color: "var(--color-text)" }}>
              Our process
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {PROCESS.map((p) => (
              <div
                key={p.step}
                style={{
                  padding: "2rem",
                  borderLeft: "1px solid var(--color-border)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: -5,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    border: "2px solid var(--color-bg)",
                  }}
                />
                <span
                  className="font-mono-custom"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-text-faint)",
                    display: "block",
                    marginBottom: "1rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  {p.step}
                </span>
                <h3
                  className="font-cormorant"
                  style={{
                    fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                    color: "var(--color-text)",
                    fontWeight: 400,
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <CTABanner />
    </>
  );
}
