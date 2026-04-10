"use client";

interface Props {
  onJoin: () => void;
}

export default function MentorshipBanner({ onJoin }: Props) {
  return (
    <section className="fade-up-d6" style={{
      marginBottom: 20, borderRadius: 18, padding: "22px 18px",
      background: "linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.04))",
      border: "1px solid rgba(251,191,36,0.18)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>🤝</div>
      <h3 style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 800,
        marginBottom: 6, color: "#fef3c7",
      }}>
        Talk to Someone Who Cracked It
      </h3>
      <p style={{ fontSize: 12, color: "#92400e", lineHeight: 1.6, marginBottom: 14 }}>
        Learn directly from real Bank POs, IAS officers, and SSC toppers.<br />
        Get guidance from someone who sat in your exact interview panel.
      </p>
      <button
        onClick={onJoin}
        style={{
          background: "#f59e0b", color: "#000", padding: "11px 24px",
          borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer",
          border: "none", fontFamily: "'Outfit',sans-serif",
        }}
      >
        Join Waitlist — Get Early Access
      </button>
    </section>
  );
}
