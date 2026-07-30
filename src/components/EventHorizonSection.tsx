"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import EventHorizonScene from "@/components/EventHorizonScene";

export default function EventHorizonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32 bg-[#0A0808] text-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Featured Project
          </span>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-[-0.02em] leading-tight">
            Event Horizon
          </h2>
          <p className="mt-2 text-lg text-white/60 font-medium">
            AI Gesture Visualization
          </p>
          <p className="mt-3 max-w-2xl text-white/50 text-sm leading-relaxed">
            Gesture-controlled 3D particle visualization using MediaPipe Hands and Three.js.
            Move your mouse to interact — click to create a burst.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <EventHorizonScene />
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex flex-wrap gap-1.5">
            {["Three.js", "MediaPipe", "JavaScript"].map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 bg-white/10 text-white/60 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href="https://github.com/Satwik2217/event-horizon"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-accent transition-colors ml-auto"
          >
            <GitBranch size={15} />
            View Code
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
