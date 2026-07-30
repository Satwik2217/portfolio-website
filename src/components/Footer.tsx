"use client";
import { ArrowUp, Mail, Globe, GitBranch } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="px-6 lg:px-10 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        <div>
          <p className="text-sm font-semibold tracking-wider">
            {personalInfo.name}
          </p>
          <p className="text-xs text-muted tracking-wider mt-1">
            {personalInfo.tagline}
          </p>
          <p className="text-xs text-muted mt-1">
            {personalInfo.location}
          </p>
          <p className="text-xs text-muted mt-4">
            &copy; {personalInfo.year} {personalInfo.name}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={16} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Globe size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs tracking-wider text-muted hover:text-foreground transition-colors group"
          aria-label="Back to top"
        >
          BACK TO TOP
          <ArrowUp
            size={14}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </footer>
  );
}
