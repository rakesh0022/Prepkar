'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { CATEGORY_STYLES, COMPARISON_META } from '../comparisonMeta';

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
  relatedComparisons: Comparison[];
}

function getWordCount(text: string) {
  return text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}

function parseContent(content: string) {
  return content.split('\n\n').filter((part) => part.trim());
}

function toIndianCurrency(value: number, suffix = '/month') {
  return `₹${Math.round(value).toLocaleString('en-IN')}${suffix}`;
}

function toCompactAmount(value: number, unit: 'L' | 'raw' = 'L') {
  if (unit === 'raw') {
    return value.toLocaleString('en-IN');
  }

  return `₹${value.toFixed(value < 100 ? 1 : 0)}L`;
}

function formatTooltipValue(value: string | number | ReadonlyArray<string | number> | undefined, unit: 'L' | 'raw' = 'L') {
  const resolved = Array.isArray(value) ? value[0] : value;
  const numeric = typeof resolved === 'number' ? resolved : Number(resolved);

  if (Number.isNaN(numeric)) {
    return ['', ''];
  }

  return [toCompactAmount(numeric, unit), ''];
}

function DifficultyMeter({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className="h-2.5 flex-1 rounded-full"
          style={{ background: index < value ? color : 'rgba(148,163,184,0.18)' }}
        />
      ))}
    </div>
  );
}

