"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/data/portfolio";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 border-t border-border">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.h2
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.03em] mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          EDUCATION
        </motion.h2>

        <div className="space-y-12">
          {education.map((item, i) => (
            <motion.div
              key={i}
              className="border-b border-border pb-8 last:border-b-0 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base lg:text-lg font-semibold">
                    {item.institution}
                  </h3>
                  <p className="text-sm text-muted mt-1">{item.degree}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs text-muted tracking-wider block">
                    {item.period}
                  </span>
                  {"cgpa" in item && item.cgpa && (
                    <span className="text-xs text-accent font-mono mt-1 block">
                      CGPA: {item.cgpa}
                    </span>
                  )}
                  {"score" in item && item.score && (
                    <span className="text-xs text-accent font-mono mt-1 block">
                      {item.score}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
