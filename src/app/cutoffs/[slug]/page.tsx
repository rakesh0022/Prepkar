'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';

export default function CutoffDetailPage({ params }: { params: { slug: string } }) {
  const exam = cutoffs.find(e => e.slug === params.slug);

  if (!exam) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    'SSC': '#22c55e',
    'Banking': '#3b82f6',
    'UPSC': '#ef4444',
    'Railway': '#f97316',
  };

  const categoryBgColors: Record<string, string> = {
    'SSC': '#f0fdf4',
    'Banking': '#eff6ff',
    'UPSC': '#fef2f2',
    'Railway': '#fff7ed',
  };

  const sortedData = [...exam.data].sort((a, b) => a.year - b.year);

  // Calculate average cutoffs for context
  const avgCutoff = sortedData.reduce((sum, d) => {
    if ('tier1Cutoff' in d) return sum + d.tier1Cutoff.general;
    if ('prelimsCutoff' in d) return sum + (typeof d.prelimsCutoff === 'number' ? d.prelimsCutoff : d.prelimsCutoff.general);
    return sum;
  }, 0) / sortedData.length;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section */}
      <div style={{ 
        background: `linear-gradient(135deg, ${categoryColors[exam.category] || '#6366f1'} 0%, ${categoryColors[exam.category] || '#6366f1'}dd 100%)`,
        color: 'white', padding: '32px 16px', textAlign: 'center' 
      }}>
        <Link href="/cutoffs" style={{ color: 'white', fontSize: '14px', textDecoration: 'none', opacity: 0.8, display: 'inline-block', marginBottom: '12px' }}>
          ← Back to Exams
        </Link>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{exam.name}</h1>
        <p style={{ fontSize: '13px', opacity: 0.9 }}>{exam.fullName}</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Key Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Vacancies (2025)</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{exam.totalVacancies}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Difficulty Level</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: categoryColors[exam.category] || '#6366f1' }}>{exam.difficulty}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Avg Cutoff</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>{Math.round(avgCutoff)}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Years of Data</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>2019-2025</div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div style={{ backgroundColor: categoryBgColors[exam.category] || '#f0f9ff', border: `1px solid ${categoryColors[exam.category] || '#6366f1'}33`, borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>📈 Trend Analysis</h2>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', marginBottom: '8px' }}>
            <strong>Difficulty Trend:</strong> {exam.trend}
          </p>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
            <strong>Overall Analysis:</strong> {exam.analysis}
          </p>
        </div>

        {/* Cutoff Trends Chart */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px', overflow: 'auto' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>📊 Cutoff Progression</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '4px' }}>
            {sortedData.map((year, idx) => {
              let cutoffValue = 0;
              if ('tier1Cutoff' in year) cutoffValue = year.tier1Cutoff.general;
              if ('prelimsCutoff' in year) cutoffValue = typeof year.prelimsCutoff === 'number' ? year.prelimsCutoff : year.prelimsCutoff.general;
              
              const heightPercent = (cutoffValue / 150) * 100; // Max 150 for scaling
              const isIncreasing = idx > 0 && cutoffValue > sortedData[idx - 1].tier1Cutoff?.general || cutoffValue > sortedData[idx - 1].prelimsCutoff?.general;

              return (
                <div key={year.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#111827' }}>{cutoffValue}</div>
                  <div style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: categoryColors[exam.category] || '#6366f1',
                    borderRadius: '4px 4px 0 0',
                    opacity: heightPercent / 100,
                    minHeight: '20px',
                  }} />
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{year.year % 100}</div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '12px', textAlign: 'center' }}>Year-wise Cutoff Progression (General Category)</p>
        </div>

        {/* Vacancy Trends */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>💼 Vacancy Trend</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#111827' }}>Year</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Vacancies</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Applicants</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Selected</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Ratio (1 in X)</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((year, idx) => {
                  const ratio = Math.round(year.applicants / year.selected);
                  return (
                    <tr key={year.year} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                      <td style={{ padding: '8px', fontWeight: '600', color: '#111827' }}>{year.year}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#111827' }}>{year.vacancies.toLocaleString()}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#6b7280' }}>{(year.applicants / 100000).toFixed(1)}L+</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#111827' }}>{year.selected.toLocaleString()}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: categoryColors[exam.category] || '#6366f1' }}>1:{ratio.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cutoff Details by Category */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>📋 Year-wise Cutoff Marks</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#111827' }}>Year</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>General</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>OBC</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>SC</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>ST</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>EWS</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((year, idx) => {
                  let cutoffs = { general: 0, obc: 0, sc: 0, st: 0, ews: 0 };
                  if ('tier1Cutoff' in year) cutoffs = year.tier1Cutoff;
                  if ('prelimsCutoff' in year && typeof year.prelimsCutoff === 'object') cutoffs = year.prelimsCutoff;
                  
                  return (
                    <tr key={year.year} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                      <td style={{ padding: '10px', fontWeight: '600', color: '#111827' }}>{year.year}</td>
                      <td style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: categoryColors[exam.category] || '#6366f1' }}>{cutoffs.general || 'N/A'}</td>
                      <td style={{ padding: '10px', textAlign: 'center', color: '#111827' }}>{cutoffs.obc || 'N/A'}</td>
                      <td style={{ padding: '10px', textAlign: 'center', color: '#111827' }}>{cutoffs.sc || 'N/A'}</td>
                      <td style={{ padding: '10px', textAlign: 'center', color: '#111827' }}>{cutoffs.st || 'N/A'}</td>
                      <td style={{ padding: '10px', textAlign: 'center', color: '#111827' }}>{cutoffs.ews || 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '12px' }}>
            📌 Note: Cutoff marks vary based on exam difficulty and applicant quality. These are approximate General Category marks.
          </p>
        </div>

        {/* Insights */}
        <div style={{ backgroundColor: categoryBgColors[exam.category] || '#f0f9ff', border: `1px solid ${categoryColors[exam.category] || '#6366f1'}33`, borderRadius: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>💡 Key Insights</h2>
          <ul style={{ fontSize: '13px', color: '#374151', lineHeight: '1.8', paddingLeft: '20px' }}>
            {sortedData.length > 1 && (
              <>
                <li>
                  <strong>Difficulty:</strong> Cutoffs have {
                    sortedData[sortedData.length - 1].tier1Cutoff?.general || sortedData[sortedData.length - 1].prelimsCutoff?.general > sortedData[0].tier1Cutoff?.general || sortedData[0].prelimsCutoff?.general
                      ? 'increased significantly' : 'remained stable'
                  } indicating {
                    sortedData[sortedData.length - 1].tier1Cutoff?.general || sortedData[sortedData.length - 1].prelimsCutoff?.general > sortedData[0].tier1Cutoff?.general || sortedData[0].prelimsCutoff?.general
                      ? 'growing competition' : 'consistent difficulty'
                  }
                </li>
                <li><strong>Vacancies:</strong> {
                  sortedData[sortedData.length - 1].vacancies > sortedData[0].vacancies ? 'More positions offered in recent years' : 'Fewer positions in recent recruitment'
                }</li>
                <li><strong>Selection Ratio:</strong> For every 1 selected candidate, {Math.round(sortedData[sortedData.length - 1].applicants / sortedData[sortedData.length - 1].selected)} candidates appear in the exam</li>
              </>
            )}
          </ul>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
