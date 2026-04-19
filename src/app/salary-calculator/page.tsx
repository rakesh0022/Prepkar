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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Job Salary Calculator 2026
          </h1>
          <p className="text-gray-600">
            Calculate exact in-hand salary based on 7th Pay Commission
          </p>
        </div>
        <SalaryCalculator />
      </div>
      <BottomNav />
    </div>
  );
}