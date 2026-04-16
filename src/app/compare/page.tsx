"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const ROWS = [
  { topic: "Job Security", icon: "🔒", govt: "Can't be fired. Permanent from Day 1.", pvt: "Performance-based. Layoff risk in downturns.", winner: "govt" },
  { topic: "Starting Salary", icon: "💰", govt: "₹25K–₹80K/month. Grows with DA revisions.", pvt: "₹15K–₹2L/month. Higher ceiling in tech.", winner: "pvt" },
  { topic: "Healthcare", icon: "🏥", govt: "Free medical for full family — for life.", pvt: "₹3–10L cover. Ends when you leave.", winner: "govt" },
  { topic: "Career Growth", icon: "📈", govt: "Guaranteed promotions every few years.", pvt: "Merit-based. VP by 35 is possible.", winner: "pvt" },
  { topic: "Work-Life Balance", icon: "⚖️", govt: "9:30–5:30. 30 leaves. Pension.", pvt: "WFH options but long hours & stress.", winner: "govt" },
  { topic: "Retirement", icon: "🏖️", govt: "Pension (OPS/NPS) + gratuity + medical for life.", pvt: "EPF + self-funded. No pension. Medical ends.", winner: "govt" },
  { topic: "Impact", icon: "🌍", govt: "Govern districts. Build India.", pvt: "Build products. Scale globally.", winner: "tie" },
  { topic: "Entry Difficulty", icon: "🎯", govt: "Extremely competitive exams. 0.1-2% selection rate.", pvt: "Interview-based. Easier entry but harder to stay.", winner: "pvt" },
];

export default function ComparePage() {
  const govtWins = ROWS.filter(r => r.winner === "govt").length;
  const pvtWins = ROWS.filter(r => r.winner === "pvt").length;
  const ties = ROWS.filter(r => r.winner === "tie").length;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>Government vs Private</h1>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.6 }}>
          Which path fits your life? Here&apos;s the real, honest comparison across {ROWS.length} key factors.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ROWS.map((row, i) => (
            <div key={i} className="anim-up" style={{
              background: "#FFFFFF", borderRadius: 14, padding: "16px",
              border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
              animationDelay: `${i * 0.04}s`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{row.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{row.topic}</span>
                {row.winner !== "tie" && (
                  <span style={{
                    marginLeft: "auto", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                    background: row.winner === "govt" ? "#EFF6FF" : "#F0FDF4",
                    color: row.winner === "govt" ? "#2563EB" : "#16A34A",
                  }}>{row.winner === "govt" ? "🏛️ Govt wins" : "🏢 Private wins"}</span>
                )}
                {row.winner === "tie" && (
                  <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: "#F3F4F6", color: "#6B7280" }}>🤝 Tie</span>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: "3px solid #2563EB", background: row.winner === "govt" ? "#EFF6FF" : "#FAFAFA" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#2563EB", letterSpacing: 0.5, marginBottom: 4 }}>GOVT</div>
                  <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{row.govt}</div>
                </div>
                <div style={{ padding: "10px 12px", borderRadius: 10, borderLeft: "3px solid #6B7280", background: row.winner === "pvt" ? "#F0FDF4" : "#FAFAFA" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#6B7280", letterSpacing: 0.5, marginBottom: 4 }}>PRIVATE</div>
                  <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{row.pvt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, borderRadius: 14, padding: "18px", background: "linear-gradient(135deg, #1E3A5F, #0F2440)", color: "#fff", textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Final Score: Govt {govtWins} — Private {pvtWins} — Tie {ties}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Both are great paths. Pick what matches your values.</div>
        </div>

        <Link href="/jobs" style={{ textDecoration: "none" }}>
          <div style={{ marginTop: 14, padding: "14px", borderRadius: 14, textAlign: "center", background: "#2563EB", color: "#fff", fontSize: 14, fontWeight: 700 }}>
            Explore 17+ Government Careers →
          </div>
        </Link>
      </div>
      <BottomNav />
    </main>
  );
}
