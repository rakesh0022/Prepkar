"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/jobs", icon: "💼", label: "Jobs" },
  { href: "/quiz", icon: "📝", label: "Quiz" },
  { href: "/ai-practice", icon: "🎯", label: "AI Practice" },
  { href: "/study-plan", icon: "📅", label: "Study Plan" },
];

export default function BottomNav() {
  const p = usePathname();

  return (
    <div className="mobile-only">
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-around",
          padding: "6px 0 max(12px, env(safe-area-inset-bottom))",
          boxShadow: "0 -2px 16px rgba(0,0,0,0.04)",
        }}
      >
        {tabs.map((t) => {
          const on = t.href === "/" ? p === "/" : p.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                padding: "3px 14px",
                position: "relative",
              }}
            >
              {on && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    width: 24,
                    height: 2.5,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, #2563EB, #0D9488)",
                  }}
                />
              )}
              <span style={{ fontSize: 18, filter: on ? "none" : "grayscale(60%) opacity(0.45)" }}>{t.icon}</span>
              <span style={{ fontSize: 9, fontWeight: on ? 700 : 500, color: on ? "#2563EB" : "#9CA3AF" }}>{t.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
