"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { projects } from "@/data/portfolio";
import ProjectVisual from "./ProjectVisual";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-16 lg:py-24 items-center border-b border-border last:border-b-0"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Visual */}
      <motion.div
        className={`order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative group">
          <ProjectVisual type={project.visual as "contract-guard" | "carbon-optimizer" | "event-horizon"} />
          {/* Cursor follower glow */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
        </div>
      </motion.div>

      {/* Content */}
      <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <motion.span
          className="text-xs font-semibold text-accent uppercase tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          {project.category}
        </motion.span>

        <motion.h3
          className="mt-2 text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold tracking-[-0.02em] leading-tight text-fg"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="mt-1 text-base text-accent font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          {project.tagline}
        </motion.p>

        <motion.p
          className="mt-4 text-sm text-fg-secondary leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          className="mt-4 flex flex-wrap gap-1.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 bg-bg-secondary text-fg-secondary rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Details */}
        <motion.ul
          className="mt-5 space-y-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {project.details.map((detail, i) => (
            <li key={i} className="text-sm text-fg-secondary flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </motion.ul>

        {/* Links */}
        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.3 }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-secondary hover:text-accent transition-colors"
          >
            <GitBranch size={15} />
            View Code
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              Live Demo
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      data-section="work"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">Featured Work</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
            Things I've Built
          </h2>
        </motion.div>

        <div className="mt-8 lg:mt-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
