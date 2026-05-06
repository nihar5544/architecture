import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project, index = 0 }) {
  const { _id, title, Category, Location, image } = project;

  return (
    <Link
      href={`/project-details/${_id}`}
      className="project-card"
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
      data-cursor-expand
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: index % 3 === 0 ? "4/5" : "3/2",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title || "Project"}
            className="project-card-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--color-surface-offset)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.2">
              <rect x="4" y="4" width="32" height="32" stroke="currentColor" strokeWidth="1"/>
              <path d="M4 28L14 18L20 24L28 14L36 24" stroke="currentColor" strokeWidth="1"/>
              <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,9,0.5)",
            opacity: 0,
            transition: "opacity 0.4s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="project-card-overlay"
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: "0.5rem 1.25rem",
            }}
          >
            View Project
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
        <div
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-primary)",
            marginBottom: "0.4rem",
          }}
        >
          {Category}
        </div>
        <h3
          className="font-cormorant"
          style={{
            fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
            color: "var(--color-text)",
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: "0.3rem",
          }}
        >
          {title}
        </h3>
        {Location && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
            }}
          >
            {Location}
          </p>
        )}
      </div>
    </Link>
  );
}
