import type { Metadata } from "next";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import dayInLifeData from "@/data/day-in-life.json";
import LifeArticleCard from "./LifeArticleCard";

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
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
          Day in the Life
        </h1>
        <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 0 }}>
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
            <LifeArticleCard key={article.slug} article={article} />
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