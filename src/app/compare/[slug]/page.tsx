import { notFound } from 'next/navigation';
import comparisons from '@/data/comparisons.json';
import { COMPARISON_META } from '../comparisonMeta';
import { getComparisonOGImage } from '@/lib/imageUtils';
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

  const ogImage = getComparisonOGImage();

  return {
    title: `${comparison.title} - PrepKar`,
    description: comparison.description,
    keywords: comparison.slug.replace(/-/g, ', '),
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: comparison.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.title,
      description: comparison.description,
      images: [ogImage],
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
  const relatedComparisons =
    COMPARISON_META[slug]?.relatedSlugs
      ?.map((relatedSlug) => comparisons.find((item) => item.slug === relatedSlug))
      .filter((item): item is (typeof comparisons)[number] => Boolean(item)) ?? [];

  return (
    <ComparisonClient
      comparison={comparison}
      prevComparison={prevComparison}
      nextComparison={nextComparison}
      relatedComparisons={relatedComparisons}
    />
  );
}
