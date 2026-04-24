import type { Metadata } from "next";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import dayInLifeData from "@/data/day-in-life.json";

export const metadata: Metadata = {
  title: "Day in the Life — Real Stories from Government Job Officers | NaukriYatra",
  description: "Discover what a real day looks like for IAS officers, bank managers, income tax inspectors, and more. Behind-the-scenes stories from India's most prestigious government jobs.",
  keywords: "day in the life, IAS officer, SBI PO, government job reality, career stories, job experience",
  alternates: { canonical: "/life" },
};

export default function DayInLifePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80, paddingTop: 0 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        padding: "40px 20px",
        textAlign: "center",
      }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          Day in the Life
        </h1>
        <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 0 }}>
          Real stories from India's most prestigious government job officers
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
        <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 40, textAlign: "center", maxWidth: 800, margin: "0 auto 40px" }}>
          Ever wondered what an IAS officer actually does? Or how much power an Income Tax Inspector really has? Get an authentic, inside look at a day in the life of India's most coveted government jobs.
        </p>

        {/* Articles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 40 }}>
          {dayInLifeData.articles.map((article) => (
            <Link key={article.slug} href={`/life/${article.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{article.icon}</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8, lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12, flex: 1, lineHeight: 1.6 }}>
                  {article.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#9CA3AF" }}>
                  <span style={{ background: "#F3F4F6", padding: "4px 10px", borderRadius: 6 }}>
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 20,
          padding: "40px 24px",
          textAlign: "center",
          color: "#fff",
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            Ready to chase your dream job?
          </h2>
          <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24 }}>
            Explore 17+ government job roadmaps, take AI-powered practice tests, and prepare with confidence.
          </p>
          <Link href="/prepare" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#fff",
              color: "#667eea",
              padding: "12px 32px",
              borderRadius: 8,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}>
              Start Preparing →
            </button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}