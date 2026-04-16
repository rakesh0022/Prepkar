import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Preparation Strategy — Month-wise Study Plans — NaukriYatra",
  description: "Month-by-month preparation strategy for SBI PO, SSC CGL, UPSC CSE, RRB NTPC. Recommended books, YouTube channels, topper tips & timelines. Free study roadmaps.",
  keywords: ["SBI PO preparation strategy", "SSC CGL study plan", "UPSC preparation roadmap", "RRB NTPC study plan", "government exam preparation tips"],
  openGraph: {
    title: "Exam Preparation Strategy — NaukriYatra",
    description: "Month-wise study plans with books, YouTube channels & topper tips for SBI PO, SSC CGL, UPSC, Railway.",
  },
};

export default function PrepareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
