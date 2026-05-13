import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Search } from "lucide-react";

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/members`)
      .then((res) => { setMembers(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  const filtered = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.position?.toLowerCase().includes(search.toLowerCase()) ||
    m.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
            <Users size={20} color="var(--accent-gold)" /> Team Members
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {loading ? "Loading…" : `${filtered.length} member${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search members…"
            className="input-dark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.25rem", width: "220px", fontSize: "0.82rem", padding: "0.55rem 0.9rem 0.55rem 2.25rem" }}
          />
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton" style={{ height: "52px", borderRadius: "8px" }} />
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && filtered.length === 0 && (
        <div style={{
          textAlign: "center", padding: "4rem 2rem",
          border: "1px dashed var(--border-subtle)", borderRadius: "12px",
          color: "var(--text-muted)",
        }}>
          <Users size={40} style={{ marginBottom: "0.75rem", opacity: 0.3 }} />
          <p>No members found.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <>
          {/* Desktop table */}
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid var(--border-subtle)" }} className="members-table">
            <table className="table-dark">
              <thead>
                <tr>
                  <th style={{ width: "44px" }}>#</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Contributions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member, idx) => (
                  <tr key={member.id || member._id}>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{idx + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div className="avatar-initials" style={{ width: "32px", height: "32px", fontSize: "0.68rem", flexShrink: 0 }}>
                          {getInitials(member.name)}
                        </div>
                        <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{member.name}</span>
                      </div>
                    </td>
                    <td>
                      {member.position && (
                        <span className="badge badge-gold" style={{ fontSize: "0.7rem" }}>{member.position}</span>
                      )}
                    </td>
                    <td>{member.location || "—"}</td>
                    <td>
                      {member.compliments != null ? (
                        <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>
                          ₹{Number(member.compliments).toLocaleString("en-IN")}
                        </span>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="members-cards" style={{ display: "none", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map((member, idx) => (
              <div key={member.id || member._id} className="card-gold-border" style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="avatar-initials" style={{ width: "44px", height: "44px", fontSize: "0.8rem", flexShrink: 0 }}>
                  {getInitials(member.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem" }}>{member.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{member.position} {member.location ? `· ${member.location}` : ""}</div>
                </div>
                {member.compliments != null && (
                  <span style={{ color: "var(--accent-gold)", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                    ₹{Number(member.compliments).toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 600px) {
          .members-table { display: none !important; }
          .members-cards { display: flex !important; }
        }
      `}</style>
    </div>
  );
}