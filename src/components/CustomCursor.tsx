"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function CoffeeMug({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <rect x="3" y="5" width="13" height="14" rx="2" fill="currentColor" />
      <rect x="3" y="5" width="13" height="3" rx="1" fill="currentColor" fillOpacity="0.25" />
      <path
        d="M16 8.5h2.5a1.5 1.5 0 0 1 0 3H16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="4.5" y="7" width="10" height="10" rx="1" fill="#6B4226" />
      <ellipse cx="9.5" cy="7.5" rx="5" ry="1.2" fill="#7A5232" />
    </svg>
  );
}

function SteamParticle({
  id,
  onComplete,
}: {
  id: number;
  onComplete: (id: number) => void;
}) {
  const drift = (Math.random() - 0.5) * 24;
  const rise = -(18 + Math.random() * 28);
  const size = 3 + Math.random() * 5;
  const dur = 0.5 + Math.random() * 0.5;
  return (
    <motion.div
      className="absolute left-1/2 pointer-events-none"
      style={{ top: -4 }}
      initial={{ opacity: 0.45, scale: 0.3, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 1.6, x: drift, y: rise }}
      transition={{ duration: dur, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
    >
      <div
        className="rounded-full bg-current"
        style={{
          width: size,
          height: size,
          filter: "blur(3px)",
          opacity: 0.3,
        }}
      />
    </motion.div>
  );
}

function SpillDrop({
  id,
  x,
  y,
  angle,
  onComplete,
}: {
  id: number;
  x: number;
  y: number;
  angle: number;
  onComplete: (id: number) => void;
}) {
  const dist = 15 + Math.random() * 40;
  const dx = Math.cos(angle) * dist;
  const dy = Math.sin(angle) * dist + dist * 0.35;
  const size = 3 + Math.random() * 5;
  const dur = 0.3 + Math.random() * 0.3;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0.15, x: dx, y: dy }}
      transition={{ duration: dur, ease: "easeIn" }}
      onAnimationComplete={() => onComplete(id)}
    >
      <div
        style={{
          width: size,
          height: size * 1.4,
          backgroundColor: "#6B4226",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        }}
      />
    </motion.div>
  );
}

