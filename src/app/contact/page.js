"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const DEFAULT_CMS = {
  title: "Let's shape\nsomething together.",
  email: "studio@mcad.in",
  phone: "+91 79 6619 0000",
  website: "www.mcad.in",
};

const EMPTY_FORM = { name: "", email: "", subject: "", phone: "", description: "" };

function FloatField({ id, label, value, onChange, error, type = "text", required }) {
  return (
    <div
      className="float-label"
      style={{ position: "relative", marginBottom: error ? "1.75rem" : "1.25rem" }}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${error ? "var(--color-primary)" : "var(--color-border)"}`,
          color: "var(--color-text)",
          width: "100%",
          padding: "1.25rem 0 0.5rem",
          outline: "none",
          fontSize: "1rem",
          fontFamily: "inherit",
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          top: value ? "0" : "1.25rem",
          left: 0,
          fontSize: value ? "0.7rem" : "0.875rem",
          letterSpacing: value ? "0.08em" : "normal",
          textTransform: value ? "uppercase" : "none",
          color: value ? "var(--color-primary)" : "var(--color-text-muted)",
          pointerEvents: "none",
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {label}
      </label>
      {error && (
        <span style={{ fontSize: "0.7rem", color: "var(--color-primary)", position: "absolute", bottom: "-1.25rem", left: 0 }}>
          {error}
        </span>
      )}
    </div>
  );
}

function FloatTextarea({ id, label, value, onChange, error, required }) {
  return (
    <div
      className="float-label"
      style={{ position: "relative", marginBottom: error ? "1.75rem" : "1.25rem" }}
    >
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        rows={4}
        style={{
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${error ? "var(--color-primary)" : "var(--color-border)"}`,
          color: "var(--color-text)",
          width: "100%",
          padding: "1.25rem 0 0.5rem",
          outline: "none",
          fontSize: "1rem",
          fontFamily: "inherit",
          resize: "none",
          transition: "border-color 0.3s",
        }}
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          top: value ? "0" : "1.25rem",
          left: 0,
          fontSize: value ? "0.7rem" : "0.875rem",
          letterSpacing: value ? "0.08em" : "normal",
          textTransform: value ? "uppercase" : "none",
          color: value ? "var(--color-primary)" : "var(--color-text-muted)",
          pointerEvents: "none",
          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {label}
      </label>
      {error && (
        <span style={{ fontSize: "0.7rem", color: "var(--color-primary)", position: "absolute", bottom: "-1.25rem", left: 0 }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cms, setCms] = useState(DEFAULT_CMS);

  useEffect(() => {
    axios.get("/api/cms/contact").then((r) => {
      if (r.data?.data) setCms({ ...DEFAULT_CMS, ...r.data.data });
    }).catch(() => {});
  }, []);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.description.trim()) e.description = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    axios
      .post("/api/contect", form)
      .then(() => {
        toast.success("Message sent — we'll be in touch shortly.");
        setForm(EMPTY_FORM);
      })
      .catch(() => toast.error("Failed to send. Please try again."))
      .finally(() => setLoading(false));
  };

  const titleLines = (cms.title || DEFAULT_CMS.title).split("\n");

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
            Get in Touch
          </p>
          <h1
            className="font-cormorant text-display"
            style={{ color: "var(--color-text)", whiteSpace: "pre-line", maxWidth: "14ch" }}
          >
            {titleLines.join("\n")}
          </h1>
        </div>
      </section>

      {/* ── Split layout ── */}
      <section className="section-padding" style={{ background: "var(--color-bg)" }}>
        <div className="site-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            {/* Left — contact info */}
            <div>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "3rem",
                  maxWidth: "360px",
                }}
              >
                Whether it's a new build, renovation, or simply an exploratory conversation — our studio is ready to listen.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <a
                  href={`mailto:${cms.email}`}
                  style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
                >
                  <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>Email</span>
                  <span style={{ color: "var(--color-text)", fontSize: "1rem" }}>{cms.email}</span>
                </a>
                <a
                  href={`tel:${cms.phone?.replace(/\s/g, "")}`}
                  style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
                >
                  <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>Phone</span>
                  <span style={{ color: "var(--color-text)", fontSize: "1rem" }}>{cms.phone}</span>
                </a>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>Studio</span>
                  <span style={{ color: "var(--color-text)", fontSize: "1rem" }}>Ahmedabad, Gujarat, India</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <span className="text-micro" style={{ color: "var(--color-text-faint)" }}>Web</span>
                  <span style={{ color: "var(--color-text)", fontSize: "1rem" }}>{cms.website}</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 2rem",
                }}
              >
                <FloatField id="name" label="Full Name" value={form.name} onChange={set("name")} error={errors.name} required />
                <FloatField id="email" label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} required />
                <FloatField id="subject" label="Subject" value={form.subject} onChange={set("subject")} error={errors.subject} required />
                <FloatField id="phone" label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} required />
              </div>

              <FloatTextarea
                id="description"
                label="Tell us about your project"
                value={form.description}
                onChange={set("description")}
                error={errors.description}
                required
              />

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-bg)",
                    background: loading ? "var(--color-text-faint)" : "var(--color-primary)",
                    padding: "1rem 2.5rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {loading ? "Sending…" : "Send Message"}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
