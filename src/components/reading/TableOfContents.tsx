"use client";

import { useState } from "react";
import { useActiveHeading } from "@/hooks/useActiveHeading";
import type { Heading } from "@/lib/readingUtils";

interface Props {
  headings: Heading[];
  /** px offset from center to position the fixed desktop sidebar */
  articleHalfWidth?: number;
}

export default function TableOfContents({ headings, articleHalfWidth = 380 }: Props) {
  const [open, setOpen] = useState(false);
  const ids = headings.map((h) => h.id);
  const activeId = useActiveHeading(ids);

  if (!headings.length) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const TocLinks = () => (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <li key={h.id}>
            <button
              onClick={() => scrollToHeading(h.id)}
              style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                padding: "5px 8px", borderRadius: 7, cursor: "pointer",
                fontSize: 12, lineHeight: 1.45,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--accent, #2563EB)" : "var(--text-body)",
                background: isActive ? "rgba(37,99,235,0.07)" : "none",
                transition: "color 0.15s, background 0.15s",
              } as React.CSSProperties}
            >
              {h.text}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar — only on very wide viewports */}
      <div
        style={{
          display: "none",
          position: "fixed",
          left: `calc(50% + ${articleHalfWidth}px + 16px)`,
          top: 88,
          width: 200,
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
          zIndex: 40,
        }}
        className="toc-desktop"
      >
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "12px 10px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              fontSize: 10, fontWeight: 800, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--text-light)",
              paddingLeft: 8, marginBottom: 8,
            }}
          >
            Contents
          </div>
          <TocLinks />
        </div>
      </div>

      {/* Mobile floating button */}
      <button
        onClick={() => setOpen(true)}
        className="toc-mobile-btn"
        aria-label="Table of contents"
        style={{
          position: "fixed", left: 16, bottom: 96, zIndex: 50,
          width: 44, height: 44, borderRadius: "50%",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          cursor: "pointer", boxShadow: "var(--shadow-md)",
          display: "none", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "var(--text-body)",
        }}
      >
        ☰
      </button>

      {/* Bottom sheet */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }}
          />
          <div
            style={{
              position: "absolute", bottom: 76, left: 0, right: 0,
              background: "var(--bg-card)", borderRadius: "20px 20px 0 0",
              padding: "20px 16px 24px",
              maxHeight: "60vh", overflowY: "auto",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-dark)" }}>Contents</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--text-light)", padding: 4 }}
              >
                ✕
              </button>
            </div>
            <TocLinks />
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1280px) {
          .toc-desktop { display: block !important; }
        }
        @media (max-width: 1279px) {
          .toc-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
