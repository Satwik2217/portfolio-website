export function SpiderIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="64" rx="26" ry="22" fill="currentColor" />
      <ellipse
        cx="50"
        cy="64"
        rx="26"
        ry="22"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <ellipse cx="50" cy="40" rx="13" ry="12" fill="currentColor" />
      <path
        d="M37 38 C 33 30, 31 20, 36 12"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M43 34 C 41 24, 44 14, 52 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M57 34 C 59 24, 56 14, 48 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M63 38 C 67 30, 69 20, 64 12"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M37 48 C 28 46, 20 48, 14 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M42 54 C 32 58, 24 64, 20 74"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M58 54 C 68 58, 76 64, 80 74"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M63 48 C 72 46, 80 48, 86 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function WebCorner({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {[40, 80, 120, 160].map((r) => (
        <path
          key={r}
          d={`M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}`}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      ))}
      {[0, 15, 30, 45, 60, 75, 90].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="0"
          x2={Math.round(200 * Math.cos((deg * Math.PI) / 180) * 1000) / 1000}
          y2={Math.round(200 * Math.sin((deg * Math.PI) / 180) * 1000) / 1000}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      {[60, 120].map((r) => (
        <path
          key={`zig-${r}`}
          d={`M ${r} 0 L ${r * 0.85} ${r * 0.15} L ${r * 0.65} ${r * 0.35} L ${r * 0.5} ${r * 0.5} L ${r * 0.35} ${r * 0.65} L ${r * 0.15} ${r * 0.85} L 0 ${r}`}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
}

export function WebRadial({
  className = "",
  size = 240,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        {[30, 60, 90, 120].map((r) => (
          <circle key={r} cx="120" cy="120" r={r} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="120"
            y1="120"
            x2={Math.round((120 + 118 * Math.cos((i * Math.PI * 2) / 16)) * 1000) / 1000}
            y2={Math.round((120 + 118 * Math.sin((i * Math.PI * 2) / 16)) * 1000) / 1000}
          />
        ))}
      </g>
    </svg>
  );
}
