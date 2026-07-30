"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";

function ExperienceItem({
  item,
}: {
  item: (typeof experience)[0];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 lg:pl-12 pb-16 last:pb-0 border-l border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute left-[-4.5px] top-0 w-[9px] h-[9px] rounded-full bg-accent"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.3 }}
      />
      <motion.span
        className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-accent/15 leading-none block"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {item.year}
      </motion.span>
      <motion.h3
        className="mt-2 text-lg lg:text-xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {item.title}
      </motion.h3>
      <motion.p
        className="mt-1 text-xs tracking-[0.15em] text-muted"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {item.organization}
      </motion.p>
      <motion.ul
        className="mt-4 space-y-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {item.details.map((detail, i) => (
          <li key={i} className="text-sm text-muted flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-muted mt-1.5 flex-shrink-0" />
            {detail}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      data-section="experience"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs tracking-[0.25em] text-muted font-mono">
            EXPERIENCE
          </span>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-bold tracking-[-0.03em] mb-16">
            WHERE I&apos;VE WORKED
          </h2>
        </motion.div>

        <div className="space-y-0">
          {experience.map((item, i) => (
            <ExperienceItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
