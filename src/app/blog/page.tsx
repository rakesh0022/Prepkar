import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blogData";
import Footer from "@/components/Footer";
import SaveArticleButton from "@/components/reading/SaveArticleButton";
import { makeSavedArticleId } from "@/lib/savedArticles";

export const metadata: Metadata = {
  title: "Blog — NaukriYatra | Exam Strategy, Career Guides & Tips",
  description: "Read expert articles on UPSC strategy, SSC CGL vs SBI PO, government job salaries, and exam preparation tips. Free career guidance for sarkari naukri aspirants.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* ═══ HERO ═══ */}
      <section className="anim-up" style={{
        background: "linear-gradient(135deg, #0F2440 0%, #1E3A5F 40%, #2563EB 100%)",
        color: "#fff", padding: "48px 16px 44px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 20% 40%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div style={{ position: "absolute", top: -80, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(94,234,212,0.08)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(94,234,212,0.12)", borderRadius: 100, padding: "6px 16px", marginBottom: 16, backdropFilter: "blur(8px)", border: "1px solid rgba(94,234,212,0.2)" }}>
            <span style={{ fontSize: 14 }}>📝</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#5EEAD4", letterSpacing: 0.5 }}>PREPARATION INSIGHTS</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Strategy &<br/>
            <span style={{ color: "#5EEAD4" }}>Career Guides</span>
          </h1>
          <p style={{ fontSize: 14, opacity: 0.75, maxWidth: 400, margin: "0 auto" }}>
            Expert articles on exam preparation, salary insights, and career comparisons for government job aspirants
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px 60px" }}>

        {/* FEATURED POST */}
        <div className="anim-up-1" style={{ position: "relative", marginBottom: 32 }}>
          <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
            <SaveArticleButton
              article={{
                id: makeSavedArticleId('blog', featured.slug),
                type: 'blog',
                slug: featured.slug,
                title: featured.title,
                description: featured.excerpt,
                category: featured.category,
                readTime: featured.readTime,
                href: `/blog/${featured.slug}`,
                icon: featured.coverIcon,
                accent: '#2563EB',
              }}
              light
            />
          </div>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none" }}>
            <article className="card-premium" style={{
            borderRadius: 20, overflow: "hidden",
            border: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "1fr",
            }}>
            {/* Cover */}
            <div style={{
              background: featured.coverGradient, padding: "40px 28px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              minHeight: 180,
            }}>
              <div style={{ fontSize: 48, marginBottom: 12, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>
                {featured.coverIcon}
              </div>
              <span className="badge badge-new" style={{ alignSelf: "flex-start", marginBottom: 8 }}>
                Featured
              </span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.3, margin: 0 }}>
                {featured.title}
              </h2>
            </div>
            {/* Meta */}
            <div style={{ background: "var(--bg-card)", padding: "20px 24px" }}>
              <p style={{ fontSize: 16, color: "var(--text-light)", lineHeight: 1.6, marginBottom: 16, margin: "0 0 16px" }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "var(--text-faint)" }}>📅 {new Date(featured.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span style={{ fontSize: 12, color: "var(--text-faint)" }}>⏱ {featured.readTime}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", marginLeft: "auto" }}>Read Article →</span>
              </div>
            </div>
            </article>
          </Link>
        </div>

        {/* AD ZONE */}
        <div className="ad-zone" style={{ marginBottom: 32 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        {/* ARTICLE GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }} className="blog-grid">
          {rest.map((post, i) => (
            <div key={post.slug} className={`anim-up-${Math.min(i + 2, 6)}`} style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
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
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <article className="card-premium" style={{
                borderRadius: 16, overflow: "hidden",
                border: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "1fr",
                }}>
                {/* Cover strip */}
                <div style={{
                  background: post.coverGradient, padding: "24px 20px",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <div style={{ fontSize: 36, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))", flexShrink: 0 }}>
                    {post.coverIcon}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                      {post.category}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: 0 }}>
                      {post.title}
                    </h3>
                  </div>
                </div>
                {/* Body */}
                <div style={{ background: "var(--bg-card)", padding: "16px 20px" }}>
                  <p style={{ fontSize: 15, color: "var(--text-light)", lineHeight: 1.5, marginBottom: 12, margin: "0 0 12px" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    <span style={{ fontSize: 11, color: "var(--text-faint)" }}>⏱ {post.readTime}</span>
                    <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: "var(--bg-card-2)", color: "var(--text-light)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        {/* AD ZONE */}
        <div className="ad-zone" style={{ marginTop: 32 }}>
          📢 Advertisement Space — Google AdSense
        </div>

        {/* CTA */}
        <div className="anim-up-5" style={{
          marginTop: 32, background: "linear-gradient(135deg, #4C1D95, #6D28D9)",
          borderRadius: 18, padding: "28px 24px", textAlign: "center", color: "#fff",
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            Ready to Start Preparing?
          </h3>
          <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 20, maxWidth: 360, margin: "0 auto 20px" }}>
            Free quizzes, AI-powered mock interviews, and career roadmaps — all in one place
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
            }}>🎯 AI Practice</Link>
          </div>
        </div>

        <Footer />
      </div>

      {/* ═══ RESPONSIVE STYLES (embedded) ═══ */}
      <style>{`
        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