function SpillPuddle({
  id,
  rect,
  onComplete,
}: {
  id: number;
  rect: DOMRect;
  onComplete: (id: number) => void;
}) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const diagonal = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
  const scaleTo = Math.ceil(diagonal) + 20;

  return (
    <motion.div
      className="fixed z-[201] pointer-events-none"
      style={{
        left: cx,
        top: cy,
        width: 1,
        height: 1,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0.85 }}
      animate={{ scale: scaleTo, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => onComplete(id)}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, #6B4226 0%, #4A2C1E 35%, #3A1C0E 60%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [label, setLabel] = useState("");
  const [steams, setSteams] = useState<{ id: number }[]>([]);
  const [spills, setSpills] = useState<
    { id: number; x: number; y: number; angle: number }[]
  >([]);
  const [puddles, setPuddles] = useState<
    { id: number; rect: DOMRect }[]
  >([]);
  const [spillTilt, setSpillTilt] = useState(0);

  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const cursorEl = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const steamId = useRef(0);
  const spillId = useRef(0);
  const puddleId = useRef(0);
  const lastSteam = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const pmq = window.matchMedia("(pointer: fine)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsPointer(pmq.matches);
    setReduced(rmq.matches);

    const onPointerChange = (e: MediaQueryListEvent) =>
      setIsPointer(e.matches);
    const onReducedChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    pmq.addEventListener("change", onPointerChange);
    rmq.addEventListener("change", onReducedChange);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement;
      if (t.dataset.cursor) setLabel(t.dataset.cursor);
    };

    const onOut = () => setLabel("");

    const onDown = (e: MouseEvent) => {
      if (reduced) return;
      setSpillTilt(-28);
      setTimeout(() => setSpillTilt(0), 400);
      for (let i = 0; i < 14; i++) {
        const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.5;
        setSpills((prev) => [
          ...prev,
          { id: spillId.current++, x: e.clientX - 8, y: e.clientY - 2, angle },
        ]);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (reduced) return;

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a[href], button, [data-cursor]'
      ) as HTMLElement | null;
      if (!interactive) return;

      const rect = interactive.getBoundingClientRect();
      if (rect.width < 30 || rect.height < 24) return;

      const id = puddleId.current++;
      setPuddles((prev) => [...prev, { id, rect }]);

      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const sx = rect.left + Math.random() * rect.width;
        const sy = rect.top + Math.random() * rect.height;
        setSpills((prev) => [
          ...prev,
          { id: spillId.current++, x: sx, y: sy, angle },
        ]);
      }

      const link = interactive.closest("a");
      if (link && link.href && link.href !== "#") {
        e.preventDefault();
        const href = link.href;
        const targetAttr = link.target;
        setTimeout(() => {
          if (targetAttr === "_blank") {
            window.open(href, "_blank", "noopener");
          } else {
            window.location.href = href;
          }
        }, 450);
      }
    };

    const tick = () => {
      const t = pos.current;
      smooth.current.x += (t.x - smooth.current.x) * 0.12;
      smooth.current.y += (t.y - smooth.current.y) * 0.12;
      if (cursorEl.current) {
        cursorEl.current.style.transform = `translate(${smooth.current.x}px,${smooth.current.y}px)`;
      }
      if (!reduced) {
        const now = Date.now();
        if (now - lastSteam.current > 180) {
          lastSteam.current = now;
          setSteams((prev) => [...prev, { id: steamId.current++ }]);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("click", onClick, true);

    const interactive = document.querySelectorAll("[data-cursor]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onOver as EventListener);
      el.addEventListener("mouseleave", onOut);
    });

    if (pmq.matches) {
      const style = document.createElement("style");
      style.id = "cc-style";
      style.textContent = "* { cursor: none !important }";
      document.head.appendChild(style);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("click", onClick, true);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onOver as EventListener);
        el.removeEventListener("mouseleave", onOut);
      });
      const s = document.getElementById("cc-style");
      if (s) s.remove();
      pmq.removeEventListener("change", onPointerChange);
      rmq.removeEventListener("change", onReducedChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, reduced]);

  const removeSteam = useCallback(
    (id: number) => setSteams((prev) => prev.filter((s) => s.id !== id)),
    []
  );

  const removeSpill = useCallback(
    (id: number) => setSpills((prev) => prev.filter((s) => s.id !== id)),
    []
  );

  const removePuddle = useCallback(
    (id: number) => setPuddles((prev) => prev.filter((p) => p.id !== id)),
    []
  );

  if (!mounted || !isPointer) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] pointer-events-none" style={{ isolation: "isolate" }}>
      <div
        ref={cursorEl}
        className="absolute top-0 left-0"
        style={{ transform: "translate(-100px,-100px)" }}
      >
        <div
          className="relative flex items-center justify-center transition-[transform,color] duration-300 ease-out"
          style={{
            transform: `scale(${label ? 1.6 : 1}) rotate(${spillTilt}deg)`,
            color: label ? "var(--color-accent)" : "var(--color-fg)",
          }}
        >
          <CoffeeMug size={label ? 52 : 40} />
          {steams.map((s) => (
            <SteamParticle key={s.id} id={s.id} onComplete={removeSteam} />
          ))}
        </div>
        {label && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap">
            <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-fg text-bg">
              {label}
            </span>
          </div>
        )}
      </div>
      {puddles.map((p) => (
        <SpillPuddle key={p.id} id={p.id} rect={p.rect} onComplete={removePuddle} />
      ))}
      {spills.map((s) => (
        <SpillDrop
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          angle={s.angle}
          onComplete={removeSpill}
        />
      ))}
    </div>,
    document.body
  );
}
