'use client';

import Link from 'next/link';

interface YearData {
  year: number;
  tier1Cutoff?: { general: number };
  prelimsCutoff?: number | { general: number };
  applicants: number;
  selected: number;
}

interface Exam {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  totalVacancies: string;
  difficulty: string;
  data: YearData[];
  trend?: string;
  selectionRatio?: number;
  latestCutoff?: number;
}

// Mini Sparkline Component
function Sparkline({ data, trend }: { data: number[]; trend: string }) {
  if (data.length < 2) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  // Normalize to 0-40 height
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 40 - ((val - min) / range) * 40;
    return `${x},${y}`;
  }).join(' ');

  const color = trend === 'rising' ? '#ef4444' : trend === 'falling' ? '#10b981' : '#6b7280';
  const bgColor = trend === 'rising' ? 'rgba(239, 68, 68, 0.1)' : trend === 'falling' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)';

  return (
    <svg width="100" height="40" style={{ display: 'block' }}>
      <polyline
        points={`0,40 ${points} 100,40`}
        fill={bgColor}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CutoffCard({ exam }: { exam: Exam }) {
  const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
    SSC: { bg: '#fff7ed', text: '#ea580c', gradient: 'linear-gradient(135deg, #fb923c, #ea580c)' },
    Banking: { bg: '#d1fae5', text: '#065f46', gradient: 'linear-gradient(135deg, #10b981, #065f46)' },
    UPSC: { bg: '#dbeafe', text: '#1e40af', gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)' },
    Railway: { bg: '#fee2e2', text: '#991b1b', gradient: 'linear-gradient(135deg, #ef4444, #991b1b)' },
    Defence: { bg: '#d1fae5', text: '#065f46', gradient: 'linear-gradient(135deg, #059669, #065f46)' },
  };

  const colors = categoryColors[exam.category] || { bg: '#f3f4f6', text: '#374151', gradient: 'linear-gradient(135deg, #6b7280, #374151)' };

  const difficultyColors: Record<string, string> = {
    'Very Hard': '#dc2626',
    'Hard': '#ea580c',
    'Moderate': '#f59e0b',
  };

  // Extract cutoff data for sparkline
  const getCutoff = (yearData: YearData): number => {
    if (yearData.tier1Cutoff?.general) return yearData.tier1Cutoff.general;
    if (typeof yearData.prelimsCutoff === 'number') return yearData.prelimsCutoff;
    if (yearData.prelimsCutoff && typeof yearData.prelimsCutoff === 'object') return yearData.prelimsCutoff.general;
    return 0;
  };

  const cutoffData = [...exam.data].reverse().map(getCutoff);
  const latestData = exam.data[0];
  const latestCutoff = getCutoff(latestData);
  const selectionRatio = Math.round(latestData.applicants / latestData.selected);

  // Determine trend
  const trend = exam.trend || (cutoffData[cutoffData.length - 1] > cutoffData[0] ? 'rising' : 'falling');

  return (
    <Link
      href={`/cutoffs/${exam.slug}`}
      className="group"
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        border: '2px solid #f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = colors.text;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#f3f4f6';
      }}
    >
      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Row: Category Badge + Exam Name */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: colors.bg,
              color: colors.text,
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: '800',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              {exam.category === 'SSC' ? '📋' : exam.category === 'Banking' ? '🏦' : exam.category === 'UPSC' ? '🏛️' : exam.category === 'Railway' ? '🚂' : '🎯'}
              {exam.category}
            </span>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '900', 
              marginBottom: '4px', 
              color: '#111827',
              lineHeight: '1.2',
            }}>
              {exam.name}
            </h3>
          </div>
        </div>

        {/* Middle Row: Sparkline + Latest Cutoff */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '16px',
          padding: '16px',
          background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
          borderRadius: '14px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '10px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}>
              6-Year Trend
            </div>
            <Sparkline data={cutoffData} trend={trend} />
          </div>
          <div style={{ textAlign: 'right', paddingLeft: '16px' }}>
            <div style={{ 
              fontSize: '10px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Latest Cutoff
            </div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: '900', 
              color: colors.text,
              lineHeight: '1',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {latestCutoff}
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#9ca3af',
              fontWeight: '600',
              marginTop: '4px',
            }}>
              /{exam.data[0].tier1Cutoff ? '200' : '100'}
            </div>
          </div>
        </div>

        {/* Bottom Row: Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '8px',
        }}>
          <div style={{
            background: '#f9fafb',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              fontSize: '9px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Vacancies
            </div>
            <div style={{ 
              fontWeight: '800', 
              color: '#111827',
              fontSize: '13px',
            }}>
              {exam.totalVacancies}
            </div>
          </div>
          <div style={{
            background: '#fef2f2',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #fecaca',
          }}>
            <div style={{ 
              fontSize: '9px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Difficulty
            </div>
            <div style={{ 
              fontWeight: '800', 
              color: difficultyColors[exam.difficulty] || '#dc2626',
              fontSize: '13px',
            }}>
              {exam.difficulty}
            </div>
          </div>
          <div style={{
            background: '#fef3c7',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #fde68a',
          }}>
            <div style={{ 
              fontSize: '9px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Selection
            </div>
            <div style={{ 
              fontWeight: '800', 
              color: '#92400e',
              fontSize: '13px',
            }}>
              1:{selectionRatio}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
