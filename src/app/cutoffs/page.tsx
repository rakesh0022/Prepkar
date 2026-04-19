'use client';

import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';

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
            <Link
              key={exam.slug}
              href={`/cutoffs/${exam.slug}`}
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
                (e.currentTarget).style.boxShadow = '0 8px 16px rgba(220, 38, 38, 0.15)';
                (e.currentTarget).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.boxShadow = 'none';
                (e.currentTarget).style.transform = 'translateY(0)';
              }}
            >
              {/* Header */}
              <div style={{ backgroundColor: '#fef2f2', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#dc2626', color: 'white', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '600' }}>
                  {exam.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '16px', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px', color: '#111827' }}>
                  {exam.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>
                  {exam.fullName}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: '#6b7280' }}>Vacancies</span>
                    <div style={{ fontWeight: 'bold', color: '#111827' }}>{exam.totalVacancies}</div>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280' }}>Difficulty</span>
                    <div style={{ fontWeight: 'bold', color: '#dc2626' }}>{exam.difficulty}</div>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600' }}>
                  View Trends →
                </p>
              </div>
            </Link>
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
