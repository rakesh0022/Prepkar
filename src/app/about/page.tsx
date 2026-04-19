import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — NaukriYatra",
  description: "Learn about NaukriYatra — India's AI-powered government job preparation platform.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80, paddingTop: 0 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      
      {/* Page Header Image */}
      <div style={{
        width: "100%", height: 240, 
        backgroundImage: "url('/images/pages/about-header.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: 0,
      }} />
      
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
        <Link href="/" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}>← Back to Home</Link>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#111827", marginTop: 16, marginBottom: 8 }}>
          About NaukriYatra
        </h1>
        <p style={{ fontSize: 16, color: "#2563EB", fontWeight: 600, marginBottom: 24, fontFamily: "'Outfit'" }}>
          Sapne se Selection Tak
        </p>

        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>Our Mission</h2>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>
            Every year, over 3 crore Indians appear for government job exams. Most come from small towns, study on their phones, and can&apos;t afford coaching classes. NaukriYatra exists to level the playing field — providing free AI-powered practice, complete career roadmaps, salary calculators, and exam preparation resources that were once only available to those who could afford expensive coaching.
          </p>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>What We Offer</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🎯", title: "AI Practice System", desc: "Stage-wise practice for 6 major government exams — from Prelims MCQ to Final Interview. Our AI generates exam-realistic questions and scores every answer with detailed feedback." },
              { icon: "💼", title: "17+ Career Profiles", desc: "Complete roadmaps for SBI PO, SSC CGL, UPSC CSE, RRB NTPC, NDA, IBPS, and more — including salary breakdowns, day-in-life timelines, and promotion paths." },
              { icon: "💰", title: "Salary Calculator", desc: "Interactive calculator that shows your exact in-hand salary based on city type (Metro, Urban, Rural) with full DA, HRA, and allowance breakdowns." },
              { icon: "📚", title: "Exam Syllabus & PYQ Papers", desc: "Complete syllabus for every exam and links to previous year question papers — everything you need in one place." },
              { icon: "📊", title: "Score Dashboard", desc: "Track your practice history, see your improvement over time, and identify weak areas to focus on." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>Why NaukriYatra?</h2>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 12 }}>
            Most exam preparation platforms charge ₹5,000–₹50,000 for their courses. We believe every aspirant deserves access to quality preparation tools regardless of their financial background.
          </p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>
            NaukriYatra is built in India, for India. Our content is specifically designed for Indian government exams, our salary data is based on the 7th Pay Commission, and our AI interview panels simulate real UPSC, SSC, and Banking interview experiences.
          </p>
        </div>

        <div style={{ background: "linear-gradient(135deg, #EFF6FF, #F0FDFA)", borderRadius: 16, padding: "24px", border: "1px solid rgba(37,99,235,0.1)", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🇮🇳</div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Made in India with ❤️</p>
          <p style={{ fontSize: 13, color: "#6B7280" }}>By aspirants, for aspirants.</p>
        </div>
      </div>
    </main>
  );
}
