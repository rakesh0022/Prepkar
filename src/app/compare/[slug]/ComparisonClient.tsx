'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ReadingProgressBar from '@/components/reading/ReadingProgressBar';

interface Comparison {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface Props {
  comparison: Comparison;
  prevComparison: Comparison | null;
  nextComparison: Comparison | null;
}

type ComparisonVisual = {
  leftLabel: string;
  rightLabel: string;
  statCards: { label: string; value: string; tone: 'amber' | 'emerald' | 'red' }[];
  radarData: { factor: string; left: number; right: number }[];
  salaryData: { stage: string; left: number; right: number }[];
};

const CATEGORY_THEME: Record<string, { hero: string; accent: string; soft: string }> = {
  UPSC: { hero: 'linear-gradient(135deg, #1e3a5f, #0f766e)', accent: '#0f766e', soft: '#ecfeff' },
  Banking: { hero: 'linear-gradient(135deg, #14532d, #047857)', accent: '#047857', soft: '#ecfdf5' },
  SSC: { hero: 'linear-gradient(135deg, #1e3a8a, #0891b2)', accent: '#2563eb', soft: '#eff6ff' },
  Career: { hero: 'linear-gradient(135deg, #7c2d12, #d97706)', accent: '#d97706', soft: '#fffbeb' },
};

const COMPARISON_VISUALS: Record<string, ComparisonVisual> = {
  'ias-vs-ips': {
    leftLabel: 'IAS',
    rightLabel: 'IPS',
    statCards: [
      { label: 'In-hand range', value: '₹70K-1.1L', tone: 'emerald' },
      { label: 'Selection intensity', value: 'Elite 0.1%-0.2%', tone: 'red' },
      { label: 'Lifestyle edge', value: 'IAS for balance', tone: 'amber' },
    ],
    radarData: [
      { factor: 'Power', left: 96, right: 90 },
      { factor: 'Lifestyle', left: 82, right: 56 },
      { factor: 'Risk', left: 48, right: 86 },
      { factor: 'Prestige', left: 95, right: 93 },
      { factor: 'Policy Reach', left: 98, right: 74 },
    ],
    salaryData: [
      { stage: 'Entry', left: 80, right: 80 },
      { stage: '10 Years', left: 105, right: 102 },
      { stage: '20 Years', left: 145, right: 135 },
    ],
  },
  'sbi-po-vs-ibps-po': {
    leftLabel: 'SBI PO',
    rightLabel: 'IBPS PO',
    statCards: [
      { label: 'Entry package', value: '₹50K-55K', tone: 'emerald' },
      { label: 'Housing edge', value: 'SBI staff loans', tone: 'amber' },
      { label: 'Exam difficulty', value: 'SBI slightly tougher', tone: 'red' },
    ],
    radarData: [
      { factor: 'Salary', left: 86, right: 80 },
      { factor: 'Posting', left: 82, right: 68 },
      { factor: 'Prestige', left: 92, right: 74 },
      { factor: 'Growth', left: 88, right: 80 },
      { factor: 'Ease', left: 62, right: 74 },
    ],
    salaryData: [
      { stage: 'Entry', left: 53, right: 51 },
      { stage: 'Manager Track', left: 95, right: 88 },
      { stage: 'Senior Role', left: 160, right: 145 },
    ],
  },
  'ssc-cgl-vs-chsl': {
    leftLabel: 'SSC CGL',
    rightLabel: 'SSC CHSL',
    statCards: [
      { label: 'Salary gap', value: '₹30K/month', tone: 'emerald' },
      { label: 'Selection odds', value: 'CGL tougher by 3x', tone: 'red' },
      { label: 'Growth ceiling', value: 'CGL far higher', tone: 'amber' },
    ],
    radarData: [
      { factor: 'Salary', left: 92, right: 48 },
      { factor: 'Authority', left: 90, right: 30 },
      { factor: 'Ease', left: 44, right: 78 },
      { factor: 'Growth', left: 94, right: 45 },
      { factor: 'Lifestyle', left: 74, right: 68 },
    ],
    salaryData: [
      { stage: 'Entry', left: 58, right: 27 },
      { stage: '10 Years', left: 78, right: 42 },
      { stage: '20 Years', left: 105, right: 60 },
    ],
  },
  'upsc-vs-state-psc': {
    leftLabel: 'UPSC',
    rightLabel: 'State PSC',
    statCards: [
      { label: 'Preparation arc', value: '2 years vs 1 year', tone: 'red' },
      { label: 'Career ceiling', value: 'UPSC national reach', tone: 'amber' },
      { label: 'Family stability', value: 'State PSC wins', tone: 'emerald' },
    ],
    radarData: [
      { factor: 'Salary', left: 90, right: 76 },
      { factor: 'Reach', left: 98, right: 58 },
      { factor: 'Stability', left: 60, right: 88 },
      { factor: 'Difficulty', left: 96, right: 70 },
      { factor: 'Growth', left: 94, right: 72 },
    ],
    salaryData: [
      { stage: 'Entry', left: 78, right: 63 },
      { stage: '10 Years', left: 100, right: 80 },
      { stage: '20 Years', left: 145, right: 108 },
    ],
  },
  'government-vs-private': {
    leftLabel: 'Government',
    rightLabel: 'Private',
    statCards: [
      { label: 'Retirement value', value: 'Govt up to ₹2-3 Cr', tone: 'emerald' },
      { label: 'Mid-career salary', value: 'Private can be 2x', tone: 'amber' },
      { label: 'Job security', value: '99% vs 60-70%', tone: 'red' },
    ],
    radarData: [
      { factor: 'Security', left: 98, right: 54 },
      { factor: 'Salary Upside', left: 68, right: 95 },
      { factor: 'Lifestyle', left: 88, right: 52 },
      { factor: 'Prestige', left: 90, right: 62 },
      { factor: 'Skill Growth', left: 58, right: 92 },
    ],
    salaryData: [
      { stage: 'Entry', left: 75, right: 55 },
      { stage: '10 Years', left: 125, right: 225 },
      { stage: 'Retirement Safety', left: 65, right: 20 },
    ],
  },
};

function getWordCount(text: string) {
  return text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}

function parseContent(content: string) {
  return content.split('\n\n').filter((part) => part.trim());
}

function toneClasses(tone: 'amber' | 'emerald' | 'red') {
  if (tone === 'emerald') return 'border-emerald-200/70 bg-emerald-50 text-emerald-800';
  if (tone === 'red') return 'border-red-200/70 bg-red-50 text-red-700';
  return 'border-amber-200/70 bg-amber-50 text-amber-800';
}

function renderPart(part: string, idx: number, accent: string) {
  if (part.startsWith('## ')) {
    return (
      <h2
        key={idx}
        className="mt-10 border-b pb-3 text-[22px] font-black tracking-tight text-[var(--text-dark)]"
        style={{ borderColor: `${accent}33` }}
      >
        {part.replace(/^##\s*/, '')}
      </h2>
    );
  }

  if (part.startsWith('VERDICT:')) {
    return (
      <div key={idx} className="my-6 rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-white p-4 shadow-sm">
        <div className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-700">Verdict</div>
        <div className="mt-1 text-[15px] font-bold leading-relaxed text-[var(--text-dark)]">{part.replace('VERDICT:', '').trim()}</div>
      </div>
    );
  }

  if (part.includes('\n- ')) {
    const lines = part.split('\n');
    const heading = lines[0].startsWith('**') ? lines[0].replace(/\*\*/g, '') : null;
    const bullets = heading ? lines.slice(1) : lines;

    return (
      <div key={idx} className="my-6 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
        {heading && <div className="mb-3 text-[16px] font-extrabold text-[var(--text-dark)]">{heading}</div>}
        <div className="space-y-2">
          {bullets.map((line, bulletIndex) =>
            line.startsWith('- ') ? (
              <div key={bulletIndex} className="flex gap-3 text-[14px] leading-7 text-[var(--text-body)]">
                <span className="mt-[9px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                <span>{line.slice(2)}</span>
              </div>
            ) : line.trim() ? (
              <p key={bulletIndex} className="text-[14px] font-bold text-[var(--text-dark)]">
                {line}
              </p>
            ) : null
          )}
        </div>
      </div>
    );
  }

  if (part.startsWith('**') && part.endsWith(':**')) {
    return (
      <h3 key={idx} className="mt-8 text-[16px] font-extrabold text-[var(--text-dark)]">
        {part.replace(/\*\*/g, '')}
      </h3>
    );
  }

  return (
    <p key={idx} className="my-5 text-[15px] leading-8 text-[var(--text-body)] md:text-[16px]">
      {part}
    </p>
  );
}

export default function ComparisonClient({ comparison, prevComparison, nextComparison }: Props) {
  const [chartsReady, setChartsReady] = useState(false);
  const parts = parseContent(comparison.content);
  const wordCount = getWordCount(comparison.content);
  const visuals = COMPARISON_VISUALS[comparison.slug] ?? COMPARISON_VISUALS['government-vs-private'];
  const theme = CATEGORY_THEME[comparison.category] ?? CATEGORY_THEME.Career;

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <div className="bg-[var(--bg)]">
      <ReadingProgressBar wordCount={wordCount} />

      <div className="relative overflow-hidden px-4 py-14 text-white" style={{ background: theme.hero }}>
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 0, transparent 24%)' }} />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            {comparison.category}
          </div>
          <h1 className="max-w-3xl text-[30px] font-black leading-tight md:text-[44px]">{comparison.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/80 md:text-[16px]">{comparison.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12 pt-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {visuals.statCards.map((stat) => (
            <div key={stat.label} className={`rounded-2xl border px-4 py-4 shadow-sm ${toneClasses(stat.tone)}`}>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.22em]">{stat.label}</div>
              <div className="mt-2 text-[22px] font-black leading-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-sm">
            <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--text-light)]">Visual Comparison</div>
            <h2 className="text-[22px] font-black text-[var(--text-dark)]">How they stack up across the big 5</h2>
            <div className="mt-4 h-[320px] w-full sm:h-[360px]">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={visuals.radarData}>
                    <PolarGrid stroke="#d1d5db" />
                    <PolarAngleAxis dataKey="factor" tick={{ fill: '#374151', fontSize: 12, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={visuals.leftLabel} dataKey="left" stroke={theme.accent} fill={theme.accent} fillOpacity={0.24} strokeWidth={2.5} />
                    <Radar name={visuals.rightLabel} dataKey="right" stroke="#f97316" fill="#f97316" fillOpacity={0.14} strokeWidth={2.5} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-sm">
            <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--text-light)]">Salary Curve</div>
            <h2 className="text-[22px] font-black text-[var(--text-dark)]">Monthly earning power over time</h2>
            <div className="mt-4 h-[320px] w-full sm:h-[360px]">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visuals.salaryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="stage" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 700 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="left" name={visuals.leftLabel} radius={[8, 8, 0, 0]}>
                      {visuals.salaryData.map((entry) => (
                        <Cell key={`${entry.stage}-left`} fill={theme.accent} />
                      ))}
                    </Bar>
                    <Bar dataKey="right" name={visuals.rightLabel} radius={[8, 8, 0, 0]}>
                      {visuals.salaryData.map((entry) => (
                        <Cell key={`${entry.stage}-right`} fill="#f97316" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0 rounded-[28px] border border-[var(--border)] bg-white px-5 py-6 shadow-sm md:px-8">
            {parts.map((part, idx) => renderPart(part, idx, theme.accent))}
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[24px] border border-[var(--border)] bg-white p-5 shadow-sm">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[var(--text-light)]">Quick Read</div>
              <div className="mt-3 space-y-3">
                <div className="rounded-2xl p-3" style={{ background: theme.soft }}>
                  <div className="text-[12px] font-bold text-[var(--text-dark)]">Best for security</div>
                  <div className="mt-1 text-[13px] leading-6 text-[var(--text-body)]">
                    {comparison.slug === 'government-vs-private' ? 'Government jobs win on stability, pension, and lower downside risk.' : 'Choose the side that gives you the lifestyle and transfer pattern you can actually sustain.'}
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-200/70 bg-amber-50 p-3">
                  <div className="text-[12px] font-bold text-amber-800">Best for upside</div>
                  <div className="mt-1 text-[13px] leading-6 text-amber-900">
                    {comparison.slug === 'government-vs-private' ? 'Private wins on salary growth, skill acceleration, and fast promotion cycles.' : `${visuals.leftLabel} vs ${visuals.rightLabel} becomes clearer when you compare long-term posting, power, and salary trajectory together.`}
                  </div>
                </div>
              </div>
            </div>

            {(prevComparison || nextComparison) && (
              <div className="grid grid-cols-1 gap-3">
                {prevComparison && (
                  <Link href={`/compare/${prevComparison.slug}`} className="rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5">
                    <div className="text-[11px] font-bold text-[var(--text-light)]">Previous</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[var(--text-dark)]">{prevComparison.title}</div>
                  </Link>
                )}
                {nextComparison && (
                  <Link href={`/compare/${nextComparison.slug}`} className="rounded-2xl border border-[var(--border)] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5">
                    <div className="text-[11px] font-bold text-[var(--text-light)]">Next</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[var(--text-dark)]">{nextComparison.title}</div>
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
