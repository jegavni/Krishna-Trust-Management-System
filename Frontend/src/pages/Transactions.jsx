import { useEffect, useState } from "react";
import axios from "axios";
import { Wallet, TrendingUp, TrendingDown, Scale } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/getTransactions`,
        { withCredentials: true }
      );
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const groupedTransactions = transactions.reduce((acc, txn) => {
    const year = txn.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(txn);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div className="skeleton" style={{ height: "32px", width: "200px", borderRadius: "8px" }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div className="skeleton" style={{ height: "56px", borderRadius: "10px" }} />
            <div className="skeleton" style={{ height: "48px", borderRadius: "8px", opacity: 0.7 }} />
            <div className="skeleton" style={{ height: "48px", borderRadius: "8px", opacity: 0.5 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      {/* Page header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
          <Wallet size={20} color="var(--accent-gold)" /> Transactions Ledger
        </h2>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Financial records grouped by year
        </p>
      </div>

      {Object.keys(groupedTransactions).length === 0 && (
        <div style={{
          textAlign: "center", padding: "4rem 2rem",
          border: "1px dashed var(--border-subtle)", borderRadius: "12px",
          color: "var(--text-muted)",
        }}>
          <Wallet size={40} style={{ marginBottom: "0.75rem", opacity: 0.3 }} />
          <p>No transactions found.</p>
        </div>
      )}

      {Object.keys(groupedTransactions)
        .sort((a, b) => b - a)
        .map((year) => {
          const yearTxns = groupedTransactions[year];
          const income = yearTxns.filter((t) => t.type !== "Expense").reduce((s, t) => s + t.amount, 0);
          const expense = yearTxns.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);
          const balance = income - expense;

          return (
            <div key={year} style={{ marginBottom: "2rem" }}>
              {/* Year header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.85rem 1.25rem",
                background: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)",
                borderRadius: "12px 12px 0 0",
                border: "1px solid var(--border-gold)",
                borderBottom: "none",
              }}>
                <span style={{
                  fontSize: "1.1rem", fontWeight: 900,
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  FY {year}
                </span>
                <span className="badge badge-gold" style={{ fontSize: "0.7rem" }}>{yearTxns.length} transactions</span>
              </div>

              {/* Summary stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px", background: "var(--border-subtle)",
                border: "1px solid var(--border-gold)",
                borderTop: "none", borderBottom: "none",
              }}>
                {[
                  { label: "Income", value: income, icon: <TrendingUp size={14} />, cls: "badge-green", color: "#4ade80" },
                  { label: "Expense", value: expense, icon: <TrendingDown size={14} />, cls: "badge-red", color: "#f87171" },
                  { label: "Balance", value: balance, icon: <Scale size={14} />, cls: balance >= 0 ? "badge-green" : "badge-red", color: balance >= 0 ? "#4ade80" : "#f87171" },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} style={{
                    padding: "0.85rem 1rem", background: "var(--bg-card)",
                    display: "flex", flexDirection: "column", gap: "0.3rem",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      <span style={{ color }}>{icon}</span> {label}
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color }}>
                      ₹{value.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto", border: "1px solid var(--border-gold)", borderTop: "1px solid var(--border-subtle)", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                <table className="table-dark">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Member</th>
                      <th>Mode</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearTxns.map((txn) => (
                      <tr key={txn._id}>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {new Date(txn.date).toLocaleDateString("en-IN")}
                        </td>
                        <td>
                          <span className={`badge ${txn.type === "Expense" ? "badge-red" : "badge-green"}`} style={{ fontSize: "0.7rem" }}>
                            {txn.type}
                          </span>
                        </td>
                        <td>{txn.member?.name || "—"}</td>
                        <td style={{ fontSize: "0.8rem" }}>{txn.paymentMode}</td>
                        <td>
                          <span style={{
                            fontWeight: 700,
                            color: txn.type === "Expense" ? "#f87171" : "#4ade80",
                          }}>
                            {txn.type === "Expense" ? "-" : "+"}₹{txn.amount.toLocaleString("en-IN")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Transactions;