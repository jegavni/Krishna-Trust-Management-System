import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Send, CheckCircle } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      toast.success(data.message);
      setSent(true);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="card-gold-border fade-in-up"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {sent ? (
          /* ── Success state ── */
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4ade80",
              }}
            >
              <CheckCircle size={28} />
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Check your email</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
            </p>
            <button
              onClick={() => setSent(false)}
              className="btn-ghost"
              style={{ marginTop: "0.5rem", width: "100%" }}
            >
              Send again
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-gold)",
                marginBottom: "1.5rem",
              }}
            >
              <Mail size={22} />
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem" }}>Forgot Password?</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-dark"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold"
                style={{ width: "100%", padding: "0.85rem" }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid #0a0a0a",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={15} /> Send Reset Link
                  </>
                )}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.83rem", color: "var(--text-muted)" }}>
              Remember your password?{" "}
              <a href="/login" style={{ color: "var(--accent-gold)", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </a>
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default ForgotPassword;