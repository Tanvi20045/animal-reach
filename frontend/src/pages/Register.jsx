import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", city: "" });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Create an account</h1>
      <p className="mt-2 font-body text-ink/60">Join the Animal Reach community.</p>

      {error && <p className="mt-4 font-body text-sm text-rust">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {[
          { key: "name", label: "Full name", type: "text" },
          { key: "email", label: "Email", type: "email" },
          { key: "password", label: "Password", type: "password" },
          { key: "phone", label: "Phone (optional)", type: "text" },
          { key: "city", label: "City (optional)", type: "text" },
        ].map((f) => (
          <div key={f.key}>
            <label className="font-body text-sm font-semibold text-ink">{f.label}</label>
            <input
              type={f.type}
              required={["name", "email", "password"].includes(f.key)}
              value={form[f.key]}
              onChange={update(f.key)}
              className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pine text-paper font-body font-semibold py-3 rounded-full hover:bg-pine-light transition-colors disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 font-body text-sm text-ink/60">
        Already have an account?{" "}
        <Link to="/login" className="text-rust font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
}
