import Link from "next/link";
import CTABanner from "@/components/ui/CTABanner";
import { dbConnect } from "../../../utils/dbConnect";
import SiteContent from "../../../models/SiteContent";

export const metadata = {
  title: "Services",
  description: "Our architecture and interior design services — from concept through to delivery.",
};

const DEFAULT = {
  cards: [
    {
      title: "Architecture",
      content: "From site analysis and concept through technical documentation, our architecture service covers every phase with precision — delivering buildings that stand as testaments to craft and vision.",
    },
    {
      title: "Interior Design",
      content: "Spaces that breathe. Curated material palettes, bespoke joinery, and immersive atmospheres that bring your brand or lifestyle into every corner.",
    },
    {
      title: "Retail Design",
      content: "Environments built for conversion — retail interiors crafted for flow, emotion, and brand storytelling that turns visitors into loyal customers.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Discover & Define",
      description: "We begin with immersive workshops to understand your vision, context, and constraints — mapping out a brief that becomes the DNA of the project.",
      image: "",
    },
    {
      number: "02",
      title: "Concept Design",
      description: "Spatial narratives are translated into bold schematic designs, material boards, and 3D visualizations that communicate intent clearly.",
      image: "",
    },
    {
      number: "03",
      title: "Design Development",
      description: "Concepts are refined into detailed technical drawings, specification schedules, and fully coordinated construction documents.",
      image: "",
    },
    {
      number: "04",
      title: "Delivery & Handover",
      description: "On-site supervision, contractor coordination, and meticulous quality control through to handover — with every detail exactly as designed.",
      image: "",
    },
  ],
};

const STATIC_IMAGES = [
  "/images/Service1.webp",
  "/images/Service2.webp",
  "/images/Service3.webp",
  "/images/Service4.webp",
];

async function getContent() {
  try {
    await dbConnect();
    const doc = await SiteContent.findOne({ page: "services" });
    if (!doc) return DEFAULT;
    return {
      cards: doc.content?.cards?.length ? doc.content.cards : DEFAULT.cards,
      steps: doc.content?.steps?.length ? doc.content.steps : DEFAULT.steps,
    };
  } catch {
    return DEFAULT;
  }
}

export default async function ServicesPage() {
  const { cards, steps } = await getContent();

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
            Our Disciplines
          </p>
          <h1
            className="font-cormorant text-display"
            style={{ color: "var(--color-text)", maxWidth: "14ch" }}
          >
            Architecture that speaks before you enter.
          </h1>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="section-padding" style={{ background: "var(--color-bg)" }}>
        <div className="site-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  className="font-mono-custom"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-text-faint)",
                    display: "block",
                    marginBottom: "1.5rem",
                    letterSpacing: "0.12em",
                  }}
                >
                  0{i + 1}
                </span>
                <h2
                  className="font-cormorant"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)",
                    fontWeight: 400,
                    color: "var(--color-text)",
                    marginBottom: "1rem",
                  }}
                >
                  {card.title}
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {card.content}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    background: "var(--color-primary)",
                    transition: "width 0.4s ease",
                  }}
                  className="service-card-line"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section
        className="section-padding"
        style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="site-container">
          <div style={{ marginBottom: "5rem" }}>
            <p className="text-micro" style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
              Our Process
            </p>
            <h2 className="font-cormorant text-h2" style={{ color: "var(--color-text)" }}>
              How we work
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, i) => {
              const imgSrc = step.image || STATIC_IMAGES[i] || STATIC_IMAGES[0];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "0",
                    borderTop: "1px solid var(--color-border)",
                    padding: "3rem 0",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      order: isEven ? 0 : 1,
                      overflow: "hidden",
                      maxHeight: "420px",
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={step.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      order: isEven ? 1 : 0,
                      padding: "clamp(2rem, 4vw, 4rem)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="font-cormorant"
                      style={{
                        fontSize: "clamp(4rem, 8vw, 8rem)",
                        lineHeight: 1,
                        color: "var(--color-text-faint)",
                        fontWeight: 400,
                        display: "block",
                        marginBottom: "1rem",
                      }}
                    >
                      {step.number}
                    </span>
                    <h3
                      className="font-cormorant"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                        fontWeight: 400,
                        color: "var(--color-text)",
                        marginBottom: "1rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, maxWidth: "480px" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        eyebrow="Ready to Begin?"
        heading="Your project starts\nwith a conversation."
        cta="Contact the Studio"
        ctaHref="/contact"
      />
    </>
  );
}
