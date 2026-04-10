"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/",          icon: "🏠", label: "Home"     },
  { href: "/jobs",      icon: "💼", label: "Explore"  },
  { href: "/interview", icon: "🎯", label: "Practice" },
  { href: "/stories",   icon: "⭐", label: "Stories"  },
];

export default function BottomNav() {
  const p = usePathname();
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(13,17,23,0.97)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "flex", justifyContent: "space-around",
      padding: "6px 0 max(12px, env(safe-area-inset-bottom))",
      boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
    }}>
      {tabs.map(t => {
        const on = t.href === "/" ? p === "/" : p.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            textDecoration: "none", padding: "3px 18px", position: "relative",
          }}>
            {/* Active indicator bar */}
            {on && (
              <div style={{
                position: "absolute", top: -1, width: 24, height: 2.5,
                borderRadius: 2,
                background: "linear-gradient(90deg, #3B82F6, #14B8A6)",
              }} />
            )}
            <span style={{
              fontSize: 20,
              filter: on ? "none" : "grayscale(60%) opacity(0.5)",
              transition: "filter 0.2s",
            }}>{t.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: on ? 700 : 500,
              color: on ? "#3B82F6" : "var(--text-faint)",
              transition: "color 0.2s",
            }}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
