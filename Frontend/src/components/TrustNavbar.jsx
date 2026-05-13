import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import axios from "axios";

const TrustNavbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Includes", path: "/includes" },
    { name: "Minutes", path: "/minutes" },
    { name: "Members", path: "/members" },
    { name: "Transactions", path: "/transactions" },
    { name: "Events", path: "/events" },
  ];

  const handleNavigation = async (path) => {
    if (loading) return;
    setMobileOpen(false);
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check`,
        { withCredentials: true }
      );

      if (data.success) {
        navigate(path);
      } else {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(5, 5, 5, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(251, 191, 36, 0.12)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
            className="group"
          >
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              KETM
            </span>
            <span
              style={{
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              Trust Management
            </span>
          </div>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="hidden md:flex"
          >
            {links.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                disabled={loading}
                style={{
                  padding: "0.45rem 0.9rem",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "color 0.2s, background 0.2s",
                  fontFamily: "inherit",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-gold)";
                  e.currentTarget.style.background = "rgba(251,191,36,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.name}
              </button>
            ))}

            <Link
              to="/login"
              style={{
                marginLeft: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(251,191,36,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <LogIn size={14} />
              Login
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
            className="md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: "var(--bg-surface)",
              borderTop: "1px solid var(--border-subtle)",
              padding: "1rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {links.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                disabled={loading}
                style={{
                  padding: "0.7rem 1rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "8px",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <LogIn size={16} />
              Login to Dashboard
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: "64px" }} />
    </>
  );
};

export default TrustNavbar;