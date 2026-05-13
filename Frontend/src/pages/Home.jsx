import { Link } from "react-router-dom";
import TrustNavbar from "../components/TrustNavbar";
import { Shield, Users, Calendar, FileText, ArrowRight, Award, Heart, BookOpen } from "lucide-react";

const stats = [
  { label: "Active Members", value: "150+", icon: <Users size={20} /> },
  { label: "Years of Service", value: "25+", icon: <Award size={20} /> },
  { label: "Events Organized", value: "200+", icon: <Calendar size={20} /> },
  { label: "Welfare Projects", value: "50+", icon: <Heart size={20} /> },
];

const values = [
  {
    icon: <Shield size={24} />,
    title: "Integrity",
    desc: "Upholding the highest standards of transparency and accountability in all our activities.",
  },
  {
    icon: <Heart size={24} />,
    title: "Community",
    desc: "Building a strong, unified community that supports each member's growth and well-being.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Heritage",
    desc: "Preserving our rich cultural heritage while adapting to the needs of modern society.",
  },
  {
    icon: <Award size={24} />,
    title: "Excellence",
    desc: "Striving for excellence in every initiative and program we undertake for our members.",
  },
];

const orgStructure = [
  {
    role: "President",
    name: "President Name",
    ring: "#fbbf24",
    size: 80,
  },
];

const vicePresidents = [
  { role: "Vice President", name: "VP Name 1" },
  { role: "Vice President", name: "VP Name 2" },
];

const secretaryLevel = [
  { role: "Secretary", name: "Secretary Name", ring: "#60a5fa" },
  { role: "Joint Secretary", name: "Joint Sec. Name", ring: "#34d399" },
  { role: "Treasurer", name: "Treasurer Name", ring: "#f87171" },
];

const executiveMembers = [
  "Exec. Member 1",
  "Exec. Member 2",
  "Exec. Member 3",
  "Exec. Member 4",
  "Exec. Member 5",
  "Exec. Member 6",
  "Exec. Member 7",
  "Exec. Member 8",
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AvatarCard = ({ name, role, ringColor = "#fbbf24", size = 64 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `3px solid ${ringColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-elevated)",
        fontSize: size > 60 ? "1.2rem" : "0.9rem",
        fontWeight: 800,
        color: ringColor,
        boxShadow: `0 0 20px ${ringColor}30`,
      }}
    >
      {getInitials(name)}
    </div>
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{name}</p>
      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "1px" }}>{role}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <TrustNavbar />

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        {/* Background glows */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)",
          }}
        />

        <div
          style={{
            maxWidth: "800px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            className="badge badge-gold"
            style={{ marginBottom: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em" }}
          >
            ✦ KETM Trust Management System
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>Empowering</span>
            <br />
            <span className="text-gold">Our Community</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>Together</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            A unified platform for managing members, events, transactions, and
            minutes — built for the KETM community.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/login" className="btn-gold" style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}>
              Access Dashboard <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn-outline-gold" style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}>
              Join KETM
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "0 1.5rem 5rem" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(251,191,36,0.1)",
                  color: "var(--accent-gold)",
                  marginBottom: "0.75rem",
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Org Structure ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg-surface)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Organizational Structure
            </h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
            {/* President */}
            <AvatarCard name="President Name" role="President" ringColor="#fbbf24" size={80} />

            {/* Connector */}
            <div style={{ width: "2px", height: "32px", background: "linear-gradient(#fbbf24, #374151)" }} />

            {/* VPs */}
            <div
              style={{
                display: "flex",
                gap: "4rem",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "calc(50% - 2rem)",
                  right: "calc(50% - 2rem)",
                  height: "2px",
                  background: "#374151",
                  display: "none",
                }}
              />
              {vicePresidents.map((vp) => (
                <AvatarCard key={vp.name} name={vp.name} role={vp.role} ringColor="#818cf8" size={66} />
              ))}
            </div>

            <div style={{ width: "2px", height: "32px", background: "linear-gradient(#374151, #1f2937)" }} />

            {/* Secretary level */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {secretaryLevel.map((s) => (
                <AvatarCard key={s.name} name={s.name} role={s.role} ringColor={s.ring} size={60} />
              ))}
            </div>

            <div style={{ width: "2px", height: "32px", background: "linear-gradient(#1f2937, #111)" }} />

            {/* Executive committee */}
            <div
              className="card-gold-border"
              style={{ width: "100%", padding: "2rem" }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: "var(--accent-gold)",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontSize: "0.8rem",
                }}
              >
                Executive Committee Members
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {executiveMembers.map((member) => (
                  <div key={member} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                    <div
                      className="avatar-initials"
                      style={{ width: "44px", height: "44px", fontSize: "0.75rem" }}
                    >
                      {getInitials(member)}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textAlign: "center" }}>
                      {member}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Our Values
            </h2>
            <div className="section-divider" />
            <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              The principles that guide everything we do as a community
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className="card-gold-border"
                style={{ padding: "1.75rem", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251,191,36,0.5)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(251,191,36,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(251,191,36,0.1)",
                    color: "var(--accent-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "1rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section
        style={{
          padding: "4rem 1.5rem",
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.75rem" }}>
          Ready to get started?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Login to access your dashboard and manage all KETM activities.
        </p>
        <Link to="/login" className="btn-gold" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
          Login to Dashboard <ArrowRight size={16} />
        </Link>
        <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} KETM Trust. All rights reserved.
        </div>
      </section>
    </>
  );
};

export default Home;