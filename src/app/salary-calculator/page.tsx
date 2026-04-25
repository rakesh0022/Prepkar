import type { Metadata } from "next";
import SalaryCalculator from "@/components/SalaryCalculator";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
  description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs. Includes DA, HRA, perks based on 7th Pay Commission.',
  keywords: 'government salary calculator, IAS salary, SBI PO salary, 7th pay commission, in-hand salary',
  openGraph: {
    title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
    description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs. Includes DA, HRA, perks based on 7th Pay Commission.',
    url: 'https://prepkar.vercel.app/salary-calculator',
    siteName: 'NaukriYatra',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://prepkar.vercel.app/images/branding/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Government Job Salary Calculator — NaukriYatra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Job Salary Calculator 2026 — 7th Pay Commission | NaukriYatra',
    description: 'Calculate exact in-hand salary for IAS, SBI PO, SSC CGL, RRB NTPC and 12+ government jobs.',
    images: ['https://prepkar.vercel.app/images/branding/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function SalaryCalculatorPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '20px 16px 0' }}>
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 24,
          fontWeight: 800,
          color: 'var(--text-dark)',
          marginBottom: 4,
        }}>
          Salary Calculator 2026
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 20 }}>
          Calculate exact in-hand salary based on 7th Pay Commission
        </p>
        <SalaryCalculator />
      </div>
      <BottomNav />
    </main>
  );
}
