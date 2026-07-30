"use client";
import { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export default function NumberCounter({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString().padStart(2, "0"));

  if (isInView) {
    spring.set(value);
  }

  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </motion.span>
  );
}
