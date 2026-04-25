'use client';

import Link from 'next/link';
import { CATEGORY_STYLES, type ComparisonOverview } from './comparisonMeta';

function DifficultyBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className="h-2 flex-1 rounded-full transition-all duration-300"
          style={{ 
            background: index < value ? color : 'rgba(148,163,184,0.18)',
            boxShadow: index < value ? `0 2px 8px ${color}40` : 'none',
          }}
        />
      ))}
    </div>
  );
}

function IconBadge({ icon, background }: { icon: string; background: string }) {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-[16px] text-[20px] shadow-sm transition-transform duration-300 group-hover:scale-105"
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
      className="group relative block overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}dd)` }} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ background: theme.soft, color: theme.accent }}>
            <span className="text-[12px]">{comparison.category === 'UPSC' ? '🏛️' : comparison.category === 'Banking' ? '🏦' : comparison.category === 'SSC' ? '📋' : comparison.category === 'Railway' ? '🚂' : '💼'}</span>
            {comparison.category}
          </div>
          {comparison.trending && (
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-800 shadow-sm">
              <span className="text-[12px]">🔥</span>
              Trending
            </div>
          )}
        </div>

        <div className="mt-4 rounded-[20px] p-4 shadow-sm" style={{ background: theme.header, boxShadow: `inset 0 0 0 1px ${theme.ring}` }}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="min-w-0">
              <IconBadge icon={comparison.leftIcon} background={`${theme.accent}18`} />
              <div className="mt-3 text-[15px] font-black leading-tight text-[var(--text-dark)]">{comparison.leftLabel}</div>
              <div className="mt-1.5 text-[10px] font-semibold leading-relaxed text-[var(--text-light)]">{comparison.bestForLeft}</div>
            </div>

            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white text-[11px] font-black tracking-[0.22em] text-[var(--text-dark)] shadow-sm" style={{ borderColor: theme.ring }}>
              VS
            </div>

            <div className="min-w-0 text-right">
              <div className="ml-auto">
                <IconBadge icon={comparison.rightIcon} background="rgba(15,23,42,0.08)" />
              </div>
              <div className="mt-3 text-[15px] font-black leading-tight text-[var(--text-dark)]">{comparison.rightLabel}</div>
              <div className="mt-1.5 text-[10px] font-semibold leading-relaxed text-[var(--text-light)]">{comparison.bestForRight}</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-[16px] font-black leading-tight text-[var(--text-dark)]">{comparison.leftLabel} vs {comparison.rightLabel}</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-body)]">{comparison.previewStat}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[16px] border border-[var(--border)] bg-gradient-to-br from-white to-slate-50 px-3 py-3 shadow-sm">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)]">{comparison.leftLabel} difficulty</div>
            <div className="mt-2.5">
              <DifficultyBar value={comparison.difficultyLeft} color={theme.accent} />
            </div>
          </div>
          <div className="rounded-[16px] border border-[var(--border)] bg-gradient-to-br from-white to-slate-50 px-3 py-3 shadow-sm">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--text-light)]">{comparison.rightLabel} difficulty</div>
            <div className="mt-2.5">
              <DifficultyBar value={comparison.difficultyRight} color="#F97316" />
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold transition-all group-hover:gap-3" style={{ color: theme.accent }}>
          Open comparison
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
