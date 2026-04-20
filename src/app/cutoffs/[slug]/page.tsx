import { notFound } from 'next/navigation';
import cutoffs from '@/data/cutoffs.json';
import CutoffDetail from './CutoffDetail';

export async function generateStaticParams() {
  return cutoffs.map((exam) => ({
    slug: exam.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = cutoffs.find(e => e.slug === slug);
  if (!exam) return {};

  return {
    title: `${exam.name} Cutoff Marks 2019-2025 | Year-wise Trends | NaukriYatra`,
    description: `${exam.fullName} cutoff marks for General, OBC, SC, ST categories. Year-wise trend analysis.`,
  };
}

export default async function CutoffDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = cutoffs.find(e => e.slug === slug);

  if (!exam) {
    notFound();
  }

  return <CutoffDetail exam={exam} />;
}
