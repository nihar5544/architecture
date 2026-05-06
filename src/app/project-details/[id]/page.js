"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import CTABanner from "@/components/ui/CTABanner";

function MetaRow({ label, value, isLink }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>{label}</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-primary)",
            fontSize: "0.9rem",
            wordBreak: "break-all",
          }}
        >
          {value}
        </a>
      ) : (
        <span style={{ color: "var(--color-text)", fontSize: "0.9rem" }}>{value}</span>
      )}
    </div>
  );
}

export default function ProjectDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/projectDetails/${params?.id}`)
      .then((r) => {
        setData(r.data?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "1px solid var(--color-border)",
            borderTop: "1px solid var(--color-primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
          gap: "1.5rem",
        }}
      >
        <p className="font-cormorant text-h2" style={{ color: "var(--color-text)" }}>Project not found</p>
        <Link
          href="/projects"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-primary)",
            borderBottom: "1px solid var(--color-primary)",
          }}
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero image ── */}
      {data.image && (
        <div
          style={{
            width: "100%",
            height: "clamp(300px, 60vh, 700px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={data.image}
            alt={data.title || "Project"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, var(--color-bg) 0%, transparent 50%)",
            }}
          />
        </div>
      )}

      {/* ── Content ── */}
      <section
        style={{
          background: "var(--color-bg)",
          paddingTop: data.image ? "0" : "clamp(8rem, 12vw, 14rem)",
          paddingBottom: "clamp(5rem, 8vw, 10rem)",
        }}
      >
        <div className="site-container">
          {/* Back link */}
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "3rem",
              marginTop: data.image ? "-2rem" : "0",
              position: "relative",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Projects
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            {/* Meta sidebar */}
            <div>
              <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>
                {data.Category}
              </p>
              <h1
                className="font-cormorant"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--color-text)",
                  lineHeight: 1.1,
                  marginBottom: "2.5rem",
                }}
              >
                {data.title}
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                <MetaRow label="Client" value={data.Client} />
                <MetaRow label="Location" value={data.Location} />
                <MetaRow label="Year" value={data.Date} />
                <MetaRow label="Project Link" value={data.Link} isLink />
              </div>
            </div>

            {/* Description */}
            <div>
              {data.description && (
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                    lineHeight: 1.85,
                    marginBottom: "3rem",
                  }}
                >
                  {data.description}
                </p>
              )}
            </div>
          </div>

          {/* Gallery */}
          {data.otherImage?.length > 0 && (
            <div style={{ marginTop: "5rem" }}>
              <p className="text-micro" style={{ color: "var(--color-text-faint)", marginBottom: "2rem" }}>
                Gallery — {data.otherImage.length} images
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem",
                }}
              >
                {data.otherImage.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox(src)}
                    style={{
                      overflow: "hidden",
                      cursor: "pointer",
                      aspectRatio: i % 5 === 0 ? "16/9" : "4/3",
                    }}
                  >
                    <img
                      src={src}
                      alt={`${data.title} — ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      className="gallery-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightbox}
            alt="Full size"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              display: "block",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}

      <CTABanner
        eyebrow="Start Your Project"
        heading="Inspired by what\nyou see here?"
        cta="Begin the Conversation"
      />
    </>
  );
}
