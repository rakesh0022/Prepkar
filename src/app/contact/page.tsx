import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — NaukriYatra",
  description: "Get in touch with NaukriYatra. Report issues, suggest features, or ask questions.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80, paddingTop: 0 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>← Back to Home</Link>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#111827", marginTop: 16, marginBottom: 8 }}>
          Contact Us
        </h1>
        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 28 }}>
          Have a question, found a bug, or want to suggest a feature? We&apos;d love to hear from you.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "📧", title: "Email", value: "support@naukriyatra.com", desc: "For general queries, partnerships, and support", link: "mailto:support@naukriyatra.com" },
            { icon: "🐛", title: "Report a Bug", value: "GitHub Issues", desc: "Found something broken? Report it on our GitHub", link: "https://github.com/rakesh0022/Prepkar/issues" },
            { icon: "💡", title: "Feature Request", value: "GitHub Discussions", desc: "Have an idea to make NaukriYatra better?", link: "https://github.com/rakesh0022/Prepkar/discussions" },
            { icon: "📱", title: "Social Media", value: "Coming Soon", desc: "Follow us for exam updates and tips", link: "#" },
          ].map((item, i) => (
            <a key={i} href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFFFFF", borderRadius: 14, padding: "18px 20px",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
                display: "flex", gap: 16, alignItems: "center",
                transition: "box-shadow 0.2s",
              }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#2563EB", fontWeight: 600, marginTop: 2 }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{item.desc}</div>
                </div>
                <span style={{ color: "#9CA3AF", fontSize: 16 }}>→</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 28, background: "#FFFBEB", borderRadius: 14, padding: "18px 20px",
          border: "1px solid rgba(245,158,11,0.15)", textAlign: "center",
        }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>⏰</div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#92400E", marginBottom: 4 }}>Response Time</p>
          <p style={{ fontSize: 12, color: "#B45309" }}>We typically respond within 24–48 hours on working days.</p>
        </div>
      </div>
    </main>
  );
}
