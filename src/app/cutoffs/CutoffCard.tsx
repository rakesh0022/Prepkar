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
  const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
    SSC: { bg: '#dbeafe', text: '#1e40af', gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)' },
    Banking: { bg: '#d1fae5', text: '#065f46', gradient: 'linear-gradient(135deg, #10b981, #065f46)' },
    UPSC: { bg: '#e0e7ff', text: '#3730a3', gradient: 'linear-gradient(135deg, #6366f1, #3730a3)' },
    Railway: { bg: '#fef3c7', text: '#92400e', gradient: 'linear-gradient(135deg, #f59e0b, #92400e)' },
    Defence: { bg: '#d1fae5', text: '#065f46', gradient: 'linear-gradient(135deg, #059669, #065f46)' },
  };

  const colors = categoryColors[exam.category] || { bg: '#fef2f2', text: '#991b1b', gradient: 'linear-gradient(135deg, #dc2626, #991b1b)' };

  const difficultyColors: Record<string, string> = {
    'Very Hard': '#dc2626',
    'Hard': '#ea580c',
    'Moderate': '#f59e0b',
  };

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
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(220, 38, 38, 0.15)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = colors.text;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#f3f4f6';
      }}
    >
      {/* Header with gradient */}
      <div style={{ 
        background: colors.gradient,
        padding: '16px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.1, 
          backgroundImage: 'radial-gradient(circle at 30% 40%, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
            <span style={{ fontSize: '14px' }}>
              {exam.category === 'SSC' ? '📋' : exam.category === 'Banking' ? '🏦' : exam.category === 'UPSC' ? '🏛️' : exam.category === 'Railway' ? '🚂' : '🎯'}
            </span>
            {exam.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '900', 
          marginBottom: '8px', 
          color: '#111827',
          lineHeight: '1.3',
        }}>
          {exam.name}
        </h3>
        <p style={{ 
          fontSize: '13px', 
          color: '#6b7280', 
          marginBottom: '16px',
          lineHeight: '1.5',
        }}>
          {exam.fullName}
        </p>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px', 
          marginBottom: '16px',
          marginTop: 'auto',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
            padding: '12px',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              fontSize: '10px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
            }}>
              Vacancies
            </div>
            <div style={{ 
              fontWeight: '900', 
              color: '#111827',
              fontSize: '16px',
            }}>
              {exam.totalVacancies}
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
            padding: '12px',
            borderRadius: '14px',
            border: '1px solid #fecaca',
          }}>
            <div style={{ 
              fontSize: '10px', 
              color: '#6b7280',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
            }}>
              Difficulty
            </div>
            <div style={{ 
              fontWeight: '900', 
              color: difficultyColors[exam.difficulty] || '#dc2626',
              fontSize: '16px',
            }}>
              {exam.difficulty}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px', 
          color: colors.text,
          fontWeight: '800',
          transition: 'gap 0.3s',
        }}
        className="group-hover:gap-3"
        >
          <span>View Trends</span>
          <span style={{ 
            transition: 'transform 0.3s',
            display: 'inline-block',
          }}
          className="group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
