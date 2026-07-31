"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WebRadial } from "@/components/SpiderIcon";

type Ripple = { id: number; x: number; y: number };

function WebRipple({ id, x, y, onDone }: { id: number; x: number; y: number; onDone: (id: number) => void }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0.9, scale: 0.15 }}
      animate={{ opacity: 0, scale: 1.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => onDone(id)}
    >
      <WebRadial size={56} className="text-spider/80 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [labelPos, setLabelPos] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const idRef = useRef(0);
  const lastOver = useRef<Element | null>(null);
  const lastMove = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    const pmq = window.matchMedia("(pointer: fine)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointer = () => setEnabled(pmq.matches && !rmq.matches);
    pmq.addEventListener("change", onPointer);
    rmq.addEventListener("change", onPointer);

    const startLoop = () => {
      if (running.current) return;
      running.current = true;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      lastMove.current = Date.now();
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      startLoop();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor], input, textarea, select");
      if (lastOver.current === interactive) return;
      lastOver.current = interactive;
      if (interactive instanceof HTMLElement && interactive.dataset.cursor) {
        setHovering(true);
        setLabel(interactive.dataset.cursor);
        setLabelPos(pos.current);
      } else {
        setHovering(Boolean(interactive));
        setLabel("");
      }
    };

    const onOut = () => {
      if (lastOver.current === null) return;
      lastOver.current = null;
      setHovering(false);
      setLabel("");
    };

    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (!interactive) return;
      const id = idRef.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    function tick() {
      if (!running.current) return;
      const t = pos.current;
      smooth.current.x += (t.x - smooth.current.x) * 0.14;
      smooth.current.y += (t.y - smooth.current.y) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate(${smooth.current.x - 14}px, ${smooth.current.y - 14}px)`;
      }
      const settled =
        Math.abs(t.x - smooth.current.x) < 0.1 && Math.abs(t.y - smooth.current.y) < 0.1;
      if (settled && Date.now() - lastMove.current > 200) {
        running.current = false;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);

    let style: HTMLStyleElement | null = null;
    if (pmq.matches && !rmq.matches) {
      style = document.createElement("style");
      style.id = "cc-style";
      style.textContent = "* { cursor: none !important }";
      document.head.appendChild(style);
    }

    return () => {
      running.current = false;
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      pmq.removeEventListener("change", onPointer);
      rmq.removeEventListener("change", onPointer);
      const s = document.getElementById("cc-style");
      if (s) s.remove();
      if (style) style.remove();
    };
  }, []);

  const removeRipple = useCallback(
    (id: number) => setRipples((prev) => prev.filter((r) => r.id !== id)),
    []
  );

  if (!enabled) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] pointer-events-none" style={{ isolation: "isolate" }}>
      {/* Dot */}
      <div ref={dot} className="absolute top-0 left-0">
        <div
          className={`rounded-full transition-colors duration-300 ${
            hovering ? "bg-spider shadow-[0_0_12px_rgba(230,36,41,0.8)]" : "bg-frost"
          }`}
          style={{ width: 12, height: 12 }}
        />
      </div>
      {/* Ring */}
      <div ref={ring} className="absolute top-0 left-0">
        <motion.div
          className="grid place-items-center rounded-full border border-spider/50"
          animate={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            opacity: hovering ? 1 : 0.55,
          }}
          transition={{ duration: 0.25 }}
        >
          {hovering && <WebRadial size={36} className="text-spider/40 animate-spin-slower" />}
        </motion.div>
      </div>
      {label && (
        <div
          className="fixed top-0 left-0"
          style={{
            transform: `translate(${labelPos.x + 20}px, ${labelPos.y + 16}px)`,
          }}
        >
          <span className="comic-title text-[11px] tracking-wider text-white bg-spider px-2 py-0.5 rounded-sm shadow-lg">
            {label}
          </span>
        </div>
      )}
      <AnimatePresence>
        {ripples.map((r) => (
          <WebRipple key={r.id} id={r.id} x={r.x} y={r.y} onDone={removeRipple} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
