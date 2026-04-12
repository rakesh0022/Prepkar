"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  onClose: () => void;
  type?: "mentorship" | "reminder";
  examName?: string;
}

export default function WaitlistModal({ onClose, type = "mentorship", examName }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true); setError("");

    try {
      // Save to Supabase waitlist table
      const { error: dbError } = await supabase
        .from("waitlist")
        .upsert({
          email: trimmed,
          type: type === "reminder" ? "exam_reminder" : "mentorship",
          exam_name: examName || null,
          created_at: new Date().toISOString(),
        }, { onConflict: "email,type" });

      if (dbError) {
        // If table doesn't exist yet, fall back to localStorage
        console.warn("Waitlist save failed (table may not exist):", dbError);
        const existing: string[] = JSON.parse(localStorage.getItem("ny_waitlist") || "[]");
        if (!existing.includes(trimmed)) {
          existing.push(trimmed);
          localStorage.setItem("ny_waitlist", JSON.stringify(existing));
        }
      }
      setSubmitted(true);
    } catch {
      // Fallback to localStorage
      const existing: string[] = JSON.parse(localStorage.getItem("ny_waitlist") || "[]");
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem("ny_waitlist", JSON.stringify(existing));
      }
      setSubmitted(true);
    } finally { setLoading(false); }
  }

  const isMentorship = type === "mentorship";
  const title = isMentorship ? "Talk to Someone Who Cracked It" : `Remind Me — ${examName}`;
  const desc = isMentorship
    ? "Connect with real selected officers — Bank POs, IAS officers, SSC toppers. Be the first to know when mentorship goes live."
    : `We'll email you 7 days before ${examName} exam date so you don't miss the deadline.`;
  const emoji = isMentorship ? "🤝" : "🔔";
  const btnText = isMentorship ? "Notify Me When It Launches →" : "Set Reminder →";
  const successText = isMentorship
    ? "We'll email you the moment mentorship goes live."
    : `We'll remind you before ${examName}. Keep preparing!`;

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
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.04)", border: "none", color: "#9CA3AF", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>

        {!submitted ? (
          <>
            <div style={{ fontSize: 36, marginBottom: 10, textAlign: "center" }}>{emoji}</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 6, color: "#111827" }}>{title}</h2>
            <p style={{ fontSize: 13, color: "#6B7280", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>{desc}</p>
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="your@email.com" value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                style={{ width: "100%", padding: "13px 16px", borderRadius: 12, fontSize: 14, background: "#F9FAFB", border: `1.5px solid ${error ? "#DC2626" : "var(--border)"}`, color: "#111827", outline: "none", boxSizing: "border-box", marginBottom: 6, fontFamily: "inherit" }} />
              {error && <p style={{ fontSize: 11, color: "#DC2626", marginBottom: 8 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "14px", background: loading ? "#93C5FD" : isMentorship ? "#F59E0B" : "#2563EB",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: loading ? "default" : "pointer", marginTop: 4,
              }}>{loading ? "Saving..." : btnText}</button>
            </form>
            <p style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#111827" }}>You&apos;re on the list!</h2>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 20 }}>{successText}</p>
            <button onClick={onClose} style={{ padding: "12px 28px", background: "#16A34A", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Back to NaukriYatra</button>
          </div>
        )}
      </div>
    </div>
  );
}
