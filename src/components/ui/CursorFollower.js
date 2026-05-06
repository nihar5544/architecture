"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pathname = usePathname();

  const isHidden =
    pathname.startsWith("/admin") || pathname === "/login";

  useEffect(() => {
    if (isHidden) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onEnter = () => {
      ring.style.width = "64px";
      ring.style.height = "64px";
      ring.style.marginLeft = "-32px";
      ring.style.marginTop = "-32px";
      ring.style.borderColor = "var(--color-primary)";
      ring.style.opacity = "0.6";
    };

    const onLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.marginLeft = "-20px";
      ring.style.marginTop = "-20px";
      ring.style.borderColor = "rgba(255,255,255,0.5)";
      ring.style.opacity = "1";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const interactables = "a, button, [data-cursor-expand]";

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll(interactables).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactables).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-primary)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.05s linear",
        }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.3s ease, height 0.3s ease, margin 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
