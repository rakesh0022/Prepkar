"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/reading/ReadingProgressBar";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import BackToTop from "@/components/reading/BackToTop";
import HighlightShare from "@/components/reading/HighlightShare";
import ReadingToolbar from "@/components/reading/ReadingToolbar";
import TableOfContents from "@/components/reading/TableOfContents";
import { makeSavedArticleId } from "@/lib/savedArticles";
import { computeWordCount, computeReadingTime, extractHeadings } from "@/lib/readingUtils";
import { useTextSize } from "@/hooks/useTextSize";

interface Post {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  coverGradient: string;
  coverIcon: string;
}

interface Related {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  coverGradient: string;
  coverIcon: string;
}

interface Props {
  post: Post;
  related: Related[];
}

export default function BlogArticleClient({ post, related }: Props) {
  const { textSize, increase, decrease } = useTextSize();
  const articleRef = useRef<HTMLElement>(null);

  const plainText = useMemo(
    () => post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    [post.content]
  );
  const wordCount = useMemo(() => computeWordCount(plainText), [plainText]);
  const readingTime = useMemo(() => computeReadingTime(wordCount), [wordCount]);
  const headings = useMemo(() => extractHeadings(post.content, "html"), [post.content]);

  // Add IDs to rendered h2 elements so IntersectionObserver can target them
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    article.querySelectorAll("h2").forEach((el) => {
      const text = el.textContent?.trim() ?? "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (id) el.id = id;
    });
  }, [post.content]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <ReadingProgressBar wordCount={wordCount} />
      <TableOfContents headings={headings} articleHalfWidth={370} />

      {/* Hero */}
      <section className="anim-up" style={{
        background: post.coverGradient,
        color: "#fff", padding: "48px 16px 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <Link href="/blog" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
            ← Back to Blog
          </Link>

          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <SaveArticleButton
              article={{
                id: makeSavedArticleId("blog", post.slug),
                type: "blog",
                slug: post.slug,
                title: post.title,
                description: post.excerpt,
                category: post.category,
                readTime: post.readTime,
                href: `/blog/${post.slug}`,
                icon: post.coverIcon,
                accent: "#2563EB",
              }}
              light
            />
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, opacity: 0.7, flexWrap: "wrap" }}>
            <span>✍️ {post.author}</span>
            <span>📅 {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>📖 {readingTime} min read</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 0" }}>
        <div className="ad-zone" style={{ marginBottom: 28 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        <article
          ref={articleRef}
          className="blog-content anim-up-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="ad-zone" style={{ marginTop: 32, marginBottom: 32 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        {/* CTA */}
        <div className="anim-up-3" style={{
          background: "linear-gradient(135deg, #4C1D95, #6D28D9)",
          borderRadius: 18, padding: "28px 24px", textAlign: "center", color: "#fff",
          marginBottom: 40,
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>💡</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
            Start Practicing Today
          </h3>
          <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 20, maxWidth: 360, margin: "0 auto 20px" }}>
            Apply what you&apos;ve learned with free quizzes and AI-powered mock interviews
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quiz" style={{ padding: "12px 24px", borderRadius: 12, background: "#fff", color: "#4C1D95", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📝 Free Quizzes</Link>
            <Link href="/ai-practice" style={{ padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>🎯 AI Interview</Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 16 }}>
              Related Articles
            </h3>
            <div className="blog-related-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-premium" style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr" }}>
                    <div style={{ background: r.coverGradient, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 28 }}>{r.coverIcon}</span>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>{r.category}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{r.title}</div>
                      </div>
                    </div>
                    <div style={{ background: "var(--bg-card)", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "var(--text-faint)" }}>⏱ {r.readTime}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB" }}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>

      {/* Reading utilities */}
      <HighlightShare />
      <BackToTop />
      <ReadingToolbar textSize={textSize} increase={increase} decrease={decrease} />

      <style>{`
        .blog-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--text-dark);
          margin: 32px 0 12px;
          line-height: 1.3;
        }
        .blog-content p {
          font-size: ${textSize}px;
          line-height: 1.8;
          color: var(--text-body);
          margin: 0 0 16px;
        }
        .blog-content ul {
          margin: 0 0 20px;
          padding-left: 20px;
        }
        .blog-content li {
          font-size: ${textSize - 1}px;
          line-height: 1.7;
          color: var(--text-body);
          margin-bottom: 8px;
        }
        .blog-content strong {
          color: var(--text-dark);
          font-weight: 700;
        }
        @media (min-width: 768px) {
          .blog-content h2 { font-size: 26px; }
          .blog-related-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
