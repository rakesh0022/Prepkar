import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';
import CutoffCard from './CutoffCard';

export default function CutoffsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', color: 'white', padding: '40px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Exam Cutoffs & Analysis</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>Year-wise cutoff trends and selection ratios for major government exams</p>
      </div>

      {/* Exams Grid */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {cutoffs.map((exam) => (
            <CutoffCard key={exam.slug} exam={exam} />
          ))}
        </div>

        {/* Info Box */}
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#991b1b', marginBottom: '8px' }}>📊 What This Means</h3>
          <p style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: '1.6' }}>
            Rising cutoffs indicate increasing competition. Compare year-wise trends to understand exam difficulty. Lower vacancies combined with higher cutoffs = tougher selection. Use this data to plan your preparation timeline strategically.
          </p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
