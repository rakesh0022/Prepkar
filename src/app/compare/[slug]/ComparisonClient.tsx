'use client';

import Link from 'next/link';

interface Comparison {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface Props {
  comparison: Comparison;
  prevComparison: Comparison | null;
  nextComparison: Comparison | null;
}

export default function ComparisonClient({ comparison, prevComparison, nextComparison }: Props) {
  const contentParts = comparison.content.split('\n\n').filter((p) => p.trim());

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#6d28d9', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
              {comparison.category}
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', lineHeight: 1.3 }}>{comparison.title}</h1>
          <p style={{ fontSize: '15px', opacity: 0.9 }}>{comparison.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {contentParts.map((part, idx) => {
          if (part.startsWith('## ')) {
            return (
              <h2
                key={idx}
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginTop: '36px',
                  marginBottom: '14px',
                  color: '#1f2937',
                  borderBottom: '2px solid #6d28d9',
                  paddingBottom: '8px',
                }}
              >
                {part.replace(/^##\s*/, '')}
              </h2>
            );
          }

          if (part.startsWith('**') && part.endsWith(':**')) {
            return (
              <h3 key={idx} style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '16px', marginBottom: '6px', color: '#374151' }}>
                {part.replace(/\*\*/g, '')}
              </h3>
            );
          }

          // Render bullet-style lines
          if (part.includes('\n- ')) {
            const lines = part.split('\n');
            return (
              <div key={idx} style={{ marginBottom: '16px' }}>
                {lines.map((line, li) =>
                  line.startsWith('- ') ? (
                    <div key={li} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#6d28d9', fontWeight: 'bold', flexShrink: 0 }}>•</span>
                      <span style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7' }}>{line.slice(2)}</span>
                    </div>
                  ) : (
                    <p key={li} style={{ fontSize: '14px', color: '#374151', fontWeight: 600, marginBottom: '6px' }}>{line}</p>
                  )
                )}
              </div>
            );
          }

          // VERDICT lines get special styling
          if (part.startsWith('VERDICT:')) {
            return (
              <div key={idx} style={{
                backgroundColor: '#f5f3ff',
                border: '1px solid #ddd6fe',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#5b21b6',
                fontWeight: 600,
              }}>
                ⚖️ {part}
              </div>
            );
          }

          return (
            <p key={idx} style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px', color: '#4b5563' }}>
              {part}
            </p>
          );
        })}
      </div>

      {/* Prev / Next Navigation */}
      {(prevComparison || nextComparison) && (
        <div style={{ maxWidth: '900px', margin: '0 auto 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '0 20px' }}>
          {prevComparison ? (
            <Link
              href={`/compare/${prevComparison.slug}`}
              style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#6d28d9', border: '1px solid #e5e7eb' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>← Previous</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{prevComparison.title}</div>
            </Link>
          ) : <div />}

          {nextComparison ? (
            <Link
              href={`/compare/${nextComparison.slug}`}
              style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', color: '#6d28d9', border: '1px solid #e5e7eb', textAlign: 'right' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>Next →</div>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{nextComparison.title}</div>
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
  );
}
