"use client";
import Link from "next/link";

interface Story {
  name: string;
  achievement: string;
  now: string;
  quote: string;
  emoji: string;
  tag: string;
  bgColor: string;
}

interface Props {
  stories: Story[];
  onShare: (name: string, quote: string) => void;
}

export default function StoriesStrip({ stories, onShare }: Props) {
  return (
    <section className="fade-up-d5" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", paddingLeft: 2 }}>
            ⭐ Success Stories — They Made It
          </div>
          <div style={{ fontSize: 11, color: "#4b5563", paddingLeft: 2, marginTop: 2 }}>
            If they can do it, so can you
          </div>
        </div>
        <Link href="/stories" style={{ fontSize: 11, color: "#34d399", fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>
          View All →
        </Link>
      </div>

      <div className="hide-scrollbar" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
        {stories.slice(0, 4).map((s, i) => (
          <div key={i} style={{
            minWidth: 240, borderRadius: 16, padding: "16px 14px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.05)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `${s.bgColor}18`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f3f4f6" }}>{s.name}</div>
                <div style={{ fontSize: 10, color: s.bgColor, fontWeight: 700 }}>{s.achievement}</div>
              </div>
            </div>
            <p style={{
              fontSize: 12, color: "#9ca3af", fontStyle: "italic",
              lineHeight: 1.6, marginBottom: 10,
              borderLeft: `2px solid ${s.bgColor}40`, paddingLeft: 8,
            }}>
              &ldquo;{s.quote.slice(0, 110)}...&rdquo;
            </p>
            <button
              onClick={() => onShare(s.name, s.quote)}
              style={{
                background: "rgba(255,255,255,0.05)", border: "none",
                color: "#6b7280", fontSize: 11, padding: "5px 12px",
                borderRadius: 8, cursor: "pointer",
              }}
            >
              📤 Share
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
