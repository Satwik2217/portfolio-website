"use client";
import { motion, AnimatePresence } from "framer-motion";

export type Burst = {
  id: number;
  x: number;
  y: number;
  label?: string;
};

const SPOKES = Array.from({ length: 12 }).map((_, i) => (i * Math.PI * 2) / 12);

function BurstLayer({ burst }: { burst: Burst }) {
  return (
    <div
      className="fixed inset-0 z-[190] pointer-events-none overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <motion.div
        className="absolute"
        style={{ left: burst.x, top: burst.y }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          width="360"
          height="360"
          viewBox="-180 -180 360 360"
          className="block"
          aria-hidden="true"
        >
          <g stroke="#e8ecf4" strokeOpacity="0.9" strokeWidth="1.4" fill="none">
            {SPOKES.map((a, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={160 * Math.cos(a)}
                y2={160 * Math.sin(a)}
                strokeLinecap="round"
              />
            ))}
            {[60, 110, 160].map((r, ring) => (
              <path
                key={ring}
                d={SPOKES.map((a, i) => {
                  const x = r * Math.cos(a);
                  const y = r * Math.sin(a);
                  const mid = a + Math.PI / 12;
                  const mx = r * 0.85 * Math.cos(mid);
                  const my = r * 0.85 * Math.sin(mid);
                  return `${i === 0 ? "M" : "L"} ${x} ${y} Q ${mx} ${my}`;
                }).join(" ") + " Z"}
                strokeOpacity={0.8}
              />
            ))}
          </g>
          {burst.label && (
            <text
              x="0"
              y="-40"
              textAnchor="middle"
              fill="#e62429"
              fontSize="56"
              fontFamily="var(--font-bangers), sans-serif"
              letterSpacing="4"
              style={{ filter: "drop-shadow(0 2px 6px rgba(230,36,41,0.5))" }}
            >
              {burst.label}
            </text>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export default function WebBurst({ bursts }: { bursts: Burst[] }) {
  return (
    <AnimatePresence>
      {bursts.map((burst) => (
        <BurstLayer key={burst.id} burst={burst} />
      ))}
    </AnimatePresence>
  );
}
