import { useEffect, useState } from "react";

const quotes = [
  {
    text: "I reported a limping dog near my building through Animal Reach. A volunteer picked it up the same evening.",
    name: "Priya, Delhi",
    color: "#12433C",
  },
  {
    text: "We adopted our dog Bruno through a listing here — his medical notes made the decision easy.",
    name: "Aman & Sara, Pune",
    color: "#C1502E",
  },
  {
    text: "As a volunteer, the app tells me exactly where I'm needed and what to bring. No more guessing.",
    name: "Farhan, volunteer since 2025",
    color: "#D9A441",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % quotes.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center relative" style={{ zIndex: 2 }}>
      <div className="relative min-h-[180px] flex items-center justify-center">
        {quotes.map((q, i) => (
          <blockquote
            key={q.name}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
              style={{ background: q.color }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="#F5F2E8" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#F5F2E8" />
              </svg>
            </div>
            <p className="font-display text-xl sm:text-2xl text-ink leading-snug max-w-2xl">
              "{q.text}"
            </p>
            <footer className="mt-4 font-body text-sm text-ink/50">— {q.name}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {quotes.map((q, i) => (
          <button
            key={q.name}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-rust" : "w-1.5 bg-ink/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}