function renderArticlePart(part: string, idx: number) {
  if (part.startsWith('## ')) {
    return (
      <h2 key={idx} className="mt-8 text-[22px] font-black tracking-tight text-[var(--text-dark)]">
        {part.replace(/^##\s*/, '')}
      </h2>
    );
  }

  if (part.startsWith('VERDICT:')) {
    return (
      <div key={idx} className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-[15px] font-bold leading-7 text-emerald-900">
        {part.replace('VERDICT:', '').trim()}
      </div>
    );
  }

  if (part.includes('\n- ')) {
    const lines = part.split('\n').filter(Boolean);
    const heading = lines[0].startsWith('**') ? lines[0].replace(/\*\*/g, '') : null;
    const bullets = heading ? lines.slice(1) : lines;

    return (
      <div key={idx} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-5">
        {heading && <div className="mb-3 text-[15px] font-black text-[var(--text-dark)]">{heading}</div>}
        <div className="space-y-3">
          {bullets.map((line, bulletIndex) =>
            line.startsWith('- ') ? (
              <div key={bulletIndex} className="flex gap-3 text-[14px] leading-7 text-[var(--text-body)]">
                <span className="mt-[10px] h-2 w-2 rounded-full bg-slate-800" />
                <span>{line.slice(2)}</span>
              </div>
            ) : (
              <p key={bulletIndex} className="text-[14px] leading-7 text-[var(--text-body)]">
                {line}
              </p>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <p key={idx} className="text-[15px] leading-8 text-[var(--text-body)]">
      {part}
    </p>
  );
}

function InsightCard({
  eyebrow,
  title,
  body,
  tone,
}: {
  eyebrow: string;
  title: string;
  body: string;
  tone: 'neutral' | 'blue' | 'amber';
}) {
  const toneClass =
    tone === 'blue'
      ? 'border-blue-200 bg-blue-50'
      : tone === 'amber'
        ? 'border-amber-200 bg-amber-50'
        : 'border-[var(--border)] bg-[var(--bg-card)]';

  return (
    <div className={`rounded-[26px] border p-5 shadow-sm ${toneClass}`}>
      <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">{eyebrow}</div>
      <div className="mt-2 text-[20px] font-black leading-tight text-[var(--text-dark)]">{title}</div>
      <p className="mt-2 text-[14px] leading-7 text-[var(--text-body)]">{body}</p>
    </div>
  );
}

export default function ComparisonClient({
  comparison,
  prevComparison,
  nextComparison,
  relatedComparisons,
}: Props) {
  const [chartsReady, setChartsReady] = useState(false);
  const meta = COMPARISON_META[comparison.slug] ?? COMPARISON_META['government-vs-private'];
  const theme = CATEGORY_STYLES[meta.category];
  const parts = useMemo(() => parseContent(comparison.content), [comparison.content]);
  const wordCount = getWordCount(comparison.content);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <div className="bg-[var(--bg)]">
      <ReadingProgressBar wordCount={wordCount} />

      <section className="border-b border-[var(--border)]" style={{ background: theme.header }}>
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:pb-14">
          <div className="inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ background: theme.soft, color: theme.accent }}>
            {comparison.category}
          </div>
          <div className="mt-4 max-w-3xl">
            <div className="text-[12px] font-extrabold uppercase tracking-[0.24em] text-[var(--text-light)]">{meta.heroKicker}</div>
            <h1 className="mt-2 text-[32px] font-black leading-tight text-[var(--text-dark)] md:text-[46px]">{comparison.title}</h1>
            <p className="mt-4 text-[15px] leading-7 text-[var(--text-body)] md:text-[17px]">{comparison.description}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:items-stretch">
            <div className="rounded-[30px] border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[24px] text-[30px]" style={{ background: theme.soft }}>
                  {meta.leftIcon}
                </div>
                <div>
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Side A</div>
                  <div className="text-[28px] font-black text-[var(--text-dark)]">{meta.leftLabel}</div>
                </div>
              </div>
              <div className="mt-5 rounded-[24px] p-4" style={{ background: theme.soft }}>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: theme.accent }}>Best for</div>
                <div className="mt-2 text-[18px] font-black text-[var(--text-dark)]">{meta.bestForLeft}</div>
              </div>
              <div className="mt-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Difficulty</div>
                <div className="mt-2">
                  <DifficultyMeter value={meta.difficultyLeft} color={theme.accent} />
                </div>
              </div>
              <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">{meta.leftSalaryLabel}</div>
                <div className="mt-2 text-[28px] font-black text-[var(--text-dark)]">{toIndianCurrency(meta.leftSalaryValue, '')}</div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white bg-[var(--text-dark)] text-[20px] font-black tracking-[0.24em] text-white shadow-lg">
                VS
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-slate-100 text-[30px]">
                  {meta.rightIcon}
                </div>
                <div>
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Side B</div>
                  <div className="text-[28px] font-black text-[var(--text-dark)]">{meta.rightLabel}</div>
                </div>
              </div>
              <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-700">Best for</div>
                <div className="mt-2 text-[18px] font-black text-[var(--text-dark)]">{meta.bestForRight}</div>
              </div>
              <div className="mt-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Difficulty</div>
                <div className="mt-2">
                  <DifficultyMeter value={meta.difficultyRight} color="#F97316" />
                </div>
              </div>
              <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">{meta.rightSalaryLabel}</div>
                <div className="mt-2 text-[28px] font-black text-[var(--text-dark)]">{toIndianCurrency(meta.rightSalaryValue, '')}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InsightCard eyebrow="Fast Take" title={meta.previewStat} body="This is the quickest number-based gap students usually look for first." tone="blue" />
            <InsightCard eyebrow="Recommendation" title={meta.verdictTitle} body={meta.recommendation} tone="neutral" />
            <InsightCard eyebrow="Pressure Check" title={`${meta.leftLabel} vs ${meta.rightLabel}`} body="Compare fit, difficulty, and salary together before treating prestige as the deciding factor." tone="amber" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Comparison Table</div>
            <h2 className="mt-2 text-[26px] font-black text-[var(--text-dark)]">What actually separates these two paths</h2>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--border)]">
              <div className="hidden grid-cols-[1.1fr_1fr_1fr_0.9fr] bg-slate-50 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)] md:grid">
                <div>Factor</div>
                <div>{meta.leftLabel}</div>
                <div>{meta.rightLabel}</div>
                <div>Verdict</div>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {meta.matrix.map((row) => (
                  <div key={row.factor} className="grid gap-4 px-5 py-5 md:grid-cols-[1.1fr_1fr_1fr_0.9fr] md:items-start">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)] md:hidden">Factor</div>
                      <div className="text-[15px] font-black text-[var(--text-dark)]">{row.factor}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] md:hidden" style={{ color: theme.accent }}>{meta.leftLabel}</div>
                      <div className="text-[14px] leading-7 text-[var(--text-body)]">{row.left}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-600 md:hidden">{meta.rightLabel}</div>
                      <div className="text-[14px] leading-7 text-[var(--text-body)]">{row.right}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)] md:hidden">Verdict</div>
                      <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-700">{row.verdict}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Visual Scorecard</div>
              <h2 className="mt-2 text-[24px] font-black text-[var(--text-dark)]">Radar view across six important factors</h2>
              <div className="mt-5 h-[320px] w-full sm:h-[360px]">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={meta.radarData}>
                      <PolarGrid stroke="#d4d4d8" />
                      <PolarAngleAxis dataKey="factor" tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name={meta.leftLabel} dataKey="left" stroke={theme.accent} fill={theme.accent} fillOpacity={0.22} strokeWidth={2.5} />
                      <Radar name={meta.rightLabel} dataKey="right" stroke="#F97316" fill="#F97316" fillOpacity={0.14} strokeWidth={2.5} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded-[24px] bg-slate-100" />
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Salary Snapshot</div>
              <h2 className="mt-2 text-[24px] font-black text-[var(--text-dark)]">Horizontal salary comparison</h2>
              <div className="mt-5 h-[280px] w-full">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={meta.salaryBars} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                      <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis type="category" dataKey="label" width={86} tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }} />
                      <Tooltip formatter={(value) => formatTooltipValue(value)} />
                      <Bar dataKey="left" name={meta.leftLabel} radius={[0, 10, 10, 0]}>
                        {meta.salaryBars.map((entry) => (
                          <Cell key={`${entry.label}-left`} fill={theme.accent} />
                        ))}
                      </Bar>
                      <Bar dataKey="right" name={meta.rightLabel} radius={[0, 10, 10, 0]}>
                        {meta.salaryBars.map((entry) => (
                          <Cell key={`${entry.label}-right`} fill="#F97316" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded-[24px] bg-slate-100" />
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Seats & Odds</div>
              <h2 className="mt-2 text-[24px] font-black text-[var(--text-dark)]">Vacancy or competition comparison</h2>
              <div className="mt-5 h-[250px] w-full">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={meta.vacancyBars} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                      <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis type="category" dataKey="label" width={100} tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }} />
                      <Tooltip formatter={(value) => formatTooltipValue(value, 'raw')} />
                      <Bar dataKey="left" name={meta.leftLabel} radius={[0, 10, 10, 0]}>
                        {meta.vacancyBars.map((entry) => (
                          <Cell key={`${entry.label}-left-vacancy`} fill={theme.accent} />
                        ))}
                      </Bar>
                      <Bar dataKey="right" name={meta.rightLabel} radius={[0, 10, 10, 0]}>
                        {meta.vacancyBars.map((entry) => (
                          <Cell key={`${entry.label}-right-vacancy`} fill="#F97316" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded-[24px] bg-slate-100" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-5 rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Deep Dive</div>
            <h2 className="text-[26px] font-black text-[var(--text-dark)]">Read the full comparison</h2>
            {parts.map((part, index) => renderArticlePart(part, index))}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Verdict</div>
              <h3 className="mt-2 text-[24px] font-black text-[var(--text-dark)]">{meta.verdictTitle}</h3>
              <p className="mt-3 text-[14px] leading-7 text-[var(--text-body)]">{meta.verdictBody}</p>
              <div className="mt-4 rounded-[24px] p-4 text-[14px] leading-7" style={{ background: theme.soft }}>
                <span className="font-black text-[var(--text-dark)]">Recommendation:</span> {meta.recommendation}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Sources</div>
              <div className="mt-4 space-y-3">
                {meta.sourceLinks.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-[13px] font-bold leading-6 text-[var(--text-dark)] transition hover:-translate-y-0.5"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-[12px] leading-6 text-[var(--text-light)]">
                Salary bases come from official notices where linked above. Some vacancy and in-hand comparisons are representative estimates to help students compare scale, not payroll promises.
              </p>
            </div>

            {(prevComparison || nextComparison) && (
              <div className="grid grid-cols-1 gap-3">
                {prevComparison && (
                  <Link href={`/compare/${prevComparison.slug}`} className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Previous</div>
                    <div className="mt-1 text-[15px] font-black text-[var(--text-dark)]">{prevComparison.title}</div>
                  </Link>
                )}
                {nextComparison && (
                  <Link href={`/compare/${nextComparison.slug}`} className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">Next</div>
                    <div className="mt-1 text-[15px] font-black text-[var(--text-dark)]">{nextComparison.title}</div>
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      {relatedComparisons.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="rounded-[30px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-6">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Related Comparisons</div>
            <h2 className="mt-2 text-[26px] font-black text-[var(--text-dark)]">Explore nearby decisions</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedComparisons.map((related) => {
                const relatedMeta = COMPARISON_META[related.slug] ?? meta;
                const relatedTheme = CATEGORY_STYLES[relatedMeta.category];

                return (
                  <Link
                    key={related.slug}
                    href={`/compare/${related.slug}`}
                    className="rounded-[26px] border border-[var(--border)] bg-[var(--bg-card)] p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ background: relatedTheme.soft, color: relatedTheme.accent }}>
                      {related.category}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-[22px]" style={{ background: relatedTheme.soft }}>
                        {relatedMeta.leftIcon}
                      </div>
                      <div className="text-[17px] font-black text-[var(--text-dark)]">
                        {relatedMeta.leftLabel} <span className="text-[var(--text-light)]">vs</span> {relatedMeta.rightLabel}
                      </div>
                    </div>
                    <p className="mt-3 text-[13px] leading-6 text-[var(--text-body)]">{relatedMeta.previewStat}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
