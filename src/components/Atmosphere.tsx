"use client";
import { useReducedMotion } from "framer-motion";
import { WebCorner } from "@/components/SpiderIcon";

const PARTICLES = [
  { left: "6%", top: "22%", size: 3, delay: 0, dur: 5 },
  { left: "14%", top: "68%", size: 2, delay: 1.2, dur: 6 },
  { left: "22%", top: "38%", size: 2, delay: 0.6, dur: 4.5 },
  { left: "31%", top: "82%", size: 3, delay: 2, dur: 7 },
  { left: "44%", top: "14%", size: 2, delay: 0.3, dur: 5.5 },
  { left: "58%", top: "72%", size: 2, delay: 1.6, dur: 6.5 },
  { left: "67%", top: "30%", size: 3, delay: 0.9, dur: 4.8 },
  { left: "76%", top: "58%", size: 2, delay: 2.4, dur: 6 },
  { left: "85%", top: "16%", size: 2, delay: 1.1, dur: 5.2 },
  { left: "91%", top: "74%", size: 3, delay: 0.4, dur: 6.8 },
  { left: "37%", top: "52%", size: 2, delay: 1.8, dur: 5 },
  { left: "80%", top: "88%", size: 2, delay: 0.7, dur: 6.2 },
];

export default function Atmosphere() {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-night" />

      {/* Light rays */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-25"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(46,92,255,0.28) 40deg, transparent 90deg, rgba(230,36,41,0.22) 150deg, transparent 210deg, rgba(46,92,255,0.16) 280deg, transparent 340deg)",
          filter: "blur(70px)",
        }}
      />

      {/* Corner webs */}
      <WebCorner className="absolute -top-4 -left-4 w-[340px] h-[340px] text-frost/8 rotate-180" />
      <WebCorner className="absolute -bottom-4 -right-4 w-[420px] h-[420px] text-frost/8" />

      {/* Floating particles */}
      {!reduced &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-frost/40 animate-twinkle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}

      {/* Bottom city glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] h-[46vh]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(22,37,92,0.5), rgba(5,7,14,0) 65%)",
        }}
      />
    </div>
  );
}
