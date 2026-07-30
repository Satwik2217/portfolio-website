"use client";
import { motion } from "framer-motion";

export default function SystemStatus() {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="flex items-center gap-3 text-[10px] tracking-wider text-muted font-mono">
        <span>SYSTEM STATUS</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
        <span className="text-accent">● ONLINE</span>
        <span className="text-border">|</span>
        <span>FOCUS: AI × FULL STACK</span>
        <span className="text-border">|</span>
        <span>BUILD: 2026</span>
      </div>
    </motion.div>
  );
}
