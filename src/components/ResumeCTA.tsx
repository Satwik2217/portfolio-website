"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Download, Eye, Lock } from "lucide-react";
import { personalInfo, resumePath, education } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import SatwikCharacter from "@/components/character/SatwikCharacter";
import MagneticButton from "@/components/MagneticButton";

export default function ResumeCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <SectionShell
      id="resume"
      issue="09"
      eyebrow="Mission Files"
      title="Request the Full Dossier"
      description="The complete record — education, experience, skills and every mission. One file, always updated."
      tone="red"
    >
      <div ref={ref} className="max-w-5xl mx-auto mt-12">
        <div className="relative glass-strong rounded-3xl overflow-hidden noise">
          <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] items-center gap-8 lg:gap-12 p-8 lg:p-12">
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full border border-dashed border-spider/40 animate-spin-slower" />
                <SatwikCharacter state="waving" size={190} interactive={false} />
              </div>
              <span className="comic-title text-lg tracking-[0.2em] text-spider">
                SIGNED · {personalInfo.shortName}
              </span>
            </motion.div>

            <div>
              {/* File preview card */}
              <motion.div
                className="relative bg-night-3 border border-line rounded-2xl p-5 flex items-center gap-4 hover:border-spider/40 transition-colors"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <span className="w-12 h-14 grid place-items-center rounded-lg bg-spider/15 text-spider flex-shrink-0">
                  <FileText size={22} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-frost truncate">Satwik_Mishra_Off_Campus.pdf</p>
                  <p className="text-[11px] text-frost-dim mt-0.5 font-mono">
                    {personalInfo.name} · {education[0].degree}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-green font-semibold uppercase tracking-wider">
                    <Lock size={9} />
                    Cleared for viewing
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.28, duration: 0.4 }}
              >
                <MagneticButton>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-full btn-spidey box-glow-red"
                  >
                    <Eye size={15} />
                    View Resume
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href={resumePath}
                    download
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-frost rounded-full glass hover:border-electric/60 hover:text-electric transition-colors"
                  >
                    <Download size={15} />
                    Download
                  </a>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
