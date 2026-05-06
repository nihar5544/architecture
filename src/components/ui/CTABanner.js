import Link from "next/link";

export default function CTABanner({
  eyebrow = "Start Your Project",
  heading = "Let's shape your vision\ninto sculpted space.",
  cta = "Begin the Conversation",
  ctaHref = "/contact",
}) {
  return (
    <section
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "clamp(5rem, 8vw, 10rem) 5%",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
        <p
          className="text-micro"
          style={{ color: "var(--color-primary)", marginBottom: "1.25rem" }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-cormorant text-display"
          style={{ color: "var(--color-text)", marginBottom: "2.5rem", whiteSpace: "pre-line" }}
        >
          {heading}
        </h2>
        <Link
          href={ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-bg)",
            background: "var(--color-primary)",
            padding: "1rem 2.5rem",
            transition: "background 0.2s, transform 0.2s",
          }}
        >
          {cta}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
