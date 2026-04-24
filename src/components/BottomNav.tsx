"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedArticles } from "@/hooks/useSavedArticles";

const tabs = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/jobs", icon: "💼", label: "Jobs" },
  { href: "/quiz", icon: "📝", label: "Quiz" },
  { href: "/ai-practice", icon: "🎯", label: "AI Practice" },
];

export default function BottomNav() {
  const p = usePathname();
  const { savedCount } = useSavedArticles();
  const savedActive = p.startsWith("/saved");
  const [showSavedHint, setShowSavedHint] = useState(false);
  const previousSavedCount = useRef(savedCount);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenHint = localStorage.getItem("ny_saved_hint_seen") === "true";
    if (savedActive && savedCount > 0) {
      localStorage.setItem("ny_saved_hint_seen", "true");
      setShowSavedHint(false);
      previousSavedCount.current = savedCount;
      return;
    }

    if (!hasSeenHint && previousSavedCount.current === 0 && savedCount > 0) {
      setShowSavedHint(true);
    }

    previousSavedCount.current = savedCount;
  }, [savedActive, savedCount]);

  return (
    <>
      <div className="mobile-only">
        <div style={{ position: "fixed", right: 14, bottom: "calc(58px + env(safe-area-inset-bottom))", zIndex: 51 }}>
          <Link href="/saved" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderRadius: 999,
                background: savedActive ? "linear-gradient(90deg, #0891B2, #2563EB)" : "rgba(255,255,255,0.96)",
                color: savedActive ? "#fff" : "#0F172A",
                border: savedActive ? "none" : "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
                backdropFilter: "blur(18px)",
                transform: showSavedHint ? "scale(1.03)" : "scale(1)",
                animation: showSavedHint ? "pulse 1.8s ease-in-out infinite" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <span style={{ fontSize: 14 }}>{savedActive ? "★" : "☆"}</span>
              <span style={{ fontSize: 11, fontWeight: 800 }}>{savedCount > 0 ? `${savedCount} saved` : "Saved"}</span>
            </div>
          </Link>
        </div>

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
