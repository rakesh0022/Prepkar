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
      {/* ── DARK HEADER ── */}
      <section style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 md:pb-14 md:pt-14" style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20, padding: "6px 14px",
            fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 14 }}>⚖️</span>
            Career Comparison Guides
          </div>

          <h1 style={{
            fontSize: "clamp(26px, 5vw, 46px)", fontWeight: 900, color: "#fff",
            lineHeight: 1.15, margin: "0 0 16px", maxWidth: 640,
          }}>
            Data-driven comparisons to help you choose the right path
          </h1>
          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7,
            maxWidth: 520, margin: "0 0 28px",
          }}>
            Salary gaps, difficulty, work style, and long-term fit — without reading a wall of text first.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            {[
              { icon: "📊", value: `${comparisons.length}`, label: "Comparisons" },
              { icon: "🏷️", value: `${categoriesCovered}`, label: "Categories" },
              { icon: "🔥", value: trendingComparison ? `${trendingComparison.leftLabel} vs ${trendingComparison.rightLabel}` : "IAS vs IPS", label: "Most Popular" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14, padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  flexShrink: 0,
                  padding: "8px 18px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  border: activeFilter === filter ? "none" : "1px solid rgba(255,255,255,0.15)",
                  background: activeFilter === filter
                    ? "linear-gradient(135deg, #667eea, #764ba2)"
                    : "rgba(255,255,255,0.07)",
                  color: activeFilter === filter ? "#fff" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: activeFilter === filter ? "0 4px 16px rgba(102,126,234,0.4)" : "none",
                }}
              >
                {FILTER_LABELS[filter]}
              </button>
            ))}
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
