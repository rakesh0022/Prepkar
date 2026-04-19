'use client';

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
  const categoryColor: Record<string, string> = {
    SSC: '#16a34a',
    Banking: '#2563eb',
    UPSC: '#dc2626',
    Railway: '#ea580c',
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

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`, color: 'white', padding: '32px 16px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
          {exam.category}
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '6px' }}>{exam.name}</h1>
        <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '12px' }}>{exam.fullName}</p>
        <p style={{ fontSize: '13px', opacity: 0.85 }}>{exam.description}</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Key Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Vacancies', value: exam.totalVacancies },
            { label: 'Difficulty', value: exam.difficulty, highlight: true },
            { label: 'Avg Cutoff', value: `${avgCutoff.toFixed(1)}/${maxMarks}` },
            { label: 'Selection Ratio', value: `1 : ${selectionRatio.toLocaleString()}` },
            { label: 'Trend', value: trendUp ? '↑ Harder' : '↓ Easier', trendUp },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: 'white', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{
                fontSize: '16px', fontWeight: 'bold',
                color: stat.trendUp !== undefined ? (stat.trendUp ? '#dc2626' : '#16a34a') : (stat.highlight ? color : '#111827'),
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Trend Analysis */}
        <div style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30`, borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>📈 Trend Analysis</h2>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.7', marginBottom: '8px' }}>
            <strong>Trend:</strong> {exam.trend}
          </p>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.7' }}>
            <strong>Analysis:</strong> {exam.analysis}
          </p>
        </div>

        {/* Bar Chart */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '4px', color: '#111827' }}>📊 Cutoff Progression (General Category)</h2>
          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '16px' }}>Out of {maxMarks} marks</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {sortedData.map((d, idx) => {
              const val = getGeneralCutoff(d);
              const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : val;
              const up = val > prev;
              const barH = Math.max((val / maxCutoff) * 100, 8);
              return (
                <div key={d.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: idx > 0 ? (up ? '#dc2626' : '#16a34a') : '#6b7280' }}>
                    {idx > 0 ? (up ? '↑' : '↓') : ''}{val}
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${barH}%`,
                    backgroundColor: color,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.7 + (barH / 100) * 0.3,
                    minHeight: '8px',
                    transition: 'height 0.3s',
                  }} />
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{d.year}</div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px', textAlign: 'center' }}>
            ↑ Red = cutoff rising (harder) &nbsp;|&nbsp; ↓ Green = cutoff falling (easier)
          </p>
        </div>

        {/* Year-wise Cutoff Table */}
        {hasCategoryBreakdown ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>📋 Year-wise Cutoff Marks (Category-wise)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', minWidth: '480px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 'bold', color: '#111827' }}>Year</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>General</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>OBC</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>SC</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>ST</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>EWS</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((d, idx) => {
                    const breakdown = getCutoffBreakdown(d);
                    const val = getGeneralCutoff(d);
                    const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : val;
                    const up = val > prev;
                    return (
                      <tr key={d.year} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                        <td style={{ padding: '10px 8px', fontWeight: '600', color: '#111827' }}>
                          {d.year}
                          {d.note && <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 400, marginTop: '2px' }}>{d.note}</div>}
                        </td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: '600', color }}>{breakdown?.general ?? 'N/A'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>{breakdown?.obc ?? 'N/A'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>{breakdown?.sc ?? 'N/A'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>{breakdown?.st ?? 'N/A'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', color: '#374151' }}>{breakdown?.ews ?? 'N/A'}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', fontSize: '14px' }}>
                          {idx === 0 ? '—' : up ? <span style={{ color: '#dc2626' }}>↑</span> : <span style={{ color: '#16a34a' }}>↓</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px' }}>
              📌 Cutoffs are for Prelims/Tier-1 stage. * Approximate — verify from official notification.
            </p>
          </div>
        ) : (
          /* Numeric cutoff table (UPSC style) */
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>📋 Year-wise Prelims Cutoff (General Category)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#111827' }}>Year</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>Cutoff (out of {maxMarks})</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>% Score</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#111827' }}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((d, idx) => {
                    const val = getGeneralCutoff(d);
                    const prev = idx > 0 ? getGeneralCutoff(sortedData[idx - 1]) : val;
                    const up = val > prev;
                    return (
                      <tr key={d.year} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                        <td style={{ padding: '10px', fontWeight: '600', color: '#111827' }}>
                          {d.year}
                          {d.note && <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 400 }}>{d.note}</div>}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color }}>{val}</td>
                        <td style={{ padding: '10px', textAlign: 'center', color: '#6b7280' }}>{((val / maxMarks) * 100).toFixed(1)}%</td>
                        <td style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>
                          {idx === 0 ? '—' : up ? <span style={{ color: '#dc2626' }}>↑</span> : <span style={{ color: '#16a34a' }}>↓</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px' }}>
              📌 * Approximate — verify from official UPSC notification.
            </p>
          </div>
        )}

        {/* Vacancy & Selection Ratio Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>💼 Vacancy & Selection Ratio</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', minWidth: '400px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold', color: '#111827' }}>Year</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Vacancies</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Applicants</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>Selected</th>
                  <th style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>1 in X</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((d, idx) => {
                  const ratio = Math.round(d.applicants / d.selected);
                  return (
                    <tr key={d.year} style={{ borderBottom: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white' }}>
                      <td style={{ padding: '8px', fontWeight: '600', color: '#111827' }}>{d.year}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#111827' }}>{d.vacancies.toLocaleString()}</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#6b7280' }}>{(d.applicants / 100000).toFixed(1)}L</td>
                      <td style={{ padding: '8px', textAlign: 'right', color: '#111827' }}>{d.selected.toLocaleString()}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', color }}>{ratio.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30`, borderRadius: '12px', padding: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#111827' }}>💡 Key Insights</h2>
          <ul style={{ fontSize: '13px', color: '#374151', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
            <li>
              <strong>Is it getting harder?</strong>{' '}
              {trendUp
                ? `Yes — cutoff rose from ${firstCutoff} (${sortedData[0].year}) to ${lastCutoff} (${sortedData[sortedData.length - 1].year}). Prepare for higher competition.`
                : `Cutoff dropped from ${firstCutoff} (${sortedData[0].year}) to ${lastCutoff} (${sortedData[sortedData.length - 1].year}). Difficulty has eased slightly.`}
            </li>
            <li>
              <strong>Vacancies:</strong>{' '}
              {latestYear.vacancies > sortedData[0].vacancies
                ? `More positions in recent years (${latestYear.vacancies.toLocaleString()} in ${latestYear.year}).`
                : `Fewer positions recently (${latestYear.vacancies.toLocaleString()} in ${latestYear.year} vs ${sortedData[0].vacancies.toLocaleString()} in ${sortedData[0].year}).`}
            </li>
            <li>
              <strong>Competition:</strong> For every 1 selected, {selectionRatio.toLocaleString()} candidates appeared in {latestYear.year}.
            </li>
            <li>
              <strong>Strategy:</strong>{' '}
              {trendUp
                ? 'Target 10–15 marks above the cutoff to stay safe. Focus on accuracy over speed.'
                : 'Cutoff is manageable. Focus on consistency and avoid negative marking.'}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
