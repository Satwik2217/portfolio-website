"use client";
import { useEffect } from "react";

export default function ReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      document.documentElement.style.scrollBehavior = "auto";
    }
  }, []);

  return null;
}
