"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { education } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";

const chapterTitles = ["The First Web", "Spinning Stronger", "Becoming the Hero"];
const chapterAccents = ["text-electric", "text-gold", "text-spider"];

export default function OriginStory() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timeline = [...education].reverse();

  return (
    <SectionShell
      id="education"
      issue="02"
      eyebrow="Origin Story"
      title="Where the Hero Was Forged"
      description="Every hero starts somewhere. Follow the milestones that shaped this developer — from the first web to full-stack powers."
      tone="blue"
      className="bg-night-2/60"
    >
      <div ref={lineRef} className="relative mt-14 lg:mt-20 max-w-4xl mx-auto">
        {/* Timeline spine */}
        <div className="absolute left-[13px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-line" />
        <motion.div
          className="absolute left-[13px] lg:left-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-spider via-spider to-electric"
          style={{ scaleY }}
        />

        <div className="space-y-14">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            const chapter = chapterTitles[i] ?? `Chapter ${i + 1}`;
            const accent = chapterAccents[i] ?? "text-electric";
            return (
              <div key={i} className="relative grid lg:grid-cols-2 gap-6 lg:gap-16">
                {/* Node */}
                <motion.div
                  className="absolute left-[13px] lg:left-1/2 -translate-x-1/2 top-1 w-[26px] h-[26px] rounded-full bg-night-3 border-[3px] border-spider grid place-items-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <span className="w-2 h-2 rounded-full bg-spider animate-pulse" />
                </motion.div>

                <div className={`pl-10 lg:pl-0 ${isLeft ? "lg:col-start-1 lg:text-right lg:pr-2" : "lg:col-start-2 lg:pl-2"}`}>
                  <motion.div
                    className="glass rounded-2xl p-6 hover:border-electric/40 transition-colors"
                    initial={{ opacity: 0, y: 32, x: isLeft ? -18 : 18 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`flex items-center gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
                      <span className={`comic-title text-base tracking-wide ${accent}`}>{chapter}</span>
                      <span className="text-[11px] font-mono text-frost-dim border border-line rounded-full px-2.5 py-0.5">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-lg font-bold text-frost">{item.institution}</h3>
                    <p className="text-sm text-frost-dim mt-1">{item.degree}</p>
                    <div className={`mt-4 flex items-center gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
                      {"cgpa" in item && item.cgpa ? (
                        <span className="text-xs font-semibold text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1">
                          CGPA: {item.cgpa}
                        </span>
                      ) : null}
                      {"score" in item && item.score ? (
                        <span className="text-xs font-semibold text-electric bg-electric/10 border border-electric/30 rounded-full px-3 py-1">
                          Score: {item.score}
                        </span>
                      ) : null}
                    </div>
                  </motion.div>
                </div>
                <div className="hidden lg:block" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
