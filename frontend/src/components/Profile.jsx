import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit2, Camera, X, User, Mail, Phone, Briefcase, MapPin, Star } from "lucide-react";

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [totalCompliments, setTotalCompliments] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [compliments, setCompliments] = useState([]);
  const [formData, setFormData] = useState({
    name: "", profession: "", email: "", phone: "", address: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchCompliments();
  }, []);

  const fetchCompliments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/compliments`, {
        withCredentials: true,
      });
      setCompliments(res.data.compliments || []);
      setTotalCompliments(res.data.totalCompliments || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        withCredentials: true,
      });
      const userProfile = res.data.profile;
      setProfile(userProfile);
      setLoading(false);
      setFormData({
        name: userProfile.name || "",
        profession: userProfile.profession || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });
      setPreview(userProfile.imageUrl || "");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("profilePic", image);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/profile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpen(false);
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0.5rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: "80px", borderRadius: "12px" }} />
        ))}
      </div>
    );
  }

  const infoFields = [
    { icon: <Mail size={16} />, label: "Email", value: profile?.email },
    { icon: <Phone size={16} />, label: "Phone", value: profile?.phone },
    { icon: <Briefcase size={16} />, label: "Profession", value: profile?.profession },
    { icon: <MapPin size={16} />, label: "Address", value: profile?.address },
  ];

  return (
    <>
      {/* ── Profile Header Card ── */}
      <div className="card-gold-border fade-in-up" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
        {/* Cover */}
        <div style={{
          height: "120px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, rgba(251,191,36,0.08) 100%)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)",
          }} />
        </div>

        <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
          {/* Avatar */}
          <div style={{
            marginTop: "-52px",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <div style={{
              width: "96px", height: "96px", borderRadius: "50%",
              border: "3px solid var(--accent-gold)",
              boxShadow: "0 0 0 4px var(--bg-card), 0 0 24px rgba(251,191,36,0.2)",
              overflow: "hidden", flexShrink: 0,
              background: "var(--bg-elevated)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {profile?.imageUrl ? (
                <img src={profile.imageUrl} alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{
                  fontSize: "1.8rem", fontWeight: 800,
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {getInitials(profile?.name)}
                </span>
              )}
            </div>

            <button
              className="btn-outline-gold"
              onClick={() => setOpen(true)}
              style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
            >
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>

          {/* Name & role */}
          <div style={{ marginTop: "0.75rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
              {profile?.name || "—"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {profile?.profession || "KETM Member"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Info Grid ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem", marginBottom: "1.5rem",
      }}>
        {infoFields.map(({ icon, label, value }) => (
          <div key={label} className="card-gold-border" style={{ padding: "1rem 1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", color: "var(--accent-gold)" }}>
              {icon}
              <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                {label}
              </span>
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--text-primary)", wordBreak: "break-word" }}>
              {value || <span style={{ color: "var(--text-muted)" }}>—</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── Contributions ── */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Star size={16} color="var(--accent-gold)" /> Contribution History
          </h3>
          <span className="badge badge-gold">
            Total: ₹{totalCompliments.toLocaleString("en-IN")}
          </span>
        </div>

        {compliments.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "3rem",
            border: "1px dashed var(--border-subtle)", borderRadius: "12px",
            color: "var(--text-muted)", fontSize: "0.9rem",
          }}>
            No contributions recorded yet.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid var(--border-subtle)" }} className="contributions-table">
              <table className="table-dark">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Membership</th>
                    <th>Special</th>
                    <th>Backlog</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {compliments.map((item) => (
                    <tr key={item._id}>
                      <td>{item.year}</td>
                      <td>₹{item.membershipAmount}</td>
                      <td>₹{item.specialContribution}</td>
                      <td>₹{item.backlogAmount}</td>
                      <td>{item.paymentMode}</td>
                      <td>{new Date(item.paymentDate).toLocaleDateString()}</td>
                      <td style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.remarks || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="contributions-cards" style={{ display: "none", flexDirection: "column", gap: "0.75rem" }}>
              {compliments.map((item) => (
                <div key={item._id} className="card-gold-border" style={{ padding: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[
                      ["Year", item.year],
                      ["Membership", `₹${item.membershipAmount}`],
                      ["Special", `₹${item.specialContribution}`],
                      ["Backlog", `₹${item.backlogAmount}`],
                      ["Mode", item.paymentMode],
                      ["Date", new Date(item.paymentDate).toLocaleDateString()],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                        <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500, marginTop: "0.15rem" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {item.remarks && (
                    <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Remarks: </span>
                      {item.remarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
        }}>
          <div className="card-gold-border fade-in-up" style={{
            width: "100%", maxWidth: "480px", padding: "2rem",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>Edit Profile</h3>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)",
                  borderRadius: "8px", color: "var(--text-muted)", cursor: "pointer",
                  width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Avatar preview */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                border: "2px solid var(--border-gold)", overflow: "hidden",
                background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <User size={32} color="var(--text-muted)" />
                )}
              </div>
              <label style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1rem", borderRadius: "8px",
                border: "1px solid var(--border-gold)", color: "var(--accent-gold)",
                fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              }}>
                <Camera size={14} /> Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { name: "name", label: "Full Name", placeholder: "Your full name" },
                { name: "profession", label: "Profession", placeholder: "Your profession" },
                { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                { name: "phone", label: "Phone", placeholder: "10-digit number" },
                { name: "address", label: "Address", placeholder: "City, State" },
              ].map(({ name, label, placeholder, type = "text" }) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className="input-dark"
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button className="btn-ghost" onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button className="btn-gold" onClick={handleSubmit} style={{ flex: 1 }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .contributions-table { display: none !important; }
          .contributions-cards { display: flex !important; }
        }
      `}</style>
    </>
  );
}
