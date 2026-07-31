"use client";
import { useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { skillGraph, type SkillNode } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import { WebRadial } from "@/components/SpiderIcon";

const CX = 320;
const CY = 320;
const CAT_R = 108;
const SKILL_R = 244;

const categoryColors: Record<string, string> = {
  Languages: "#4da3ff",
  "Web & Frameworks": "#e62429",
  "AI / ML": "#34d399",
  Tools: "#f5c518",
  "Core CS": "#4ad4e8",
};

const round2 = (n: number) => Math.round(n * 100) / 100;

function splitLines(name: string) {
  const words = name.split(" ");
  if (words.length === 1) return [name];
  return [words[0], words.slice(1).join(" ")];
}

function LevelDots({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-1" aria-label={`Level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i <= level ? "bg-spider" : "bg-line-bright"}`}
        />
      ))}
    </span>
  );
}

export default function SpiderPowers() {
  const categories = useMemo(
    () => [...new Set(skillGraph.map((s) => s.category))],
    []
  );

  const catNodes = useMemo(
    () =>
      categories.map((category, i) => ({
        category,
        x: round2(CX + CAT_R * Math.cos((i * Math.PI * 2) / categories.length - Math.PI / 2)),
        y: round2(CY + CAT_R * Math.sin((i * Math.PI * 2) / categories.length - Math.PI / 2)),
      })),
    [categories]
  );

  const skillPositions = useMemo(
    () =>
      skillGraph.map((node, i) => {
        const angle = (i * Math.PI * 2) / skillGraph.length - Math.PI / 2;
        return {
          node,
          x: round2(CX + SKILL_R * Math.cos(angle)),
          y: round2(CY + SKILL_R * Math.sin(angle)),
          angle,
        };
      }),
    []
  );

  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-20%" });
  const reduced = useReducedMotion();

  const activeSkill = hovered ?? selected?.name ?? null;
  const activeCategory =
    (activeSkill && skillGraph.find((s) => s.name === activeSkill)?.category) ?? null;

  const shown = selected ?? (hovered ? skillGraph.find((s) => s.name === hovered)! : null);

  return (
    <SectionShell
      id="skills"
      issue="03"
      eyebrow="Spider Powers"
      title="The Arsenal of Skills"
      description="Every power in the web. Hover or tap any node to inspect it — years of experience, and the missions that use it."
      tone="red"
    >
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center max-w-6xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <WebRadial size={520} className="text-frost/6" />
          </div>
          <svg
            ref={svgRef}
            viewBox="0 0 640 640"
            className="w-full h-auto relative"
            role="application"
            aria-label="Interactive skill web graph"
          >
            {/* Center */}
            <motion.g
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <circle cx={CX} cy={CY} r="52" fill="#0e1626" stroke="#e62429" strokeWidth="2.5" />
              <circle cx={CX} cy={CY} r="58" fill="none" stroke="#e62429" strokeOpacity="0.35" />
              <text
                x={CX}
                y={CY + 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f4f7fc"
                fontFamily="var(--font-bangers), sans-serif"
                fontSize="30"
                letterSpacing="3"
              >
                SATWIK
              </text>
            </motion.g>

            {/* Hub strands center → category */}
            {catNodes.map((c, i) => (
              <motion.line
                key={`hub-${c.category}`}
                x1={CX}
                y1={CY}
                x2={c.x}
                y2={c.y}
                stroke={activeCategory === c.category ? categoryColors[c.category] : "#223150"}
                strokeWidth={activeCategory === c.category ? 2.5 : 1.2}
                strokeDasharray="3 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: activeCategory === c.category ? 1 : 0.55 } : {}}
                transition={{ duration: reduced ? 0 : 0.5, delay: 0.1 + i * 0.06 }}
              />
            ))}

            {/* Strands skill → category */}
            {skillPositions.map(({ node, x, y }, i) => {
              const cat = catNodes.find((c) => c.category === node.category)!;
              const active =
                activeSkill === node.name || activeCategory === node.category;
              return (
                <motion.line
                  key={node.name}
                  x1={cat.x}
                  y1={cat.y}
                  x2={x}
                  y2={y}
                  stroke={active ? "#e62429" : "#223150"}
                  strokeWidth={active ? 2.5 : 1.2}
                  strokeDasharray="3 5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: active ? 1 : 0.55 } : {}}
                  transition={{ duration: reduced ? 0 : 0.6, delay: 0.2 + i * 0.02, ease: "easeInOut" }}
                />
              );
            })}

            {/* Category nodes */}
            {catNodes.map((c, i) => {
              const color = categoryColors[c.category];
              const active = activeCategory === c.category;
              return (
                <motion.g
                  key={c.category}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 220, damping: 15 }}
                  style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                >
                  <circle cx={c.x} cy={c.y} r={active ? 30 : 24} fill="#0e1626" stroke={color} strokeWidth="2.5" />
                  {active && (
                    <circle cx={c.x} cy={c.y} r="36" fill="none" stroke={color} strokeOpacity="0.5">
                      <animate attributeName="r" values="34;44;34" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text
                    x={c.x}
                    y={c.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight="700"
                    letterSpacing="0.5"
                  >
                    {c.category.split(" ")[0]}
                  </text>
                  <text
                    x={c.x}
                    y={c.y + 40}
                    textAnchor="middle"
                    fill={color}
                    fontSize="10"
                    opacity="0.85"
                  >
                    {c.category.split(" ").slice(1).join(" ")}
                  </text>
                </motion.g>
              );
            })}

            {/* Skill nodes */}
            {skillPositions.map(({ node, x, y }, i) => {
              const color = categoryColors[node.category];
              const active = activeSkill === node.name;
              const grouped = activeCategory === node.category;
              const lines = splitLines(node.name);
              return (
                <motion.g
                  key={node.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.035, type: "spring", stiffness: 200, damping: 15 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 34 : 22}
                    fill={active ? color : "#0e1626"}
                    stroke={color}
                    strokeWidth={active ? 3 : 2}
                    opacity={grouped || active ? 1 : 0.65}
                  />
                  {active && (
                    <circle cx={x} cy={y} r="42" fill="none" stroke={color} strokeOpacity="0.6">
                      <animate attributeName="r" values="40;52;40" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={x}
                      y={y + (lines.length === 2 ? (li === 0 ? -4 : 6) : 1)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={active ? "#05070e" : color}
                      fontSize={active ? 10 : 8}
                      fontWeight="700"
                    >
                      {line}
                    </text>
                  ))}
                  <text
                    x={x}
                    y={y + (y < CY ? -32 : 32)}
                    textAnchor="middle"
                    fill="#9ba7bc"
                    fontSize="10"
                    fontWeight="600"
                    opacity={active ? 1 : 0}
                  >
                    {node.years}
                  </text>
                </motion.g>
              );
            })}

            {/* Invisible hit targets */}
            {skillPositions.map(({ node, x, y }, i) => (
              <motion.g
                key={`hit-${node.name}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.035 }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="48"
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`Skill: ${node.name}. ${node.years} experience. Used in ${node.projects.join(", ")}.`}
                  aria-pressed={activeSkill === node.name}
                  onMouseEnter={() => setHovered(node.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.name)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setSelected(node)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(node);
                    }
                  }}
                  style={{ cursor: "pointer", outline: "none" }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Info panel */}
        <div className="relative min-h-[260px]">
          <motion.div
            key={shown?.name ?? "empty"}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-2xl p-6 noise relative overflow-hidden"
          >
            <div className="absolute inset-0 halftone opacity-50 pointer-events-none" />
            <div className="relative">
              {shown ? (
                <>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: categoryColors[shown.category] }}
                  >
                    {shown.category}
                  </span>
                  <h3 className="mt-1.5 comic-title text-4xl text-frost">{shown.name}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-sm text-frost-dim">{shown.years}</span>
                    <LevelDots level={shown.level} />
                  </div>
                  <div className="mt-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-frost-dim">Used In Missions</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {shown.projects.map((p) => (
                        <span
                          key={p}
                          className="text-xs px-2.5 py-1 rounded-full bg-night-3 border border-line text-frost-dim"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="mt-5 text-xs font-semibold text-frost-dim hover:text-spider transition-colors"
                  >
                    ✕ Close inspector
                  </button>
                </>
              ) : (
                <div className="py-6 text-center">
                  <WebRadial size={120} className="mx-auto text-frost/15 animate-spin-slower" />
                  <p className="mt-5 text-sm text-frost-dim max-w-xs mx-auto leading-relaxed">
                    The web of powers is live. <span className="text-frost font-semibold">Hover or tap any node</span> to
                    inspect a skill — its strands will light up in red.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <span key={cat} className="inline-flex items-center gap-1.5 text-[11px] text-frost-dim">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
