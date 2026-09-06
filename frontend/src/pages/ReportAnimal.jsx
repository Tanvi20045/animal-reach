import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function ReportAnimal() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    animalType: "Dog",
    condition: "Healthy - needs shelter",
    description: "",
    address: "",
    urgent: false,
  });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Log in to file a report</h1>
        <p className="mt-3 font-body text-ink/60">
          We ask reporters to sign in so volunteers can follow up with you directly.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-pine text-paper font-body font-semibold px-6 py-3 rounded-full"
        >
          Go to login
        </button>
      </div>
    );
  }

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach((img) => fd.append("images", img));

      await api.post("/reports", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus({ loading: false, error: "", success: true });
      setForm({ animalType: "Dog", condition: "Healthy - needs shelter", description: "", address: "", urgent: false });
      setImages([]);
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || "Something went wrong.", success: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <span className="font-body text-xs uppercase tracking-wide text-rust font-semibold">Community report</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">
        Tell us what you saw
      </h1>
      <p className="mt-3 font-body text-ink/65 max-w-lg leading-relaxed">
        A few details and a photo help volunteers assess the case before they arrive.
        If the animal is in immediate danger, mark it urgent.
      </p>

      {status.success && (
        <div className="mt-6 bg-pine/10 border border-pine/30 text-pine font-body px-4 py-3 rounded-lg">
          Report submitted — thank you. A volunteer will be notified shortly.
        </div>
      )}
      {status.error && (
        <div className="mt-6 bg-rust/10 border border-rust/30 text-rust font-body px-4 py-3 rounded-lg">
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-body text-sm font-semibold text-ink">Animal type</label>
            <select
              value={form.animalType}
              onChange={update("animalType")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper"
            >
              {["Dog", "Cat", "Cow", "Bird", "Other"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink">Condition</label>
            <select
              value={form.condition}
              onChange={update("condition")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper"
            >
              {["Injured", "Sick", "Healthy - needs shelter", "Aggressive", "Deceased"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-ink">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update("description")}
            placeholder="e.g. Brown indie dog, limping on the front left leg, near the bus stop."
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-ink">Location / landmark</label>
          <input
            required
            value={form.address}
            onChange={update("address")}
            placeholder="Street, area, or a nearby landmark"
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-ink">Photos (up to 4)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
            className="mt-1 w-full font-body text-sm"
          />
        </div>

        <label className="flex items-center gap-3 font-body text-sm text-ink">
          <input
            type="checkbox"
            checked={form.urgent}
            onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
            className="w-4 h-4"
          />
          This is urgent — the animal is in immediate danger
        </label>

        <button
          type="submit"
          disabled={status.loading}
          className="bg-rust text-paper font-body font-semibold px-7 py-3 rounded-full hover:bg-rust-light transition-colors disabled:opacity-60"
        >
          {status.loading ? "Submitting…" : "Submit report"}
        </button>
      </form>
    </div>
  );
}
