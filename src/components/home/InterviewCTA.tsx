"use client";
import Link from "next/link";

export default function InterviewCTA() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 12, paddingLeft: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
          🎯 AI Practice — Every Stage
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 1.5 }}>
          From Prelims MCQ to Final Interview — AI generates exam-realistic questions and scores every answer.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { icon: "📝", label: "Prelims MCQ", desc: "Timed MCQ practice", color: "#2563EB", bg: "#EFF6FF" },
          { icon: "📖", label: "Mains Practice", desc: "Advanced questions", color: "#7C3AED", bg: "#FAF5FF" },
          { icon: "✍️", label: "Descriptive", desc: "Essay & letter writing", color: "#D97706", bg: "#FFFBEB" },
          { icon: "🎯", label: "Interview Panel", desc: "AI scores your answers", color: "#16A34A", bg: "#F0FDF4" },
        ].map((s, i) => (
          <Link key={i} href="/interview" style={{ textDecoration: "none" }}>
            <div style={{
              borderRadius: 12, padding: "14px 12px", textAlign: "center",
              background: s.bg, border: `1px solid ${s.color}15`,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/interview" style={{ textDecoration: "none" }}>
        <div style={{
          marginTop: 10, padding: "12px", borderRadius: 12,
          background: "linear-gradient(90deg, #2563EB, #0D9488)",
          color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 700,
          boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
        }}>
          Choose Your Exam & Start Practicing — Free
        </div>
      </Link>
    </section>
  );
}
