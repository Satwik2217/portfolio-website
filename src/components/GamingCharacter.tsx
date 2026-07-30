"use client";
import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Props {
  className?: string;
  size?: number;
}

export default function GamingCharacter({ className = "", size = 280 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const headRotate = useMotionValue(0);
  const springHeadRotate = useSpring(headRotate, { stiffness: 150, damping: 12 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const threshold = rect.width / 2;
      const rotation = (dx / threshold) * 18;
      headRotate.set(rotation);
    };

    const handleLeave = () => headRotate.set(0);

    el.addEventListener("mousemove", handleMouse);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouse);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [headRotate]);

  return (
    <div
      ref={ref}
      className={`relative select-none cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* BG */}
        <rect width="300" height="300" fill="#0A0A0A" />

        {/* Screen glow from game */}
        <ellipse cx="160" cy="165" rx="100" ry="90" fill="#3A9D6E" opacity="0.04" />

        {/* Torso (back view) */}
        <rect x="115" y="160" width="70" height="95" rx="16" fill="#2A2824" />
        <path d="M130 160 L150 148 L170 160Z" fill="#1E1C1A" />

        {/* Collar / shirt line */}
        <path d="M125 162 Q150 168 175 162" stroke="#1E1C1A" strokeWidth="1.5" fill="none" />

        {/* Left arm going forward */}
        <g>
          <rect x="88" y="162" width="32" height="14" rx="7" fill="#2A2824" />
          <rect x="90" y="176" width="24" height="40" rx="8" fill="#B8936A" />
          <circle cx="102" cy="220" r="9" fill="#B8936A" />
        </g>

        {/* Right arm going forward */}
        <g>
          <rect x="180" y="162" width="32" height="14" rx="7" fill="#2A2824" />
          <rect x="186" y="176" width="24" height="40" rx="8" fill="#B8936A" />
          <circle cx="198" cy="220" r="9" fill="#B8936A" />
        </g>

        {/* Game Controller */}
        <g>
          {/* Controller body */}
          <rect x="80" y="195" width="140" height="28" rx="12" fill="#1E1C1A" stroke="#3A3834" strokeWidth="2" />
          {/* Controller grips */}
          <rect x="82" y="202" width="14" height="18" rx="4" fill="#1A1A1A" />
          <rect x="204" y="202" width="14" height="18" rx="4" fill="#1A1A1A" />
          {/* D-pad */}
          <rect x="92" y="204" width="16" height="10" rx="2" fill="#3A3834" />
          <rect x="96" y="200" width="8" height="18" rx="2" fill="#3A3834" />
          {/* Action buttons */}
          <circle cx="192" cy="203" r="3" fill="#E8594A" />
          <circle cx="200" cy="209" r="3" fill="#3A9D6E" />
          <circle cx="184" cy="209" r="3" fill="#4A8FE7" />
          <circle cx="192" cy="215" r="3" fill="#E8B84A" />
          {/* Center buttons */}
          <rect x="144" y="204" width="4" height="10" rx="1" fill="#3A3834" />
          <rect x="152" y="204" width="4" height="10" rx="1" fill="#3A3834" />
        </g>

        {/* Hands on controller */}
        <ellipse cx="102" cy="207" rx="10" ry="6" fill="#B8936A" />
        <ellipse cx="198" cy="207" rx="10" ry="6" fill="#B8936A" />

        {/* Legs */}
        <rect x="120" y="255" width="22" height="30" rx="8" fill="#1E1C1A" />
        <rect x="158" y="255" width="22" height="30" rx="8" fill="#1E1C1A" />

        {/* Neck */}
        <rect x="143" y="142" width="14" height="20" rx="4" fill="#A8855E" />

        {/* HEAD GROUP - rotates on hover */}
        <motion.g
          style={{ transformOrigin: "150px 115px", rotate: springHeadRotate }}
        >
          {/* Head shape (from behind) */}
          <ellipse cx="150" cy="112" rx="30" ry="34" fill="#C49B70" />

          {/* Hair - back of head */}
          <path
            d="M122 100 C124 72 136 64 150 64 C164 64 176 72 178 100 L178 112 C176 90 164 78 150 78 C136 78 124 90 122 112Z"
            fill="#1A0E08"
          />
          <path
            d="M124 98 C126 76 138 69 150 69 C162 69 174 76 176 98"
            fill="#2C1810"
          />

          {/* Ears */}
          <ellipse cx="120" cy="112" rx="5" ry="9" fill="#C49B70" />
          <ellipse cx="180" cy="112" rx="5" ry="9" fill="#C49B70" />

          {/* Ear inner */}
          <ellipse cx="120" cy="112" rx="2" ry="5" fill="#A8855E" />
          <ellipse cx="180" cy="112" rx="2" ry="5" fill="#A8855E" />

          {/* Side hair covering ears partially */}
          <path d="M120 100 C116 108 118 118 120 122" stroke="#1A0E08" strokeWidth="3" fill="none" />
          <path d="M180 100 C184 108 182 118 180 122" stroke="#1A0E08" strokeWidth="3" fill="none" />

          {/* Glasses arms visible from behind */}
          <line x1="126" y1="110" x2="120" y2="115" stroke="#E8594A" strokeWidth="2" opacity="0.6" />
          <line x1="174" y1="110" x2="180" y2="115" stroke="#E8594A" strokeWidth="2" opacity="0.6" />

          {/* Shoulder line */}
          <path d="M115 160 C130 152 170 152 185 160" stroke="#1E1C1A" strokeWidth="2" fill="none" />
        </motion.g>

        {/* Small screen glow in front */}
        <rect x="110" y="130" width="80" height="50" rx="6" fill="none" stroke="#3A3834" strokeWidth="1" opacity="0.3" />
        <rect x="114" y="134" width="72" height="42" rx="3" fill="#0A1A0A" opacity="0.3" />
        <rect x="126" y="146" width="48" height="18" rx="2" fill="#1A3A1A" opacity="0.25" />
        <rect x="134" y="152" width="32" height="6" rx="1" fill="#3A9D6E" opacity="0.3" />
      </svg>
    </div>
  );
}
