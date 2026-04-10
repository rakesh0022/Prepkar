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
    // Persist locally so we can batch-send later
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
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} />

      <div style={{
        position: "relative", background: "#12131a", borderRadius: "20px 20px 0 0",
        width: "100%", maxWidth: 640, padding: "28px 24px 40px",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.15)" }} />
        </div>

        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)",
          border: "none", color: "#888", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14,
        }}>✕</button>

        {!submitted ? (
          <>
            <div style={{ fontSize: 36, marginBottom: 10, textAlign: "center" }}>🤝</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>
              Talk to Someone Who Cracked It
            </h2>
            <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
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
                  background: "rgba(255,255,255,0.05)", border: `1.5px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                  color: "#fff", outline: "none", boxSizing: "border-box", marginBottom: 6,
                  fontFamily: "inherit",
                }}
              />
              {error && <p style={{ fontSize: 11, color: "#f87171", marginBottom: 8 }}>{error}</p>}

              <button type="submit" style={{
                width: "100%", padding: "14px", background: "#f59e0b", color: "#000",
                border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4,
              }}>
                Notify Me When It Launches →
              </button>
            </form>

            <p style={{ fontSize: 10, color: "#4b5563", textAlign: "center", marginTop: 12 }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
              You&apos;re on the list!
            </h2>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6, marginBottom: 20 }}>
              We&apos;ll email you the moment mentorship goes live.<br />
              Keep practicing your mock interviews in the meantime. 💪
            </p>
            <button onClick={onClose} style={{
              padding: "12px 28px", background: "#059669", color: "#fff",
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
