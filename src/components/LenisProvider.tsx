"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const idleRef = useRef(0);

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

    const onIdle = () => {
      idleRef.current = Date.now();
    };

    window.addEventListener("scroll", onIdle, { passive: true });
    window.addEventListener("wheel", onIdle, { passive: true });
    window.addEventListener("touchmove", onIdle, { passive: true });

    function raf(time: number) {
      rafRef.current = requestAnimationFrame(raf);
      if (Date.now() - idleRef.current > 3000) return;
      lenis.raf(time);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onIdle);
      window.removeEventListener("wheel", onIdle);
      window.removeEventListener("touchmove", onIdle);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
