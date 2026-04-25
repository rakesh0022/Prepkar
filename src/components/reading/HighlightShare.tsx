"use client";

import { useEffect, useRef, useState } from "react";

interface PopupState {
  text: string;
  x: number;
  y: number;
}

export default function HighlightShare() {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() ?? "";

      if (text.length < 20 || !selection?.rangeCount) {
        setPopup(null);
        return;
      }

      const rect = selection.getRangeAt(0).getBoundingClientRect();
      setPopup({ text, x: rect.left + rect.width / 2, y: rect.top });
    };

    const handleDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPopup(null);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);
    document.addEventListener("mousedown", handleDown);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
      document.removeEventListener("mousedown", handleDown);
    };
  }, []);

  if (!popup) return null;

  const shareText = `"${popup.text}" — via NaukriYatra`;

  const copy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {});
    setPopup(null);
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
    setPopup(null);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    setPopup(null);
  };

  const btnStyle: React.CSSProperties = {
    background: "none", border: "none", color: "#fff",
    cursor: "pointer", padding: "3px 8px", borderRadius: 6,
    fontSize: 12, fontWeight: 700,
  };

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: popup.x,
        top: popup.y,
        transform: "translate(-50%, calc(-100% - 10px))",
        zIndex: 9999,
        display: "flex",
        gap: 2,
        background: "#1e293b",
        borderRadius: 10,
        padding: "4px 6px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        whiteSpace: "nowrap",
      }}
    >
      <button onClick={copy} style={btnStyle}>📋 Copy</button>
      <div style={{ width: 1, background: "rgba(255,255,255,0.15)", margin: "4px 2px" }} />
      <button onClick={shareTwitter} style={btnStyle}>𝕏 Tweet</button>
      <div style={{ width: 1, background: "rgba(255,255,255,0.15)", margin: "4px 2px" }} />
      <button onClick={shareWhatsApp} style={btnStyle}>💬 WhatsApp</button>
    </div>
  );
}
