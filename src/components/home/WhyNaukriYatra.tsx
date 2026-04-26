"use client";

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Powered Practice",
    description: "Get scored on essays, interviews, and prelims by AI",
    gradient: "linear-gradient(135deg, #7C3AED, #A855F7)",
    bgColor: "#F5F3FF",
    iconBg: "#EDE9FE",
  },
  {
    icon: "📊",
    title: "Real Data",
    description: "Cutoff trends, salary breakdowns, and selection ratios from official sources",
    gradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
    bgColor: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: "📅",
    title: "Never Miss a Deadline",
    description: "Exam calendar with reminders for every major government exam",
    gradient: "linear-gradient(135deg, #DC2626, #EF4444)",
    bgColor: "#FEF2F2",
    iconBg: "#FEE2E2",
  },
  {
    icon: "🆓",
    title: "100% Free",
    description: "No hidden charges. No premium wall for basic features",
    gradient: "linear-gradient(135deg, #059669, #10B981)",
    bgColor: "#F0FDF4",
    iconBg: "#D1FAE5",
  },
];

export default function WhyNaukriYatra() {
  return (
    <section style={{
      padding: "40px 0",
      background: "linear-gradient(180deg, var(--bg) 0%, #F9FAFB 50%, var(--bg) 100%)",
      marginBottom: 20,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            padding: "8px 20px",
            borderRadius: 100,
            marginBottom: 16,
            border: "1px solid #BFDBFE",
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1E40AF",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>Why Choose Us</span>
          </div>
          <h2 style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#111827",
            fontFamily: "'Outfit', sans-serif",
            marginBottom: 12,
            lineHeight: 1.2,
          }}>
            Why 10,000+ students choose NaukriYatra
          </h2>
          <p style={{
            fontSize: 16,
            color: "#6B7280",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Everything you need to prepare for government exams, all in one place
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "28px 24px",
                border: "2px solid rgba(0,0,0,0.04)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
              }}
            >
              {/* Gradient accent */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: feature.gradient,
              }} />

              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: feature.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#111827",
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 1.6,
                margin: 0,
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center",
          marginTop: 40,
        }}>
          <a href="/about" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
              color: "#fff",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.3)";
            }}
            >
              Learn More About Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
