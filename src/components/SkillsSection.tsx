"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Languages: { bg: "bg-blue-light", text: "text-blue", dot: "bg-blue" },
  "Web & Frameworks": { bg: "bg-accent-light", text: "text-accent", dot: "bg-accent" },
  "AI / ML": { bg: "bg-green-light", text: "text-green", dot: "bg-green" },
  Tools: { bg: "bg-blue-light", text: "text-blue", dot: "bg-blue" },
  "Core CS": { bg: "bg-accent-light", text: "text-accent", dot: "bg-accent" },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 bg-bg-secondary">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">Skills</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
            What I Work With
          </h2>
        </motion.div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {Object.entries(skills).map(([category, items], catIndex) => {
            const colors = categoryColors[category] || { bg: "bg-bg-secondary", text: "text-fg", dot: "bg-fg" };

            return (
              <motion.div
                key={category}
                className="bg-surface border border-border rounded-xl p-5 transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.08, duration: 0.4 }}
              >
                <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  {category}
                </span>
                <div className="mt-3 space-y-1.5">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="block text-sm text-fg-secondary hover:text-fg transition-colors cursor-default"
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 + catIndex * 0.08 + i * 0.03, duration: 0.3 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
