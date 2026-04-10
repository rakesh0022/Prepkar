"use client";
import Link from "next/link";

const CATS = [
  { id: "bank_po",   icon: "🏦", title: "Bank PO / Clerk",  sub: "SBI, IBPS, RBI",       color: "#16a34a" },
  { id: "govt_job",  icon: "🏛️", title: "Govt Job",         sub: "SSC, UPSC, State PSC",  color: "#ef4444" },
  { id: "fresher_it",icon: "💼", title: "Fresher / IT",     sub: "TCS, Infosys, Wipro",   color: "#3b82f6" },
  { id: "mba",       icon: "🎓", title: "MBA Admission",    sub: "IIM, XAT, CAT PI",      color: "#f59e0b" },
];

export default function InterviewCTA() {
  return (
    <section className="fade-up-d4" style={{ marginBottom: 20 }}>
      {/* Section header with emotional hook */}
      <div style={{ marginBottom: 12, paddingLeft: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
          🎤 Interview Practice
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4, lineHeight: 1.5 }}>
          Cleared the written exam? Don&apos;t lose it in the interview —{" "}
          <span style={{ color: "#f87171", fontWeight: 600 }}>30–40% candidates fail here.</span>
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {CATS.map(cat => (
          <Link key={cat.id} href={`/interview?cat=${cat.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              borderRadius: 14, padding: "16px 12px", textAlign: "center",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "border-color 0.2s",
            }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f3f4f6", lineHeight: 1.3 }}>{cat.title}</div>
              <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{cat.sub}</div>
              <div style={{
                marginTop: 8, fontSize: 10, fontWeight: 700, color: cat.color,
                background: `${cat.color}18`, padding: "4px 10px", borderRadius: 6, display: "inline-block",
              }}>
                Free Practice →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
