"use client";
import { useRef, useEffect } from "react";

function ContractGuardVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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

    const labels = ["DOC", "EMBED", "VECTOR", "SEARCH", "LLM", "INSIGHT"];
    const spacing = rect.width / (labels.length + 1);
    const nodes = labels.map((_, i) => ({
      x: spacing * (i + 1),
      y: rect.height / 2 + (Math.random() - 0.5) * 80,
      vx: 0,
      vy: 0,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      nodes.forEach((node, i) => {
        node.vy += (rect.height / 2 - node.y) * 0.001;
        node.vy *= 0.98;
        node.y += node.vy;

        if (i < nodes.length - 1) {
          const next = nodes[i + 1];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = "rgba(132, 255, 53, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        gradient.addColorStop(0, "rgba(132, 255, 53, 0.4)");
        gradient.addColorStop(1, "rgba(132, 255, 53, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#84ff35";
        ctx.fill();

        ctx.fillStyle = "rgba(240, 240, 240, 0.5)";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels[i], node.x, node.y - 20);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={ref} className="w-full h-full min-h-[280px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function CarbonOptimizerVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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

    const points = Array.from({ length: 6 }, (_, i) => ({
      x: (rect.width / 7) * (i + 1),
      y: rect.height / 2,
      phase: (i / 6) * Math.PI * 2,
    }));

    let time = 0;
    let animId: number;
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, rect.width, rect.height);
      points.forEach((p, i) => {
        p.y = rect.height / 2 + Math.sin(time + p.phase) * 30;

        if (i < points.length - 1) {
          const next = points[i + 1];
          const gradient = ctx.createLinearGradient(p.x, p.y, next.x, next.y);
          gradient.addColorStop(0, "rgba(132, 255, 53, 0.15)");
          gradient.addColorStop(0.5, "rgba(132, 255, 53, 0.4)");
          gradient.addColorStop(1, "rgba(132, 255, 53, 0.15)");
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#84ff35";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={ref} className="w-full h-full min-h-[280px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function EventHorizonVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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

    const particles = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * rect.width * 0.4;
      return {
        x: rect.width / 2 + Math.cos(angle) * radius,
        y: rect.height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.beginPath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      grad.addColorStop(0, "rgba(132, 255, 53, 0.05)");
      grad.addColorStop(1, "rgba(132, 255, 53, 0)");
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = 100 / (dist + 50);
        const angle = Math.atan2(dy, dx);

        p.vx += Math.cos(angle) * force * 0.02;
        p.vy += Math.sin(angle) * force * 0.02;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = Math.min(1, 200 / (dist + 50));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(132, 255, 53, ${alpha * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={ref} className="w-full h-full min-h-[280px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default function ProjectVisual({
  type,
}: {
  type: "contract-guard" | "carbon-optimizer" | "event-horizon";
}) {
  const visualMap = {
    "contract-guard": <ContractGuardVisual />,
    "carbon-optimizer": <CarbonOptimizerVisual />,
    "event-horizon": <EventHorizonVisual />,
  };

  return (
    <div className="w-full h-full bg-surface border border-border rounded-sm overflow-hidden">
      {visualMap[type]}
    </div>
  );
}
