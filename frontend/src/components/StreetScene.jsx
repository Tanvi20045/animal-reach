// Original flat-illustration SVG — a calm dog sitting safely inside a
// protective outline (drawn like a sheltering hand), with a heart above.
// Represents care and protection. No photos, no third-party assets.
export default function StreetScene() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="w-full h-auto"
      role="img"
      aria-label="Illustration of a calm dog sitting safely inside a protective outline, with a heart above it"
    >
      {/* soft glow behind */}
      <circle cx="240" cy="210" r="190" fill="#12433C" opacity="0.06" />

      {/* protective outline cupping the dog */}
      <path
        d="M100 260
           Q80 180 140 120
           Q200 65 280 75
           Q360 85 390 160
           Q412 220 385 280
           Q360 335 290 355
           Q230 372 170 350
           Q115 328 100 260 Z"
        fill="none"
        stroke="#12433C"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* small floating heart */}
      <g transform="translate(300,60)">
        <path
          d="M0 10 C-10 -6 -30 -2 -30 14 C-30 28 -10 40 0 50 C10 40 30 28 30 14 C30 -2 10 -6 0 10Z"
          fill="#C1502E"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -8; 0 0"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* ground shadow */}
      <ellipse cx="245" cy="368" rx="90" ry="14" fill="#1A1A16" opacity="0.08" />

      {/* dog sitting calm and safe */}
      <g transform="translate(150,170)">
        <path d="M170 150 Q205 145 200 115" stroke="#D9A441" strokeWidth="16" fill="none" strokeLinecap="round" />
        <ellipse cx="95" cy="160" rx="62" ry="55" fill="#D9A441" />
        <ellipse cx="65" cy="205" rx="14" ry="10" fill="#B8842E" />
        <ellipse cx="125" cy="205" rx="14" ry="10" fill="#B8842E" />
        <circle cx="95" cy="90" r="58" fill="#D9A441" />
        <path d="M48 55 Q10 38 22 78 Q42 90 60 68Z" fill="#B8842E" />
        <path d="M142 55 Q180 38 168 78 Q148 90 130 68Z" fill="#B8842E" />
        <ellipse cx="95" cy="112" rx="33" ry="26" fill="#F1D9A0" />
        <path d="M68 82 Q76 88 84 82" stroke="#1A1A16" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M106 82 Q114 88 122 82" stroke="#1A1A16" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="102" rx="10" ry="6" fill="#EEB89A" opacity="0.85" />
        <ellipse cx="130" cy="102" rx="10" ry="6" fill="#EEB89A" opacity="0.85" />
        <ellipse cx="95" cy="108" rx="8" ry="6" fill="#1A1A16" />
        <path
          d="M95 114 Q95 126 78 122 M95 114 Q95 126 112 122"
          stroke="#1A1A16"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}