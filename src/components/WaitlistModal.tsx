"use client";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function WaitlistModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const existing: string[] = JSON.parse(localStorage.getItem("ny_waitlist") || "[]");
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem("ny_waitlist", JSON.stringify(existing));
      }
    } catch { /* ignore */ }
    setSubmitted(true);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }} />

      <div style={{
        position: "relative", background: "#FFFFFF", borderRadius: "20px 20px 0 0",
        width: "100%", maxWidth: 640, padding: "28px 24px 40px",
        border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(0,0,0,0.1)" }} />
        </div>

        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.04)",
          border: "none", color: "#9CA3AF", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14,
        }}>✕</button>

        {!submitted ? (
          <>
            <div style={{ fontSize: 36, marginBottom: 10, textAlign: "center" }}>🤝</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 6, color: "#111827" }}>
              Talk to Someone Who Cracked It
            </h2>
            <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
              Connect with real selected officers — Bank POs, IAS officers, SSC toppers.<br />
              Be the first to know when mentorship goes live.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                style={{
                  width: "100%", padding: "13px 16px", borderRadius: 12, fontSize: 14,
                  background: "#F9FAFB", border: `1.5px solid ${error ? "#DC2626" : "var(--border)"}`,
                  color: "#111827", outline: "none", boxSizing: "border-box", marginBottom: 6,
                  fontFamily: "inherit",
                }}
              />
              {error && <p style={{ fontSize: 11, color: "#DC2626", marginBottom: 8 }}>{error}</p>}

              <button type="submit" style={{
                width: "100%", padding: "14px", background: "#F59E0B", color: "#fff",
                border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4,
                boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
              }}>
                Notify Me When It Launches →
              </button>
            </form>

            <p style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#111827" }}>
              You&apos;re on the list!
            </h2>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 20 }}>
              We&apos;ll email you the moment mentorship goes live.<br />
              Keep practicing your mock interviews in the meantime. 💪
            </p>
            <button onClick={onClose} style={{
              padding: "12px 28px", background: "#16A34A", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
              Back to NaukriYatra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
