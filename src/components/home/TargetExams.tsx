"use client";
import { useState } from "react";
import type { Countdown } from "@/components/data";
import { getDaysLeft, formatShortDate } from "@/components/data";
import WaitlistModal from "@/components/WaitlistModal";

interface Props {
  exams: Countdown[];
}

export default function TargetExams({ exams }: Props) {
  const [reminderExam, setReminderExam] = useState<string | null>(null);

  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: "#6B7280",
        letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2,
      }}>
        🎯 Your Target Exams
      </div>
      <div className="hide-scrollbar no-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {exams.map((c, i) => {
          const days = getDaysLeft(c.date);
          const urgent = days <= 30;
          return (
            <div key={i} style={{
              minWidth: 140, borderRadius: 14, padding: "14px 12px 12px",
              background: urgent ? "linear-gradient(135deg, #FEF2F2, #FEE2E2)" : "#FFFFFF",
              border: urgent ? "1px solid rgba(220,38,38,0.2)" : "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)", flexShrink: 0,
            }}>
              <div style={{
                fontSize: 28, fontWeight: 900,
                color: days <= 7 ? "#DC2626" : urgent ? "#EA580C" : c.color,
                fontFamily: "'Outfit',sans-serif", lineHeight: 1,
              }}>{days}</div>
              <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>
                {days === 0 ? "Today!" : days === 1 ? "day left" : "days left"}
              </div>
              <div style={{ fontSize: 11, color: "#111827", fontWeight: 700, marginTop: 7, lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{formatShortDate(c.date)}</div>
              <button onClick={() => setReminderExam(c.name)} style={{
                marginTop: 8, width: "100%", padding: "5px 0", borderRadius: 6,
                fontSize: 9, fontWeight: 700, border: "none", cursor: "pointer",
                background: `${c.color}10`, color: c.color,
              }}>🔔 Remind Me</button>
            </div>
          );
        })}
      </div>
      {reminderExam && <WaitlistModal onClose={() => setReminderExam(null)} type="reminder" examName={reminderExam} />}
    </section>
  );
}
