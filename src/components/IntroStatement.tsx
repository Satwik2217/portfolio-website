"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";

function AnimatedLine({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.p
        className="text-[clamp(2rem,6vw,6rem)] font-bold leading-[1.1] tracking-[-0.03em]"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.7,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}

export default function IntroStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const lines = personalInfo.introStatement.split("\n");

  return (
    <section
      data-section="intro"
      className="min-h-screen flex flex-col justify-center px-6 lg:px-10 py-20"
    >
      <div ref={ref} className="max-w-5xl">
        {lines.map((line, i) => (
          <AnimatedLine key={i} text={line} index={i} />
        ))}
      </div>
      <motion.p
        className="mt-10 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-muted max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {personalInfo.introBody}
      </motion.p>
    </section>
  );
}
