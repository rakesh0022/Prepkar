import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — NaukriYatra",
  description: "Get in touch with NaukriYatra. Report issues, suggest features, or ask questions about government job preparation.",
  keywords: "contact NaukriYatra, support, feedback, government job help",
  alternates: { canonical: "/contact" },
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
          Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.
        </p>

        {/* Contact Form */}
        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Send us a message</h2>
          <form action="mailto:contact@naukriyatra.com" method="post" encType="text/plain">
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Name</label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: "100%", padding: "10px 12px", border: "1px solid #D1D5DB", borderRadius: 8,
                  fontSize: 14, background: "#FFFFFF"
                }}
                placeholder="Your full name"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Email</label>
              <input
                type="email"
                name="email"
                required
                style={{
                  width: "100%", padding: "10px 12px", border: "1px solid #D1D5DB", borderRadius: 8,
                  fontSize: 14, background: "#FFFFFF"
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Subject</label>
              <select
                name="subject"
                required
                style={{
                  width: "100%", padding: "10px 12px", border: "1px solid #D1D5DB", borderRadius: 8,
                  fontSize: 14, background: "#FFFFFF"
                }}
              >
                <option value="">Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                style={{
                  width: "100%", padding: "10px 12px", border: "1px solid #D1D5DB", borderRadius: 8,
                  fontSize: 14, background: "#FFFFFF", resize: "vertical"
                }}
                placeholder="Tell us how we can help you..."
              />
            </div>
            <button
              type="submit"
              style={{
                background: "#2563EB", color: "#FFFFFF", padding: "12px 24px", border: "none",
                borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
                width: "100%"
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "📧", title: "Email", value: "contact@naukriyatra.com", desc: "For general queries, partnerships, and support", link: "mailto:contact@naukriyatra.com" },
            { icon: "🐛", title: "Report a Bug", value: "GitHub Issues", desc: "Found something broken? Report it on our GitHub", link: "https://github.com/rakesh0022/Prepkar/issues" },
            { icon: "💡", title: "Feature Request", value: "GitHub Discussions", desc: "Have an idea to make NaukriYatra better?", link: "https://github.com/rakesh0022/Prepkar/discussions" },
            { icon: "🐦", title: "Twitter", value: "@naukriyatra", desc: "Follow us for exam updates and tips", link: "https://twitter.com/naukriyatra" },
            { icon: "📸", title: "Instagram", value: "@naukriyatra", desc: "Daily motivation and study tips", link: "https://instagram.com/naukriyatra" },
            { icon: "💼", title: "LinkedIn", value: "NaukriYatra", desc: "Professional updates and career advice", link: "https://linkedin.com/company/naukriyatra" },
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
          <p style={{ fontSize: 12, color: "#B45309" }}>We respond within 48 hours on working days.</p>
        </div>
      </div>
    </main>
  );
}
