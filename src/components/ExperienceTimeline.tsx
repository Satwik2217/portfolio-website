"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";

function ExperienceItem({ item, index }: { item: (typeof experience)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 pb-12 last:pb-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Timeline line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-border" />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-[6px] w-[16px] h-[16px] rounded-full border-[3px] border-accent bg-bg z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
      />

      {/* Year badge */}
      <motion.span
        className="inline-block text-xs font-semibold text-accent bg-accent-light px-2.5 py-0.5 rounded-full mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {item.year}
      </motion.span>

      <motion.h3
        className="text-lg font-semibold text-fg"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {item.title}
      </motion.h3>
      <motion.p
        className="text-sm text-fg-secondary mt-0.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        {item.organization}
      </motion.p>

      <motion.ul
        className="mt-3 space-y-1.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {item.details.map((detail, i) => (
          <li key={i} className="text-sm text-fg-secondary flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-muted mt-2 flex-shrink-0" />
            {detail}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      data-section="experience"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={sectionRef} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">Experience</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em] mb-12">
            Where I've Worked
          </h2>
        </motion.div>

        <div>
          {experience.map((item, i) => (
            <ExperienceItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
