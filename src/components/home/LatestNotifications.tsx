"use client";

import Link from "next/link";
import { getLatestNotifications, formatNotificationDate, isNotificationNew, CATEGORY_COLORS } from "@/data/notifications";

// Category icons
const CATEGORY_ICONS: Record<string, string> = {
  SSC: "📋",
  Banking: "🏦",
  UPSC: "🎓",
  Railway: "🚂",
  Defence: "🛡️",
  State: "🏛️",
};

export default function LatestNotifications() {
  const notifications = getLatestNotifications(6);

  return (
    <section style={{ marginBottom: 24 }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        padding: "0 4px",
      }}>
        <div>
          <div style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#111827",
            fontFamily: "'Outfit', sans-serif",
            marginBottom: 4,
          }}>
            Latest Notifications
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
            Fresh updates from official sources
          </div>
        </div>
        <Link href="/notifications" style={{ textDecoration: "none" }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#2563EB",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 10,
            background: "#EFF6FF",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#DBEAFE";
            e.currentTarget.style.transform = "translateX(2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#EFF6FF";
            e.currentTarget.style.transform = "translateX(0)";
          }}
          >
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="mobile-only no-scroll" style={{
        display: "flex",
        gap: 14,
        overflowX: "auto",
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 4,
      }}>
        {notifications.map((n) => {
          const isNew = isNotificationNew(n.date);
          const categoryColor = CATEGORY_COLORS[n.category];
          const categoryIcon = CATEGORY_ICONS[n.category] || "📢";

          return (
            <a
              key={n.id}
              href={n.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                flexShrink: 0,
                width: 300,
              }}
            >
              <div style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
                borderRadius: 20,
                padding: "18px",
                border: `2px solid ${categoryColor}15`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${categoryColor}25`;
                e.currentTarget.style.borderColor = `${categoryColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = `${categoryColor}15`;
              }}
              >
                {/* Gradient accent bar */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}80)`,
                }} />

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${categoryColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}>
                      {categoryIcon}
                    </div>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: categoryColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>{n.category}</span>
                  </div>
                  {isNew && (
                    <div style={{
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                    }}>
                      <span style={{ fontSize: 12 }}>🔥</span>
                      NEW
                    </div>
                  )}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: 63,
                }}>{n.title}</div>

                {/* Footer */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    fontWeight: 600,
                  }}>
                    {formatNotificationDate(n.date)}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: categoryColor,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    {n.source}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9L9 3M9 3H4.5M9 3V7.5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Desktop: Masonry-style grid */}
      <div className="desktop-only" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        padding: "0 4px",
      }}>
        {notifications.map((n) => {
          const isNew = isNotificationNew(n.date);
          const categoryColor = CATEGORY_COLORS[n.category];
          const categoryIcon = CATEGORY_ICONS[n.category] || "📢";

          return (
            <a
              key={n.id}
              href={n.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
                borderRadius: 20,
                padding: "18px",
                border: `2px solid ${categoryColor}15`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${categoryColor}25`;
                e.currentTarget.style.borderColor = `${categoryColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = `${categoryColor}15`;
              }}
              >
                {/* Gradient accent bar */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}80)`,
                }} />

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${categoryColor}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}>
                      {categoryIcon}
                    </div>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: categoryColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>{n.category}</span>
                  </div>
                  {isNew && (
                    <div style={{
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                    }}>
                      <span style={{ fontSize: 12 }}>🔥</span>
                      NEW
                    </div>
                  )}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: 63,
                }}>{n.title}</div>

                {/* Footer */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    fontWeight: 600,
                  }}>
                    {formatNotificationDate(n.date)}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: categoryColor,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    {n.source}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9L9 3M9 3H4.5M9 3V7.5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
