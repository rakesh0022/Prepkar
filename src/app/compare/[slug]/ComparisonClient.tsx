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
  // Parse content into paragraphs and headings
  const contentParts = comparison.content.split('\n\n').filter((p) => p.trim());

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#6d28d9', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>{comparison.title}</h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>{comparison.description}</p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' }}>
              {comparison.category}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        {contentParts.map((part, idx) => {
          if (part.startsWith('##')) {
            return (
              <h2
                key={idx}
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginTop: '32px',
                  marginBottom: '16px',
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
              <h3 key={idx} style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px', color: '#374151' }}>
                {part.replace(/\*\*/g, '')}
              </h3>
            );
          }

          return (
            <p key={idx} style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '16px', color: '#4b5563' }}>
              {part}
            </p>
          );
        })}
      </div>

      {/* Navigation */}
      <div
        style={{
          maxWidth: '900px',
          margin: '40px auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          padding: '0 20px',
        }}
      >
        {prevComparison ? (
          <Link
            href={`/compare/${prevComparison.slug}`}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#6d28d9',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>← Previous</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{prevComparison.title}</div>
          </Link>
        ) : (
          <div />
        )}

        {nextComparison ? (
          <Link
            href={`/compare/${nextComparison.slug}`}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#6d28d9',
              border: '1px solid #e5e7eb',
              textAlign: 'right',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Next →</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{nextComparison.title}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Back Link */}
      <div style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #e5e7eb' }}>
        <Link
          href="/compare"
          style={{
            display: 'inline-block',
            backgroundColor: '#6d28d9',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#5b21b6';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#6d28d9';
          }}
        >
          ← Back to All Comparisons
        </Link>
      </div>
    </div>
  );
}
