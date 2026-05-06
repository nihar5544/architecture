"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProjectCard from "@/components/ui/ProjectCard";
import CTABanner from "@/components/ui/CTABanner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    axios
      .get("/api/projectDetails")
      .then((r) => {
        setProjects(r.data?.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.Category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filtered = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((p) => p.Category === activeFilter),
    [projects, activeFilter]
  );

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "clamp(8rem, 12vw, 14rem)",
          paddingBottom: "clamp(4rem, 6vw, 8rem)",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="site-container">
          <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
            Our Portfolio
          </p>
          <h1
            className="font-cormorant text-display"
            style={{ color: "var(--color-text)", maxWidth: "14ch" }}
          >
            Every project is a signature.
          </h1>
        </div>
      </section>

      {/* ── Filter bar ── */}
      {categories.length > 2 && (
        <div
          style={{
            position: "sticky",
            top: "64px",
            zIndex: 100,
            background: "rgba(10,10,9,0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border)",
            padding: "0.75rem 0",
          }}
        >
          <div
            className="site-container"
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.4rem 1rem",
                  border: "1px solid",
                  borderColor: activeFilter === cat ? "var(--color-primary)" : "var(--color-border)",
                  color: activeFilter === cat ? "var(--color-primary)" : "var(--color-text-muted)",
                  background: activeFilter === cat ? "rgba(200,169,110,0.08)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      <section className="section-padding" style={{ background: "var(--color-bg)" }}>
        <div className="site-container">
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "4/3",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--color-text-muted)" }}>
              <p className="font-cormorant" style={{ fontSize: "2rem" }}>No projects found</p>
            </div>
          ) : (
            <>
              <p
                className="text-micro"
                style={{ color: "var(--color-text-faint)", marginBottom: "2rem" }}
              >
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}
                {activeFilter !== "All" ? ` — ${activeFilter}` : ""}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {filtered.map((p, i) => (
                  <ProjectCard key={p._id} project={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
