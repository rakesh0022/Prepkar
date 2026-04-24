import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS, getBlogPost, getAllSlugs } from "@/lib/blogData";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/reading/ReadingProgressBar";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import { makeSavedArticleId } from "@/lib/savedArticles";

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} — NaukriYatra Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const plainText = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;

  // Related posts (exclude current)
  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <ReadingProgressBar wordCount={wordCount} />

      {/* ═══ ARTICLE HERO ═══ */}
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
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <SaveArticleButton
              article={{
                id: makeSavedArticleId('blog', post.slug),
                type: 'blog',
                slug: post.slug,
                title: post.title,
                description: post.excerpt,
                category: post.category,
                readTime: post.readTime,
                href: `/blog/${post.slug}`,
                icon: post.coverIcon,
                accent: '#2563EB',
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
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ═══ ARTICLE BODY ═══ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 0" }}>

        {/* Ad zone top */}
        <div className="ad-zone" style={{ marginBottom: 28 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        <article
          className="blog-content anim-up-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ad zone bottom */}
        <div className="ad-zone" style={{ marginTop: 32, marginBottom: 32 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        {/* ═══ CTA BOX ═══ */}
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
            Apply what you've learned with free quizzes and AI-powered mock interviews
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quiz" style={{
              padding: "12px 24px", borderRadius: 12, background: "#fff", color: "#4C1D95",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
            }}>📝 Free Quizzes</Link>
            <Link href="/ai-practice" style={{
              padding: "12px 24px", borderRadius: 12, background: "rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>🎯 AI Interview</Link>
          </div>
        </div>

        {/* ═══ RELATED ARTICLES ═══ */}
        {related.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 16 }}>
              Related Articles
            </h3>
            <div className="blog-related-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-premium" style={{
                    borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)",
                    display: "grid", gridTemplateColumns: "1fr",
                  }}>
                    <div style={{
                      background: r.coverGradient, padding: "16px 18px",
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
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

      {/* ═══ ARTICLE TYPOGRAPHY STYLES ═══ */}
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
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-body);
          margin: 0 0 16px;
        }
        .blog-content ul {
          margin: 0 0 20px;
          padding-left: 20px;
        }
        .blog-content li {
          font-size: 14px;
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
          .blog-content p { font-size: 16px; }
          .blog-content li { font-size: 15px; }
          .blog-related-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
