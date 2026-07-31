"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";
import EventHorizonScene from "@/components/EventHorizonScene";

export default function EventHorizonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      data-section="experiments"
      className="relative px-6 lg:px-10 py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 halftone-blue opacity-30 pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="comic-title text-3xl lg:text-4xl text-spider opacity-70">#04</span>
            <span className="h-px w-10 bg-spider/50" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-spider">
              Experiment Zone
            </span>
          </div>
          <h2 className="mt-3 text-[clamp(2rem,5.5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05] text-frost text-glow-blue">
            Event Horizon
          </h2>
          <p className="mt-2 text-lg text-electric font-medium">AI Gesture Visualization</p>
          <p className="mt-3 max-w-2xl text-frost-dim text-sm leading-relaxed">
            Gesture-controlled 3D particle visualization using MediaPipe Hands and Three.js —
            mission #03&apos;s live laboratory. Move your mouse to bend the event horizon, click to burst it.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="rounded-2xl overflow-hidden border border-line box-glow-blue">
            <EventHorizonScene />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] text-frost-dim glass rounded-full px-3 py-1.5">
            <MousePointer2 size={12} className="text-electric" />
            Move to interact · Click to burst
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["Three.js", "MediaPipe", "JavaScript"].map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 bg-night-3 border border-line text-frost-dim rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href="https://github.com/Satwik2217/event-horizon"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-frost-dim hover:text-spider transition-colors ml-auto"
          >
            <Sparkles size={13} />
            View Code
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
