"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch, ShieldCheck, Archive } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import TiltCard from "@/components/TiltCard";
import ProjectVisual from "@/components/ProjectVisual";

function MissionCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const live = Boolean(project.live);
  const coverTone = ["from-spider/25", "from-electric/25", "from-gold/20"][index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, rotate: index % 2 === 0 ? -1 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <article
          data-cursor="OPEN MISSION"
          className="group relative h-full glass rounded-2xl overflow-hidden flex flex-col hover:border-spider/50 transition-colors duration-500"
        >
          {/* Comic top banner */}
          <div className="relative px-5 pt-4 pb-3 border-b border-line/70 bg-gradient-to-br to-transparent via-transparent">
            <div className="flex items-center justify-between">
              <span className="comic-title text-[13px] tracking-[0.2em] text-spider">
                AMAZING MISSION <span className="text-frost/70">#{project.number}</span>
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  live
                    ? "text-green border-green/40 bg-green/10"
                    : "text-frost-dim border-line-bright bg-night-3"
                }`}
              >
                {live ? <ShieldCheck size={10} /> : <Archive size={10} />}
                {live ? "Live" : "Completed"}
              </span>
            </div>
            <p className="mt-1.5 text-[11px] text-frost-dim font-mono">
              {project.category} · {project.year}
            </p>
          </div>

          {/* Cover art */}
          <div className={`relative overflow-hidden border-b border-line/60 bg-gradient-to-br ${coverTone} to-transparent`}>
            <div className="aspect-[16/10]">
              <ProjectVisual type={project.visual as "contract-guard" | "carbon-optimizer" | "event-horizon"} />
            </div>
            <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-2/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-4 -right-3 comic-title text-[92px] leading-none text-frost/10 select-none">
              {project.number}
            </div>
          </div>

          {/* Body */}
          <div className="relative p-5 flex flex-col flex-1">
            <h3 className="comic-title text-3xl text-frost group-hover:text-spider transition-colors">
              {project.title}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-electric">{project.tagline}</p>
            <p className="mt-2.5 text-sm text-frost-dim leading-relaxed">{project.description}</p>

            <ul className="mt-4 space-y-1.5 flex-1">
              {project.details.map((detail, i) => (
                <li key={i} className="text-xs text-frost-dim flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-spider mt-1.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-night-3 border border-line text-frost-dim"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-line/60 flex items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-frost-dim hover:text-spider transition-colors"
              >
                <GitBranch size={13} />
                View Code
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric hover:text-frost transition-colors"
                >
                  Live Demo
                  <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>

          {/* Hover glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 box-glow-red rounded-2xl" />
        </article>
      </TiltCard>
    </motion.div>
  );
}

export default function CompletedMissions() {
  return (
    <SectionShell
      id="work"
      issue="04"
      eyebrow="Completed Missions"
      title="Missions Accomplished"
      description="Three successful missions. Every one shipped, battle-tested, and documented. Choose your issue to investigate."
      tone="blue"
      className="bg-night-2/60"
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
        {projects.map((project, i) => (
          <MissionCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
