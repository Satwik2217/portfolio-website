"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { exploring } from "@/data/portfolio";

export default function CurrentlyExploring() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 bg-surface border-y border-border overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.span
          className="text-xs tracking-[0.25em] text-muted font-mono block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          CURRENTLY EXPLORING
        </motion.span>

        <div className="mt-8 flex flex-wrap gap-3">
          {exploring.map((item, i) => (
            <motion.span
              key={item}
              className="text-[clamp(1rem,2vw,1.5rem)] font-mono tracking-[-0.02em] px-4 py-2 border border-border text-muted hover:text-accent hover:border-accent transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
