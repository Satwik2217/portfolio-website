"use client";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const letterUp = {
  hidden: { y: 120, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeItem = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedLetters({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterUp}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  return (
    <section
      data-section="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-6 lg:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #84ff35 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[90vw] lg:max-w-[85vw]">
        <AnimatedLetters
          text="SATWIK"
          className="text-[clamp(3.5rem,14vw,13rem)] font-bold leading-[0.85] tracking-[-0.04em] text-foreground"
        />
        <AnimatedLetters
          text="MISHRA"
          className="text-[clamp(3.5rem,14vw,13rem)] font-bold leading-[0.85] tracking-[-0.04em] text-foreground mt-[-0.03em]"
        />
      </div>

      <motion.div
        className="relative z-10 mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeItem}
          className="text-[clamp(0.9rem,1.5vw,1.2rem)] leading-relaxed text-muted max-w-xl"
        >
          <span className="text-accent">{personalInfo.tagline}</span>
          <br />
          {personalInfo.description}
        </motion.p>

        <motion.div
          variants={fadeItem}
          className="lg:text-right flex flex-col items-start lg:items-end gap-2"
        >
          <span className="text-xs tracking-[0.2em] text-muted">
            {personalInfo.location}
          </span>
          <span className="text-xs tracking-[0.2em] text-muted">
            {personalInfo.year}
          </span>
          <span className="text-xs tracking-[0.2em] text-accent mt-1">
            {personalInfo.focus}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 mt-16 lg:mt-24 flex items-center gap-3 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.3em]">SCROLL TO EXPLORE</span>
        <motion.div
          className="w-8 h-px bg-muted"
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.span
          className="text-xs"
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
