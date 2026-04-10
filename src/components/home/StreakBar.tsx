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
    <section className="fade-up-d1" style={{
      marginBottom: 20, borderRadius: 16, padding: "14px 16px",
      background: "rgba(255,255,255,0.025)",
      border: isNew ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fbbf24", fontFamily: "'Outfit',sans-serif" }}>
              {streak} Day{streak !== 1 ? "s" : ""} Streak {isNew ? "— Extended! 🎉" : ""}
            </div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>Visit daily to keep your streak alive</div>
          </div>
        </div>
        {/* Mini streak dots */}
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3,4,5,6,7].map(n => (
            <div key={n} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: n <= Math.min(streak, 7) ? "#f59e0b" : "rgba(255,255,255,0.08)",
            }} />
          ))}
        </div>
      </div>

      {/* Today's progress steps */}
      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 10, padding: "8px 6px", textAlign: "center",
            background: s.done ? "rgba(5,150,105,0.12)" : "rgba(255,255,255,0.03)",
            border: s.done ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontSize: 9, color: s.done ? "#34d399" : "#4b5563", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
