import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";

axios.defaults.withCredentials = true;

function Login({ setAuth }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );

      const check = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check`
      );

      if (check.data.loggedIn) {
        setAuth(true);
        toast.success(res.data.message || "Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Cookie/token not received");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          maxWidth: "860px",
          background: "var(--bg-card)",
          borderRadius: "20px",
          border: "1px solid var(--border-subtle)",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
        className="login-grid"
      >
        {/* Left branding panel */}
        <div
          style={{
            background: "linear-gradient(160deg, #0a0a0a 0%, #111827 100%)",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(251,191,36,0.12)",
          }}
          className="hidden md:flex"
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Shield size={18} color="#0a0a0a" />
              </div>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.02em",
                }}
              >
                KETM
              </span>
            </div>

            <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "1rem" }}>
              Welcome back
            </h1>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Sign in to manage members, events, transactions, and trust activities.
            </p>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <blockquote
              style={{
                borderLeft: "3px solid rgba(251,191,36,0.4)",
                paddingLeft: "1rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                lineHeight: 1.7,
              }}
            >
              "Arise, awake, and stop not till the goal is reached."
              <footer style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "normal" }}>
                — Swami Vivekananda
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right form panel */}
        <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem" }}>Sign In</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Enter your credentials to access your account
          </p>

          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input-dark"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-dark"
                  style={{ paddingRight: "3rem" }}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <Link
                to="/forgotPassword"
                style={{ fontSize: "0.8rem", color: "var(--accent-gold)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.85rem" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: 16, height: 16, border: "2px solid #0a0a0a", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--accent-gold)", fontWeight: 600, textDecoration: "none" }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .hidden.md\\:flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Login;