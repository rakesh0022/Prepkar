"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 80,
        right: 16,
        zIndex: 9998,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#FFFFFF",
        color: "#2563EB",
        border: "1px solid rgba(37,99,235,0.15)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        fontWeight: 700,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.08)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.2), 0 2px 8px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)";
      }}
    >
      ↑
    </button>
  );
}
