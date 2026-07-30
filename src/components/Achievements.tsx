"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/data/portfolio";
import { Trophy, Medal, Star, Award } from "lucide-react";

const icons = [Trophy, Medal, Star, Award];
const colors = [
  { bg: "bg-accent-light", text: "text-accent", border: "border-accent/20" },
  { bg: "bg-blue-light", text: "text-blue", border: "border-blue/20" },
  { bg: "bg-green-light", text: "text-green", border: "border-green/20" },
  { bg: "bg-yellow/10", text: "text-yellow", border: "border-yellow/20" },
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 bg-bg-secondary">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">Achievements</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
            Highlights
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((item, i) => {
            const Icon = icons[i];
            const color = colors[i];

            return (
              <motion.div
                key={i}
                className={`flex items-start gap-4 p-5 bg-surface border ${color.border} rounded-xl transition-shadow duration-300`}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color.text} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fg">{item.title}</h3>
                  <p className="text-xs text-fg-secondary mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
