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
      className="rounded-full border px-4 py-2 text-[13px] font-extrabold transition"
      style={{
        borderColor: active ? 'transparent' : 'var(--border)',
        background: active ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'white',
        color: active ? 'white' : 'var(--text-body)',
        boxShadow: active ? '0 12px 24px rgba(15,23,42,0.16)' : 'none',
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
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14 md:pt-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-700">
                Comparison Guides
              </div>
              <h1 className="mt-4 max-w-3xl text-[24px] font-black leading-tight text-[var(--text-dark)] md:text-[32px] lg:text-[46px]">
                Compare careers with a cleaner, faster decision view.
              </h1>
              <p className="mt-4 max-w-2xl text-[13px] leading-6 text-[var(--text-body)] md:text-[15px] lg:text-[17px]">
                See salary gaps, difficulty, work style, and long-term fit without reading a wall of text first. Start with the category that matches your exam path.
              </p>

              <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Most Read</div>
                <div className="mt-2 text-[20px] font-black text-[var(--text-dark)]">
                  {trendingComparison ? `${trendingComparison.leftLabel} vs ${trendingComparison.rightLabel}` : 'Government vs Private'}
                </div>
                <div className="mt-2 text-[13px] leading-6 text-[var(--text-body)]">
                  {trendingComparison?.previewStat ?? 'Start with the comparison that most students use to decide between stability and upside.'}
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-sm">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--text-light)]">Coverage</div>
                <div className="mt-2 text-[28px] font-black text-[var(--text-dark)]">{comparisons.length}</div>
                <div className="mt-1 text-[13px] text-[var(--text-body)]">{categoriesCovered} active categories with visual salary and fit snapshots</div>
              </div>

              <div className="rounded-[28px] p-5 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)' }}>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/70">Use It Well</div>
                <div className="mt-2 text-[20px] font-black">Check the verdict, then the salary chart.</div>
                <div className="mt-2 text-[13px] leading-6 text-white/80">That order keeps you focused on fit first and numbers second.</div>
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
