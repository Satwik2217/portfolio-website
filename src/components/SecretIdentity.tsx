"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Network, Brain, Globe, Cloud, MapPin, GraduationCap, User, CalendarDays, BadgeCheck } from "lucide-react";
import { personalInfo, education, careerGoals, specialAbilities } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import TiltCard from "@/components/TiltCard";

const abilityIcons: Record<string, React.ReactNode> = {
  code: <Code2 size={18} />,
  network: <Network size={18} />,
  brain: <Brain size={18} />,
  globe: <Globe size={18} />,
  cloud: <Cloud size={18} />,
};

function DossierRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-line/60 last:border-b-0">
      <span className="text-spider/80">{icon}</span>
      <span className="text-[11px] uppercase tracking-[0.2em] text-frost-dim w-28 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-frost">{value}</span>
    </div>
  );
}

export default function SecretIdentity() {
  const university = education[0];

  return (
    <SectionShell
      id="about"
      issue="01"
      eyebrow="Secret Identity"
      title="The Hero Behind the Code"
      description={`A classified dossier on ${personalInfo.name} — computer science student, full-stack developer, and AI enthusiast based in ${personalInfo.location}.`}
      tone="red"
    >
      <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        {/* Dossier card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard className="relative">
            <div className="relative glass-strong rounded-2xl overflow-hidden noise">
              <div className="absolute inset-0 halftone opacity-60 pointer-events-none" />

              {/* Classified stamp */}
              <div className="absolute top-4 right-4 z-10 comic-title text-lg tracking-[0.2em] text-spider/80 border-2 border-spider/60 rounded-md px-3 py-1 rotate-12">
                TOP SECRET
              </div>

              <div className="relative p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-3 rounded-full border border-dashed border-spider/40 animate-spin-slow" />
                    <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-spider/60 box-glow-red">
                      <Image
                        src="/photo.png"
                        alt={`Photo of ${personalInfo.name}`}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-frost-dim">Subject Name</p>
                    <h3 className="comic-title text-3xl text-frost mt-1">{personalInfo.name}</h3>
                    <p className="text-sm text-electric mt-1.5">{personalInfo.tagline}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-green bg-green/10 border border-green/30 px-3 py-1 rounded-full">
                      <BadgeCheck size={12} />
                      {personalInfo.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <DossierRow icon={<User size={15} />} label="Identity" value={personalInfo.name} />
                  <DossierRow
                    icon={<GraduationCap size={15} />}
                    label="Academy"
                    value={university.institution}
                  />
                  <DossierRow
                    icon={<Code2 size={15} />}
                    label="Degree"
                    value={university.degree}
                  />
                  <DossierRow
                    icon={<CalendarDays size={15} />}
                    label="Period"
                    value={university.period}
                  />
                  <DossierRow
                    icon={<MapPin size={15} />}
                    label="Base"
                    value={personalInfo.location}
                  />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Bio + abilities */}
        <div>
          <motion.p
            className="text-lg lg:text-xl text-frost-dim leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            {personalInfo.aboutBody}
          </motion.p>

          <motion.div
            className="mt-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-frost-dim">Career Objectives</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {careerGoals.map((goal, i) => (
                <motion.span
                  key={goal}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm text-frost glass rounded-full hover:border-spider/50 hover:text-spider transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-spider" />
                  {goal}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-frost-dim">Special Abilities</span>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialAbilities.map((ability, i) => (
                <motion.div
                  key={ability.name}
                  className="group glass rounded-xl p-4 hover:border-spider/40 hover:box-glow-red transition-all duration-300"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 grid place-items-center rounded-lg bg-spider/15 text-spider group-hover:bg-spider group-hover:text-white transition-colors">
                      {abilityIcons[ability.icon]}
                    </span>
                    <h4 className="text-sm font-bold text-frost">{ability.name}</h4>
                  </div>
                  <p className="mt-2 text-xs text-frost-dim leading-relaxed">{ability.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-frost-dim">Known Interests</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {personalInfo.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-3 py-1.5 bg-night-3 border border-line text-frost-dim rounded-lg hover:text-electric hover:border-electric/50 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
