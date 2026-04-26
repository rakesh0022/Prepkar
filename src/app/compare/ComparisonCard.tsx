'use client';

import Link from 'next/link';
import { CATEGORY_STYLES, COMPARISON_META, type ComparisonOverview } from './comparisonMeta';

const CAT_ICON: Record<string, string> = {
  UPSC: '🏛️', Banking: '🏦', SSC: '📋', Railway: '🚂', Career: '💼',
};

function StarRating({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ fontSize: 10, color: i < value ? color : 'rgba(148,163,184,0.3)' }}>★</span>
      ))}
    </div>
  );
}

export default function ComparisonCard({ comparison }: { comparison: ComparisonOverview }) {
  const theme = CATEGORY_STYLES[comparison.category];
  const meta = COMPARISON_META[comparison.slug];

  // Pull 2 key differentiating stats from meta if available
  const leftSalary = meta?.leftSalaryValue
    ? `₹${(meta.leftSalaryValue / 1000).toFixed(0)}K`
    : null;
  const rightSalary = meta?.rightSalaryValue
    ? `₹${(meta.rightSalaryValue / 1000).toFixed(0)}K`
    : null;

  return (
    <Link
      href={`/compare/${comparison.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}99)` }} />

        {/* Most Popular badge */}
        {comparison.trending && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#fff', fontSize: 9, fontWeight: 800,
            padding: '3px 10px', borderRadius: 10,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            boxShadow: '0 2px 8px rgba(245,158,11,0.4)',
          }}>
            🔥 Most Popular
          </div>
        )}

        <div style={{ padding: '16px 16px 20px' }}>
          {/* Category pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: theme.soft, color: theme.accent,
            fontSize: 10, fontWeight: 800, padding: '4px 12px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.15em',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 12 }}>{CAT_ICON[comparison.category]}</span>
            {comparison.category}
          </div>

          {/* VS Card */}
          <div style={{
            background: theme.header,
            borderRadius: 18,
            padding: '16px 14px',
            border: `1px solid ${theme.ring}`,
            marginBottom: 14,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 10 }}>
              {/* Left */}
              <div>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: `${theme.accent}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 8,
                }}>
                  {comparison.leftIcon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#111827', lineHeight: 1.2, marginBottom: 4 }}>
                  {comparison.leftLabel}
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, marginBottom: 6 }}>
                  {comparison.bestForLeft}
                </div>
                {leftSalary && (
                  <div style={{
                    fontSize: 13, fontWeight: 900, color: theme.accent,
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {leftSalary}
                  </div>
                )}
                <div style={{ marginTop: 4 }}>
                  <StarRating value={comparison.difficultyLeft} color={theme.accent} />
                </div>
              </div>

              {/* VS badge */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: '#0F172A', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 900, letterSpacing: '0.15em',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}>
                VS
              </div>

              {/* Right */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: 'rgba(15,23,42,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 8, marginLeft: 'auto',
                }}>
                  {comparison.rightIcon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#111827', lineHeight: 1.2, marginBottom: 4 }}>
                  {comparison.rightLabel}
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, marginBottom: 6 }}>
                  {comparison.bestForRight}
                </div>
                {rightSalary && (
                  <div style={{
                    fontSize: 13, fontWeight: 900, color: '#F97316',
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {rightSalary}
                  </div>
                )}
                <div style={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <StarRating value={comparison.difficultyRight} color="#F97316" />
                </div>
              </div>
            </div>

            {/* Key stat row */}
            {comparison.previewStat && (
              <div style={{
                marginTop: 12, padding: '8px 12px',
                background: 'rgba(255,255,255,0.7)', borderRadius: 10,
                fontSize: 11, color: '#374151', fontWeight: 600,
                textAlign: 'center',
              }}>
                {comparison.previewStat}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: theme.accent }}>
              Read Comparison →
            </div>
            <div style={{
              fontSize: 10, color: '#9CA3AF', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              📖 8 min read
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
