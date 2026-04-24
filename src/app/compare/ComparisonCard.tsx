'use client';

import Link from 'next/link';
import { CATEGORY_STYLES, type ComparisonOverview } from './comparisonMeta';

function DifficultyBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className="h-1.5 w-6 rounded-full"
          style={{ background: index < value ? color : 'rgba(148,163,184,0.22)' }}
        />
      ))}
    </div>
  );
}

function IconBadge({ icon, background }: { icon: string; background: string }) {
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-2xl text-[22px] shadow-sm"
      style={{ background }}
    >
      {icon}
    </div>
  );
}

export default function ComparisonCard({ comparison }: { comparison: ComparisonOverview }) {
  const theme = CATEGORY_STYLES[comparison.category];

  return (
    <Link
      href={`/compare/${comparison.slug}`}
      className="group relative block overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: theme.accent }} />

      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ background: theme.soft, color: theme.accent }}>
          {comparison.category}
        </div>
        {comparison.trending && (
          <div className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-800">
            Trending
          </div>
        )}
      </div>

      <div className="mt-4 rounded-[24px] p-4" style={{ background: theme.header, boxShadow: `inset 0 0 0 1px ${theme.ring}` }}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="min-w-0">
            <IconBadge icon={comparison.leftIcon} background={`${theme.accent}14`} />
            <div className="mt-3 text-[16px] font-black text-[var(--text-dark)]">{comparison.leftLabel}</div>
            <div className="mt-1 text-[11px] font-semibold text-[var(--text-light)]">{comparison.bestForLeft}</div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white text-[12px] font-black tracking-[0.22em] text-[var(--text-dark)]" style={{ borderColor: theme.ring }}>
            VS
          </div>

          <div className="min-w-0 text-right">
            <div className="ml-auto">
              <IconBadge icon={comparison.rightIcon} background="rgba(15,23,42,0.06)" />
            </div>
            <div className="mt-3 text-[16px] font-black text-[var(--text-dark)]">{comparison.rightLabel}</div>
            <div className="mt-1 text-[11px] font-semibold text-[var(--text-light)]">{comparison.bestForRight}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-[17px] font-black leading-tight text-[var(--text-dark)]">{comparison.leftLabel} vs {comparison.rightLabel}</h3>
        <p className="mt-2 text-[13px] leading-6 text-[var(--text-body)]">{comparison.previewStat}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-3">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)]">{comparison.leftLabel} difficulty</div>
          <div className="mt-2">
            <DifficultyBar value={comparison.difficultyLeft} color={theme.accent} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-3">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)]">{comparison.rightLabel} difficulty</div>
          <div className="mt-2">
            <DifficultyBar value={comparison.difficultyRight} color="#F97316" />
          </div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold" style={{ color: theme.accent }}>
        Open comparison
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
