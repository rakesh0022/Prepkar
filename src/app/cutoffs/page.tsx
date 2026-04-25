'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';
import CutoffCard from './CutoffCard';

type FilterType = 'all' | 'rising' | 'falling' | 'competitive';

interface ExamWithTrends {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  totalVacancies: string;
  difficulty: string;
  description: string;
  trend: string;
  analysis: string;
  maxMarks?: number;
  data: any[];
  selectionRatio: number;
  latestCutoff: number;
}

export default function CutoffsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  // Calculate trends for filtering
  const examsWithTrends: ExamWithTrends[] = cutoffs.map(exam => {
    const data = exam.data;
    if (data.length < 2) return { ...exam, trend: 'stable', selectionRatio: 0, latestCutoff: 0 };
    
    // Get cutoff values (handle different structures)
    const getCutoff = (yearData: any) => {
      if (yearData.tier1Cutoff?.general) return yearData.tier1Cutoff.general;
      if (yearData.prelimsCutoff?.general) return yearData.prelimsCutoff.general;
      if (yearData.prelimsCutoff) return yearData.prelimsCutoff;
      return 0;
    };

    const latest = getCutoff(data[0]);
    const oldest = getCutoff(data[data.length - 1]);
    const trend = latest > oldest ? 'rising' : latest < oldest ? 'falling' : 'stable';
    
    // Calculate selection ratio
    const latestData = data[0];
    const selectionRatio = Math.round(latestData.applicants / latestData.selected);
    
    return { ...exam, trend, selectionRatio, latestCutoff: latest };
  });

  // Filter exams
  const filteredExams = examsWithTrends.filter(exam => {
    if (filter === 'all') return true;
    if (filter === 'rising') return exam.trend === 'rising';
    if (filter === 'falling') return exam.trend === 'falling';
    if (filter === 'competitive') return exam.selectionRatio > 1000;
    return true;
  });

  const totalDataPoints = cutoffs.reduce((sum, exam) => sum + exam.data.length, 0);

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero Section - Dark Premium Design */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', 
        color: 'white', 
        padding: '48px 20px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated Line Graph Decoration */}
        <svg 
          style={{ 
            position: 'absolute', 
            right: '-10%', 
            top: '50%', 
            transform: 'translateY(-50%)',
            width: '50%',
            height: '80%',
            opacity: 0.08,
          }}
          viewBox="0 0 400 200"
        >
          <path 
            d="M 0,150 L 50,120 L 100,140 L 150,90 L 200,110 L 250,70 L 300,85 L 350,50 L 400,60" 
            stroke="white" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M 0,150 L 50,120 L 100,140 L 150,90 L 200,110 L 250,70 L 300,85 L 350,50 L 400,60 L 400,200 L 0,200 Z" 
            fill="url(#gradient)" 
            opacity="0.3"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '900', 
            marginBottom: '12px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}>
            Exam Cutoffs & Analysis
          </h1>
          <p style={{ 
            fontSize: '16px', 
            opacity: 0.85,
            maxWidth: '600px',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}>
            Year-wise cutoff trends and selection ratios
          </p>

          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
          }}>
            {[
              { label: 'Exams Tracked', value: cutoffs.length, icon: '📋' },
              { label: 'Data Points', value: `${totalDataPoints}+`, icon: '📊' },
              { label: 'Updated', value: 'April 2026', icon: '🔄' },
            ].map((stat, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  padding: '10px 16px',
                }}
              >
                <span style={{ fontSize: '18px' }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '900' }}>{stat.value}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 0' }}>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}>
          {[
            { id: 'all' as FilterType, label: 'All Exams', icon: '📋' },
            { id: 'rising' as FilterType, label: 'Rising Cutoff', icon: '📈' },
            { id: 'falling' as FilterType, label: 'Falling Cutoff', icon: '📉' },
            { id: 'competitive' as FilterType, label: 'Most Competitive', icon: '🔥' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                border: filter === f.id ? '2px solid #1a1a2e' : '2px solid #e5e7eb',
                background: filter === f.id ? '#1a1a2e' : 'white',
                color: filter === f.id ? 'white' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Exams Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px', 
          marginBottom: '32px' 
        }}>
          {filteredExams.map((exam) => (
            <CutoffCard key={exam.slug} exam={exam} />
          ))}
        </div>

        {/* Info Box - Premium Design */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '2px solid #bae6fd',
          borderRadius: '24px',
          padding: '24px',
          marginTop: '32px',
          boxShadow: '0 4px 20px rgba(14, 165, 233, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
            }}>
              💡
            </div>
            <div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '800', 
                color: '#075985', 
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}>
                Understanding Cutoff Trends
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#0c4a6e', 
                lineHeight: '1.7',
                marginBottom: '12px',
              }}>
                Rising cutoffs indicate increasing competition. Compare year-wise trends to understand exam difficulty patterns and selection ratios.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(14, 165, 233, 0.1)',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#075985',
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
