"use client";
import Link from "next/link";

const CATS = [
  { id: "bank_po",  icon: "🏦", title: "Bank PO / Clerk",  sub: "SBI, IBPS, RBI",      color: "#16a34a" },
  { id: "govt_job", icon: "🏛️", title: "Govt Job",         sub: "SSC, UPSC, State PSC", color: "#ef4444" },
];

export default function InterviewCTA() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 12, paddingLeft: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
          🎤 Interview Practice
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 1.5 }}>
          Cleared the written exam? Don&apos;t lose it in the interview —{" "}
          <span style={{ color: "#DC2626", fontWeight: 600 }}>30–40% candidates fail here.</span>
        </p>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {CATS.map(cat => (
          <Link key={cat.id} href={`/interview?cat=${cat.id}`} style={{ textDecoration: "none", flex: 1 }}>
            <div style={{
              borderRadius: 14, padding: "20px 16px", textAlign: "center",
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{cat.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{cat.title}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 3 }}>{cat.sub}</div>
              <div style={{
                marginTop: 10, fontSize: 11, fontWeight: 700, color: cat.color,
                background: `${cat.color}10`, padding: "6px 14px", borderRadius: 8, display: "inline-block",
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
