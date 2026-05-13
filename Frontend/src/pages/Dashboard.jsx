import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Users, Calendar, Wallet, FileText, LogOut, Menu, X, Shield } from "lucide-react";

import Members from "./Members";
import Events from "./Events";
import Transactions from "./Transactions";
import Minutes from "./Minutes";
import Profile from "../components/Profile";

const DRAWER_WIDTH = 260;

const menuItems = [
  { text: "Profile", icon: <User size={18} /> },
  { text: "Members", icon: <Users size={18} /> },
  { text: "Events", icon: <Calendar size={18} /> },
  { text: "Transactions", icon: <Wallet size={18} /> },
  { text: "Minutes", icon: <FileText size={18} /> },
];

function Dashboard({ auth, setAuth }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef(null);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setAuth(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Members":      return <Members />;
      case "Events":       return <Events />;
      case "Transactions": return <Transactions />;
      case "Minutes":      return <Minutes />;
      case "Profile":
      default:             return <Profile />;
    }
  };

  const DrawerContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{
        padding: "1.5rem 1.25rem",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Shield size={16} color="#0a0a0a" />
        </div>
        <div>
          <div style={{
            fontSize: "1.1rem", fontWeight: 900,
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            KETM
          </div>
          <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Trust Management
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ padding: "1rem 0.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.text;
          return (
            <button
              key={item.text}
              onClick={() => { setActiveTab(item.text); setMobileOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.65rem 1rem", borderRadius: "10px", border: "none",
                cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem",
                fontWeight: isActive ? 600 : 500,
                background: isActive ? "rgba(251,191,36,0.12)" : "transparent",
                color: isActive ? "var(--accent-gold)" : "var(--text-secondary)",
                borderLeft: isActive ? "2px solid var(--accent-gold)" : "2px solid transparent",
                transition: "all 0.15s",
                textAlign: "left", width: "100%",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              <span style={{ color: isActive ? "var(--accent-gold)" : "var(--text-muted)", flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.text}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
        <button
          className="btn-ghost"
          onClick={handleLogout}
          style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>

      {/* ── Desktop Sidebar ── */}
      <aside style={{
        width: DRAWER_WIDTH, flexShrink: 0,
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column",
      }} className="sidebar-desktop">
        <DrawerContent />
      </aside>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside style={{
        width: DRAWER_WIDTH, flexShrink: 0,
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        transform: mobileOpen ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)`,
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex", flexDirection: "column",
      }} className="sidebar-mobile">
        <DrawerContent />
      </aside>

      {/* ── Main Area ── */}
      <div style={{
        flex: 1,
        marginLeft: 0,
        display: "flex", flexDirection: "column", minHeight: "100vh",
      }} className="main-content">

        {/* Top Bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          height: "60px",
          background: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center",
          padding: "0 1.5rem", gap: "1rem",
        }}>
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="hamburger-btn"
            style={{
              width: "36px", height: "36px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px", color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {activeTab}
            </span>
          </div>

          <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            KETM Dashboard
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "1.5rem" }}>
          <div style={{
            minHeight: "calc(100vh - 120px)",
            background: "var(--bg-card)",
            borderRadius: "16px",
            border: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            overflow: "hidden",
          }}>
            {renderContent()}
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; }
          .sidebar-mobile { display: none !important; }
          .hamburger-btn { display: none !important; }
          .main-content { margin-left: ${DRAWER_WIDTH}px !important; }
        }
        @media (max-width: 767px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile { display: flex !important; }
          .hamburger-btn { display: flex !important; }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;