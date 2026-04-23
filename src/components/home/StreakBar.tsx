"use client";

interface Props {
  streak: number;
  isNew: boolean;
  quizDone: boolean;
}

export default function StreakBar({ streak, isNew, quizDone }: Props) {
  const steps = [
    { label: "Visited", done: true, icon: "✅" },
    { label: "Today's Challenge", done: quizDone, icon: quizDone ? "✅" : "🎯" },
    { label: "Mock Interview", done: false, icon: "🎤" },
  ];

  return (
    <section style={{
      marginBottom: 20, borderRadius: 16, padding: "14px 16px",
      background: "var(--bg-card)",
      border: isNew ? "1px solid rgba(245,158,11,0.3)" : "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#B45309", fontFamily: "'Outfit',sans-serif" }}>
              {streak} Day{streak !== 1 ? "s" : ""} Streak {isNew ? "— Extended! 🎉" : ""}
            </div>
            <div style={{ fontSize: 10, color: "#92400E" }}>Visit daily to keep your streak alive</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3,4,5,6,7].map(n => (
            <div key={n} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: n <= Math.min(streak, 7) ? "#F59E0B" : "rgba(0,0,0,0.08)",
            }} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 10, padding: "8px 6px", textAlign: "center",
            background: s.done ? "rgba(22,163,74,0.08)" : "rgba(0,0,0,0.03)",
            border: s.done ? "1px solid rgba(22,163,74,0.2)" : "1px solid rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: 9, color: s.done ? "#16A34A" : "#9CA3AF", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
