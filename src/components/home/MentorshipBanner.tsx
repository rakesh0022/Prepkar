"use client";

interface Props {
  onJoin: () => void;
}

export default function MentorshipBanner({ onJoin }: Props) {
  return (
    <section style={{
      marginBottom: 20, borderRadius: 18, padding: "22px 18px",
      background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
      border: "1px solid rgba(245,158,11,0.2)",
      textAlign: "center",
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>🤝</div>
      <h3 style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 800,
        marginBottom: 6, color: "#92400E",
      }}>
        Talk to Someone Who Cracked It
      </h3>
      <p style={{ fontSize: 12, color: "#B45309", lineHeight: 1.6, marginBottom: 14 }}>
        Learn directly from real Bank POs, IAS officers, and SSC toppers.<br />
        Get guidance from someone who sat in your exact interview panel.
      </p>
      <button
        onClick={onJoin}
        style={{
          background: "#F59E0B", color: "#fff", padding: "11px 24px",
          borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer",
          border: "none", fontFamily: "'Outfit',sans-serif",
          boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
        }}
      >
        Join Waitlist — Get Early Access
      </button>
    </section>
  );
}
