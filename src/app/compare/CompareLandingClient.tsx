'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ComparisonCard from './ComparisonCard';
import { CATEGORY_STYLES, COMPARE_FILTERS, type ComparisonCategory, type ComparisonOverview } from './comparisonMeta';

type FilterValue = 'All' | ComparisonCategory;

const FILTERS: FilterValue[] = ['All', ...COMPARE_FILTERS];

const FILTER_LABELS: Record<FilterValue, string> = {
  All: 'All',
  UPSC: 'UPSC',
  Banking: 'Banking',
  SSC: 'SSC',
  Railway: 'Railway',
  Career: 'Career',
};

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 rounded-full border px-5 py-2.5 text-[13px] font-extrabold transition-all duration-300"
      style={{
        borderColor: active ? 'transparent' : 'var(--border)',
        background: active 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'white',
        color: active ? 'white' : 'var(--text-body)',
        boxShadow: active 
          ? '0 8px 20px rgba(15,23,42,0.2), 0 2px 8px rgba(0,0,0,0.1)' 
          : '0 1px 3px rgba(0,0,0,0.05)',
        transform: active ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  );
}

export default function CompareLandingClient({ comparisons }: { comparisons: ComparisonOverview[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');

  const filteredComparisons = useMemo(
    () => comparisons.filter((comparison) => activeFilter === 'All' || comparison.category === activeFilter),
    [activeFilter, comparisons]
  );

  const trendingComparison = comparisons.find((comparison) => comparison.trending);
  const categoriesCovered = new Set(comparisons.map((comparison) => comparison.category)).size;

  return (
    <>
      <section className="border-b border-[var(--border)]" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 md:pb-14 md:pt-14">
          {/* Main Content */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-700 shadow-sm">
              <span className="text-[14px]">⚖️</span>
              Comparison Guides
            </div>
            <h1 className="mt-5 max-w-3xl text-[24px] font-black leading-[1.2] text-[var(--text-dark)] md:text-[32px] lg:text-[46px]">
              Compare careers with a clear decision view.
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[var(--text-body)] md:text-[15px] lg:text-[17px]">
              See salary gaps, difficulty, work style, and long-term fit without reading a wall of text first. Start with the category that matches your exam path.
            </p>

            <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {FILTERS.map((filter) => (
                <FilterPill
                  key={filter}
                  active={activeFilter === filter}
                  label={FILTER_LABELS[filter]}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
          </div>

          {/* Info Cards - Horizontal scroll on mobile, grid on lg */}
          <div className="-mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="group min-w-[85%] flex-shrink-0 rounded-[20px] border border-[var(--border)] bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition hover:shadow-md sm:min-w-[320px] lg:min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">🔥</span>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Most Read</div>
                </div>
                <div className="mt-3 text-[18px] font-black leading-tight text-[var(--text-dark)]">
                  {trendingComparison ? `${trendingComparison.leftLabel} vs ${trendingComparison.rightLabel}` : 'IAS vs IPS'}
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-[var(--text-body)]">
                  {trendingComparison?.previewStat ?? 'Salary basis: ₹56,100 vs ₹56,100'}
                </div>
              </div>

              <div className="group min-w-[85%] flex-shrink-0 rounded-[20px] border border-[var(--border)] bg-white p-5 shadow-sm transition hover:shadow-md sm:min-w-[320px] lg:min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">📊</span>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Coverage</div>
                </div>
                <div className="mt-3 text-[32px] font-black text-[var(--text-dark)]">{comparisons.length}</div>
                <div className="mt-1 text-[13px] leading-relaxed text-[var(--text-body)]">{categoriesCovered} active categories with visual salary and fit snapshots</div>
              </div>

              <div className="group min-w-[85%] flex-shrink-0 rounded-[20px] p-5 text-white shadow-md transition hover:shadow-lg sm:min-w-[320px] lg:min-w-0" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">💡</span>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/70">Use It Well</div>
                </div>
                <div className="mt-3 text-[18px] font-black leading-tight">Check the verdict, then the salary.</div>
                <div className="mt-2 text-[13px] leading-relaxed text-white/80">That order keeps you focused on fit first and numbers second.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Explore</div>
            <h2 className="mt-1 text-[24px] font-black text-[var(--text-dark)]">Find the comparison that matches your next decision.</h2>
          </div>
          {activeFilter !== 'All' && (
            <div
              className="hidden rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] md:inline-flex"
              style={{
                background: CATEGORY_STYLES[activeFilter].soft,
                color: CATEGORY_STYLES[activeFilter].accent,
              }}
            >
              {activeFilter}
            </div>
          )}
        </div>

        {filteredComparisons.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredComparisons.map((comparison) => (
              <ComparisonCard key={comparison.slug} comparison={comparison} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-white px-6 py-12 text-center shadow-sm">
            <div className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[var(--text-light)]">{FILTER_LABELS[activeFilter]}</div>
            <div className="mt-2 text-[22px] font-black text-[var(--text-dark)]">This lane is ready for the next comparison guide.</div>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-7 text-[var(--text-body)]">
              Railway comparisons are not published yet, so we keep the filter visible to show the structure we’re building toward.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-[32px] border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <div className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">After You Decide</div>
              <h3 className="mt-2 text-[26px] font-black text-[var(--text-dark)]">Move straight into preparation mode.</h3>
              <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[var(--text-body)]">
                Once you know which path fits you, switch from comparing to execution with a structured preparation roadmap.
              </p>
            </div>
            <Link
              href="/prepare"
              className="inline-flex items-center justify-center rounded-full bg-[var(--text-dark)] px-6 py-3 text-[14px] font-extrabold text-white transition hover:-translate-y-0.5"
            >
              Start Preparing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
