import BottomNav from '@/components/BottomNav';
import comparisons from '@/data/comparisons.json';
import CompareLandingClient from './CompareLandingClient';
import { COMPARISON_META, type ComparisonOverview } from './comparisonMeta';

type ComparisonRecord = {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
};

const comparisonCards: ComparisonOverview[] = (comparisons as ComparisonRecord[]).map((comparison) => {
  const meta = COMPARISON_META[comparison.slug];

  return meta ?? {
    slug: comparison.slug,
    leftLabel: comparison.title.split(' vs ')[0]?.replace(/—.*/, '').trim() || comparison.title,
    rightLabel: comparison.title.split(' vs ')[1]?.replace(/—.*/, '').trim() || 'Comparison',
    leftIcon: '🧭',
    rightIcon: '📘',
    category: (comparison.category as ComparisonOverview['category']) ?? 'Career',
    previewStat: comparison.description,
    bestForLeft: 'Students comparing career fit',
    bestForRight: 'Students comparing long-term upside',
    difficultyLeft: 3,
    difficultyRight: 3,
  };
});

export default function ComparePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <CompareLandingClient comparisons={comparisonCards} />
      <BottomNav />
    </main>
  );
}
