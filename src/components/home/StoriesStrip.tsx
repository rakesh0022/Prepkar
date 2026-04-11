"use client";
import Link from "next/link";

interface Story {
  name: string;
  achievement: string;
  now: string;
  quote: string;
  emoji: string;
  tag: string;
  color: string;
}

interface Props {
  stories: Story[];
}

export default function StoriesStrip({ stories }: Props) {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase", paddingLeft: 2 }}>
            ⭐ Success Stories
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", paddingLeft: 2, marginTop: 2 }}>
            If they can do it, so can you
          </div>
        </div>
        <Link href="/stories" style={{ fontSize: 11, color: "#2563EB", fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
          View All →
        </Link>
      </div>

      <div className="hide-scrollbar no-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
        {stories.slice(0, 4).map((s, i) => (
          <div key={i} style={{
            minWidth: 240, borderRadius: 16, padding: "16px 14px",
            background: "#FFFFFF",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `${s.color}10`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{s.name}</div>
                <div style={{ fontSize: 10, color: s.color, fontWeight: 700 }}>{s.achievement}</div>
              </div>
            </div>
            <p style={{
              fontSize: 12, color: "#6B7280", fontStyle: "italic",
              lineHeight: 1.6, marginBottom: 0,
              borderLeft: `2px solid ${s.color}40`, paddingLeft: 8,
            }}>
              &ldquo;{s.quote.slice(0, 110)}...&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
