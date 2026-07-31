"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  issue: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "red" | "blue";
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

export default function SectionShell({
  id,
  issue,
  eyebrow,
  title,
  description,
  tone = "red",
  align = "left",
  className = "",
  children,
}: SectionShellProps) {
  const accent = tone === "red" ? "text-spider" : "text-electric";
  const glow = tone === "red" ? "text-glow-red" : "text-glow-blue";

  return (
    <section id={id} data-section={id} className={`relative px-6 lg:px-10 py-20 lg:py-28 ${className}`}>
      <div className={`max-w-7xl mx-auto ${align === "center" ? "text-center" : ""}`}>
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={align === "center" ? "flex flex-col items-center" : ""}
        >
          <div className="flex items-center gap-3">
            <span className={`comic-title text-3xl lg:text-4xl ${accent} opacity-70`}>
              #{issue}
            </span>
            <span className={`h-px w-10 ${tone === "red" ? "bg-spider/50" : "bg-electric/50"}`} />
            <span className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${accent}`}>
              {eyebrow}
            </span>
          </div>
          <h2 className={`mt-3 text-[clamp(2rem,5.5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05] text-frost ${glow}`}>
            {title}
          </h2>
          {description && (
            <p
              className={`mt-4 max-w-2xl text-frost-dim leading-relaxed ${
                align === "center" ? "mx-auto" : ""
              }`}
            >
              {description}
            </p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
