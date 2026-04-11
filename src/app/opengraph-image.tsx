import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NaukriYatra — Sapne se Selection Tak";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(145deg, #1E3A5F 0%, #0F2440 50%, #162D50 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#ffffff" }}>Naukri</span>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#5EEAD4" }}>Yatra</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 64, fontWeight: 800, color: "#ffffff", marginBottom: "8px", textAlign: "center" }}>
          Sapne se <span style={{ color: "#5EEAD4" }}>Selection Tak</span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", marginBottom: "40px", textAlign: "center" }}>
          Your complete government job preparation companion
        </div>

        {/* Features */}
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { icon: "🎯", text: "AI Mock Interview" },
            { icon: "💼", text: "17+ Govt Jobs" },
            { icon: "💰", text: "Salary Calculator" },
            { icon: "📋", text: "Exam Syllabus" },
          ].map((f) => (
            <div
              key={f.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.08)",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: 20 }}>{f.icon}</span>
              <span style={{ fontSize: 18, color: "#ffffff", fontWeight: 600 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
