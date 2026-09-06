import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Adopt() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/adoptions", { params: species ? { species } : {} })
      .then(({ data }) => setListings(data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [species]);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <span className="font-body text-xs uppercase tracking-wide text-rust font-semibold">Rehoming</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">
        Animals ready for a home
      </h1>
      <p className="mt-3 font-body text-ink/65 max-w-lg leading-relaxed">
        Every listing here has been checked by a volunteer. Health notes and temperament
        are included so there are no surprises.
      </p>

      <div className="mt-8 flex gap-3">
        {["", "Dog", "Cat", "Other"].map((s) => (
          <button
            key={s || "all"}
            onClick={() => setSpecies(s)}
            className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
              species === s ? "bg-pine text-paper border-pine" : "border-ink/20 text-ink/70 hover:border-ink/50"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 font-body text-ink/50">Loading listings…</p>
      ) : listings.length === 0 ? (
        <div className="mt-14 border border-dashed border-ink/20 rounded-xl p-10 text-center">
          <p className="font-body text-ink/60">
            No listings yet — connect the backend and add an adoption listing to see it here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((a) => (
            <div key={a._id} className="border border-ink/10 rounded-xl overflow-hidden bg-paper">
              <div className="aspect-[4/3] bg-clay/50 flex items-center justify-center">
                {a.images?.[0] ? (
                  <img src={a.images[0]} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display text-3xl text-ink/30">{a.name?.[0]}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">{a.name}</h3>
                  <span className="font-body text-xs text-ink/50">{a.age}</span>
                </div>
                <p className="mt-1 font-body text-sm text-ink/60">{a.breed} · {a.location}</p>
                <p className="mt-3 font-body text-sm text-ink/70 line-clamp-3">{a.description}</p>
                <div className="mt-4 flex gap-2 text-xs font-body">
                  {a.vaccinated && <span className="bg-pine/10 text-pine px-2 py-1 rounded-full">Vaccinated</span>}
                  {a.sterilized && <span className="bg-mustard/20 text-ink px-2 py-1 rounded-full">Sterilized</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
