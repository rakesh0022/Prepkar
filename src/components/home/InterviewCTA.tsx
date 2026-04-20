"use client";
import Link from "next/link";

export default function InterviewCTA() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 14, paddingLeft: 2 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
          🚀 Your Next Step
        </div>
        <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 1.5 }}>
          Learn the strategy first, or jump straight into AI practice.
        </p>
      </div>

      {/* Two-path cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {/* Path 1: Prepare */}
        <Link href="/prepare" style={{ textDecoration: "none" }}>
          <div style={{
            borderRadius: 16, padding: "20px 14px 16px", textAlign: "center",
            background: "linear-gradient(160deg, #FFFBEB, #FEF3C7)",
            border: "1px solid rgba(245,158,11,0.18)",
            boxShadow: "0 2px 8px rgba(245,158,11,0.08)",
            minHeight: 155, display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>📖</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#92400E", lineHeight: 1.3, marginBottom: 4 }}>Study Plan</div>
            <div style={{ fontSize: 11, color: "#B45309", lineHeight: 1.4 }}>Month-wise roadmap, books & topper tips</div>
            <div style={{
              marginTop: 10, fontSize: 10, fontWeight: 700, color: "#D97706",
              background: "rgba(245,158,11,0.12)", padding: "4px 10px",
              borderRadius: 6, display: "inline-block", alignSelf: "center",
            }}>4 exams covered →</div>
          </div>
        </Link>

        {/* Path 2: Practice */}
        <Link href="/ai-practice" style={{ textDecoration: "none" }}>
          <div style={{
            borderRadius: 16, padding: "20px 14px 16px", textAlign: "center",
            background: "linear-gradient(160deg, #EFF6FF, #DBEAFE)",
            border: "1px solid rgba(37,99,235,0.15)",
            boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
            minHeight: 155, display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1E3A5F", lineHeight: 1.3, marginBottom: 4 }}>AI Practice</div>
            <div style={{ fontSize: 11, color: "#3B82F6", lineHeight: 1.4 }}>Prelims, Mains, Descriptive & Interview</div>
            <div style={{
              marginTop: 10, fontSize: 10, fontWeight: 700, color: "#2563EB",
              background: "rgba(37,99,235,0.1)", padding: "4px 10px",
              borderRadius: 6, display: "inline-block", alignSelf: "center",
            }}>6 exams · Free →</div>
          </div>
        </Link>
      </div>

      {/* 4-feature grid (practice stages) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { icon: "📝", label: "Prelims MCQ", desc: "Timed MCQ practice", color: "#2563EB", bg: "#EFF6FF" },
          { icon: "📖", label: "Mains Practice", desc: "Advanced questions", color: "#7C3AED", bg: "#FAF5FF" },
          { icon: "✍️", label: "Descriptive", desc: "Essay & letter writing", color: "#D97706", bg: "#FFFBEB" },
          { icon: "🎯", label: "Interview Panel", desc: "AI scores your answers", color: "#16A34A", bg: "#F0FDF4" },
        ].map((s, i) => (
          <Link key={i} href="/ai-practice" style={{ textDecoration: "none" }}>
            <div style={{
              borderRadius: 12, padding: "12px 10px", textAlign: "center",
              background: s.bg, border: `1px solid ${s.color}15`,
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{s.label}</div>
              <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/ai-practice" style={{ textDecoration: "none" }}>
        <div style={{
          padding: "12px", borderRadius: 12,
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
