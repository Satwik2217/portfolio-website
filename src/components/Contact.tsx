"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, GitBranch, Globe, Mail } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import GamingCharacter from "@/components/GamingCharacter";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      data-section="contact"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left */}
          <div>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">Contact</span>
            <h2 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-tight text-fg">
              Have an idea?
            </h2>
            <p className="mt-3 text-lg text-fg-secondary">
              Let's build something. I'm always open to interesting projects, collaborations, and opportunities.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-3 text-fg-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <span className="text-xs text-fg-secondary/60 uppercase tracking-wider font-medium">Email</span>
                  <p className="text-sm font-medium">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-fg-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-light flex items-center justify-center flex-shrink-0 group-hover:bg-blue/20 transition-colors">
                  <GitBranch size={16} className="text-blue" />
                </div>
                <div>
                  <span className="text-xs text-fg-secondary/60 uppercase tracking-wider font-medium">GitHub</span>
                  <p className="text-sm font-medium">Satwik2217</p>
                </div>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-fg-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-light flex items-center justify-center flex-shrink-0 group-hover:bg-blue/20 transition-colors">
                  <Globe size={16} className="text-blue" />
                </div>
                <div>
                  <span className="text-xs text-fg-secondary/60 uppercase tracking-wider font-medium">LinkedIn</span>
                  <p className="text-sm font-medium">Satwik Mishra</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Gaming Character */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <GamingCharacter size={280} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
