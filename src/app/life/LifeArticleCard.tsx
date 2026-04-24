'use client';

import Link from 'next/link';
import SaveArticleButton from '@/components/reading/SaveArticleButton';
import { makeSavedArticleId } from '@/lib/savedArticles';

interface Article {
  slug: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

export default function LifeArticleCard({ article }: { article: Article }) {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}>
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
        />
      </div>

      <Link key={article.slug} href={`/life/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '24px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>{article.icon}</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8, lineHeight: 1.4 }}>
            {article.title}
          </h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 12, flex: 1, lineHeight: 1.6 }}>
            {article.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#9CA3AF' }}>
            <span style={{ background: '#F3F4F6', padding: '4px 10px', borderRadius: 6 }}>
              {article.category}
            </span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
