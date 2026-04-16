import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore 17+ Government Careers — NaukriYatra",
  description: "Complete guide to 17+ government jobs in India. SBI PO, SSC CGL, UPSC CSE, RRB NTPC, IBPS, NDA, LIC — salary breakdowns, eligibility, syllabus, PYQ papers, promotion paths. Your sarkari naukri roadmap.",
  keywords: ["government jobs India", "sarkari naukri", "SBI PO salary", "SSC CGL vacancy", "UPSC preparation", "railway jobs 2026", "bank PO career"],
  openGraph: {
    title: "Explore 17+ Government Careers — NaukriYatra",
    description: "Salary breakdowns, eligibility, syllabus, PYQ papers for SBI PO, SSC CGL, UPSC, Railway & more. Free.",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
