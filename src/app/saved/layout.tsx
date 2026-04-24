import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Articles — NaukriYatra',
  description: 'Your saved reading list of government exam strategy guides and career stories on NaukriYatra.',
  alternates: { canonical: '/saved' },
};

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
