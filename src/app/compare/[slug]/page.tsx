import { notFound } from 'next/navigation';
import comparisons from '@/data/comparisons.json';
import ComparisonClient from './ComparisonClient';

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) return {};

  return {
    title: `${comparison.title} - PrepKar`,
    description: comparison.description,
    keywords: comparison.slug.replace(/-/g, ', '),
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      type: 'article',
    },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  const allSlugs = comparisons.map((c) => c.slug);
  const currentIndex = allSlugs.indexOf(slug);
  const prevComparison = currentIndex > 0 ? comparisons[currentIndex - 1] : null;
  const nextComparison = currentIndex < comparisons.length - 1 ? comparisons[currentIndex + 1] : null;

  return (
    <ComparisonClient
      comparison={comparison}
      prevComparison={prevComparison}
      nextComparison={nextComparison}
    />
  );
}
