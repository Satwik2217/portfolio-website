"use client";
import { GitBranch, Globe, Mail, ArrowUp, ShieldCheck } from "lucide-react";
import { personalInfo, socialLinks, footerQuote } from "@/data/portfolio";
import { SpiderIcon } from "@/components/SpiderIcon";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dispatchSpiderEaster = () => {
    document.dispatchEvent(
      new CustomEvent("web-burst", {
        detail: {
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.4,
          label: "SM",
        },
      })
    );
  };

  return (
    <footer className="relative px-6 lg:px-10 pt-16 pb-8 border-t border-line bg-night-2/80 overflow-hidden">
      <div className="absolute inset-0 halftone opacity-25 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[90vw] h-[30vh] rounded-full bg-hero-blue/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <button
            onClick={dispatchSpiderEaster}
            className="group relative w-14 h-14 grid place-items-center rounded-full bg-spider/10 border border-spider/40 text-spider transition-all duration-300 hover:bg-spider hover:text-white hover:box-glow-red"
            aria-label="Click for a surprise"
            title="Psst... click me"
          >
            <SpiderIcon size={26} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse" />
          </button>

          <blockquote className="max-w-xl">
            <p className="comic-title text-2xl lg:text-3xl text-frost leading-snug">
              &ldquo;{footerQuote}&rdquo;
            </p>
            <cite className="mt-3 block text-xs not-italic text-frost-dim uppercase tracking-[0.25em]">
              — {personalInfo.name}, Friendly Neighborhood Developer
            </cite>
          </blockquote>

          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 grid place-items-center rounded-full glass text-frost-dim hover:text-frost hover:border-frost/50 transition-colors"
              aria-label="GitHub"
            >
              <GitBranch size={16} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 grid place-items-center rounded-full glass text-frost-dim hover:text-electric hover:border-electric/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Globe size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 grid place-items-center rounded-full glass text-frost-dim hover:text-spider hover:border-spider/50 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 grid place-items-center rounded-full glass text-frost-dim hover:text-gold hover:border-gold/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-frost-dim/70">
            <span>
              © {personalInfo.year} {personalInfo.name}
            </span>
            <span className="hidden sm:inline text-frost-dim/40">·</span>
            <span className="inline-flex items-center gap-1">
              Built with <ShieldCheck size={11} className="text-spider" />, webs & midnight
              caffeine — {personalInfo.location}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
