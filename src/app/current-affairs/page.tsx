"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import { CURRENT_AFFAIRS, CURRENT_AFFAIRS_META, type CurrentAffairsEntry } from "@/components/data";
import { makeCurrentAffairsSlug, makeSavedArticleId } from "@/lib/savedArticles";

const TOPICS = ["All", "Polity", "Economy", "Science", "International", "Sports", "Awards", "Defence", "Banking", "Environment"];

const topicColors: Record<string, string> = {
  Polity: "#7C3AED",
  Economy: "#16A34A",
  Science: "#2563EB",
  International: "#0D9488",
  Sports: "#DC2626",
  Awards: "#D97706",
  Defence: "#134E4A",
  Banking: "#0C7C59",
  Environment: "#059669",
};

const topicIcons: Record<string, string> = {
  Polity: "🏛️",
  Economy: "💹",
  Science: "🧪",
  International: "🌍",
  Sports: "🏅",
  Awards: "🏆",
  Defence: "🛡️",
  Banking: "🏦",
  Environment: "🌿",
};

export default function CurrentAffairsPage() {
  const [selTopic, setSelTopic] = useState("All");

  const filtered = selTopic === "All" ? CURRENT_AFFAIRS : CURRENT_AFFAIRS.filter((entry) => entry.topic === selTopic);

  const grouped = filtered.reduce<Record<string, CurrentAffairsEntry[]>>((acc, entry) => {
    const dateLabel = new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(entry);
    return acc;
  }, {});

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(248,249,251,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#6B7280", fontSize: 15, textDecoration: "none" }}>←</Link>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>Current Affairs</h1>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 9,
              fontWeight: 700,
              color: "#16A34A",
              background: "#F0FDF4",
              padding: "3px 8px",
              borderRadius: 6,
              border: "1px solid rgba(22,163,74,0.12)",
            }}
          >
            Updated {new Date(CURRENT_AFFAIRS_META.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        </div>

        <div className="no-scroll" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "0 16px 10px" }}>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelTopic(topic)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                whiteSpace: "nowrap",
                background: selTopic === topic ? (topic === "All" ? "#2563EB" : topicColors[topic] || "#2563EB") : "#FFFFFF",
                color: selTopic === topic ? "#fff" : "#6B7280",
                boxShadow: selTopic === topic ? `0 2px 8px ${(topicColors[topic] || "#2563EB")}30` : "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 16,
            background: "#EFF6FF",
            borderRadius: 14,
            padding: "12px 14px",
            border: "1px solid rgba(37,99,235,0.12)",
          }}
        >
          <span style={{ fontSize: 16 }}>💡</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1E3A5F", marginBottom: 3 }}>Daily GK habit</div>
            <div style={{ fontSize: 11, color: "#1E3A5F", lineHeight: 1.5 }}>
              Read 5 facts daily and save the ones you want to revise later. {CURRENT_AFFAIRS_META.disclaimer}
            </div>
          </div>
        </div>

        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#6B7280",
                marginBottom: 8,
                position: "sticky",
                top: 90,
                background: "var(--bg)",
                padding: "4px 0",
                zIndex: 10,
              }}
            >
              {date}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item) => {
                const slug = makeCurrentAffairsSlug(item.date, item.topic, item.fact);
                const accent = topicColors[item.topic] || "#6B7280";

                return (
                  <div
                    key={slug}
                    id={slug}
                    className="anim-up card-lift"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 16,
                      padding: "14px 16px",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      borderLeft: `3px solid ${accent}`,
                      scrollMarginTop: 100,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: `${accent}14`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          flexShrink: 0,
                        }}
                      >
                        {topicIcons[item.topic] || "📰"}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: 4,
                              background: `${accent}10`,
                              color: accent,
                            }}
                          >
                            {item.topic}
                          </span>
                          {item.importance === "High" && (
                            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#FEF2F2", color: "#DC2626" }}>
                              Important
                            </span>
                          )}
                          <span style={{ fontSize: 10, color: "#94A3B8" }}>Source: {item.source}</span>
                        </div>

                        <p style={{ fontSize: 13, color: "#111827", lineHeight: 1.6, margin: 0 }}>{item.fact}</p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 12 }}>
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: 11, fontWeight: 700, color: accent, textDecoration: "none" }}
                          >
                            Official source →
                          </a>

                          <SaveArticleButton
                            article={{
                              id: makeSavedArticleId('current-affairs', slug),
                              type: 'current-affairs',
                              slug,
                              title: item.fact,
                              description: `${item.topic} · ${item.importance} importance · Source: ${item.source}`,
                              category: item.topic,
                              readTime: 'Quick fact',
                              href: `/current-affairs#${slug}`,
                              icon: topicIcons[item.topic] || "📰",
                              accent,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", padding: "20px 0", color: "#9CA3AF" }}>
          <p style={{ fontSize: 12, marginBottom: 6 }}>More facts added regularly. Save the ones you want to revise.</p>
          <Link href={CURRENT_AFFAIRS_META.reportErrorUrl} style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", textDecoration: "none" }}>
            Report an issue
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
