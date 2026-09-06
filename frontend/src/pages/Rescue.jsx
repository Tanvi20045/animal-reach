import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Rescue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    animalType: "",
    emergencyLevel: "Critical",
    description: "",
    address: "",
    contactPhone: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Log in to request a rescue</h1>
        <button onClick={() => navigate("/login")} className="mt-6 bg-pine text-paper font-body font-semibold px-6 py-3 rounded-full">
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
      await api.post("/rescues", form);
      setStatus({ loading: false, error: "", success: true });
      setForm({ animalType: "", emergencyLevel: "Critical", description: "", address: "", contactPhone: "" });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || "Something went wrong.", success: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <span className="font-body text-xs uppercase tracking-wide text-rust font-semibold">Emergency</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">Request a rescue</h1>
      <p className="mt-3 font-body text-ink/65 max-w-lg leading-relaxed">
        Use this for accidents, entrapment, or an animal in acute distress. It's routed to
        volunteers immediately, ahead of routine reports.
      </p>

      {status.success && (
        <div className="mt-6 bg-pine/10 border border-pine/30 text-pine font-body px-4 py-3 rounded-lg">
          Rescue request sent. A volunteer will call you shortly on the number provided.
        </div>
      )}
      {status.error && (
        <div className="mt-6 bg-rust/10 border border-rust/30 text-rust font-body px-4 py-3 rounded-lg">{status.error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-body text-sm font-semibold text-ink">Animal type</label>
            <input
              required
              value={form.animalType}
              onChange={update("animalType")}
              placeholder="e.g. Dog"
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink">Urgency</label>
            <select
              value={form.emergencyLevel}
              onChange={update("emergencyLevel")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper"
            >
              {["Low", "Medium", "Critical"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-ink">What's happening</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update("description")}
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-body text-sm font-semibold text-ink">Location</label>
            <input
              required
              value={form.address}
              onChange={update("address")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink">Your phone number</label>
            <input
              required
              value={form.contactPhone}
              onChange={update("contactPhone")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="bg-rust text-paper font-body font-semibold px-7 py-3 rounded-full hover:bg-rust-light transition-colors disabled:opacity-60"
        >
          {status.loading ? "Sending…" : "Send rescue request"}
        </button>
      </form>
    </div>
  );
}
