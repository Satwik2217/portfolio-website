"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Code2, TerminalSquare, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";

const icons = [Briefcase, Code2, TerminalSquare];

export default function HeroLog() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionShell
      id="experience"
      issue="05"
      eyebrow="Hero Log"
      title="Mission Records"
      description="Every entry in the hero log — past missions that sharpened the skills used today."
      tone="red"
    >
      <div ref={lineRef} className="relative mt-14 lg:mt-20 max-w-3xl mx-auto">
        <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-line" />
        <motion.div
          className="absolute left-[15px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-spider via-spider to-electric"
          style={{ scaleY }}
        />

        <div className="space-y-12">
          {experience.map((item, i) => {
            const Icon = icons[i] ?? Briefcase;
            return (
              <motion.div
                key={i}
                className="relative pl-14"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Icon node */}
                <motion.div
                  className="absolute left-0 top-0 w-[32px] h-[32px] rounded-full bg-night-3 border-2 border-spider grid place-items-center text-spider box-glow-red"
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 14 }}
                >
                  <Icon size={14} />
                </motion.div>

                <div className="glass rounded-2xl p-6 hover:border-spider/40 transition-colors group">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="comic-title text-base text-gold">
                      MISSION {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-mono text-frost-dim border border-line rounded-full px-2.5 py-0.5">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-bold text-frost group-hover:text-spider transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-frost-dim flex items-center gap-1.5">
                    <MapPin size={12} className="text-electric" />
                    {item.organization}
                  </p>
                  <ul className="mt-3.5 space-y-2">
                    {item.details.map((detail, di) => (
                      <motion.li
                        key={di}
                        className="text-sm text-frost-dim flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + di * 0.1, duration: 0.4 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-spider mt-1.5 flex-shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
