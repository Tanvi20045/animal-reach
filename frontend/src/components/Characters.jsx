import Reveal from "./Reveal.jsx";

// Original flat-illustration characters — dog, cat, cow, bird.
// No photos, no third-party assets, all hand-drawn SVG shapes.
const characters = [
  {
    name: "Street dogs",
    svg: (
      <svg viewBox="0 0 120 130">
        <ellipse cx="60" cy="118" rx="34" ry="8" fill="#1A1A16" opacity="0.06" />
        <path d="M60 25c-16 0-28 13-28 30 0 20 12 40 28 40s28-20 28-40c0-17-12-30-28-30z" fill="#D9A441" />
        <path d="M34 40c-8-6-16-4-16 4s10 14 18 10z" fill="#D9A441" />
        <path d="M86 40c8-6 16-4 16 4s-10 14-18 10z" fill="#D9A441" />
        <ellipse cx="46" cy="60" rx="6" ry="7" fill="#1A1A16" />
        <ellipse cx="74" cy="60" rx="6" ry="7" fill="#1A1A16" />
        <ellipse cx="49" cy="57" rx="2" ry="2.2" fill="#fff" />
        <ellipse cx="77" cy="57" rx="2" ry="2.2" fill="#fff" />
        <ellipse cx="60" cy="74" rx="6" ry="4" fill="#1A1A16" />
        <path d="M52 82c3 4 13 4 16 0" stroke="#1A1A16" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="68" rx="6" ry="4" fill="#EEB89A" opacity="0.8" />
        <ellipse cx="80" cy="68" rx="6" ry="4" fill="#EEB89A" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Alley cats",
    svg: (
      <svg viewBox="0 0 120 130">
        <ellipse cx="60" cy="118" rx="34" ry="8" fill="#1A1A16" opacity="0.06" />
        <path d="M60 30c-15 0-26 12-26 28 0 19 11 38 26 38s26-19 26-38c0-16-11-28-26-28z" fill="#F3EFE2" />
        <path d="M38 34l-10-16 16 8z" fill="#F3EFE2" />
        <path d="M82 34l10-16-16 8z" fill="#F3EFE2" />
        <ellipse cx="48" cy="62" rx="5" ry="6" fill="#1A1A16" />
        <ellipse cx="72" cy="62" rx="5" ry="6" fill="#1A1A16" />
        <ellipse cx="51" cy="59" rx="1.8" ry="2" fill="#fff" />
        <ellipse cx="75" cy="59" rx="1.8" ry="2" fill="#fff" />
        <path d="M60 70l-4 4h8z" fill="#C1502E" />
        <path
          d="M60 74c-2 3-8 3-10 1M60 74c2 3 8 3 10 1"
          stroke="#1A1A16"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="38" cy="70" rx="5" ry="3.5" fill="#EEB89A" opacity="0.8" />
        <ellipse cx="82" cy="70" rx="5" ry="3.5" fill="#EEB89A" opacity="0.8" />
        <path d="M30 68h-14M30 72h-15M30 76h-14" stroke="#1A1A16" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M90 68h14M90 72h15M90 76h14" stroke="#1A1A16" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Gentle cows",
    svg: (
      <svg viewBox="0 0 120 130">
        <ellipse cx="60" cy="118" rx="34" ry="8" fill="#1A1A16" opacity="0.06" />
        <path d="M42 30 Q34 16 42 6" stroke="#C7BE9F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M78 30 Q86 16 78 6" stroke="#C7BE9F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path
          d="M60 32c-18 0-30 12-30 26 0 22 13 42 30 42s30-20 30-42c0-14-12-26-30-26z"
          fill="#FBF9F2"
          stroke="#1A1A16"
          strokeWidth="2"
        />
        <ellipse cx="46" cy="46" rx="6" ry="8" fill="#1A1A16" opacity="0.8" />
        <ellipse cx="76" cy="66" rx="8" ry="10" fill="#1A1A16" opacity="0.8" />
        <ellipse cx="50" cy="66" rx="4" ry="5" fill="#1A1A16" />
        <ellipse cx="70" cy="66" rx="4" ry="5" fill="#1A1A16" />
        <ellipse cx="52" cy="63" rx="1.5" ry="1.8" fill="#fff" />
        <ellipse cx="72" cy="63" rx="1.5" ry="1.8" fill="#fff" />
        <ellipse cx="60" cy="80" rx="9" ry="7" fill="#EEB89A" />
        <path
          d="M60 74c-2 3-7 3-9 1M60 74c2 3 7 3 9 1"
          stroke="#1A1A16"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Rescued birds",
    svg: (
      <svg viewBox="0 0 120 130">
        <ellipse cx="60" cy="118" rx="30" ry="7" fill="#1A1A16" opacity="0.06" />
        <ellipse cx="60" cy="70" rx="26" ry="30" fill="#3E8E7E" />
        <circle cx="60" cy="38" r="18" fill="#4EA391" />
        <path d="M45 32l-14-8 8 16z" fill="#4EA391" />
        <ellipse cx="53" cy="36" rx="4" ry="5" fill="#1A1A16" />
        <ellipse cx="67" cy="36" rx="4" ry="5" fill="#1A1A16" />
        <ellipse cx="55" cy="34" rx="1.4" ry="1.6" fill="#fff" />
        <ellipse cx="69" cy="34" rx="1.4" ry="1.6" fill="#fff" />
        <path d="M56 44l4 4 4-4z" fill="#D9A441" />
        <path
          d="M40 80c-6 4-6 12 0 14M80 80c6 4 6 12 0 14"
          stroke="#3E8E7E"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Characters() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 text-center relative" style={{ zIndex: 2 }}>
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
          The ones we're here to protect.
        </h2>
        <p className="mt-3 font-body text-ink/60 max-w-md mx-auto">
          Every report, rescue, and adoption starts with one of them.
        </p>
      </Reveal>
      <div className="mt-12 flex flex-wrap justify-center gap-9">
        {characters.map((c, i) => (
          <Reveal key={c.name} delay={i * 100}>
            <div className="w-[150px] hover:-translate-y-2 hover:-rotate-3 transition-transform duration-300">
              <div className="char-bob" style={{ animationDelay: `${i * 0.2}s` }}>
                {c.svg}
              </div>
              <div className="mt-3 font-body font-semibold text-sm text-ink">{c.name}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}