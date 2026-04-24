'use client';

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import { makeSavedArticleId } from "@/lib/savedArticles";

interface Article {
  slug: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
}

interface Props {
  article: Article;
  previousArticle: { slug: string; title: string } | null;
  nextArticle: { slug: string; title: string } | null;
}

export default function ArticleContent({ article, previousArticle, nextArticle }: Props) {
  const paragraphs = article.content.split("\n\n");

  const handleShare = () => {
    const text = `Just read: "${article.title}" on @NaukriYatra. Amazing insights into government job careers! Check it out → prepkar.vercel.app/life/${article.slug}`;
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", padding: "40px 20px", textAlign: "center" }}>
        <Link href="/life" style={{ color: "#fff", opacity: 0.8, textDecoration: "none", fontSize: 14 }}>
          ← Back to all stories
        </Link>
        <div style={{ fontSize: 56, margin: "20px 0" }}>{article.icon}</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, marginBottom: 12, maxWidth: 900, margin: "20px auto" }}>
          {article.title}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 14, opacity: 0.9, flexWrap: "wrap" }}>
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        <div style={{ marginTop: "18px", display: "flex", justifyContent: "center" }}>
          <SaveArticleButton
            article={{
              id: makeSavedArticleId('life', article.slug),
              type: 'life',
              slug: article.slug,
              title: article.title,
              description: article.description,
              category: article.category,
              readTime: article.readTime,
              href: `/life/${article.slug}`,
              icon: article.icon,
              accent: '#7C3AED',
            }}
            light
          />
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
        {/* Content */}
        <div style={{ lineHeight: 1.8, color: "#374151", marginBottom: 40 }}>
          {paragraphs.map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginTop: 28, marginBottom: 12 }}>
                  {para.replace(/\*\*/g, "")}
                </h2>
              );
            }
            return <p key={i} style={{ marginBottom: 16, fontSize: 15 }}>{para}</p>;
          })}
        </div>

        {/* Share */}
        <div style={{ background: "#F3F4F6", borderRadius: 16, padding: "24px", marginBottom: 40, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 12 }}>Found this helpful?</p>
          <button
            onClick={handleShare}
            style={{ background: "#2563EB", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Share This Story
          </button>
        </div>

        {/* Prev / Next */}
        {(previousArticle || nextArticle) && (
          <div style={{ display: "grid", gridTemplateColumns: previousArticle && nextArticle ? "1fr 1fr" : "1fr", gap: 16, marginBottom: 40 }}>
            {previousArticle && (
              <Link href={`/life/${previousArticle.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "16px", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>← Previous Story</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{previousArticle.title.substring(0, 50)}...</p>
                </div>
              </Link>
            )}
            {nextArticle && (
              <Link href={`/life/${nextArticle.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "16px", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Next Story →</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{nextArticle.title.substring(0, 50)}...</p>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 16, padding: "32px 24px", textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to prepare for {article.category}?</h2>
          <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 20 }}>Take AI-powered practice tests, explore detailed roadmaps, and track your progress.</p>
          <Link href="/prepare" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", background: "#fff", color: "#667eea", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Start Your Journey →
            </span>
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
