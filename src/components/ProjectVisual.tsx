"use client";
import { useRef, useEffect } from "react";

function useCanvasVisibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const onVisibleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) onVisibleRef.current?.();
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { containerRef, isVisibleRef, onVisibleRef };
}

function ContractGuardVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, isVisibleRef, onVisibleRef } = useCanvasVisibility();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const documents = Array.from({ length: 5 }, (_, i) => ({
      x: 30 + i * ((rect.width - 60) / 4),
      y: rect.height / 2 + (Math.random() - 0.5) * 40,
      w: 40 + Math.random() * 15,
      h: 50 + Math.random() * 10,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
    }));

    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) {
        cancelAnimationFrame(animId);
        return;
      }
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#161616";
      ctx.fillRect(0, 0, rect.width, rect.height);

      documents.forEach((doc, i) => {
        doc.vy += (rect.height / 2 - doc.y) * 0.0005;
        doc.vy *= 0.97;
        doc.y += doc.vy;
        doc.x += Math.sin(Date.now() / 2000 + doc.phase) * 0.15;

        // Draw document
        const x = doc.x;
        const y = doc.y;
        ctx.fillStyle = "#1E1C1A";
        ctx.strokeStyle = "#3A3834";
        ctx.lineWidth = 1;
        roundRect(ctx, x, y, doc.w, doc.h, 3);
        ctx.fill();
        ctx.stroke();

        // Document lines
        ctx.fillStyle = "#3A3834";
        ctx.fillRect(x + 6, y + 10, doc.w - 12, 2);
        ctx.fillRect(x + 6, y + 18, doc.w - 20, 2);
        ctx.fillRect(x + 6, y + 26, doc.w - 14, 2);

        // Accent label
        ctx.fillStyle = "#E8594A";
        ctx.font = "6px ui-monospace, monospace";
        ctx.fillText(["DOC", "EMBED", "VECTOR", "SEARCH", "LLM"][i], x + 4, y - 5);

        // Flow particles between docs
        if (i < documents.length - 1) {
          const next = documents[i + 1];
          ctx.strokeStyle = "rgba(232, 89, 74, 0.2)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(x + doc.w, y + doc.h / 2);
          ctx.lineTo(next.x, next.y + next.h / 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Spawn particles
      if (Math.random() < 0.1) {
        particles.push({
          x: 30 + Math.random() * (rect.width - 60),
          y: 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.2 + Math.random() * 0.3,
          life: 1,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 89, 74, ${p.life * 0.4})`;
        ctx.fill();
      }
    };
    onVisibleRef.current = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      onVisibleRef.current = null;
    };
  }, [isVisibleRef, onVisibleRef]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function CarbonOptimizerVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, isVisibleRef, onVisibleRef } = useCanvasVisibility();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const agents = Array.from({ length: 8 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: 3 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.4 ? "#E8594A" : "#3A9D6E",
    }));

    const particles: { x: number; y: number; life: number }[] = [];
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) {
        cancelAnimationFrame(animId);
        return;
      }
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#161616";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Background grid
      ctx.strokeStyle = "rgba(30, 28, 26, 0.6)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < rect.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      const agentsLen = agents.length;
      for (let i = 0; i < agentsLen; i++) {
        const agent = agents[i];
        agent.x += agent.vx;
        agent.y += agent.vy;

        if (agent.x < 5 || agent.x > rect.width - 5) agent.vx *= -1;
        if (agent.y < 5 || agent.y > rect.height - 5) agent.vy *= -1;

        const cx = rect.width / 2;
        const cy = rect.height / 2;
        agent.vx += (cx - agent.x) * 0.0003;
        agent.vy += (cy - agent.y) * 0.0003;

        const speed = Math.sqrt(agent.vx * agent.vx + agent.vy * agent.vy);
        if (speed > 1.5) {
          agent.vx = (agent.vx / speed) * 1.5;
          agent.vy = (agent.vy / speed) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size, 0, Math.PI * 2);
        ctx.fillStyle = agent.color;
        ctx.fill();

        const gradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, agent.size * 3);
        gradient.addColorStop(0, agent.color.replace(")", ", 0.15)").replace("rgb", "rgba"));
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby agents (j > i to avoid duplicate checks)
        for (let j = i + 1; j < agentsLen; j++) {
          const other = agents[j];
          const dx = agent.x - other.x;
          const dy = agent.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(58, 157, 110, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(agent.x, agent.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        if (Math.random() < 0.02) {
          particles.push({ x: agent.x, y: agent.y, life: 1 });
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.01;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58, 157, 110, ${p.life * 0.3})`;
        ctx.fill();
      }
    };
    onVisibleRef.current = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      onVisibleRef.current = null;
    };
  }, [isVisibleRef, onVisibleRef]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function EventHorizonPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, isVisibleRef, onVisibleRef } = useCanvasVisibility();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const particles = Array.from({ length: 100 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * Math.min(rect.width, rect.height) * 0.4;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        angle,
        radius,
        speed: 0.002 + Math.random() * 0.005,
        size: 0.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let mouseX = cx;
    let mouseY = cy;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width * rect.width;
      mouseY = (e.clientY - r.top) / r.height * rect.height;
    };
    canvas.addEventListener("mousemove", onMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) {
        cancelAnimationFrame(animId);
        return;
      }
      ctx.fillStyle = "#161616";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      glow.addColorStop(0, "rgba(232, 89, 74, 0.06)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        p.angle += p.speed;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.min(1, 100 / (dist + 20));

        p.x = cx + Math.cos(p.angle) * p.radius + dx * pull * 0.1;
        p.y = cy + Math.sin(p.angle) * p.radius + dy * pull * 0.1;

        const alpha = 0.3 + Math.sin(Date.now() / 1000 + p.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 89, 74, ${alpha * 0.6})`;
        ctx.fill();
      });
    };
    onVisibleRef.current = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      onVisibleRef.current = null;
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [isVisibleRef, onVisibleRef]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function ProjectVisual({
  type,
}: {
  type: "contract-guard" | "carbon-optimizer" | "event-horizon";
}) {
  const visualMap = {
    "contract-guard": <ContractGuardVisual />,
    "carbon-optimizer": <CarbonOptimizerVisual />,
    "event-horizon": <EventHorizonPreview />,
  };

  return (
    <div className="w-full h-full min-h-[260px] bg-surface border border-border rounded-xl overflow-hidden">
      {visualMap[type]}
    </div>
  );
}
