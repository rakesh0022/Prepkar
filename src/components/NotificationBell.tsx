"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getLatestNotifications, getNewNotificationsCount, formatNotificationDate, isNotificationNew, CATEGORY_COLORS } from "@/data/notifications";

export default function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNewCount(getNewNotificationsCount());
  }, []);

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const latestNotifications = getLatestNotifications(3);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.75)",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#5EEAD4";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.75)";
        }}
        title="Notifications"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {newCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              background: "#EF4444",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {newCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            right: 0,
            width: 360,
            maxWidth: "90vw",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 24px 48px rgba(15,36,64,0.18)",
            border: "1px solid rgba(15,36,64,0.06)",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#111827" }}>Notifications</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>
                {newCount} new update{newCount !== 1 ? "s" : ""}
              </div>
            </div>
            <Link href="/notifications" style={{ textDecoration: "none" }}>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2563EB",
                cursor: "pointer",
              }}>
                See All →
              </div>
            </Link>
          </div>

          {/* Notifications */}
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {latestNotifications.map((n) => {
              const isNew = isNotificationNew(n.date);
              const categoryColor = CATEGORY_COLORS[n.category];

              return (
                <a
                  key={n.id}
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                  onClick={() => setShowDropdown(false)}
                >
                  <div style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(0,0,0,0.04)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                  >
                    <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                      <span style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 5,
                        background: `${categoryColor}15`,
                        color: categoryColor,
                      }}>{n.category}</span>
                      {isNew && (
                        <span style={{
                          fontSize: 8,
                          fontWeight: 700,
                          padding: "2px 5px",
                          borderRadius: 5,
                          background: "#FEF2F2",
                          color: "#DC2626",
                        }}>NEW</span>
                      )}
                      <span style={{ fontSize: 9, color: "#9CA3AF", marginLeft: "auto" }}>
                        {formatNotificationDate(n.date)}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>{n.title}</div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <Link href="/notifications" style={{ textDecoration: "none", display: "block" }} onClick={() => setShowDropdown(false)}>
            <div style={{
              padding: "12px 16px",
              textAlign: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#2563EB",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            >
              View All Notifications →
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
