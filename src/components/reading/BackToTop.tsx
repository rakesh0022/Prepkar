"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: 96, right: 16, zIndex: 50,
        width: 44, height: 44, borderRadius: "50%",
        background: "var(--accent, #2563EB)", color: "#fff",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, boxShadow: "var(--shadow-md)",
        transition: "transform 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
    >
      ↑
    </button>
  );
}
