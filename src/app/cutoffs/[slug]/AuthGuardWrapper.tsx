'use client';

import AuthGuard from '@/components/AuthGuard';

export default function AuthGuardWrapper({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <AuthGuard redirectAfterLogin={`/cutoffs/${slug}`}>
      {children}
    </AuthGuard>
  );
}
