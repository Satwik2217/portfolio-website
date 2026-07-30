"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, GitBranch, Globe, Mail, FileText } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import WrestlingScene from "@/components/WrestlingScene";

function MagneticWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);
  return (
    <div ref={ref} className={`inline-block transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [charSize, setCharSize] = useState(350);

  useEffect(() => {
    const check = () => setCharSize(window.innerWidth < 768 ? 250 : 350);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToWork = () => {
    const el = document.querySelector('[data-section="work"]');
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector('[data-section="contact"]');
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-accent-light/70 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-xs font-medium text-accent bg-accent-light px-3 py-1 rounded-full mb-6">
                Full-Stack Developer × AI Engineer × Creative Technologist
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-fg">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Hi, I'm
              </motion.span>
              <motion.span
                className="block text-accent mt-1"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Satwik Mishra.
              </motion.span>
            </h1>

            <motion.p
              className="mt-4 text-lg lg:text-xl text-fg-secondary leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              I build intelligent software and interactive digital experiences — from full-stack applications to AI-powered systems and creative visualizations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <MagneticWrap>
                <button
                  onClick={scrollToWork}
                  className="group relative px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-dark transition-all duration-300"
                >
                  View My Work
                  <span className="inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href="/Satwik_Mishra_Off_Campus.pdf"
                  target="_blank"
                  className="group px-6 py-2.5 border-2 border-border text-fg text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-1.5"
                >
                  <FileText size={14} />
                  Resume
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <button
                  onClick={scrollToContact}
                  className="px-6 py-2.5 text-fg-secondary text-sm font-medium rounded-full hover:text-accent transition-colors"
                >
                  Let's Talk
                </button>
              </MagneticWrap>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-secondary hover:text-accent transition-colors p-1"
                aria-label="GitHub"
              >
                <GitBranch size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-secondary hover:text-accent transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Globe size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-fg-secondary hover:text-accent transition-colors p-1"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right: Wrestling Scene */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative shrink-0 rounded-full overflow-hidden shadow-2xl shadow-accent/10"
              style={{ width: charSize, height: charSize }}
            >
              <div className="absolute inset-0 rounded-full ring-2 ring-accent/30 ring-offset-2 ring-offset-bg z-10 pointer-events-none" />
              <WrestlingScene size={charSize} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToWork}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-fg-secondary hover:text-accent transition-colors"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
