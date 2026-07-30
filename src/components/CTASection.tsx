"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import MagneticButton from "./MagneticButton";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      data-section="contact"
      className="px-6 lg:px-10 py-20 lg:py-40 min-h-screen flex items-center"
    >
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <div className="overflow-hidden">
          <motion.h2
            className="text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9]"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            LET&apos;S BUILD
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] text-accent"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            SOMETHING
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9]"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            USEFUL.
          </motion.h2>
        </div>

        <motion.div
          className="mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.25em] text-muted font-mono mb-4">
            {personalInfo.ctaSubtitle}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {personalInfo.ctaRoles.map((role) => (
              <span
                key={role}
                className="text-sm text-muted border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-all duration-300"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <MagneticButton>
            <a
              href="/Satwik_Mishra_Off_Campus.pdf"
              data-cursor="DOWNLOAD"
              download
              className="flex items-center gap-2 px-6 py-3 bg-accent text-background text-xs tracking-wider font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <Download size={14} />
              DOWNLOAD RESUME
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={socialLinks.github}
              data-cursor="GITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border text-xs tracking-wider text-foreground hover:border-accent transition-all duration-300"
            >
              GITHUB
              <ArrowUpRight size={12} />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={socialLinks.linkedin}
              data-cursor="LINKEDIN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border text-xs tracking-wider text-foreground hover:border-accent transition-all duration-300"
            >
              LINKEDIN
              <ArrowUpRight size={12} />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={`mailto:${personalInfo.email}`}
              data-cursor="CONTACT"
              className="flex items-center gap-2 px-6 py-3 border border-border text-xs tracking-wider text-foreground hover:border-accent transition-all duration-300"
            >
              EMAIL ME
              <ArrowUpRight size={12} />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
