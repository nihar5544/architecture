export default function MarqueeTicker({ items, reverse = false, speed = 40 }) {
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "0 1.5rem",
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--color-primary)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
