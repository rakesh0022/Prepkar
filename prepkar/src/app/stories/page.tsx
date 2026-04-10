"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { STORIES } from "@/components/data";

export default function StoriesPage() {
  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 40, padding: "14px 16px",
        background: "rgba(12,13,20,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8,
      }}>
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: 13, textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 800 }}>Success Stories</h1>
      </header>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Real people. Real struggles. Real selection. If they could do it — so can you.
        </p>

        {STORIES.map((s, i) => (
          <div key={i} className="anim-up" style={{
            background: "var(--bg-card)", borderRadius: 16, padding: "20px 18px",
            border: "1px solid var(--border)", marginBottom: 12,
            animationDelay: `${i * 0.06}s`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, fontSize: 26,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${s.color}12`,
              }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.achievement}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Now: {s.now}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: `${s.color}15`, padding: "3px 8px", borderRadius: 6 }}>{s.tag}</span>
            </div>
            <blockquote style={{
              fontSize: 13, color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7,
              borderLeft: `3px solid ${s.color}`, paddingLeft: 14, margin: 0,
            }}>
              &ldquo;{s.quote}&rdquo;
            </blockquote>
          </div>
        ))}

        {/* Share Story CTA */}
        <div style={{
          marginTop: 12, borderRadius: 14, padding: "22px 18px", textAlign: "center",
          background: "var(--bg-card)", border: "1px solid var(--border)",
        }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>✍️</div>
          <h3 style={{ fontFamily: "'Outfit'", fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Cleared a Government Exam?</h3>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12 }}>
            Share your journey and inspire lakhs of aspirants.
          </p>
          <div style={{ display: "inline-block", background: "var(--accent)", color: "#000", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>Share Your Story</div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
