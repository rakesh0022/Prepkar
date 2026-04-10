"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/jobs", icon: "💼", label: "Jobs" },
  { href: "/interview", icon: "🎯", label: "Interview" },
  { href: "/stories", icon: "⭐", label: "Stories" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(10,11,16,0.96)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "space-around", padding: "6px 0 14px",
    }}>
      {tabs.map(t => {
        const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            textDecoration: "none", padding: "4px 16px",
          }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#34d399" : "#4b5563" }}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
