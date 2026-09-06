import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const skillOptions = ["Rescue driving", "First aid", "Fostering", "Fundraising", "Vet support", "Social media"];

export default function Volunteer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ city: "", availability: "Flexible", hasVehicle: false, bio: "" });
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Log in to volunteer</h1>
        <button onClick={() => navigate("/login")} className="mt-6 bg-pine text-paper font-body font-semibold px-6 py-3 rounded-full">
          Go to login
        </button>
      </div>
    );
  }

  const toggleSkill = (s) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });
    try {
      await api.post("/volunteers", { ...form, skills: skills.join(",") });
      setStatus({ loading: false, error: "", success: true });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || "Something went wrong.", success: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <span className="font-body text-xs uppercase tracking-wide text-rust font-semibold">Hands-on</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">Become a volunteer</h1>
      <p className="mt-3 font-body text-ink/65 max-w-lg leading-relaxed">
        Tell us what you're good at and where you're based — we'll match you to nearby
        reports and rescues.
      </p>

      {status.success && (
        <div className="mt-6 bg-pine/10 border border-pine/30 text-pine font-body px-4 py-3 rounded-lg">
          You're registered as a volunteer. We'll be in touch when a nearby case needs you.
        </div>
      )}
      {status.error && (
        <div className="mt-6 bg-rust/10 border border-rust/30 text-rust font-body px-4 py-3 rounded-lg">{status.error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="font-body text-sm font-semibold text-ink">Skills</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {skillOptions.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSkill(s)}
                className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                  skills.includes(s) ? "bg-pine text-paper border-pine" : "border-ink/20 text-ink/70 hover:border-ink/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-body text-sm font-semibold text-ink">City</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink">Availability</label>
            <select
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper"
            >
              {["Weekdays", "Weekends", "Flexible"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-3 font-body text-sm text-ink">
          <input
            type="checkbox"
            checked={form.hasVehicle}
            onChange={(e) => setForm({ ...form, hasVehicle: e.target.checked })}
            className="w-4 h-4"
          />
          I have a vehicle I can use for transport
        </label>

        <div>
          <label className="font-body text-sm font-semibold text-ink">A little about you</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="bg-rust text-paper font-body font-semibold px-7 py-3 rounded-full hover:bg-rust-light transition-colors disabled:opacity-60"
        >
          {status.loading ? "Submitting…" : "Register as volunteer"}
        </button>
      </form>
    </div>
  );
}
