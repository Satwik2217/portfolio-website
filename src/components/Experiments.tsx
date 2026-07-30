"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiments } from "@/data/portfolio";

export default function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 overflow-hidden">
      <div ref={ref}>
        <motion.span
          className="text-xs tracking-[0.25em] text-muted font-mono block mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          EXPERIMENTS
        </motion.span>

        <div className="flex overflow-x-auto gap-8 pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory scrollbar-hide">
          {experiments.map((item, i) => (
            <motion.div
              key={item}
              className="flex-shrink-0 snap-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <div className="border border-border px-8 py-12 min-w-[200px] hover:border-accent transition-colors duration-300 group cursor-default">
                <span className="text-[10px] text-accent font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
