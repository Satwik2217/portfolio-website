"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { techStack } from "@/data/portfolio";

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    const sw = track.scrollWidth - window.innerWidth;
    setScrollWidth(Math.max(0, sw));
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -scrollWidth || 0]);

  if (isMobile) {
    return (
      <section className="px-6 lg:px-10 py-20 bg-surface border-y border-border overflow-hidden">
        <span className="text-xs tracking-[0.25em] text-muted font-mono block mb-8">
          MY STACK
        </span>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="text-sm font-mono text-muted border border-border px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface border-y border-border"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 left-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex items-center gap-16 px-10 will-change-transform"
          style={{ x }}
        >
          <span className="text-xs tracking-[0.25em] text-muted font-mono whitespace-nowrap mr-8">
            MY STACK
          </span>
          {techStack.map((tech, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-[clamp(3rem,6vw,7rem)] font-bold tracking-[-0.04em] text-foreground/10 whitespace-nowrap hover:text-accent/30 transition-colors duration-300">
                {tech}
              </span>
              <span className="w-2 h-2 rounded-full bg-accent/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
