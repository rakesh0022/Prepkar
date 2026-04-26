"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { NOTIFICATIONS, CATEGORY_COLORS, NotificationCategory, formatNotificationDate, isNotificationNew } from "@/data/notifications";

type FilterType = "all" | NotificationCategory;
type SortType = "latest" | "category";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("latest");

  // Filter notifications
  let filtered = filter === "all" ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.category === filter);

  // Sort notifications
  if (sort === "category") {
    filtered = [...filtered].sort((a, b) => a.category.localeCompare(b.category));
  }

  const categories: NotificationCategory[] = ["SSC", "Banking", "UPSC", "Railway", "Defence", "State"];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(248,249,251,0.97)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "12px 20px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Link href="/" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#F3F4F6", border: "none", borderRadius: "50%",
              width: 36, height: 36, fontSize: 16,
              color: "#374151", textDecoration: "none",
              transition: "all 0.2s ease",
            }}>✕</Link>
            <div>
              <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 900, color: "#111827", margin: 0 }}>
                Notifications
              </h1>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, marginBottom: 10, overflowX: "auto" }} className="no-scroll">
            <button
              onClick={() => setFilter("all")}
              style={{
                padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                border: filter === "all" ? "1.5px solid #2563EB" : "1px solid var(--border)",
                background: filter === "all" ? "#EFF6FF" : "var(--bg-card)",
                color: filter === "all" ? "#2563EB" : "#6B7280",
                cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
              }}
            >
              All ({NOTIFICATIONS.length})
            </button>
            {categories.map(cat => {
              const count = NOTIFICATIONS.filter(n => n.category === cat).length;
              const color = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                    border: filter === cat ? `1.5px solid ${color}` : "1px solid var(--border)",
                    background: filter === cat ? `${color}10` : "var(--bg-card)",
                    color: filter === cat ? color : "#6B7280",
                    cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
                  }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setSort("latest")}
              style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                border: sort === "latest" ? "1.5px solid #2563EB" : "1px solid var(--border)",
                background: sort === "latest" ? "#EFF6FF" : "var(--bg-card)",
                color: sort === "latest" ? "#2563EB" : "#6B7280",
                cursor: "pointer",
              }}
            >
              Latest First
            </button>
            <button
              onClick={() => setSort("category")}
              style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                border: sort === "category" ? "1.5px solid #2563EB" : "1px solid var(--border)",
                background: sort === "category" ? "#EFF6FF" : "var(--bg-card)",
                color: sort === "category" ? "#2563EB" : "#6B7280",
                cursor: "pointer",
              }}
            >
              By Category
            </button>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((n) => {
            const isNew = isNotificationNew(n.date);
            const categoryColor = CATEGORY_COLORS[n.category];

            return (
              <a key={n.id} href={n.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  background: "var(--bg-card)", borderRadius: 14, padding: "16px",
                  border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
                >
                  <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 7,
                      background: `${categoryColor}15`, color: categoryColor,
                    }}>{n.category}</span>
                    {isNew && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 7,
                        background: "#FEF2F2", color: "#DC2626",
                      }}>🔥 NEW</span>
                    )}
                    <span style={{ fontSize: 11, color: "var(--text-faint)", marginLeft: "auto" }}>
                      {formatNotificationDate(n.date)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 16, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4,
                    marginBottom: 10,
                  }}>{n.title}</div>
                  <div style={{
                    fontSize: 12, color: "#2563EB", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    {n.source}
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                      <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "#9CA3AF",
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#6B7280" }}>No notifications found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try selecting a different category</div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
