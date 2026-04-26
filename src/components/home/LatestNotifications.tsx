"use client";

import Link from "next/link";
import { getLatestNotifications, formatNotificationDate, isNotificationNew, CATEGORY_COLORS } from "@/data/notifications";

export default function LatestNotifications() {
  const notifications = getLatestNotifications(5);

  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 1.5, textTransform: "uppercase" }}>
            📰 Latest Notifications
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            Fresh updates from official sources
          </div>
        </div>
        <Link href="/notifications" style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: "#2563EB",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            View All →
          </div>
        </Link>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="mobile-only no-scroll" style={{
        display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4,
      }}>
        {notifications.map((n) => {
          const isNew = isNotificationNew(n.date);
          const categoryColor = CATEGORY_COLORS[n.category];

          return (
            <a key={n.id} href={n.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", flexShrink: 0, width: 280 }}>
              <div style={{
                background: "var(--bg-card)", borderRadius: 14, padding: "14px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                height: "100%",
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
                <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                    background: `${categoryColor}15`, color: categoryColor,
                  }}>{n.category}</span>
                  {isNew && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 6,
                      background: "#FEF2F2", color: "#DC2626",
                    }}>🔥 NEW</span>
                  )}
                  <span style={{ fontSize: 10, color: "var(--text-faint)", marginLeft: "auto" }}>
                    {formatNotificationDate(n.date)}
                  </span>
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4,
                  marginBottom: 8,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>{n.title}</div>
                <div style={{
                  fontSize: 11, color: "#2563EB", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {n.source}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                    <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Desktop: 2-column grid */}
      <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {notifications.map((n) => {
          const isNew = isNotificationNew(n.date);
          const categoryColor = CATEGORY_COLORS[n.category];

          return (
            <a key={n.id} href={n.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                background: "var(--bg-card)", borderRadius: 14, padding: "14px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
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
                <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                    background: `${categoryColor}15`, color: categoryColor,
                  }}>{n.category}</span>
                  {isNew && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "3px 7px", borderRadius: 6,
                      background: "#FEF2F2", color: "#DC2626",
                    }}>🔥 NEW</span>
                  )}
                  <span style={{ fontSize: 10, color: "var(--text-faint)", marginLeft: "auto" }}>
                    {formatNotificationDate(n.date)}
                  </span>
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.4,
                  marginBottom: 8,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>{n.title}</div>
                <div style={{
                  fontSize: 11, color: "#2563EB", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {n.source}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}>
                    <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
