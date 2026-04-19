import { notFound } from 'next/navigation';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import cutoffs from '@/data/cutoffs.json';
import CutoffDetail from './CutoffDetail';

// Pre-render all slugs at build time
export function generateStaticParams() {
  return cutoffs.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = cutoffs.find((e) => e.slug === params.slug);
  if (!exam) return {};
  return {
    title: `${exam.name} Cutoff Trends 2019–2024 | PrepKar`,
    description: `Year-wise ${exam.name} cutoff marks, vacancy trends, and selection ratio analysis. ${exam.trend}`,
    alternates: { canonical: `/cutoffs/${exam.slug}` },
    openGraph: {
      title: `${exam.name} Cutoff Analysis`,
      description: exam.analysis,
      type: 'article',
    },
  };
}

export default function CutoffDetailPage({ params }: { params: { slug: string } }) {
  const exam = cutoffs.find((e) => e.slug === params.slug);
  if (!exam) notFound();

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 16px 0' }}>
        <Link href="/cutoffs" style={{ color: '#dc2626', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to All Exams
        </Link>
      </div>
      <CutoffDetail exam={exam} />
      <BottomNav />
    </main>
  );
}
