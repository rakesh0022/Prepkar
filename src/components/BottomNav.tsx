"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/",          icon: "🏠", label: "Home"     },
  { href: "/quiz",      icon: "📝", label: "Quiz"     },
  { href: "/cutoffs",   icon: "📊", label: "Cutoffs"  },
  { href: "/compare",   icon: "⚖️", label: "Compare"  },
  { href: "/exam-calendar", icon: "📅", label: "Calendar" },
  { href: "/dashboard", icon: "👤", label: "Profile"  },
];

export default function BottomNav() {
  const p = usePathname();

  return (
    <>
      {/* ── Desktop Top Nav ── */}
      <div className="desktop-only">
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto", padding: "0 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 56,
          }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: "#111827" }}>
                Naukri<span style={{ color: "#2563EB" }}>Yatra</span>
              </span>
            </Link>

            <div style={{ display: "flex", gap: 4 }}>
              {tabs.map(t => {
                const on = t.href === "/" ? p === "/" : p.startsWith(t.href);
                return (
                  <Link key={t.href} href={t.href} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    textDecoration: "none", padding: "8px 16px", borderRadius: 10,
                    background: on ? "#EFF6FF" : "transparent",
                  }}>
                    <span style={{ fontSize: 16 }}>{t.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: on ? 700 : 500, color: on ? "#2563EB" : "#6B7280" }}>{t.label}</span>
                  </Link>
                );
              })}
            </div>

            <Link href="/login" style={{ textDecoration: "none" }}>
              <div style={{ padding: "8px 20px", borderRadius: 10, background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 700 }}>Sign In</div>
            </Link>
          </div>
        </nav>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <div className="mobile-only">
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex", justifyContent: "space-around",
          padding: "6px 0 max(12px, env(safe-area-inset-bottom))",
          boxShadow: "0 -2px 16px rgba(0,0,0,0.04)",
        }}>
          {tabs.map(t => {
            const on = t.href === "/" ? p === "/" : p.startsWith(t.href);
            return (
              <Link key={t.href} href={t.href} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                textDecoration: "none", padding: "3px 14px", position: "relative",
              }}>
                {on && <div style={{ position: "absolute", top: -1, width: 24, height: 2.5, borderRadius: 2, background: "linear-gradient(90deg, #2563EB, #0D9488)" }} />}
                <span style={{ fontSize: 18, filter: on ? "none" : "grayscale(60%) opacity(0.45)" }}>{t.icon}</span>
                <span style={{ fontSize: 9, fontWeight: on ? 700 : 500, color: on ? "#2563EB" : "#9CA3AF" }}>{t.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
