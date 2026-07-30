"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolio";
import NumberCounter from "./NumberCounter";

export default function Achievements() {
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
          ACHIEVEMENTS
        </motion.h2>

        <div className="space-y-10">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-6 group cursor-default"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <motion.span
                className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tabular-nums min-w-[1.5em]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              >
                <NumberCounter value={i + 1} />
              </motion.span>
              <div className="pt-2">
                <h3 className="text-base lg:text-lg font-semibold group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
