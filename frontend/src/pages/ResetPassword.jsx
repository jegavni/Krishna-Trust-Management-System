import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, KeyRound, CheckCircle, Shield } from "lucide-react";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isStrong = PASSWORD_REGEX.test(password);
  const isMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrong) {
      toast.error("Please enter a strong password");
      return;
    }
    if (!isMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      toast.success("Password reset successfully!");
      setDone(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg-base)", padding: "1.5rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px", height: "400px",
        background: "radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="card-gold-border fade-in-up" style={{
        width: "100%", maxWidth: "420px", padding: "2.5rem",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}>
        {done ? (
          /* ── Success ── */
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80",
            }}>
              <CheckCircle size={28} />
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Password Reset!</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Your password has been updated successfully. You can now sign in with your new password.
            </p>
            <button
              className="btn-gold"
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.85rem" }}
              onClick={() => navigate("/login")}
            >
              Go to Sign In
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            {/* Icon */}
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent-gold)", marginBottom: "1.5rem",
            }}>
              <KeyRound size={22} />
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem" }}>
              Reset Password
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Enter your new password below. Make sure it's strong!
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* New password */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min 8 chars, upper/lower/number/symbol"
                    className={`input-dark ${password.length > 0 ? (isStrong ? "success" : "error") : ""}`}
                    style={{ paddingRight: "3rem" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    style={{
                      position: "absolute", right: "0.75rem", top: "50%",
                      transform: "translateY(-50%)", background: "none", border: "none",
                      color: "var(--text-muted)", cursor: "pointer", padding: 0, display: "flex",
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <p style={{ fontSize: "0.73rem", marginTop: "0.3rem", color: isStrong ? "var(--success)" : "var(--danger)" }}>
                    {isStrong ? "✓ Strong password" : "Must have 8+ chars, uppercase, lowercase, number & symbol"}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`input-dark ${confirmPassword.length > 0 ? (isMatch ? "success" : "error") : ""}`}
                    style={{ paddingRight: "3rem" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    style={{
                      position: "absolute", right: "0.75rem", top: "50%",
                      transform: "translateY(-50%)", background: "none", border: "none",
                      color: "var(--text-muted)", cursor: "pointer", padding: 0, display: "flex",
                    }}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <p style={{ fontSize: "0.73rem", marginTop: "0.3rem", color: isMatch ? "var(--success)" : "var(--danger)" }}>
                    {isMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !isStrong || !isMatch}
                className="btn-gold"
                style={{ width: "100%", marginTop: "0.5rem", padding: "0.85rem" }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: 16, height: 16, border: "2px solid #0a0a0a", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
                    Resetting…
                  </span>
                ) : (
                  <><Shield size={15} /> Reset Password</>
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

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ResetPassword;