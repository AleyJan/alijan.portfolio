import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-cream placeholder-cream/35 outline-none transition-colors focus:border-cream/50";

  return (
    // flex-col lets the inner div use my-auto so it centres when there is room,
    // but the page still scrolls on short viewports (e.g. mobile + keyboard open).
    <main className="flex min-h-screen w-full flex-col bg-gradient-to-b from-espresso via-black to-black px-6 text-cream">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto my-auto w-full max-w-sm py-12"
      >
        <Link to="/" className="mb-10 flex items-center justify-center gap-2 text-cream">
          <span className="text-2xl leading-none">✦</span>
          <span className="font-gondens text-2xl tracking-wide">ALIJAN</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <h1 className="text-lg font-semibold">Admin login</h1>
          <p className="mt-1 text-sm text-cream/50">
            Sign in to manage your portfolio content.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wide text-cream/50">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@portfolio.com"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs uppercase tracking-wide text-cream/50">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={field}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mt-2 rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-white disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </motion.button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-cream/50 transition-colors hover:text-cream"
        >
          ← Back to site
        </Link>
      </motion.div>
    </main>
  );
}
