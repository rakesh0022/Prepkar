import { notFound } from 'next/navigation';
import comparisons from '@/data/comparisons.json';
import ComparisonClient from './ComparisonClient';
import BottomNav from '@/components/BottomNav';
import Link from 'next/link';

// Pre-render all comparison slugs at build time
export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const comparison = comparisons.find((c) => c.slug === params.slug);
  if (!comparison) return {};

  return {
    title: `${comparison.title} - PrepKar`,
    description: comparison.description,
    keywords: comparison.slug.replace(/-/g, ', '),
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      type: 'article',
    },
  };
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const comparison = comparisons.find((c) => c.slug === params.slug);

  if (!comparison) {
    notFound();
  }

  const allSlugs = comparisons.map((c) => c.slug);
  const currentIndex = allSlugs.indexOf(params.slug);
  const prevComparison = currentIndex > 0 ? comparisons[currentIndex - 1] : null;
  const nextComparison = currentIndex < comparisons.length - 1 ? comparisons[currentIndex + 1] : null;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Back nav */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 20px 0' }}>
        <Link href="/compare" style={{ color: '#6d28d9', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to All Comparisons
        </Link>
      </div>

      <ComparisonClient
        comparison={comparison}
        prevComparison={prevComparison}
        nextComparison={nextComparison}
      />

      <BottomNav />
    </main>
  );
}
