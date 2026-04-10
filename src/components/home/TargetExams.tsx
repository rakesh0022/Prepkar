"use client";
import type { Countdown } from "@/components/data";
import { getDaysLeft, formatShortDate } from "@/components/data";

interface Props {
  exams: Countdown[];
}

export default function TargetExams({ exams }: Props) {
  return (
    <section className="fade-up-d3" style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: "#6b7280",
        letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2,
      }}>
        🎯 Your Target Exams
      </div>
      <div className="hide-scrollbar" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {exams.map((c, i) => {
          const days = getDaysLeft(c.examDate);
          const urgent = days <= 30;
          return (
            <div key={i} style={{
              minWidth: 126, borderRadius: 14, padding: "14px 12px 12px",
              background: urgent
                ? "linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.04))"
                : "rgba(255,255,255,0.025)",
              border: urgent ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(255,255,255,0.05)",
              flexShrink: 0,
            }}>
              <div style={{
                fontSize: 28, fontWeight: 900,
                color: days <= 7 ? "#ef4444" : urgent ? "#fb923c" : c.color,
                fontFamily: "'Outfit',sans-serif", lineHeight: 1,
              }}>
                {days}
              </div>
              <div style={{ fontSize: 9, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>
                {days === 0 ? "Today!" : "days left"}
              </div>
              <div style={{ fontSize: 11, color: "#d1d5db", fontWeight: 700, marginTop: 7, lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{formatShortDate(c.examDate)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
