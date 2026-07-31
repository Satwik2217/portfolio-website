"use client";
import { motion } from "framer-motion";
import { GitBranch, Code2, Star, BadgeCheck, FileCode2, AlertTriangle, ArrowUpRight } from "lucide-react";
import { codingProfiles } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import NumberCounter from "@/components/NumberCounter";

const icons = [GitBranch, Code2, BadgeCheck, FileCode2, Star];
const tones = [
  { border: "hover:border-frost/50", icon: "text-frost" },
  { border: "hover:border-gold/60", icon: "text-gold" },
  { border: "hover:border-green/60", icon: "text-green" },
  { border: "hover:border-electric/60", icon: "text-electric" },
  { border: "hover:border-spider/60", icon: "text-spider" },
];

export default function CodingDashboard() {
  return (
    <SectionShell
      id="profiles"
      issue="06"
      eyebrow="Patrol Network"
      title="Signal Tracker"
      description="Live feeds from the patrol network — competitive coding and open-source activity across platforms."
      tone="blue"
      className="bg-night-2/60"
    >
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {codingProfiles.map((profile, i) => {
          const Icon = icons[i];
          const tone = tones[i];
          const disabled = profile.url === "#";
          return (
            <motion.a
              key={profile.name}
              href={disabled ? undefined : profile.url}
              target={disabled ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-disabled={disabled}
              aria-label={`${profile.name} — ${disabled ? "profile coming soon" : profile.handle}`}
              className={`group relative glass rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 ${
                disabled ? "opacity-60 cursor-not-allowed" : `${tone.border} hover:-translate-y-1`
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className={`w-10 h-10 grid place-items-center rounded-xl bg-night-3 border border-line ${tone.icon}`}>
                  <Icon size={17} />
                </span>
                {!disabled && (
                  <ArrowUpRight
                    size={14}
                    className="text-frost-dim opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-frost">{profile.name}</h3>
                <p className="text-[11px] font-mono text-frost-dim mt-0.5 truncate">{profile.handle}</p>
              </div>

              <div className="pt-3 border-t border-line/60 flex items-end justify-between gap-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-frost-dim">{profile.statLabel}</span>
                <span className="text-2xl font-bold text-frost tabular-nums">
                  {profile.isPlaceholder && profile.statValue === 0 ? (
                    <span className="text-xs text-frost-dim font-semibold">—</span>
                  ) : (
                    <NumberCounter value={profile.statValue} />
                  )}
                </span>
              </div>

              {profile.isPlaceholder && (
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25 rounded-full px-2 py-0.5 w-fit">
                  <AlertTriangle size={8} />
                  Placeholder stat
                </span>
              )}
            </motion.a>
          );
        })}
      </div>
      <p className="mt-6 text-center text-[11px] text-frost-dim/70 max-w-xl mx-auto">
        Stats are illustrative placeholders synced from my profiles — update them in{" "}
        <code className="text-electric font-mono">src/data/portfolio.ts</code>. Codeforces profile is coming soon.
      </p>
    </SectionShell>
  );
}
