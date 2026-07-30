"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RainbowStripes({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`relative w-full h-1 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 animate-rainbow-stripes"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}
