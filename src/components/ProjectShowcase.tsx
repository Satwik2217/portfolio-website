"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/data/portfolio";
import ProjectVisual from "./ProjectVisual";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-16 lg:py-24 border-b border-border last:border-b-0"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="order-2 lg:order-1 flex flex-col justify-center">
        <motion.span
          className="text-[clamp(3rem,6vw,5rem)] font-bold text-accent/20 leading-none"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {project.number}
        </motion.span>
        <span className="mt-2 text-[10px] tracking-[0.25em] text-accent font-mono">
          {project.category}
        </span>
        <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.02em] leading-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-muted text-sm leading-relaxed max-w-md">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] tracking-wider px-3 py-1.5 border border-border text-muted font-mono hover:border-accent hover:text-accent transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="mt-6 space-y-2">
          {project.details.map((detail, i) => (
            <motion.li
              key={i}
              className="text-sm text-muted flex items-start gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            >
              <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {detail}
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-4">
          <MagneticButton>
            <a
              href={project.github}
              data-cursor="GITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-wider text-muted hover:text-foreground transition-colors border border-border hover:border-accent px-4 py-2.5"
            >
              <GitBranch size={14} />
              VIEW CODE
            </a>
          </MagneticButton>
          {project.live && (
            <MagneticButton>
              <a
                href={project.live}
                data-cursor="LIVE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-wider text-muted hover:text-accent transition-colors border border-border hover:border-accent px-4 py-2.5"
              >
                <ExternalLink size={14} />
                LIVE DEMO
              </a>
            </MagneticButton>
          )}
        </div>
      </div>

      <motion.div
        className="order-1 lg:order-2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <TiltCard>
          <div
            className="relative w-full aspect-[4/3] lg:aspect-video group cursor-pointer"
            data-cursor="VIEW PROJECT"
            tabIndex={0}
            role="img"
            aria-label={`Preview of ${project.title}`}
          >
            <ProjectVisual type={project.visual as "contract-guard" | "carbon-optimizer" | "event-horizon"} />
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      data-section="work"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs tracking-[0.25em] text-muted font-mono">
            SELECTED WORK
          </span>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-bold tracking-[-0.03em]">
            THINGS I&apos;VE BUILT
          </h2>
        </motion.div>

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
