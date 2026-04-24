'use client';

import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useSavedArticles } from '@/hooks/useSavedArticles';
import SaveArticleButton from '@/components/reading/SaveArticleButton';

export default function SavedArticlesPage() {
  const { savedArticles, savedCount, clearSavedArticles } = useSavedArticles();

  const getTypeLabel = (type: string) => {
    if (type === 'blog') return 'Blog';
    if (type === 'life') return 'Life After Selection';
    return 'Current Affairs';
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      <section
        className="anim-up"
        style={{
          background: 'linear-gradient(135deg, #0F2440 0%, #1E3A5F 42%, #0D9488 100%)',
          color: '#fff',
          padding: '48px 16px 42px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 24% 34%, #fff 1px, transparent 1px), radial-gradient(circle at 76% 64%, #fff 1px, transparent 1px)', backgroundSize: '46px 46px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 14 }}>☆</span>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6 }}>READING LIST</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>
            Saved Articles
          </h1>
          <p style={{ fontSize: 14, opacity: 0.78, maxWidth: 420, margin: 0 }}>
            Keep the best strategy guides and career stories together, then jump back in whenever you want.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <div style={{ padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 12, fontWeight: 800 }}>
              {savedCount} saved {savedCount === 1 ? 'article' : 'articles'}
            </div>
            {savedCount > 0 && (
              <button
                type="button"
                onClick={clearSavedArticles}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.24)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Clear list
              </button>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 16px 48px' }}>
        {savedCount === 0 ? (
          <div
            className="anim-up-1"
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
              padding: '28px 22px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 10 }}>☆</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 8 }}>Nothing saved yet</h2>
            <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 20px' }}>
              When you tap save on a blog post, a life-after-selection story, or a current affairs fact, it will show up here for quick return visits.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href="/blog"
                style={{
                  textDecoration: 'none',
                  padding: '12px 18px',
                  borderRadius: 12,
                  background: '#2563EB',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                Explore Blog
              </Link>
              <Link
                href="/life"
                style={{
                  textDecoration: 'none',
                  padding: '12px 18px',
                  borderRadius: 12,
                  background: '#F8FAFC',
                  color: '#0F172A',
                  border: '1px solid #E2E8F0',
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                Browse Career Stories
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }} className="blog-grid">
            {savedArticles.map((article, index) => (
              <div
                key={article.id}
                className={`card-premium anim-up-${Math.min(index + 1, 6)}`}
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: '#FFFFFF',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    padding: '18px 18px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 18,
                        background: `${article.accent}14`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        flexShrink: 0,
                      }}
                    >
                      {article.icon}
                    </div>
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', borderRadius: 999, background: `${article.accent}12`, color: article.accent, fontSize: 10, fontWeight: 800, marginBottom: 8 }}>
                        {getTypeLabel(article.type)}
                      </div>
                      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.35, margin: 0 }}>{article.title}</h2>
                    </div>
                  </div>
                  <SaveArticleButton article={article} />
                </div>

                <div style={{ padding: '16px 18px 18px' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7, margin: '0 0 16px' }}>{article.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: '5px 10px', borderRadius: 999, background: 'var(--bg-card-2)', color: 'var(--text-body)' }}>
                      {article.category}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{article.readTime}</span>
                    <Link href={article.href} style={{ marginLeft: 'auto', textDecoration: 'none', fontSize: 12, fontWeight: 800, color: article.accent }}>
                      Read now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 36 }}>
          <Footer />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
