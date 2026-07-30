"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import RainbowStripes from "@/components/RainbowStripes";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = document.querySelectorAll("[data-section]");
      let current = "hero";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          current = section.getAttribute("data-section") || "hero";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-surface/85 backdrop-blur-lg shadow-[0_1px_0_0_#1E1C1A]"
            : "bg-transparent"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto px-6 lg:px-10 py-3 lg:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => scrollTo("hero")}
              className="text-sm font-semibold text-fg hover:text-accent transition-colors"
            >
              {personalInfo.shortName}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative text-sm text-fg-secondary hover:text-fg transition-colors py-1 group"
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-px left-0 h-[2px] bg-accent rounded-full transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="text-sm font-medium px-4 py-1.5 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors"
              >
                Let's Talk
              </button>
            </nav>

            <button
              className="lg:hidden text-fg p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        <RainbowStripes />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-5 right-6 text-fg hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xl font-semibold text-fg hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("contact")}
                className="mt-6 text-base font-medium px-6 py-2 bg-accent text-white rounded-full"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Let's Talk
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
