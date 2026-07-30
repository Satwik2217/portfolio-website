"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      data-section="about"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="overflow-hidden">
          <motion.h2
            className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9]"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {personalInfo.aboutTitle}
          </motion.h2>
        </div>
        <motion.p
          className="mt-8 text-[clamp(1rem,1.8vw,1.5rem)] leading-relaxed text-muted max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {personalInfo.aboutBody}
        </motion.p>
      </div>
    </section>
  );
}
