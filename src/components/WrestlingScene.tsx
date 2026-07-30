"use client";
import { motion } from "framer-motion";

export default function WrestlingScene({ size = 350 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Room BG */}
      <rect width="300" height="300" fill="#0A0A0A" />

      {/* TV glow on wall */}
      <ellipse cx="150" cy="120" rx="110" ry="90" fill="#4A8FE7" opacity="0.04" />
      <ellipse cx="150" cy="120" rx="70" ry="60" fill="#4A8FE7" opacity="0.04" />

      {/* TV Stand */}
      <rect x="85" y="196" width="130" height="8" rx="3" fill="#2A2824" />
      <rect x="92" y="204" width="10" height="55" rx="3" fill="#1E1C1A" />
      <rect x="198" y="204" width="10" height="55" rx="3" fill="#1E1C1A" />
      <rect x="65" y="206" width="170" height="6" rx="2" fill="#1A1A1A" />

      {/* CRT TV Body */}
      <rect x="80" y="55" width="140" height="141" rx="16" fill="#1E1C1A" stroke="#3A3834" strokeWidth="2" />

      {/* Screen Bezel */}
      <rect x="88" y="62" width="124" height="112" rx="8" fill="#0A0A0A" />

      {/* Screen */}
      <rect x="92" y="66" width="116" height="104" rx="4" fill="#111D2B" />

      {/* Wrestling Ring */}
      <rect x="102" y="90" width="96" height="68" rx="3" fill="#1A1A1A" stroke="#3A3834" strokeWidth="1.5" />
      {/* Ring canvas */}
      <rect x="105" y="95" width="90" height="58" rx="2" fill="#1E1C1A" />

      {/* Ring ropes */}
      <line x1="105" y1="108" x2="195" y2="108" stroke="#E8594A" strokeWidth="2" opacity="0.9" />
      <line x1="105" y1="126" x2="195" y2="126" stroke="#E8594A" strokeWidth="2" opacity="0.9" />
      <line x1="105" y1="144" x2="195" y2="144" stroke="#E8594A" strokeWidth="2" opacity="0.9" />

      {/* Ring posts */}
      <rect x="103" y="90" width="4" height="66" rx="1" fill="#605C56" />
      <rect x="193" y="90" width="4" height="66" rx="1" fill="#605C56" />

      {/* Wrestler 1 - Red (on left, arm raised) */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <circle cx="130" cy="120" r="7" fill="#E8594A" />
        <rect x="126" y="127" width="8" height="18" rx="3" fill="#E8594A" />
        <line x1="126" y1="130" x2="118" y2="116" stroke="#E8594A" strokeWidth="3" strokeLinecap="round" />
        <line x1="134" y1="130" x2="138" y2="118" stroke="#E8594A" strokeWidth="3" strokeLinecap="round" />
        {/* Wrestler 1 legs */}
        <rect x="126" y="145" width="4" height="10" rx="2" fill="#E8594A" />
        <rect x="130" y="145" width="4" height="10" rx="2" fill="#E8594A" />
      </motion.g>

      {/* Wrestler 2 - Blue */}
      <motion.g
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <circle cx="168" cy="122" r="7" fill="#4A8FE7" />
        <rect x="164" y="129" width="8" height="18" rx="3" fill="#4A8FE7" />
        <line x1="164" y1="132" x2="158" y2="124" stroke="#4A8FE7" strokeWidth="3" strokeLinecap="round" />
        <line x1="172" y1="132" x2="178" y2="124" stroke="#4A8FE7" strokeWidth="3" strokeLinecap="round" />
        {/* Wrestler 2 legs */}
        <rect x="164" y="147" width="4" height="10" rx="2" fill="#4A8FE7" />
        <rect x="168" y="147" width="4" height="10" rx="2" fill="#4A8FE7" />
      </motion.g>

      {/* "WWE" text on screen */}
      <text x="150" y="86" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#E8594A" opacity="0.8">WRESTLING</text>

      {/* Scanlines */}
      <g opacity="0.06">
        {Array.from({ length: 26 }, (_, i) => (
          <line key={i} x1="92" y1={68 + i * 4} x2="208" y2={68 + i * 4} stroke="white" strokeWidth="0.5" />
        ))}
      </g>

      {/* TV Controls */}
      <rect x="120" y="180" width="10" height="4" rx="1.5" fill="#3A3834" />
      <rect x="138" y="180" width="10" height="4" rx="1.5" fill="#3A3834" />
      <circle cx="163" cy="182" r="4" fill="#3A3834" />
      <circle cx="163" cy="182" r="2" fill="#E8594A" opacity="0.6" />

      {/* TV Brand label */}
      <rect x="140" y="175" width="20" height="3" rx="1" fill="#E8594A" opacity="0.4" />

      {/* Character watching from behind */}
      {/* Body silhouette */}
      <ellipse cx="150" cy="260" rx="35" ry="25" fill="#1A1A1A" />
      <ellipse cx="150" cy="255" rx="32" ry="22" fill="#2A2824" />

      {/* Shoulders */}
      <path d="M115 250 C130 235 170 235 185 250 L185 270 C170 285 130 285 115 270Z" fill="#2A2824" />

      {/* Neck */}
      <rect x="143" y="230" width="14" height="15" rx="3" fill="#A8855E" />

      {/* Head from behind */}
      <ellipse cx="150" cy="218" rx="22" ry="24" fill="#1A1816" />

      {/* Hair back */}
      <motion.path
        d="M128 215 C130 192 140 186 150 186 C160 186 170 192 172 215"
        fill="#1A0E08"
        animate={{ y: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <path d="M130 212 C132 195 142 190 150 190 C158 190 168 195 170 212" fill="#2C1810" />

      {/* Ears visible from behind */}
      <ellipse cx="128" cy="218" rx="4" ry="7" fill="#C49B70" />
      <ellipse cx="172" cy="218" rx="4" ry="7" fill="#C49B70" />

      {/* TV glow on character */}
      <ellipse cx="150" cy="250" rx="30" ry="20" fill="#4A8FE7" opacity="0.06" />
      <ellipse cx="150" cy="218" rx="18" ry="20" fill="#4A8FE7" opacity="0.04" />
    </svg>
  );
}
