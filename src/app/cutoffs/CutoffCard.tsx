'use client';

import Link from 'next/link';

interface Exam {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  totalVacancies: string;
  difficulty: string;
}

export default function CutoffCard({ exam }: { exam: Exam }) {
  return (
    <Link
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
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(220, 38, 38, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ backgroundColor: '#fef2f2', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ display: 'inline-block', backgroundColor: '#dc2626', color: 'white', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '600' }}>
          {exam.category}
        </span>
      </div>
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
  );
}
