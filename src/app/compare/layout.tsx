import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government vs Private Job — Full Comparison 2026 — NaukriYatra",
  description: "Government job vs private job comparison. Job security, salary, healthcare, career growth, work-life balance, retirement — honest analysis across 8 factors. Which path fits your life?",
  keywords: ["government vs private job", "sarkari naukri vs private", "govt job benefits", "private vs government salary comparison"],
  openGraph: {
    title: "Government vs Private Job — Full Comparison — NaukriYatra",
    description: "Honest comparison across 8 factors. Job security, salary, growth, retirement — which path fits you?",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
