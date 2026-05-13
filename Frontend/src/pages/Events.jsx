import { Calendar, Clock } from "lucide-react";

const Events = () => {
  return (
    <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", textAlign: "center", gap: "1.25rem" }}>
      <div style={{
        width: "72px", height: "72px", borderRadius: "20px",
        background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--accent-gold)",
      }}>
        <Calendar size={32} />
      </div>

      <div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.4rem" }}>Events</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "320px", lineHeight: 1.65, margin: "0 auto" }}>
          Community events and gatherings will be listed here. Stay tuned!
        </p>
      </div>

      <div className="badge badge-gold" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
        <Clock size={12} /> Coming Soon
      </div>
    </div>
  );
};

export default Events;