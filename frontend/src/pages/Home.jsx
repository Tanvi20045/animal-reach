import { Link } from "react-router-dom";
import StreetScene from "../components/StreetScene.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import Characters from "../components/Characters.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Reveal from "../components/Reveal.jsx";
import { createRipple } from "../utils/ripple.js";

const steps = [
  {
    n: "01",
    title: "Spot & report",
    body: "See a street animal that's injured, sick, or just needs help? Snap a photo, drop a pin, and file a report in under a minute.",
  },
  {
    n: "02",
    title: "Volunteers respond",
    body: "The nearest verified volunteer or partner shelter gets notified and picks up the case immediately.",
  },
  {
    n: "03",
    title: "Rescue, treat, protect",
    body: "The animal gets medical care where needed, and — if ready — a listing goes up so a family can adopt it.",
  },
];

const actions = [
  {
    icon: "📷",
    bg: "#E4EEE9",
    color: "#12433C",
    title: "Report a sighting",
    body: "Injured, aggressive, or in need of shelter — log it with photos and a pin on the map.",
    to: "/report",
  },
  {
    icon: "🏡",
    bg: "#FBE6DC",
    color: "#C1502E",
    title: "Adopt",
    body: "Browse animals ready for a home, with full health and temperament notes.",
    to: "/adopt",
  },
  {
    icon: "🚨",
    bg: "#FDECC8",
    color: "#B8842E",
    title: "Request a rescue",
    body: "Urgent cases reach a volunteer immediately — accidents, entrapment, distress.",
    to: "/rescue",
  },
  {
    icon: "🤝",
    bg: "#E3ECF5",
    color: "#3E5C8A",
    title: "Volunteer",
    body: "Drive, foster, treat, or coordinate — we'll match you to nearby cases.",
    to: "/volunteer",
  },
  {
    icon: "💗",
    bg: "#F6E1E8",
    color: "#B8506B",
    title: "Donate",
    body: "Fund medical aid, food drives, sterilization camps — fully tracked.",
    to: "/donate",
  },
];

const heroWords = [
  { text: "Every", delay: 0.05 },
  { text: "street", delay: 0.15 },
  { text: "animal", delay: 0.25, accent: true, br: true },
  { text: "deserves", delay: 0.35 },
  { text: "a", delay: 0.45 },
  { text: "safe", delay: 0.55, accent: true },
  { text: "way", delay: 0.65 },
  { text: "home.", delay: 0.75 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8 relative" style={{ zIndex: 2 }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-teal/10 text-pine-light font-body text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-teal pulse-dot inline-block"></span>
                1,240+ animals helped so far
              </span>
            </Reveal>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-bold text-ink max-w-lg">
              {heroWords.map((w, i) => (
                <span key={i}>
                  <span
                    className={`word-in ${w.accent ? "accent-word" : ""}`}
                    style={{ animationDelay: `${w.delay}s` }}
                  >
                    {w.text}
                  </span>{" "}
                  {w.br && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-6 font-body text-lg text-ink/70 max-w-md leading-relaxed">
              Animal Reach turns a passer-by's phone into the first step of protection —
              connect the animal you just noticed with a volunteer, a vet, or a safe home.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/report"
                onClick={createRipple}
                className="ripple-container magnetic font-body font-semibold px-6 py-3 rounded-full text-paper"
                style={{ background: "linear-gradient(135deg, #C1502E, #D9662F)" }}
              >
                Report an animal
              </Link>
              <Link
                to="/adopt"
                onClick={createRipple}
                className="ripple-container magnetic border border-ink/20 text-ink font-body font-semibold px-6 py-3 rounded-full"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="relative float-slow">
            <StreetScene />
          </div>
        </div>
      </section>

      <StatsStrip />
      <Characters />

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 relative" style={{ zIndex: 2 }}>
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-md">
            From a single photo to a finished rescue.
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-9">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="card-lift bg-white rounded-2xl p-8 border border-ink/5 h-full">
                <span
                  className="font-display text-3xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #12433C, #3E8E7E)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.n}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink mt-2">{s.title}</h3>
                <p className="mt-2 font-body text-sm text-ink/62 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core actions */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 relative" style={{ zIndex: 2 }}>
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-lg">
            Five ways to help, starting today.
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((a, i) => (
            <Reveal key={a.to} delay={i * 80}>
              <Link
                to={a.to}
                className="card-lift group bg-white rounded-2xl p-7 border border-ink/5 flex flex-col h-full"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: a.bg }}
                >
                  {a.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 font-body text-sm text-ink/62 leading-relaxed flex-1">{a.body}</p>
                <span
                  className="mt-4 font-body text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  style={{ color: a.color }}
                >
                  Get started <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-4 pb-20 relative" style={{ zIndex: 2 }}>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 sm:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-paper"
            style={{ background: "linear-gradient(135deg, #12433C, #1D5A50)" }}
          >
            <div className="max-w-md relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold">
                A stray you walked past today could be someone's future companion.
              </h3>
              <p className="mt-3 font-body text-paper/75">
                It takes less time to file a report than to finish this sentence.
              </p>
            </div>
            <Link
              to="/report"
              onClick={createRipple}
              className="ripple-container magnetic shrink-0 bg-mustard text-ink font-body font-semibold px-7 py-3 rounded-full relative z-10"
            >
              Report an animal now
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}