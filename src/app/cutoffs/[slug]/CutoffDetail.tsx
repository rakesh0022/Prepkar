'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import BottomNav from '@/components/BottomNav';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CutoffBreakdown {
  general: number;
  obc: number;
  sc: number;
  st: number;
  ews: number;
}

interface YearData {
  year: number;
  vacancies: number;
  applicants: number;
  selected: number;
  note?: string;
  tier1Cutoff?: CutoffBreakdown;
  tier2Cutoff?: CutoffBreakdown;
  prelimsCutoff?: CutoffBreakdown | number;
  mainsCutoff?: CutoffBreakdown;
}

interface Exam {
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
  data: YearData[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCutoffBreakdown(d: YearData): CutoffBreakdown | null {
  if (d.tier1Cutoff) return d.tier1Cutoff;
  if (d.prelimsCutoff && typeof d.prelimsCutoff === 'object') return d.prelimsCutoff;
  return null;
}

function getGeneralCutoff(d: YearData): number {
  if (d.tier1Cutoff) return d.tier1Cutoff.general;
  if (d.prelimsCutoff !== undefined) {
    return typeof d.prelimsCutoff === 'number' ? d.prelimsCutoff : d.prelimsCutoff.general;
  }
  return 0;
}

function isNumericCutoff(d: YearData): boolean {
  return typeof d.prelimsCutoff === 'number';
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CutoffDetail({ exam }: { exam: Exam }) {
  const [targetScore, setTargetScore] = useState<number>(0);
  const [showCategories, setShowCategories] = useState({
    general: true,
    obc: false,
    sc: false,
    st: false,
    ews: false,
  });

  const categoryColor: Record<string, string> = {
    SSC: '#ea580c',
    Banking: '#10b981',
    UPSC: '#3b82f6',
    Railway: '#ef4444',
  };
  const color = categoryColor[exam.category] || '#6366f1';

  const sortedData = [...(exam.data as YearData[])].sort((a, b) => a.year - b.year);
  const maxMarks = exam.maxMarks ?? 200;

  const generalCutoffs = sortedData.map(getGeneralCutoff);
  const maxCutoff = Math.max(...generalCutoffs, 1);
  const avgCutoff = generalCutoffs.reduce((s, v) => s + v, 0) / generalCutoffs.length;

  const firstCutoff = generalCutoffs[0];
  const lastCutoff = generalCutoffs[generalCutoffs.length - 1];
  const trendUp = lastCutoff > firstCutoff;

  const latestYear = sortedData[sortedData.length - 1];
  const selectionRatio = Math.round(latestYear.applicants / latestYear.selected);

  // Does this exam have category-wise breakdown?
  const hasCategoryBreakdown = sortedData.some((d) => getCutoffBreakdown(d) !== null);

  // Prepare data for Recharts
  const chartData = sortedData.map((d, idx) => {
    const breakdown = getCutoffBreakdown(d);
    const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : getGeneralCutoff(d);
    const current = getGeneralCutoff(d);
    const trend = current > prev ? 'up' : current < prev ? 'down' : 'same';
    
    return {
      year: d.year.toString(),
      general: breakdown?.general ?? current,
      obc: breakdown?.obc ?? 0,
      sc: breakdown?.sc ?? 0,
      st: breakdown?.st ?? 0,
      ews: breakdown?.ews ?? 0,
      vacancies: d.vacancies,
      applicants: d.applicants,
      selectionRatio: Math.round(d.applicants / d.selected),
      trend,
    };
  });

  // Calculate target score stats
  const yearsQualified = targetScore > 0 ? chartData.filter(d => targetScore >= d.general).length : 0;
  const qualificationRate = targetScore > 0 ? ((yearsQualified / chartData.length) * 100).toFixed(0) : 0;

  // Prediction based on trend
  const predictedCutoff = lastCutoff + (trendUp ? 3 : -2);

  return (
    <div style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', minHeight: '100vh', paddingBottom: 76 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`, color: 'white', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 30% 50%, white 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {exam.category}
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px', letterSpacing: '-0.02em' }}>{exam.name}</h1>
          <p style={{ fontSize: '15px', opacity: 0.9, marginBottom: '8px' }}>{exam.fullName}</p>
          <p style={{ fontSize: '14px', opacity: 0.85, maxWidth: '700px' }}>{exam.description}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>

        {/* Key Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Vacancies', value: exam.totalVacancies, icon: '💼', bg: '#f0f9ff', color: '#0284c7' },
            { label: 'Difficulty', value: exam.difficulty, icon: '⚡', bg: '#fef2f2', color: '#dc2626' },
            { label: 'Avg Cutoff', value: `${avgCutoff.toFixed(1)}/${maxMarks}`, icon: '📊', bg: '#f0fdf4', color: '#16a34a' },
            { label: 'Selection Ratio', value: `1:${selectionRatio.toLocaleString()}`, icon: '🎯', bg: '#fef3c7', color: '#d97706' },
            { label: 'Trend', value: trendUp ? '↑ Rising' : '↓ Falling', icon: trendUp ? '📈' : '📉', bg: trendUp ? '#fef2f2' : '#f0fdf4', color: trendUp ? '#dc2626' : '#16a34a' },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: stat.bg, padding: '18px', borderRadius: '16px', border: '2px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Interactive Bar Chart with Recharts */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '2px solid #f3f4f6', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: '#111827' }}>📊 Cutoff Progression (General Category)</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Interactive chart showing year-wise cutoff trends • Out of {maxMarks} marks</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, maxMarks]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #f3f4f6', 
                  borderRadius: '12px', 
                  padding: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ fontWeight: '700', color: '#111827', marginBottom: '8px' }}
                itemStyle={{ fontSize: '13px', color: '#374151' }}
              />
              <Bar 
                dataKey="general" 
                fill={color}
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              />
              {targetScore > 0 && (
                <ReferenceLine 
                  y={targetScore} 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ value: `Your Target: ${targetScore}`, position: 'right', fill: '#dc2626', fontSize: 12, fontWeight: '700' }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>

          {/* Target Score Input */}
          <div style={{ marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderRadius: '16px', border: '2px solid #fecaca' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>🎯</span>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#991b1b', display: 'block', marginBottom: '8px' }}>
                  Set Your Target Score
                </label>
                <input 
                  type="number" 
                  value={targetScore || ''} 
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  placeholder={`Enter score (0-${maxMarks})`}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: '2px solid #fecaca', 
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                  min={0}
                  max={maxMarks}
                />
              </div>
            </div>
            {targetScore > 0 && (
              <div style={{ 
                padding: '14px', 
                background: 'white', 
                borderRadius: '12px', 
                border: '2px solid #fecaca',
                fontSize: '14px',
                fontWeight: '600',
                color: '#991b1b',
              }}>
                {yearsQualified > 0 ? (
                  <>
                    ✅ You'd have qualified in <strong>{yearsQualified} out of {chartData.length} years</strong> ({qualificationRate}% success rate)
                  </>
                ) : (
                  <>
                    ❌ Your target is below all historical cutoffs. Aim higher!
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Year-wise Cutoff Table */}
        {hasCategoryBreakdown ? (
          <>
            {/* Multi-Category Line Chart */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '2px solid #f3f4f6', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: '#111827' }}>📈 Category-wise Cutoff Trends</h2>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Toggle categories to compare trends</p>
              
              {/* Category Toggles */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {[
                  { key: 'general' as const, label: 'General', color: '#3b82f6' },
                  { key: 'obc' as const, label: 'OBC', color: '#10b981' },
                  { key: 'sc' as const, label: 'SC', color: '#f59e0b' },
                  { key: 'st' as const, label: 'ST', color: '#ef4444' },
                  { key: 'ews' as const, label: 'EWS', color: '#8b5cf6' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setShowCategories(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: `2px solid ${cat.color}`,
                      background: showCategories[cat.key] ? cat.color : 'white',
                      color: showCategories[cat.key] ? 'white' : cat.color,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, maxMarks]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #f3f4f6', 
                      borderRadius: '12px', 
                      padding: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
                  {showCategories.general && <Line type="monotone" dataKey="general" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} name="General" />}
                  {showCategories.obc && <Line type="monotone" dataKey="obc" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="OBC" />}
                  {showCategories.sc && <Line type="monotone" dataKey="sc" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} name="SC" />}
                  {showCategories.st && <Line type="monotone" dataKey="st" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="ST" />}
                  {showCategories.ews && <Line type="monotone" dataKey="ews" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} name="EWS" />}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category-wise Table */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '2px solid #f3f4f6', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: '#111827' }}>📋 Year-wise Cutoff Marks (All Categories)</h2>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Scroll horizontally on mobile</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '800', color: '#111827', position: 'sticky', left: 0, background: '#f9fafb', zIndex: 1 }}>Year</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#3b82f6' }}>General</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#10b981' }}>OBC</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#f59e0b' }}>SC</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#ef4444' }}>ST</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#8b5cf6' }}>EWS</th>
                      <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#111827' }}>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((d, idx) => {
                      const breakdown = getCutoffBreakdown(d);
                      const val = getGeneralCutoff(d);
                      const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : val;
                      const up = val > prev;
                      const isLatest = idx === sortedData.length - 1;
                      return (
                        <tr key={d.year} style={{ 
                          borderBottom: '1px solid #e5e7eb', 
                          backgroundColor: isLatest ? '#eff6ff' : (idx % 2 === 0 ? 'white' : '#f9fafb'),
                        }}>
                          <td style={{ padding: '14px 12px', fontWeight: '700', color: '#111827', position: 'sticky', left: 0, background: isLatest ? '#eff6ff' : (idx % 2 === 0 ? 'white' : '#f9fafb'), zIndex: 1 }}>
                            {d.year}
                            {isLatest && <span style={{ marginLeft: '6px', fontSize: '10px', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '6px', fontWeight: '800' }}>LATEST</span>}
                            {d.note && <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 400, marginTop: '4px' }}>{d.note}</div>}
                          </td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '700', color: '#3b82f6' }}>{breakdown?.general ?? 'N/A'}</td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#10b981' }}>{breakdown?.obc ?? 'N/A'}</td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#f59e0b' }}>{breakdown?.sc ?? 'N/A'}</td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#ef4444' }}>{breakdown?.st ?? 'N/A'}</td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#8b5cf6' }}>{breakdown?.ews ?? 'N/A'}</td>
                          <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: '18px' }}>
                            {idx === 0 ? '—' : up ? <span style={{ color: '#dc2626' }}>↑</span> : <span style={{ color: '#16a34a' }}>↓</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px' }}>
                📌 Cutoffs are for Prelims/Tier-1 stage. * Approximate — verify from official notification.
              </p>
            </div>
          </>
        ) : (
          /* Numeric cutoff table (UPSC style) */
          <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '2px solid #f3f4f6', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: '#111827' }}>📋 Year-wise Prelims Cutoff (General Category)</h2>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Historical cutoff data with percentage scores</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '800', color: '#111827' }}>Year</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#111827' }}>Cutoff (out of {maxMarks})</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#111827' }}>% Score</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '800', color: '#111827' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((d, idx) => {
                    const val = getGeneralCutoff(d);
                    const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : val;
                    const up = val > prev;
                    const isLatest = idx === sortedData.length - 1;
                    return (
                      <tr key={d.year} style={{ 
                        borderBottom: '1px solid #e5e7eb', 
                        backgroundColor: isLatest ? '#eff6ff' : (idx % 2 === 0 ? 'white' : '#f9fafb'),
                      }}>
                        <td style={{ padding: '14px 12px', fontWeight: '700', color: '#111827' }}>
                          {d.year}
                          {isLatest && <span style={{ marginLeft: '6px', fontSize: '10px', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '6px', fontWeight: '800' }}>LATEST</span>}
                          {d.note && <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 400, marginTop: '4px' }}>{d.note}</div>}
                        </td>
                        <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '700', color }}>{val}</td>
                        <td style={{ padding: '14px 12px', textAlign: 'center', color: '#6b7280', fontWeight: '600' }}>{((val / maxMarks) * 100).toFixed(1)}%</td>
                        <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: '18px' }}>
                          {idx === 0 ? '—' : up ? <span style={{ color: '#dc2626' }}>↑</span> : <span style={{ color: '#16a34a' }}>↓</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '12px' }}>
              📌 * Approximate — verify from official UPSC notification.
            </p>
          </div>
        )}

        {/* Vacancy vs Applicants Chart */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '2px solid #f3f4f6', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: '#111827' }}>💼 Vacancy vs Competition Trend</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Dual-axis chart showing vacancies and selection ratio over time</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #f3f4f6', 
                  borderRadius: '12px', 
                  padding: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
              <Bar yAxisId="left" dataKey="vacancies" fill="#10b981" radius={[8, 8, 0, 0]} name="Vacancies" />
              <Line yAxisId="right" type="monotone" dataKey="selectionRatio" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Selection Ratio (1:X)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights - Premium Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Trend Insight */}
          <div style={{ 
            background: trendUp ? 'linear-gradient(135deg, #fef2f2, #fee2e2)' : 'linear-gradient(135deg, #f0fdf4, #dcfce7)', 
            border: `2px solid ${trendUp ? '#fecaca' : '#bbf7d0'}`,
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{trendUp ? '📈' : '📉'}</div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: trendUp ? '#991b1b' : '#166534', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Difficulty Trend
            </h3>
            <p style={{ fontSize: '14px', color: trendUp ? '#7f1d1d' : '#14532d', lineHeight: '1.6', fontWeight: '600' }}>
              {trendUp
                ? `Cutoff rose from ${firstCutoff} (${sortedData[0].year}) to ${lastCutoff} (${sortedData[sortedData.length - 1].year}). Competition is increasing.`
                : `Cutoff dropped from ${firstCutoff} (${sortedData[0].year}) to ${lastCutoff} (${sortedData[sortedData.length - 1].year}). Difficulty has eased.`}
            </p>
          </div>

          {/* Prediction Insight */}
          <div style={{ 
            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', 
            border: '2px solid #bfdbfe',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔮</div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              2025 Prediction
            </h3>
            <p style={{ fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6', fontWeight: '600' }}>
              Based on trends, expected 2025 cutoff: <strong>~{predictedCutoff - 2}–{predictedCutoff + 2}</strong> marks. 
              {trendUp ? ' Prepare for higher competition.' : ' Cutoff may stabilize or drop slightly.'}
            </p>
          </div>

          {/* Action Insight */}
          <div style={{ 
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
            border: '2px solid #fcd34d',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#92400e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Action Plan
            </h3>
            <p style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.6', fontWeight: '600' }}>
              {trendUp
                ? `Aim for ${lastCutoff + 15}+ marks to stay safe. Focus on accuracy over speed and avoid negative marking.`
                : `Target ${lastCutoff + 10}+ marks for a comfortable margin. Focus on consistency and time management.`}
            </p>
          </div>
        </div>

        {/* Trend Analysis Box */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)', 
          border: '2px solid #e5e7eb',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '16px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📊</span> Detailed Analysis
          </h2>
          <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#111827' }}>Trend:</strong> {exam.trend}
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#111827' }}>Analysis:</strong> {exam.analysis}
            </p>
            <p>
              <strong style={{ color: '#111827' }}>Competition Level:</strong> For every 1 selected candidate, {selectionRatio.toLocaleString()} candidates appeared in {latestYear.year}. 
              {latestYear.vacancies > sortedData[0].vacancies
                ? ` More positions available in recent years (${latestYear.vacancies.toLocaleString()} in ${latestYear.year}).`
                : ` Fewer positions recently (${latestYear.vacancies.toLocaleString()} in ${latestYear.year} vs ${sortedData[0].vacancies.toLocaleString()} in ${sortedData[0].year}).`}
            </p>
          </div>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
