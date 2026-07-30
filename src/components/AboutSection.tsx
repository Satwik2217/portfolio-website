"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { Code2, Brain, Sparkles, Workflow, Bot, Palette, Wrench, ArrowRight } from "lucide-react";

const interestIcons: Record<string, React.ReactNode> = {
  "AI Engineering": <Brain size={16} />,
  "Full-Stack Development": <Code2 size={16} />,
  "Generative AI": <Sparkles size={16} />,
  "RAG Systems": <Workflow size={16} />,
  "Agentic AI": <Bot size={16} />,
  "Creative Coding": <Palette size={16} />,
  "Developer Tools": <Wrench size={16} />,
  "Automation": <ArrowRight size={16} />,
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      data-section="about"
      className="px-6 lg:px-10 py-20 lg:py-32"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">About</span>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-tight">
              {personalInfo.aboutTitle}
            </h2>
          </div>

          <div className="lg:col-span-3">
            <p className="text-base lg:text-lg text-fg-secondary leading-relaxed">
              {personalInfo.aboutBody}
            </p>

            <div className="mt-8">
              <span className="text-xs font-semibold text-fg uppercase tracking-widest mb-4 block">
                Things I'm Into
              </span>
              <div className="flex flex-wrap gap-2">
                {personalInfo.interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-sm text-fg-secondary rounded-lg hover:border-accent hover:text-accent transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.3 }}
                  >
                    {interestIcons[interest]}
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
