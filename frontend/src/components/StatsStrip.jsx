import CountUp from "./CountUp.jsx";
import Reveal from "./Reveal.jsx";

const stats = [
  { icon: "🐾", value: 1240, suffix: "+", label: "animals reported", color: "#12433C" },
  { icon: "🏠", value: 340, suffix: "", label: "successful adoptions", color: "#C1502E" },
  { icon: "🚑", value: 85, suffix: "", label: "active volunteers", color: "#3E8E7E" },
];

export default function StatsStrip() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-12 relative" style={{ zIndex: 2 }}>
      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper hover:bg-white transition-colors py-8 px-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-3xl sm:text-4xl font-semibold" style={{ color: s.color }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-body text-xs text-ink/55 mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
          <div className="bg-paper hover:bg-white transition-colors py-8 px-4 text-center">
            <div className="text-2xl mb-1">💛</div>
            <div className="font-display text-3xl sm:text-4xl font-semibold" style={{ color: "#B8842E" }}>
              ₹6.2L
            </div>
            <div className="font-body text-xs text-ink/55 mt-1 leading-snug">raised for medical aid</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}