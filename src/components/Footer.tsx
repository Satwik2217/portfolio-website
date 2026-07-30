"use client";
import { GitBranch, Globe, Mail, ArrowUp, Heart } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="px-6 lg:px-10 py-10 border-t border-border bg-bg-secondary">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold text-fg">
            {personalInfo.name}
          </p>
          <p className="text-xs text-fg-secondary mt-0.5">
            {personalInfo.tagline}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-fg transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={16} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-fg transition-colors"
            aria-label="LinkedIn"
          >
            <Globe size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-fg-secondary hover:text-fg transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {personalInfo.year} {personalInfo.name}
          </p>
          <span className="text-muted text-xs hidden sm:inline">
            ·
          </span>
          <p className="text-xs text-muted hidden sm:flex items-center gap-1">
            Made with <Heart size={10} className="text-accent" />, curiosity & too much coffee
          </p>
          <button
            onClick={scrollToTop}
            className="text-fg-secondary hover:text-accent transition-colors p-1"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
