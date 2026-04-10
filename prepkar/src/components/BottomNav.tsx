"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/jobs", icon: "💼", label: "Explore" },
  { href: "/interview", icon: "🎯", label: "Practice" },
  { href: "/stories", icon: "⭐", label: "Stories" },
];

export default function BottomNav() {
  const p = usePathname();
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(12,13,20,0.97)", backdropFilter: "blur(20px)",
      borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-around",
      padding: "7px 0 max(14px, env(safe-area-inset-bottom))",
    }}>
      {tabs.map(t => {
        const on = t.href === "/" ? p === "/" : p.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            textDecoration: "none", padding: "3px 18px", position: "relative",
          }}>
            <span style={{ fontSize: 20, filter: on ? "none" : "grayscale(60%)", transition: "filter 0.2s" }}>{t.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: on ? 700 : 500, letterSpacing: 0.3,
              color: on ? "var(--accent)" : "#4b5563", transition: "color 0.2s",
            }}>{t.label}</span>
            {on && <div style={{ position: "absolute", top: -1, width: 20, height: 2, borderRadius: 2, background: "var(--accent)" }} />}
          </Link>
        );
      })}
    </nav>
  );
}
