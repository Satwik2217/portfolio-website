"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import { SpiderIcon } from "@/components/SpiderIcon";

function useSymbiote() {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      document.documentElement.dataset.theme = next ? "symbiote" : "classic";
      return next;
    });
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s" && e.ctrlKey && e.shiftKey) toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);
  return { on, toggle };
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { on, toggle } = useSymbiote();

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    let ticking = false;
    let lastRun = 0;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const now = Date.now();
      if (ticking || now - lastRun < 150) return;
      ticking = true;
      lastRun = now;
      requestAnimationFrame(() => {
        let current = "hero";
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = section.getAttribute("data-section") || "hero";
          }
        });
        setActiveSection(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_8px_32px_-12px_rgba(5,7,14,0.9)]" : "bg-transparent"
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto px-5 lg:px-8 py-2.5 lg:py-3.5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => scrollTo("hero")}
              className="group flex items-center gap-2 text-sm font-bold tracking-widest text-frost uppercase"
              aria-label={`${personalInfo.shortName} — back to top`}
            >
              <span className="relative grid place-items-center w-8 h-8 rounded-full bg-spider/15 border border-spider/40 text-spider transition-all duration-300 group-hover:bg-spider group-hover:text-white group-hover:shadow-[0_0_20px_rgba(230,36,41,0.6)]">
                <SpiderIcon size={16} />
              </span>
              <span className="hidden sm:inline">{personalInfo.shortName}</span>
            </button>

            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={`relative px-3 py-1.5 text-[13px] transition-colors duration-300 group ${
                      active ? "text-frost" : "text-frost-dim hover:text-frost"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-3 right-3 -bottom-px h-[2px] rounded-full bg-spider transition-all duration-400 ${
                        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded-full text-frost-dim hover:text-gold hover:bg-gold/10 transition-colors"
                aria-label={on ? "Disable symbiote theme" : "Enable symbiote theme"}
                title="Symbiote mode (Ctrl+Shift+S)"
              >
                {on ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white rounded-full btn-spidey box-glow-red"
              >
                Call the Hero
              </button>
              <button
                className="xl:hidden text-frost p-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-night-2/95 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="comic-title text-2xl text-spider">MENU</span>
              <button
                className="text-frost p-1 hover:text-spider transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col justify-center flex-1 px-8 gap-1 overflow-y-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-baseline gap-4 py-2.5 text-left border-b border-line/60"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="comic-title text-spider/70 text-lg w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-bold text-frost group-hover:text-spider transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <motion.div
              className="px-8 pb-8 text-xs text-frost-dim font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Tip: type <span className="text-spider">THWIP</span> for a surprise
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
