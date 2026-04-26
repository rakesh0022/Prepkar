"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;

      // Only show when page is actually scrollable
      if (docHeight <= 0) {
        setVisible(false);
        setProgress(0);
        return;
      }

      setVisible(true);
      setProgress((scrollTop / docHeight) * 100);
    };

    // Check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        background: "rgba(0,0,0,0.06)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          transformOrigin: "left center",
          transform: `scaleX(${progress / 100})`,
          transition: "transform 0.15s linear",
          willChange: "transform",
          background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #10B981 100%)",
        }}
      />
    </div>
  );
}
