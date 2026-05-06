"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  const isSkipped =
    pathname.startsWith("/admin") || pathname === "/login";

  useEffect(() => {
    if (isSkipped) return;

    let lenis;
    let gsap;
    let ScrollTrigger;

    async function init() {
      const [Lenis, gsapModule, STModule] = await Promise.all([
        import("lenis").then((m) => m.default),
        import("gsap").then((m) => m.gsap),
        import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
      ]);

      gsap = gsapModule;
      ScrollTrigger = STModule;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isSkipped]);

  return <>{children}</>;
}
