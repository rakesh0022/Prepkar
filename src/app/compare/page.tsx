'use client';

import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import comparisons from '@/data/comparisons.json';

export default function ComparePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', color: 'white', padding: '40px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Comparison Guides</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>Make the right career choice with our detailed comparisons</p>
      </div>

      {/* Comparisons Grid */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
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
                (e.currentTarget).style.boxShadow = '0 8px 16px rgba(109, 40, 217, 0.15)';
                (e.currentTarget).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow = 'none';
                (e.currentTarget).style.transform = 'translateY(0)';
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
          ))}
        </div>

        {/* Info Box */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px' }}>💡 Choose Wisely</h3>
          <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: '1.6' }}>
            Each comparison covers salary, career growth, lifestyle, work-life balance, and more. Read multiple guides to understand your career path better.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ backgroundColor: '#6d28d9', color: 'white', padding: '24px 16px', textAlign: 'center', marginTop: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Ready to Start Preparing?</h2>
        <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '12px' }}>After choosing your path, begin your structured exam preparation</p>
        <Link href="/prepare" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'white', color: '#6d28d9', padding: '10px 24px', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>
            Start Preparing →
          </div>
        </Link>
      </div>

      <BottomNav />
    </main>
  );
}
