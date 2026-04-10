"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { STORIES } from "@/components/data";

export default function StoriesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0b10", paddingBottom: 80 }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 40, padding: "14px 16px",
        background: "rgba(10,11,16,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Link href="/" style={{ color: "#888", fontSize: 13, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 800 }}>Success Stories</h1>
      </header>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
          Real people who came from ordinary backgrounds and cracked extraordinary exams. If they can do it, so can you. 💪
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STORIES.map((s, i) => (
            <div key={i} className="fade-up" style={{
              background: "rgba(255,255,255,0.025)", borderRadius: 18, padding: "20px 18px",
              border: "1px solid rgba(255,255,255,0.05)", animationDelay: `${i * 0.08}s`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, fontSize: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${s.bgColor}18`,
                }}>{s.emoji}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#f3f4f6" }}>{s.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.bgColor }}>{s.achievement}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{s.now}</div>
                </div>
                <div style={{ marginLeft: "auto", background: `${s.bgColor}20`, color: s.bgColor, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 8 }}>{s.tag}</div>
              </div>

              <blockquote style={{
                fontSize: 13, color: "#d1d5db", fontStyle: "italic", lineHeight: 1.7,
                borderLeft: `3px solid ${s.bgColor}`, paddingLeft: 14, margin: 0,
              }}>
                &ldquo;{s.quote}&rdquo;
              </blockquote>

              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <div style={{ fontSize: 11, color: "#555", background: "rgba(255,255,255,0.04)", padding: "5px 12px", borderRadius: 8 }}>❤️ Inspiring</div>
                <div style={{ fontSize: 11, color: "#555", background: "rgba(255,255,255,0.04)", padding: "5px 12px", borderRadius: 8 }}>📤 Share</div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Story CTA */}
        <div style={{
          marginTop: 24, borderRadius: 16, padding: "22px 18px", textAlign: "center",
          background: "linear-gradient(135deg,rgba(52,211,153,0.08),rgba(6,182,212,0.05))",
          border: "1px solid rgba(52,211,153,0.12)",
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✍️</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Cleared a Government Exam?</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5, marginBottom: 12 }}>
            Share your journey and inspire lakhs of aspirants.<br />Your story could change someone&apos;s life.
          </p>
          <div style={{ display: "inline-block", background: "#059669", color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Share Your Story →</div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
