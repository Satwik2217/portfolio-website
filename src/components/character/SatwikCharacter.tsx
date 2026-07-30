"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CharState = "idle" | "waving" | "thinking" | "celebrating" | "working";

interface Props {
  state?: CharState;
  className?: string;
  size?: number;
  interactive?: boolean;
}

export default function SatwikCharacter({
  state: externalState,
  className = "",
  size = 300,
  interactive = true,
}: Props) {
  const [currentState] = useState<CharState>("idle");
  const [blink, setBlink] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const state = externalState || currentState;

  // Blink timer
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 120);
      }, delay);
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  // Eye tracking
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const springEyeX = useSpring(eyeX, { stiffness: 200, damping: 20 });
  const springEyeY = useSpring(eyeY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    if (!interactive) return;
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      eyeX.set(dx * 6);
      eyeY.set(dy * 3);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [interactive, eyeX, eyeY]);

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Body / Torso */}
          <g>
            <rect x="100" y="168" width="100" height="120" rx="18" fill="#2A2824" />
            <path d="M135 168 L150 158 L165 168Z" fill="#1E1C1A" />
            <path d="M142 168 L150 158 L158 168" stroke="#3A3834" strokeWidth="1" fill="none" />
          </g>

          {/* Left Arm — always static */}
          <g style={{ transformOrigin: "115px 185px" }}>
            <rect x="86" y="176" width="22" height="55" rx="10" fill="#B8936A" />
            <circle cx="97" cy="233" r="10" fill="#B8936A" />
          </g>

          {/* Right Arm — always static */}
          <g style={{ transformOrigin: "185px 185px" }}>
            <rect x="192" y="176" width="22" height="55" rx="10" fill="#A8855E" />
            <circle cx="203" cy="233" r="10" fill="#A8855E" />
          </g>

          {/* Neck */}
          <rect x="140" y="152" width="20" height="20" rx="5" fill="#A8855E" />

          {/* Head group — subtle cursor tracking */}
          <motion.g
            style={{ transformOrigin: "150px 110px" }}
            animate={interactive ? { rotate: eyeX.get() * -0.5 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ellipse cx="150" cy="110" rx="48" ry="52" fill="#C49B70" />

            {/* Hair base */}
            <path
              d="M105 90 C105 60 120 48 150 48 C180 48 195 60 195 90 L195 80 C195 62 180 50 150 50 C120 50 105 62 105 80Z"
              fill="#1A0E08"
            />
            {/* Hair top volume */}
            <path
              d="M108 85 C110 62 125 50 150 50 C175 50 190 62 192 85 C190 68 175 54 150 54 C125 54 110 68 108 85Z"
              fill="#2C1810"
            />
            {/* Hair fringe */}
            <path
              d="M118 78 C128 62 140 56 150 56 C160 56 172 62 182 78 C178 65 165 53 150 53 C135 53 122 65 118 78Z"
              fill="#1A0E08"
            />

            {/* Eyebrows */}
            <path
              d={state === "thinking" ? "M122 94 Q130 90 138 94" : "M122 92 Q130 87 138 92"}
              stroke="#1A0E08" strokeWidth="2.5" strokeLinecap="round" fill="none"
            />
            <path
              d={state === "thinking" ? "M162 94 Q170 90 178 94" : "M162 92 Q170 87 178 92"}
              stroke="#1A0E08" strokeWidth="2.5" strokeLinecap="round" fill="none"
            />

            {/* Glasses frames */}
            <circle cx="135" cy="105" r="17" stroke="#E8594A" strokeWidth="2.5" fill="none" />
            <circle cx="165" cy="105" r="17" stroke="#E8594A" strokeWidth="2.5" fill="none" />
            <path d="M152 105 L148 105" stroke="#E8594A" strokeWidth="2.5" />
            <path d="M118 103 L108 101" stroke="#E8594A" strokeWidth="2" />
            <path d="M182 103 L192 101" stroke="#E8594A" strokeWidth="2" />

            {/* Eyes */}
            <motion.g style={{ x: springEyeX, y: springEyeY }}>
              <circle cx="135" cy="105" r="5" fill="#F0EDE9" />
              <circle cx="135" cy="105" r="3" fill="#0A0A0A" />
              <circle cx="165" cy="105" r="5" fill="#F0EDE9" />
              <circle cx="165" cy="105" r="3" fill="#0A0A0A" />
            </motion.g>

            {/* Blink eyelids */}
            {blink && (
              <g>
                <rect x="117" y="99" width="36" height="12" rx="2" fill="#C49B70" />
                <rect x="147" y="99" width="36" height="12" rx="2" fill="#C49B70" />
              </g>
            )}

            {/* Nose */}
            <path d="M150 112 Q153 120 150 124" stroke="#A8855E" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Smile */}
            <motion.path
              d={
                state === "celebrating"
                  ? "M130 132 Q150 150 170 132"
                  : state === "thinking"
                  ? "M133 130 Q150 136 167 130"
                  : "M132 128 Q150 140 168 128"
              }
              stroke="#1A0E08" strokeWidth="2.5" strokeLinecap="round" fill="none"
            />

            {/* Blush */}
            <ellipse cx="118" cy="118" rx="8" ry="4" fill="#E8594A" opacity="0.2" />
            <ellipse cx="182" cy="118" rx="8" ry="4" fill="#E8594A" opacity="0.2" />
          </motion.g>

          {/* Laptop (working state) */}
          {state === "working" && (
            <g>
              <rect x="112" y="180" width="76" height="5" rx="2" fill="#605C56" />
              <rect x="108" y="185" width="84" height="54" rx="4" fill="#1E1C1A" stroke="#3A3834" strokeWidth="1" />
              <rect x="112" y="189" width="76" height="44" rx="2" fill="#0A0A0A" />
              <rect x="118" y="195" width="30" height="2" rx="1" fill="#E8594A" opacity="0.6" />
              <rect x="118" y="201" width="45" height="2" rx="1" fill="#4A8FE7" opacity="0.6" />
              <rect x="118" y="207" width="25" height="2" rx="1" fill="#3A9D6E" opacity="0.6" />
              <rect x="128" y="213" width="35" height="2" rx="1" fill="#E8594A" opacity="0.5" />
              <rect x="118" y="219" width="40" height="2" rx="1" fill="#4A8FE7" opacity="0.6" />
              <rect x="118" y="225" width="20" height="2" rx="1" fill="#E8594A" opacity="0.4" />
            </g>
          )}

          {/* Sparkles for celebrating */}
          {state === "celebrating" && (
            <g>
              <motion.text x="230" y="70" fontSize="14" fill="#E8594A"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [-5, -25, -45] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >✨</motion.text>
              <motion.text x="50" y="80" fontSize="10" fill="#4A8FE7"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              >✨</motion.text>
              <motion.text x="240" y="120" fontSize="8" fill="#3A9D6E"
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: [0, 1, 0], x: [10, -10, -30] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}
              >🎉</motion.text>
            </g>
          )}

          {/* Thinking bubble */}
          {state === "thinking" && (
            <g>
              <circle cx="205" cy="55" r="4" fill="#1E1C1A" />
              <circle cx="218" cy="44" r="5" fill="#1E1C1A" />
              <ellipse cx="238" cy="34" rx="28" ry="16" fill="#161616" stroke="#1E1C1A" strokeWidth="1.5" />
              <text x="238" y="38" textAnchor="middle" fontSize="10" fill="#605C56">💭</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
