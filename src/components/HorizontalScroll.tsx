"use client";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStack } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;
      if (scrollWidth <= 0) return;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight * 0.5}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isInView, isMobile]);

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
        <div
          ref={trackRef}
          className="flex items-center gap-16 px-10 will-change-transform"
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
        </div>
      </div>
    </section>
  );
}
