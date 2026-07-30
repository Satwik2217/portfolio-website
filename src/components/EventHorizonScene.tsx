"use client";
import { useRef, useEffect, useCallback, useState } from "react";

export default function EventHorizonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const [mouseInside, setMouseInside] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const w = canvas.width;
    const h = canvas.height;
    const count = Math.min(180, Math.floor((w * h) / 3500));

    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * Math.min(w, h) * 0.35;
      const cx = w / 2;
      const cy = h / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        targetX: cx + Math.cos(angle) * radius,
        targetY: cy + Math.sin(angle) * radius,
        angle,
        radius,
        speed: 0.001 + Math.random() * 0.004,
        size: 0.8 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
        hue: 0 + Math.random() * 20,
      };
    });

    const animate = (time: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = "#0A0808";
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const len = particles.length;

      // Background glows (only if visible)
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      glow.addColorStop(0, "rgba(232, 89, 74, 0.04)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      const glow2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      glow2.addColorStop(0, "rgba(74, 127, 224, 0.02)");
      glow2.addColorStop(1, "transparent");
      ctx.fillStyle = glow2;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      const mousePullX = (mx - 0.5) * 80;
      const mousePullY = (my - 0.5) * 80;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        p.angle += p.speed;

        const dx = (mx * w) - p.x;
        const dy = (my * h) - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(1, 120 / (dist + 30));

        const orbitX = cx + Math.cos(p.angle) * p.radius;
        const orbitY = cy + Math.sin(p.angle) * p.radius;

        p.targetX = orbitX + mousePullX * force * 0.15;
        p.targetY = orbitY + mousePullY * force * 0.15;

        p.vx += (p.targetX - p.x) * 0.03;
        p.vy += (p.targetY - p.y) * 0.03;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        const distToMouse = Math.sqrt(
          Math.pow((mx * w) - p.x, 2) + Math.pow((my * h) - p.y, 2)
        );
        const brightness = 0.3 + (1 - Math.min(1, distToMouse / 200)) * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + Math.sin(time / 800 + p.phase) * 0.2), 0, Math.PI * 2);

        const alpha = 0.4 + Math.sin(time / 1000 + p.phase) * 0.2;
        ctx.fillStyle = `rgba(232, 89, 74, ${alpha * brightness})`;
        ctx.fill();

        // Connection lines: only check pairs where j > i (halves the O(N²) work)
        for (let j = i + 1; j < len; j++) {
          const other = particles[j];
          const ndx = p.x - other.x;
          const ndy = p.y - other.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
          if (ndist < 80) {
            ctx.strokeStyle = `rgba(232, 89, 74, ${(1 - ndist / 80) * 0.08 * brightness})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const onClick = useCallback(() => {
    // Burst effect - temporarily increase particle speeds
    particlesRef.current.forEach((p) => {
      p.vx += (Math.random() - 0.5) * 4;
      p.vy += (Math.random() - 0.5) * 4;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden group cursor-pointer"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => { setMouseInside(false); mouseRef.current = { x: 0.5, y: 0.5 }; }}
      onClick={onClick}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      {/* Overlay label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs text-white/60 font-mono tracking-widest uppercase">
          {mouseInside ? "Move mouse · Click to burst" : "Interact with me"}
        </p>
      </div>

      {/* Dark gradient edges */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0A0808] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0808] to-transparent pointer-events-none" />
    </div>
  );
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  phase: number;
  vx: number;
  vy: number;
  hue: number;
}
