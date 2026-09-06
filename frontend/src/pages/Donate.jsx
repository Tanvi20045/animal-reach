import { useState } from "react";
import api from "../api/axios.js";

const presets = [500, 1000, 2500, 5000];

export default function Donate() {
  const [amount, setAmount] = useState(1000);
  const [form, setForm] = useState({ donorName: "", donorEmail: "", purpose: "General Fund", message: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });
    try {
      // NOTE: this records intent to donate. Wire up Razorpay/Stripe checkout
      // here before going live so `status` moves from "Created" to "Success".
      await api.post("/donations", { ...form, amount });
      setStatus({ loading: false, error: "", success: true });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || "Something went wrong.", success: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <span className="font-body text-xs uppercase tracking-wide text-rust font-semibold">Support</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ink">Fund a rescue</h1>
      <p className="mt-3 font-body text-ink/65 max-w-lg leading-relaxed">
        Donations cover vet bills, food drives, and sterilization camps. Every rupee is
        tracked on our transparency page.
      </p>

      {status.success && (
        <div className="mt-6 bg-pine/10 border border-pine/30 text-pine font-body px-4 py-3 rounded-lg">
          Thank you — your contribution has been recorded. (Connect a payment gateway to complete checkout.)
        </div>
      )}
      {status.error && (
        <div className="mt-6 bg-rust/10 border border-rust/30 text-rust font-body px-4 py-3 rounded-lg">{status.error}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="font-body text-sm font-semibold text-ink">Amount (₹)</label>
          <div className="mt-2 flex flex-wrap gap-3">
            {presets.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setAmount(p)}
                className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                  amount === p ? "bg-pine text-paper border-pine" : "border-ink/20 text-ink/70 hover:border-ink/50"
                }`}
              >
                ₹{p}
              </button>
            ))}
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-28 border border-ink/20 rounded-full px-4 py-2 font-body text-sm bg-paper"
            />
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-semibold text-ink">Fund</label>
          <select
            value={form.purpose}
            onChange={update("purpose")}
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper"
          >
            {["General Fund", "Medical Aid", "Food & Shelter", "Sterilization Drive"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="font-body text-sm font-semibold text-ink">Your name</label>
            <input
              required
              value={form.donorName}
              onChange={update("donorName")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
          <div>
            <label className="font-body text-sm font-semibold text-ink">Email</label>
            <input
              required
              type="email"
              value={form.donorEmail}
              onChange={update("donorEmail")}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="bg-mustard text-ink font-body font-semibold px-7 py-3 rounded-full hover:bg-mustard/90 transition-colors disabled:opacity-60"
        >
          {status.loading ? "Processing…" : `Donate ₹${amount}`}
        </button>
      </form>
    </div>
  );
}
