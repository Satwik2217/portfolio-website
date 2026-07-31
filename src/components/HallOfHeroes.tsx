"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, BadgeCheck, GraduationCap } from "lucide-react";
import { achievements, certifications } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";

const icons = [Trophy, Medal, Star, Award];
const tones = [
  { text: "text-gold", bg: "bg-gold/10", border: "border-gold/30" },
  { text: "text-electric", bg: "bg-electric/10", border: "border-electric/30" },
  { text: "text-green", bg: "bg-green/10", border: "border-green/30" },
  { text: "text-spider", bg: "bg-spider/10", border: "border-spider/30" },
];

export default function HallOfHeroes() {
  return (
    <SectionShell
      id="achievements"
      issue="07"
      eyebrow="Hall of Heroes"
      title="Honors & Badges"
      description="Trophies won, badges earned, and certifications collected on the journey so far."
      tone="red"
    >
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {achievements.map((item, i) => {
          const Icon = icons[i];
          const tone = tones[i];
          return (
            <motion.div
              key={item.number}
              className="group relative glass rounded-2xl p-6 overflow-hidden hover:box-glow-red transition-shadow duration-300"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />
              <span className="absolute -top-3 -right-1 comic-title text-7xl text-frost/5 select-none">
                {item.number}
              </span>
              <div className="relative">
                <span className={`inline-grid place-items-center w-12 h-12 rounded-xl border ${tone.border} ${tone.bg} ${tone.text} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-bold text-frost">{item.title}</h3>
                <p className="mt-1 text-xs text-frost-dim">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-14 max-w-4xl mx-auto">
        <motion.h3
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-frost-dim"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GraduationCap size={14} className="text-spider" />
          Certifications & Training
        </motion.h3>
        <div className="mt-4 space-y-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 glass rounded-xl px-5 py-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <BadgeCheck size={18} className="text-electric flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-frost truncate">{cert.title}</p>
                <p className="text-xs text-frost-dim mt-0.5">{cert.issuer}</p>
              </div>
              <span className="text-[11px] font-mono text-frost-dim border border-line rounded-full px-2.5 py-1 flex-shrink-0">
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
