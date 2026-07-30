"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [label, setLabel] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", onChange);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (target.dataset.cursor) setLabel(target.dataset.cursor);
    };

    const onMouseOut = () => setLabel("");

    document.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseOver as EventListener);
      el.addEventListener("mouseleave", onMouseOut);
    });

    if (mq.matches) {
      const style = document.createElement("style");
      style.id = "custom-cursor-style";
      style.textContent = "* { cursor: none !important }";
      document.head.appendChild(style);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseOver as EventListener);
        el.removeEventListener("mouseleave", onMouseOut);
      });
      const style = document.getElementById("custom-cursor-style");
      if (style) document.head.removeChild(style);
      mq.removeEventListener("change", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isPointerFine) return null;

  const size = label ? 80 : 12;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference hidden lg:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center">
        {label && (
          <span className="text-[8px] font-medium text-background tracking-wider leading-none uppercase whitespace-nowrap px-2">
            {label}
          </span>
        )}
      </div>
    </motion.div>
  );
}
