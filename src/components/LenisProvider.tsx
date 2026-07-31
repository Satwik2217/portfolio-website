"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    let running = false;
    let lastActivity = 0;

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onActivity = () => {
      lastActivity = Date.now();
      if (!running) {
        running = true;
        const tick = (time: number) => {
          if (!running) return;
          if (Date.now() - lastActivity > 3000) {
            stop();
            return;
          }
          lenis.raf(time);
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("wheel", onActivity, { passive: true });
    window.addEventListener("touchmove", onActivity, { passive: true });

    return () => {
      stop();
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("wheel", onActivity);
      window.removeEventListener("touchmove", onActivity);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
