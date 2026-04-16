import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Practice — SBI PO, SSC CGL, UPSC, Railway Mock Tests — NaukriYatra",
  description: "Free AI-powered mock tests for government exams. Practice Prelims MCQ, Mains, Descriptive & Interview stages for SBI PO, SSC CGL, UPSC CSE, RRB NTPC, IBPS, NDA. Instant AI scoring with feedback.",
  keywords: ["mock test", "AI practice", "SBI PO mock test", "SSC CGL practice", "UPSC prelims test", "government exam practice free"],
  openGraph: {
    title: "AI Mock Tests for Government Exams — NaukriYatra",
    description: "Practice Prelims, Mains & Interview with AI scoring. SBI PO, SSC CGL, UPSC, Railway — all free.",
  },
};

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
