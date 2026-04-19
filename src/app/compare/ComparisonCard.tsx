'use client';

import Link from 'next/link';

interface Comparison {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export default function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Link
      href={`/compare/${comparison.slug}`}
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(109, 40, 217, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ display: 'inline-block', backgroundColor: '#6d28d9', color: 'white', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '600' }}>
          {comparison.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1 }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
          {comparison.title}
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
          {comparison.description}
        </p>
        <div style={{ color: '#6d28d9', fontSize: '13px', fontWeight: '600' }}>
          Read Comparison →
        </div>
      </div>
    </Link>
  );
}
