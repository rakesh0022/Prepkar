import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Cutoff Trends 2019-2025 — Year-wise Analysis — NaukriYatra",
  description: "SSC CGL, SBI PO, UPSC CSE, RRB NTPC, IBPS PO cutoff marks and trends. Year-wise data, selection ratios, and difficulty analysis for government exams.",
  keywords: ["SSC CGL cutoff", "SBI PO cutoff", "UPSC cutoff", "exam cutoff 2025", "RRB NTPC cutoff", "IBPS PO cutoff", "cutoff trends"],
  alternates: { canonical: "/cutoffs" },
  openGraph: {
    title: "Exam Cutoff Analysis 2019-2025 — NaukriYatra",
    description: "Track cutoff trends and selection ratios for major government exams. Data-driven analysis to understand exam difficulty.",
  },
};

export default function CutoffsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
