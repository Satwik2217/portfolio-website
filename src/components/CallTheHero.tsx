"use client";
import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Mail, GitBranch, Globe, Send, Check, Loader2 } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";
import MagneticButton from "@/components/MagneticButton";
import { WebRadial } from "@/components/SpiderIcon";

type Status = "idle" | "firing" | "sent";

export default function CallTheHero() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("firing");
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `[Portfolio] Message from ${form.name || "a visitor"}`
    )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)}`;
    setTimeout(() => {
      setStatus("sent");
      window.location.href = mailto;
    }, 1500);
  };

  const inputClass =
    "w-full bg-night-3/70 border border-line rounded-xl px-4 py-3 text-sm text-frost placeholder:text-muted focus:border-spider/60 focus:outline-none focus:ring-1 focus:ring-spider/40 transition-colors";

  return (
    <SectionShell
      id="contact"
      issue="10"
      eyebrow="Call the Hero"
      title="Send a Web — Get an Answer"
      description="Have an idea, an opportunity, or a project that needs a friendly neighborhood developer? Shoot a web my way."
      tone="blue"
      align="center"
      className="bg-night-2/60"
    >
      <div ref={ref} className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto text-left">
        {/* Contact channels */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center gap-4"
        >
          <h3 className="text-xl font-bold text-frost">Direct channels</h3>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-spider/50 transition-colors"
          >
            <span className="w-11 h-11 grid place-items-center rounded-lg bg-spider/15 text-spider group-hover:bg-spider group-hover:text-white transition-colors">
              <Mail size={17} />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-frost-dim">Email</span>
              <span className="text-sm font-semibold text-frost">{personalInfo.email}</span>
            </span>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-frost/40 transition-colors"
          >
            <span className="w-11 h-11 grid place-items-center rounded-lg bg-night-3 text-frost border border-line group-hover:text-frost group-hover:border-frost/50 transition-colors">
              <GitBranch size={17} />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-frost-dim">GitHub</span>
              <span className="text-sm font-semibold text-frost">Satwik2217</span>
            </span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-electric/50 transition-colors"
          >
            <span className="w-11 h-11 grid place-items-center rounded-lg bg-electric/10 text-electric group-hover:bg-electric group-hover:text-night transition-colors">
              <Globe size={17} />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-frost-dim">LinkedIn</span>
              <span className="text-sm font-semibold text-frost">Satwik Mishra</span>
            </span>
          </a>
          <p className="text-xs text-frost-dim/70 mt-2 max-w-sm">
            Currently open to internships, freelance missions, and interesting collaborations.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative glass-strong rounded-2xl p-6 lg:p-8 noise overflow-hidden"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-spider/10 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />

          <div className="relative">
            <label htmlFor="contact-name" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-frost-dim mb-2">
              Hero Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className={inputClass}
              aria-required="true"
            />

            <label htmlFor="contact-email" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-frost-dim mt-5 mb-2">
              Contact Frequency
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className={inputClass}
              aria-required="true"
            />

            <label htmlFor="contact-message" className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-frost-dim mt-5 mb-2">
              The Mission
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the mission..."
              className={`${inputClass} resize-none`}
              aria-required="true"
            />

            <div className="mt-6 flex justify-end">
              <MagneticButton>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="relative inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white rounded-full btn-spidey box-glow-red disabled:opacity-80 min-w-[190px] justify-center"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        className="inline-flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <Send size={14} />
                        Shoot Web
                      </motion.span>
                    )}
                    {status === "firing" && (
                      <motion.span
                        key="firing"
                        className="inline-flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <Loader2 size={14} className="animate-spin" />
                        Thwip...
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span
                        key="sent"
                        className="inline-flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Check size={15} />
                        Web Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Web launch animation */}
                  <AnimatePresence>
                    {status === "firing" && (
                      <motion.span
                        key="web-anim"
                        className="absolute inset-0 grid place-items-center pointer-events-none"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      >
                        <motion.span
                          className="absolute inset-0 rounded-full border-2 border-frost/70"
                          initial={{ scale: 0.3 }}
                          animate={{ scale: 2.6, opacity: 0 }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                        <motion.span
                          className="absolute text-frost/70"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
                        >
                          <WebRadial size={90} />
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </MagneticButton>
            </div>

            <AnimatePresence>
              {status === "sent" && (
                <motion.p
                  className="mt-4 text-center text-xs text-green"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Web launched! Your mail client opened with the message — hit send and it&apos;s officially in the hero&apos;s hands.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </SectionShell>
  );
}
