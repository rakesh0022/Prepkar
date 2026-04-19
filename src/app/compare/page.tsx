import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import comparisons from '@/data/comparisons.json';
import ComparisonCard from './ComparisonCard';

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
            <ComparisonCard key={comparison.slug} comparison={comparison} />
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
