'use client';

import { useSavedArticles } from '@/hooks/useSavedArticles';
import type { SavedArticleMeta } from '@/lib/savedArticles';

type Props = {
  article: SavedArticleMeta;
  compact?: boolean;
  light?: boolean;
};

export default function SaveArticleButton({ article, compact = false, light = false }: Props) {
  const { isSaved, toggleSavedArticle } = useSavedArticles();
  const active = isSaved(article.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSavedArticle(article);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? 0 : 8,
        padding: compact ? '8px 10px' : '10px 14px',
        minWidth: compact ? 40 : 'auto',
        borderRadius: 999,
        border: light
          ? `1px solid ${active ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.22)'}`
          : `1px solid ${active ? `${article.accent}40` : 'rgba(203,213,225,0.9)'}`,
        background: light
          ? active
            ? 'rgba(255,255,255,0.18)'
            : 'rgba(255,255,255,0.08)'
          : active
            ? `${article.accent}12`
            : '#FFFFFF',
        color: light ? '#FFFFFF' : active ? article.accent : '#475569',
        fontSize: compact ? 15 : 12,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: light ? 'none' : '0 10px 18px rgba(15,23,42,0.06)',
        transition: 'all 0.2s ease',
        backdropFilter: light ? 'blur(8px)' : 'none',
      }}
      title={active ? 'Remove from saved articles' : 'Save article'}
    >
      <span>{active ? '★' : '☆'}</span>
      {!compact && <span>{active ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
