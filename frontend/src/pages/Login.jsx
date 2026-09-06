import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your details.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Log in</h1>
      <p className="mt-2 font-body text-ink/60">Welcome back to Animal Reach.</p>

      {error && <p className="mt-4 font-body text-sm text-rust">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="font-body text-sm font-semibold text-ink">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>
        <div>
          <label className="font-body text-sm font-semibold text-ink">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-ink/20 rounded-lg px-4 py-3 font-body bg-paper focus:border-pine outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pine text-paper font-body font-semibold py-3 rounded-full hover:bg-pine-light transition-colors disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 font-body text-sm text-ink/60">
        New here?{" "}
        <Link to="/register" className="text-rust font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
}
