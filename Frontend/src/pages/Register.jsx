import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Upload, Shield } from "lucide-react";

const quotes = [
  "Arise, awake, and stop not till the goal is reached.",
  "Strength is life; weakness is death.",
  "You cannot believe in God until you believe in yourself.",
  "Take risks in your life. If you win, you can lead; if you lose, you can guide.",
  "The greatest religion is to be true to your own nature.",
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const regex = {
  name: /^[a-zA-Z ]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10}$/,
  location: /^.{2,50}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "member",
    password: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
    let error = "";
    if (!value.trim()) {
      error = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    } else if (regex[key] && !regex[key].test(value)) {
      error = `Invalid ${key}`;
    }
    setErrors({ ...errors, [key]: error });
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (!image) {
      setErrors({ ...errors, file: "Profile picture is required" });
      return;
    }
    setFile(image);
    setPreview(URL.createObjectURL(image));
    setErrors({ ...errors, file: "" });
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      } else if (regex[key] && !regex[key].test(data[key])) {
        newErrors[key] = `Invalid ${key}`;
      }
    });
    if (!file) newErrors.file = "Profile picture is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("profilePic", file);

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL.trim()}/api/auth/register`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Registered successfully 🎉");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { key: "phone", label: "Phone Number", type: "text", placeholder: "10-digit mobile number" },
    { key: "location", label: "Location", type: "text", placeholder: "City, State" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base)",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "0",
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(251,191,36,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          maxWidth: "940px",
          background: "var(--bg-card)",
          borderRadius: "20px",
          border: "1px solid var(--border-subtle)",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
        className="register-grid"
      >
        {/* Left branding panel */}
        <div
          className="hidden md:flex"
          style={{
            background: "linear-gradient(160deg, #0a0a0a 0%, #111827 100%)",
            padding: "3rem",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(251,191,36,0.12)",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
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
                }}
              >
                KETM
              </span>
            </div>

            <h2 style={{ fontSize: "1.7rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.75rem" }}>
              Join Our Community
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.875rem" }}>
              Become a part of KETM and gain access to member benefits, events, and trust activities.
            </p>
          </div>

          {/* Swami Vivekananda image + quote */}
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              position: "relative",
              marginTop: "2rem",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Swami_Vivekananda.jpg/800px-Swami_Vivekananda.jpg"
              alt="Swami Vivekananda"
              style={{ width: "100%", height: "220px", objectFit: "cover", objectPosition: "top" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.25rem",
              }}
            >
              <blockquote
                style={{
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  borderLeft: "2px solid rgba(251,191,36,0.6)",
                  paddingLeft: "0.75rem",
                }}
              >
                "{randomQuote}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div
          style={{
            padding: "2.5rem",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.3rem" }}>Create Account</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.75rem" }}>
            Fill in the details below to register
          </p>

          <form onSubmit={register} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Profile picture */}
            {/* Profile picture */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "0.5rem",
              }}
            >
              {/* Preview */}
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  border: `2px solid ${errors.file
                      ? "var(--danger)"
                      : preview
                        ? "var(--success)"
                        : "rgba(251,191,36,0.5)"
                    }`,
                  overflow: "hidden",
                  background: "var(--bg-elevated)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  boxShadow: preview
                    ? "0 0 0 4px rgba(251,191,36,0.08)"
                    : "none",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <Upload size={25} />
                    <span style={{ fontSize: "0.65rem" }}>No photo</span>
                  </div>
                )}
              </div>

              {/* Visible file input */}
              <div style={{ width: "100%" }}>
                <label
                  htmlFor="profilePic"
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Profile Picture
                </label>

                <input
                  id="profilePic"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImage}
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    border: `1px solid ${errors.file ? "var(--danger)" : "var(--border-subtle)"
                      }`,
                    borderRadius: "8px",
                    background: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {errors.file && (
                <p
                  style={{
                    width: "100%",
                    fontSize: "0.73rem",
                    color: "var(--danger)",
                    margin: 0,
                  }}
                >
                  {errors.file}
                </p>
              )}

              {preview && (
                <p
                  style={{
                    width: "100%",
                    fontSize: "0.7rem",
                    color: "var(--success)",
                    margin: 0,
                  }}
                >
                  ✓ Profile picture selected
                </p>
              )}
            </div>

            {/* Text fields */}
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className={`input-dark ${errors[key] ? "error" : ""}`}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
                {errors[key] && <p style={{ fontSize: "0.73rem", color: "var(--danger)", marginTop: "0.25rem" }}>{errors[key]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min 8 chars, upper/lower/number/symbol"
                  className={`input-dark ${errors.password ? "error" : data.password && regex.password.test(data.password) ? "success" : ""}`}
                  style={{ paddingRight: "3rem" }}
                  onChange={(e) => handleChange("password", e.target.value)}
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
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontSize: "0.73rem", color: "var(--danger)", marginTop: "0.25rem" }}>{errors.password}</p>
              )}
              {!errors.password && data.password && (
                <p style={{ fontSize: "0.73rem", color: regex.password.test(data.password) ? "var(--success)" : "var(--text-muted)", marginTop: "0.25rem" }}>
                  {regex.password.test(data.password)
                    ? "✓ Strong password"
                    : "Must have 8+ chars, uppercase, lowercase, number & symbol"}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Role
              </label>
              <select
                className="input-dark"
                value={data.role}
                onChange={(e) => handleChange("role", e.target.value)}
                style={{ cursor: "pointer" }}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
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
                  Creating account...
                </span>
              ) : (
                <><UserPlus size={16} /> Create Account</>
              )}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "var(--accent-gold)", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .register-grid { grid-template-columns: 1fr !important; }
          .hidden.md\\:flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Register;