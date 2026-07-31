"use client";
import { useRef, useEffect, useState, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo, heroRoles, resumePath } from "@/data/portfolio";
import MagneticButton from "@/components/MagneticButton";
import { SpiderIcon, WebCorner, WebRadial } from "@/components/SpiderIcon";

gsap.registerPlugin(ScrollTrigger);

function seeded(i: number, seed: number) {
  let h = (Math.imul(i, 374761393) + Math.imul(seed, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function buildSkyline() {
  const buildings: { x: number; w: number; h: number; antenna?: boolean }[] = [];
  let x = -20;
  let i = 0;
  while (x < 3200) {
    const w = 60 + seeded(i, 1) * 140;
    const h = 80 + seeded(i, 2) * 260;
    const antenna = seeded(i, 3) > 0.82;
    buildings.push({ x, w, h, antenna });
    x += w + 8 + seeded(i, 4) * 40;
    i++;
  }
  return buildings;
}

function Skyline() {
  const buildings = useMemo(() => buildSkyline(), []);

  return (
    <svg
      viewBox="0 0 3200 420"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bldgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1730" />
          <stop offset="100%" stopColor="#060a18" />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => {
        const baseY = 420 - b.h;
        const cols = Math.floor(b.w / 22);
        const rows = Math.floor(b.h / 30);
        return (
          <g key={i}>
            <rect x={b.x} y={baseY} width={b.w} height={b.h} fill="url(#bldgGrad)" />
            <rect x={b.x} y={baseY} width={b.w} height={b.h} fill="none" stroke="#1a2a4e" strokeOpacity="0.5" />
            {b.antenna && (
              <g>
                <rect x={b.x + b.w / 2 - 2} y={baseY - 26} width="4" height="26" fill="#16255c" />
                <circle cx={b.x + b.w / 2} cy={baseY - 30} r="3" fill="#e62429" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
            {Array.from({ length: rows }).map((_, r) =>
              Array.from({ length: cols }).map((_, c) => {
                const lit = seeded(i * 31 + r * 7 + c * 13, 5) > 0.42;
                const warm = seeded(i * 17 + r * 3 + c * 11, 6) > 0.6;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={b.x + 6 + c * 22}
                    y={baseY + 10 + r * 30}
                    width="10"
                    height="13"
                    fill={lit ? (warm ? "#f5c518" : "#4da3ff") : "#0a1226"}
                    opacity={lit ? 0.85 : 1}
                  />
                );
              })
            )}
          </g>
        );
      })}
    </svg>
  );
}

const MemoSkyline = memo(Skyline);

function HeroEmblem() {
  return (
    <div className="relative grid place-items-center">
      <motion.div
        className="absolute w-[340px] h-[340px] rounded-full border border-spider/20"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute w-[360px] h-[360px] grid place-items-center">
        <WebRadial size={360} className="text-frost/15 animate-spin-slower" />
      </div>
      <div className="absolute w-[240px] h-[240px] grid place-items-center">
        <WebRadial size={240} className="text-electric/20 animate-spin-slow" />
      </div>
      <motion.div
        className="relative grid place-items-center w-40 h-40 rounded-full bg-night-3/80 border border-spider/40 box-glow-red"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-2 rounded-full border border-dashed border-line-bright animate-spin-slow" />
        <SpiderIcon size={72} className="text-spider drop-shadow-[0_0_18px_rgba(230,36,41,0.7)]" />
        <span className="absolute -bottom-3 comic-title text-sm tracking-[0.25em] text-frost bg-spider px-3 py-0.5 rounded-sm rotate-[-4deg] shadow-lg">
          SM
        </span>
      </motion.div>
    </div>
  );
}

const MemoHeroEmblem = memo(HeroEmblem);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const skyline = gsap.utils.toArray<HTMLElement>(".hero-skyline");
        skyline.forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 0 },
            {
              yPercent: 22,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        gsap.fromTo(
          ".hero-moon",
          { yPercent: 0 },
          {
            yPercent: 34,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".hero-content",
          { y: 0, opacity: 1 },
          {
            y: -90,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "72% top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % heroRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const scrollTo = (id: string) => {
    document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative min-h-screen flex items-center pt-28 pb-40 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(22,37,92,0.55), transparent 60%), linear-gradient(180deg, #04060e 0%, #080d1d 55%, #0b1228 100%)",
        }}
      />

      {/* Moon */}
      <div className="hero-moon absolute top-[12%] right-[10%] w-24 h-24 lg:w-32 lg:h-32 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #f7f3e3, #d8d2bc 55%, #b9b3a0 100%)",
          boxShadow: "0 0 60px rgba(247,243,227,0.35), 0 0 140px rgba(247,243,227,0.18)",
        }}
      >
        <div className="absolute top-[30%] left-[20%] w-5 h-5 rounded-full bg-[#c4bda8]/70" />
        <div className="absolute top-[55%] left-[55%] w-3 h-3 rounded-full bg-[#c4bda8]/60" />
        <div className="absolute top-[15%] left-[60%] w-4 h-4 rounded-full bg-[#c4bda8]/50" />
      </div>

      {/* Clouds */}
      {!reduced && (
        <>
          <div className="cloud top-[16%] w-[34vw] h-[9vh]" style={{ ["--cloud-duration" as string]: "110s", ["--cloud-delay" as string]: "-20s" }} />
          <div className="cloud top-[30%] w-[26vw] h-[7vh]" style={{ ["--cloud-duration" as string]: "140s", ["--cloud-delay" as string]: "-70s" }} />
          <div className="cloud top-[8%] w-[20vw] h-[6vh]" style={{ ["--cloud-duration" as string]: "90s", ["--cloud-delay" as string]: "-40s" }} />
        </>
      )}

      {/* Web strands from corners */}
      <WebCorner className="hero-web absolute -top-10 -left-8 w-[420px] h-[420px] text-frost/10 rotate-180" />
      <WebCorner className="hero-web absolute -bottom-16 -right-10 w-[460px] h-[460px] text-frost/8" />

      {/* Headline glints */}
      <div className="absolute top-1/2 left-0 w-px h-[40vh] bg-gradient-to-b from-transparent via-electric/30 to-transparent" />

      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-frost-dim glass px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-spider animate-pulse" />
                Friendly Neighborhood Developer
              </span>
            </motion.div>

            <h1 className="mt-6 text-[clamp(2.6rem,8vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-frost">
              <motion.span
                className="block text-frost-dim text-[clamp(1.4rem,3.4vw,2.2rem)] font-sans font-semibold tracking-normal"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Hi, I&apos;m
              </motion.span>
              <motion.span
                className="block mt-2"
                initial={{ opacity: 0, y: 46 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Satwik{" "}
                <span className="spider-gradient-text text-glow-red">Mishra.</span>
              </motion.span>
            </h1>

            <motion.div
              className="mt-5 h-9 flex items-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="inline-flex items-center gap-3 text-lg lg:text-2xl font-semibold text-electric"
                  initial={{ y: 26, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -26, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="w-8 h-[2px] bg-electric/60" />
                  {heroRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="mt-6 max-w-xl text-frost-dim leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {personalInfo.introStatement} From full-stack applications to AI-powered
              systems, I ship products that feel alive — from {personalInfo.location}.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
            >
              <MagneticButton>
                <button
                  onClick={() => scrollTo("work")}
                  className="group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-full btn-spidey box-glow-red"
                >
                  <Target size={15} />
                  View Missions
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-frost rounded-full glass hover:border-electric/60 hover:text-electric transition-colors"
                >
                  <FileText size={15} />
                  Download Resume
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MemoHeroEmblem />
          </motion.div>
        </div>
      </div>

      {/* Skyline */}
      <div className="hero-skyline absolute bottom-0 left-0 right-0 h-[38vh] lg:h-[44vh] min-h-[260px] z-0">
        <MemoSkyline />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-night to-transparent pointer-events-none z-[1]" />

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-frost-dim hover:text-spider transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Swing Down</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
