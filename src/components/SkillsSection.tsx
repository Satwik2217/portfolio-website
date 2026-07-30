"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.h2
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.03em] mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          TECHNICAL SCOPE
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveCategory(category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <span className="text-[10px] tracking-[0.25em] text-accent font-mono relative inline-block">
                {category}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </span>
              <div className="mt-4 space-y-2">
                {items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    className={`text-sm transition-all duration-300 cursor-default ${
                      activeCategory === category
                        ? "text-foreground translate-x-2"
                        : "text-muted"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + catIndex * 0.05 + i * 0.03, duration: 0.3 }}
                  >
                    <span className="inline-block group-hover:scale-105 transition-transform origin-left">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
