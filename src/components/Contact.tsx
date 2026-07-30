"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const links = [
    { label: "GitHub", url: socialLinks.github },
    { label: "LinkedIn", url: socialLinks.linkedin },
    { label: "LeetCode", url: socialLinks.leetcode },
    { label: "GeeksforGeeks", url: socialLinks.geeksforgeeks },
    { label: "HackerRank", url: socialLinks.hackerrank },
  ];

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 border-t border-border">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.span
          className="text-xs tracking-[0.25em] text-accent font-mono block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          GET IN TOUCH
        </motion.span>

        <motion.h2
          className="mt-6 text-[clamp(2rem,5vw,5rem)] font-bold tracking-[-0.03em] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {personalInfo.name}
        </motion.h2>

        <motion.div
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-muted font-mono">
                EMAIL
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="block mt-2 text-sm text-foreground hover:text-accent transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-muted font-mono">
                PHONE
              </span>
              <a
                href={`tel:${personalInfo.phone}`}
                className="block mt-2 text-sm text-foreground hover:text-accent transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-muted font-mono">
                LOCATION
              </span>
              <p className="mt-2 text-sm text-muted">
                {personalInfo.location}
              </p>
            </div>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.25em] text-muted font-mono block mb-4">
              SOCIAL
            </span>
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
                >
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
