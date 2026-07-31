"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import WebBurst, { type Burst } from "@/components/WebBurst";

const THWIP = "thwip";
const SYMBIOTE = "symbiote";

export default function EasterEggs() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const buffer = useRef("");
  const mouse = useRef({ x: 0, y: 0 });
  const idRef = useRef(0);

  const fire = useCallback((x: number, y: number, label?: string) => {
    const id = idRef.current++;
    setBursts((prev) => [...prev, { id, x, y, label }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1400);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-Math.max(THWIP.length, SYMBIOTE.length));

      if (buffer.current.endsWith(THWIP)) {
        buffer.current = "";
        fire(mouse.current.x, mouse.current.y, "THWIP!");
      } else if (buffer.current.endsWith(SYMBIOTE)) {
        buffer.current = "";
        const next = document.documentElement.dataset.theme !== "symbiote";
        document.documentElement.dataset.theme = next ? "symbiote" : "classic";
        fire(window.innerWidth / 2, window.innerHeight / 2, next ? "SYMBIOTE" : "CLASSIC");
      }
    };

    const onBurstEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail as { x: number; y: number; label?: string };
      fire(detail.x, detail.y, detail.label);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("web-burst", onBurstEvent);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("web-burst", onBurstEvent);
    };
  }, [fire]);

  return <WebBurst bursts={bursts} />;
}
