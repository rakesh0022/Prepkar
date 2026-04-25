import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';
import CutoffCard from './CutoffCard';

export default function CutoffsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fef2f2, #ffffff)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section - Premium Design */}
      <div style={{ 
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)', 
        color: 'white', 
        padding: '48px 20px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Pattern */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: 0.1, 
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '50px 50px, 60px 60px',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '24px',
            padding: '8px 16px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '18px' }}>📊</span>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Cutoff Analysis
            </span>
          </div>

          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '900', 
            marginBottom: '16px',
            lineHeight: '1.2',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}>
            Exam Cutoffs & Trends
          </h1>
          <p style={{ 
            fontSize: '15px', 
            opacity: 0.95,
            maxWidth: '600px',
            lineHeight: '1.6',
          }}>
            Year-wise cutoff trends and selection ratios for major government exams. Track competition levels and plan your preparation strategy.
          </p>
        </div>
      </div>

      {/* Exams Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginBottom: '32px' 
        }}>
          {cutoffs.map((exam) => (
            <CutoffCard key={exam.slug} exam={exam} />
          ))}
        </div>

        {/* Info Box - Premium Design */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
          border: '2px solid #fecaca',
          borderRadius: '24px',
          padding: '24px',
          marginTop: '32px',
          boxShadow: '0 4px 20px rgba(220, 38, 38, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
            }}>
              💡
            </div>
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '800', 
                color: '#991b1b', 
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}>
                Understanding Cutoff Trends
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#7f1d1d', 
                lineHeight: '1.7',
                marginBottom: '12px',
              }}>
                Rising cutoffs indicate increasing competition. Compare year-wise trends to understand exam difficulty patterns and selection ratios.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(220, 38, 38, 0.1)',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#991b1b',
              }}>
                <span>📈</span>
                Lower vacancies + higher cutoffs = tougher selection
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
